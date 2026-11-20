import { describe, expect, it } from 'vitest';
import {
  PIXEL_SIZE,
  SPECIES,
  addXpToMonster,
  applyQuizResult,
  combineNames,
  createBattle,
  createCpuMonster,
  createPureMonster,
  damageFor,
  displayName,
  emptyMonsterSave,
  fuseMonsters,
  levelFromXp,
  levelProgress,
  loadMonsterSave,
  pickHatchSpecies,
  saveMonsterSave,
  stageForLevel,
  statsFor,
  stepBattle,
  xpGainForBlock,
  xpToReachLevel,
  type MonsterSave,
  type StorageLike,
} from './index';

/** 決まった数列を返す乱数（テスト用） */
function sequenceRandom(values: number[]): () => number {
  let index = 0;
  return () => {
    const value = values[Math.min(index, values.length - 1)];
    index += 1;
    return value;
  };
}

const zeroRandom = () => 0;

describe('種族データ', () => {
  it('基本種族は6種で、各種族に3段階ある', () => {
    expect(SPECIES).toHaveLength(6);
    for (const species of SPECIES) {
      expect(species.stages).toHaveLength(3);
      for (const stage of species.stages) {
        expect(stage.name).not.toBe('');
      }
    }
  });

  it('ピクセルマップはすべて14×14で、パレットにある文字だけを使う', () => {
    const allowed = new Set(['.', 'M', 'L', 'D', 'A', 'E', 'W']);
    for (const species of SPECIES) {
      for (const stage of species.stages) {
        expect(stage.pixels).toHaveLength(PIXEL_SIZE);
        for (const row of stage.pixels) {
          expect(row).toHaveLength(PIXEL_SIZE);
          for (const ch of row) {
            expect(allowed.has(ch)).toBe(true);
          }
        }
        // 真っ白（ドットなし）ではない
        expect(stage.pixels.some((row) => row.includes('M'))).toBe(true);
      }
    }
  });

  it('段階が進むとドットの数が増える（見た目が育つ）', () => {
    for (const species of SPECIES) {
      const counts = species.stages.map(
        (stage) =>
          stage.pixels
            .join('')
            .split('')
            .filter((ch) => ch !== '.').length,
      );
      expect(counts[1]).toBeGreaterThan(counts[0]);
      expect(counts[2]).toBeGreaterThan(counts[1]);
    }
  });
});

describe('レベルと進化', () => {
  it('累計経験値からレベルを出す', () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(xpToReachLevel(2))).toBe(2);
    expect(levelFromXp(xpToReachLevel(5))).toBe(5);
    expect(levelFromXp(xpToReachLevel(5) - 1)).toBe(4);
    expect(levelFromXp(999999)).toBe(30);
  });

  it('Lv5で第2段階、Lv10で第3段階', () => {
    expect(stageForLevel(1)).toBe(1);
    expect(stageForLevel(4)).toBe(1);
    expect(stageForLevel(5)).toBe(2);
    expect(stageForLevel(9)).toBe(2);
    expect(stageForLevel(10)).toBe(3);
  });

  it('次のレベルまでの進み具合は0〜1', () => {
    expect(levelProgress(0)).toBe(0);
    const mid = xpToReachLevel(2) + (xpToReachLevel(3) - xpToReachLevel(2)) / 2;
    expect(levelProgress(mid)).toBeCloseTo(0.5);
  });

  it('純粋種の表示名は進化で段階の名前になる', () => {
    const monster = createPureMonster('honoo', 'm1');
    expect(displayName(monster)).toBe('ひのこ');
    const grown = { ...monster, xp: xpToReachLevel(5) };
    expect(displayName(grown)).toBe('ほのまる');
    const final = { ...monster, xp: xpToReachLevel(10) };
    expect(displayName(final)).toBe('フレアドラ');
  });
});

