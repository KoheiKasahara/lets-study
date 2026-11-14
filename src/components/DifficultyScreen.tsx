import type { CategoryQuiz, QuizDifficulty } from '../types';

interface Props {
  quiz: CategoryQuiz;
  onSelect: (difficulty: QuizDifficulty) => void;
  onBack: () => void;
}

/** 難易度えらび画面：難易度を宣言したクイズでのみ表示する */
export function DifficultyScreen({ quiz, onSelect, onBack }: Props) {
  return (
    <div className="screen difficulty">
      <div className="quiz-header">
        <button type="button" className="small-button" onClick={onBack}>
          ← もどる
        </button>
        <span className="quiz-category">
          {quiz.category.icon} {quiz.category.name}
        </span>
        <span />
      </div>
      <h2 className="quiz-question">むずかしさを えらんでね</h2>
      <div className="difficulty-list">
        {quiz.difficulties!.map((difficulty) => (
          <button
            key={difficulty.id}
            type="button"
            className="difficulty-button"
            style={{ backgroundColor: quiz.category.color }}
            onClick={() => onSelect(difficulty)}
          >
            <span className="difficulty-name">{difficulty.label}</span>
            {difficulty.description && (
              <span className="difficulty-desc">{difficulty.description}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
