import { ScreenHeader } from '../components/ScreenHeader';
import type { CategoryQuiz, QuizDifficulty } from '../types';
import './DifficultyScreen.css';

interface Props {
  quiz: CategoryQuiz;
  onSelect: (difficulty: QuizDifficulty) => void;
  onBack: () => void;
}

/** 難易度えらび画面：難易度を宣言したクイズでのみ表示する */
export function DifficultyScreen({ quiz, onSelect, onBack }: Props) {
  return (
    <div className="screen difficulty">
      <ScreenHeader title={`${quiz.category.icon} ${quiz.category.name}`} onBack={onBack} />
      <h2 className="screen-title">むずかしさを えらんでね</h2>
      <div className="difficulty__list">
        {(quiz.difficulties ?? []).map((difficulty) => (
          <button
            key={difficulty.id}
            type="button"
            className="card-button"
            style={{ backgroundColor: quiz.category.color }}
            onClick={() => onSelect(difficulty)}
          >
            <span className="difficulty__name">{difficulty.label}</span>
            {difficulty.description && (
              <span className="difficulty__desc">{difficulty.description}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