describe('クイズの経験値とたまご', () => {
  it('正解+10、まちがい+3', () => {
    expect(xpGainForBlock(10, 10)).toBe(100);
    expect(xpGainForBlock(0, 10)).toBe(30);
    expect(xpGainForBlock(7, 10)).toBe(79);
  });

  it('経験値は全員に入り、進化したら報告される', () => {
    const save: MonsterSave = {
      ...emptyMonsterSave(),
      monsters: [createPureMonster('honoo', 'm1'), createPureMonster('mizu', 'm2')],
    };
    // Lv5手前まで育ててから1セット解くと進化する
    save.monsters[0] = { ...save.monsters[0], xp: xpToReachLevel(5) - 10 };
    const { save: next, report } = applyQuizResult(save, 1, 1);
    expect(report.xpGain).toBe(10);
    expect(next.monsters[0].xp).toBe(xpToReachLevel(5));
    expect(next.monsters[1].xp).toBe(10);
    expect(report.evolutions).toHaveLength(1);
    expect(report.evolutions[0]).toMatchObject({ monsterId: 'm1', fromStage: 1, toStage: 2 });
  });

  it('累計正解30問ごとにたまごが1つ増える', () => {
    const base: MonsterSave = {
      ...emptyMonsterSave(),
      monsters: [createPureMonster('honoo', 'm1')],
    };
    const first = applyQuizResult({ ...base, totalCorrect: 25 }, 5, 10);
    expect(first.report.eggsGained).toBe(1);
    expect(first.save.eggs).toBe(1);
    expect(first.save.totalCorrect).toBe(30);
    const second = applyQuizResult({ ...first.save }, 29, 30);
    expect(second.report.eggsGained).toBe(0);
    const third = applyQuizResult({ ...second.save }, 1, 1);
    expect(third.report.eggsGained).toBe(1);
    expect(third.save.eggs).toBe(2);
  });

  it('孵化する種族は乱数で決まる', () => {
    expect(pickHatchSpecies(zeroRandom)).toBe(SPECIES[0].id);
    expect(pickHatchSpecies(() => 0.999)).toBe(SPECIES[SPECIES.length - 1].id);
  });
});

describe('ステータス', () => {
  it('レベルと段階が上がるとステータスも上がる', () => {
    const monster = createPureMonster('iwa', 'm1');
    const lv1 = statsFor(monster);
    const lv5 = statsFor({ ...monster, xp: xpToReachLevel(5) });
    const lv10 = statsFor({ ...monster, xp: xpToReachLevel(10) });
    expect(lv5.hp).toBeGreaterThan(lv1.hp);
    expect(lv10.hp).toBeGreaterThan(lv5.hp);
    expect(lv10.attack).toBeGreaterThan(lv1.attack);
  });

  it('いわ種族はぼうぎょが高く、でんき種族はすばやさが高い', () => {
    const iwa = statsFor(createPureMonster('iwa', 'm1'));
    const denki = statsFor(createPureMonster('denki', 'm2'));
    expect(iwa.defense).toBeGreaterThan(denki.defense);
    expect(denki.speed).toBeGreaterThan(iwa.speed);
  });
});

describe('配合', () => {
  it('名前は前半＋後半の合成名になる', () => {
    expect(combineNames('ほのまる', 'しずくん')).toBe('ほのくん');
    expect(combineNames('ひのこ', 'みずたま')).toBe('ひのたま');
  });

  it('子は親Aの形と親Bの色を受け継ぎ、親は残る', () => {
    const parentA = createPureMonster('honoo', 'm1');
    const parentB = createPureMonster('mizu', 'm2');
    const child = fuseMonsters(parentA, parentB, 'm3');
    expect(child.shapeSpeciesId).toBe('honoo');
    expect(child.colorSpeciesId).toBe('mizu');
    expect(child.generation).toBe(2);
    expect(child.xp).toBe(0);
    // 親そのものは変わらない
    expect(parentA.xp).toBe(0);
    expect(parentB.xp).toBe(0);
  });

  it('配合モンスター同士の再配合でも形と色の2要素で表せる', () => {
    const child1 = fuseMonsters(
      createPureMonster('honoo', 'm1'),
      createPureMonster('mizu', 'm2'),
      'm3',
    );
    const child2 = fuseMonsters(
      createPureMonster('happa', 'm4'),
      createPureMonster('denki', 'm5'),
      'm6',
    );
    const grandchild = fuseMonsters(child1, child2, 'm7');
    expect(grandchild.shapeSpeciesId).toBe('honoo');
    expect(grandchild.colorSpeciesId).toBe('denki');
    expect(grandchild.generation).toBe(3);
  });

  it('配合の子の基礎ステータスは両親の平均＋世代ボーナス', () => {
    const pureFire = statsFor(createPureMonster('honoo', 'm1'));
    const pureWater = statsFor(createPureMonster('mizu', 'm2'));
    const child = fuseMonsters(
      createPureMonster('honoo', 'm3'),
      createPureMonster('mizu', 'm4'),
      'm5',
    );
    const childStats = statsFor(child);
    // HP: ほのお30とみず32の平均31 ＋ 世代ボーナス2
    expect(childStats.hp).toBe(31 + 2);
    expect(childStats.hp).toBeGreaterThan(Math.min(pureFire.hp, pureWater.hp));
  });
});

