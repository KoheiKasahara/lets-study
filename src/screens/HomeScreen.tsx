import type { CategoryQuiz } from '../types';
import './HomeScreen.css';

interface Props {
  quizzes: CategoryQuiz[];
  onSelect: (quiz: CategoryQuiz) => void;
  onOpenGuide: () => void;
  onOpenMonsters: () => void;
  onOpenArena: () => void;
}

/** ホーム画面：カテゴリを大きなカードで選ぶ */
export function HomeScreen({ quizzes, onSelect, onOpenGuide, onOpenMonsters, onOpenArena }: Props) {
  return (
    <div className="screen home">
      <h1 className="home__title">レッツスタディ</h1>
      <p className="home__lead">すきな クイズを えらんでね！</p>
      <div className="home__categories">
        {quizzes.map((quiz) => (
          <button
            key={quiz.category.id}
            type="button"
            className="card-button"
            style={{ backgroundColor: quiz.category.color }}
            onClick={() => onSelect(quiz)}
          >
            <span className="home__category-icon" aria-hidden="true">
              {quiz.category.icon}
            </span>
            <span className="home__category-name">{quiz.category.name}</span>
            <span className="home__category-desc">{quiz.category.description}</span>
          </button>
        ))}
      </div>
      <div className="home__links">
        <button type="button" className="button button--secondary" onClick={onOpenMonsters}>
          🐾 モンスターを そだてる
        </button>
        <button type="button" className="button button--secondary" onClick={onOpenArena}>
          🏟️ とうぎじょう
        </button>
        <button type="button" className="button button--secondary" onClick={onOpenGuide}>
          🚩 こっき ずかん
        </button>
      </div>
    </div>
  );
}
