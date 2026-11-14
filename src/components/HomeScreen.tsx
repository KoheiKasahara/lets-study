import type { CategoryQuiz } from '../types';

interface Props {
  quizzes: CategoryQuiz[];
  onSelect: (quiz: CategoryQuiz) => void;
  onOpenGuide: () => void;
}

/** ホーム画面：カテゴリを大きなカードで選ぶ */
export function HomeScreen({ quizzes, onSelect, onOpenGuide }: Props) {
  return (
    <div className="screen home">
      <h1 className="app-title">レッツスタディ</h1>
      <p className="home-lead">すきな クイズを えらんでね！</p>
      <button type="button" className="big-button secondary" onClick={onOpenGuide}>
        🚩 こっき ずかん（せかいの はたを みる）
      </button>
      <div className="category-list">
        {quizzes.map((quiz) => (
          <button
            key={quiz.category.id}
            type="button"
            className="category-card"
            style={{ backgroundColor: quiz.category.color }}
            onClick={() => onSelect(quiz)}
          >
            <span className="category-icon" aria-hidden="true">
              {quiz.category.icon}
            </span>
            <span className="category-name">{quiz.category.name}</span>
            <span className="category-desc">{quiz.category.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