describe('バトル', () => {
  it('すばやさが速い方が先に攻撃する', () => {
    const slow = createPureMonster('iwa', 'm1');
    const fast = createPureMonster('denki', 'm2');
    const battle = createBattle(fast, slow);
    expect(battle.next).toBe('player');
    const battle2 = createBattle(slow, fast);
    expect(battle2.next).toBe('cpu');
  });

  it('ダメージは最低1入る', () => {
    expect(damageFor(1, 100, zeroRandom)).toBe(1);
    expect(damageFor(10, 4, zeroRandom)).toBe(10 - 2 - 2);
  });

  it('進めるとどちらかがねむって終わる', () => {
    const player = createPureMonster('honoo', 'm1');
    const cpu = createCpuMonster(1, zeroRandom);
    let battle = createBattle(player, cpu);
    let guard = 0;
    while (!battle.finished && guard < 200) {
      battle = stepBattle(battle, sequenceRandom([0.5]));
      guard += 1;
    }
    expect(battle.finished).toBe(true);
    expect(battle.winner).not.toBeNull();
    const loser = battle.winner === 'player' ? battle.cpu : battle.player;
    expect(loser.hp).toBe(0);
    expect(battle.actions[battle.actions.length - 1].message).toContain('ねむった');
    // 終わった後の step は何も変えない
    expect(stepBattle(battle, zeroRandom)).toBe(battle);
  });

  it('CPUは近いレベル帯で作られる', () => {
    const cpu = createCpuMonster(5, sequenceRandom([0, 0.99]));
    expect(levelFromXp(cpu.xp)).toBeGreaterThanOrEqual(4);
    expect(levelFromXp(cpu.xp)).toBeLessThanOrEqual(6);
    const cpuLv1 = createCpuMonster(1, sequenceRandom([0, 0]));
    expect(levelFromXp(cpuLv1.xp)).toBe(1);
  });
});

describe('保存', () => {
  function memoryStorage(): StorageLike & { data: Map<string, string> } {
    const data = new Map<string, string>();
    return {
      data,
      getItem: (key) => data.get(key) ?? null,
      setItem: (key, value) => {
        data.set(key, value);
      },
    };
  }

  it('保存して読み戻せる', () => {
    const storage = memoryStorage();
    const save: MonsterSave = {
      monsters: [createPureMonster('hoshi', 'm1')],
      totalCorrect: 42,
      eggs: 1,
      trophies: 3,
      nextId: 2,
    };
    saveMonsterSave(save, storage);
    expect(loadMonsterSave(storage)).toEqual(save);
  });

  it('壊れたJSONでも空データで落ちない', () => {
    const storage = memoryStorage();
    storage.setItem('lets-study:monsters:v1', '{broken');
    expect(loadMonsterSave(storage)).toEqual(emptyMonsterSave());
    storage.setItem('lets-study:monsters:v1', '"just a string"');
    expect(loadMonsterSave(storage)).toEqual(emptyMonsterSave());
  });

  it('おかしいモンスターは捨てて、まともなものだけ残す', () => {
    const storage = memoryStorage();
    storage.setItem(
      'lets-study:monsters:v1',
      JSON.stringify({
        monsters: [
          {
            id: 'ok',
            shapeSpeciesId: 'honoo',
            colorSpeciesId: 'mizu',
            name: 'ほのたま',
            xp: 10,
            generation: 2,
          },
          {
            id: 'bad',
            shapeSpeciesId: 'unknown',
            colorSpeciesId: 'mizu',
            name: 'x',
            xp: 0,
            generation: 1,
          },
          { nope: true },
        ],
        totalCorrect: 5,
        eggs: 0,
        trophies: 0,
        nextId: 3,
      }),
    );
    const loaded = loadMonsterSave(storage);
    expect(loaded.monsters).toHaveLength(1);
    expect(loaded.monsters[0].id).toBe('ok');
    expect(loaded.totalCorrect).toBe(5);
  });

  it('addXpToMonster は対象だけに経験値を足す', () => {
    const save: MonsterSave = {
      ...emptyMonsterSave(),
      monsters: [createPureMonster('honoo', 'm1'), createPureMonster('mizu', 'm2')],
    };
    const next = addXpToMonster(save, 'm2', 20);
    expect(next.monsters[0].xp).toBe(0);
    expect(next.monsters[1].xp).toBe(20);
  });
});
