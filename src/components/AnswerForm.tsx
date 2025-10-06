import clsx from "clsx";
import { CheckIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { Question } from "types";
import { isNullOrUndefined } from "utils/isNullOrUndefined";
import pkg from "he";
const { decode } = pkg;

type AnswerFormProps = {
  answers: Question["answers"];
  question: Question["question"];
  answerIndex?: number;
  correctAnswerIndex: number;
  quizId: string;
  nextQuestionIndex: number;
  hasMoreQuestions: boolean;
  currentLocale: string;
};

type QuestionIconProps = Pick<
  AnswerFormProps,
  "answerIndex" | "correctAnswerIndex"
> & { currentIndex: number };

type QuestionRowProps = {
  currentIndex: number;
  correctAnswerIndex: number;
  answer: Question["answers"][number];
  answerIndex: number;
};

const QuestionIcon = ({
  answerIndex,
  correctAnswerIndex,
  currentIndex,
}: QuestionIconProps) => {
  if (isNullOrUndefined(answerIndex)) {
    return null;
  }

  if (correctAnswerIndex === currentIndex) {
    return <CheckIcon className="size-8 text-success" />;
  }

  if (answerIndex === currentIndex && correctAnswerIndex !== answerIndex) {
    return <XIcon className="size-8 text-error" />;
  }
};

const QuestionRow = ({
  correctAnswerIndex,
  answerIndex,
  currentIndex,
  answer,
}: QuestionRowProps) => (
  <div className="flex">
    <input
      id={`answer-${currentIndex}`}
      name="answerIndex"
      type="radio"
      value={currentIndex}
      className="peer appearance-none focus:outline-none"
      disabled={!isNullOrUndefined(answerIndex)}
      checked={
        !isNullOrUndefined(answerIndex)
          ? answerIndex === currentIndex
          : currentIndex === 0
      }
      onChange={() => {}}
      required
      data-is-correct={
        !isNullOrUndefined(answerIndex)
          ? answerIndex === currentIndex
          : undefined
      }
    />
    <label
      data-correct={
        !isNullOrUndefined(answerIndex)
          ? answerIndex === currentIndex
          : undefined
      }
      className={clsx(
        `flex-grow flex cursor-pointer items-center gap-4 rounded-xl border-2 border-base-content bg-base-200 p-2 font-medium shadow transition-colors`,
        {
          "peer-checked:[&>_span[data-letter]]:bg-primary peer-checked:border-primary":
            isNullOrUndefined(answerIndex),
          "border-success text-success [&>_span[data-letter]]:bg-success [&>_span[data-letter]]:text-success-content":
            !isNullOrUndefined(answerIndex) &&
            correctAnswerIndex === currentIndex,
          "border-error text-error [&>_span[data-letter]]:bg-error [&>_span[data-letter]]:text-error-content":
            !isNullOrUndefined(answerIndex) &&
            answerIndex === currentIndex &&
            correctAnswerIndex !== currentIndex,
        }
      )}
      htmlFor={`answer-${currentIndex}`}
    >
      <span
        data-letter
        className="transition-color grid size-12 place-items-center rounded-xl bg-base-content text-base-200 duration-300"
      >
        {String.fromCharCode(64 + currentIndex + 1)}
      </span>
      <span className="flex-grow">{decode(answer)}</span>
      <div>
        <QuestionIcon
          correctAnswerIndex={correctAnswerIndex}
          currentIndex={currentIndex}
          answerIndex={answerIndex}
        />
      </div>
    </label>
  </div>
);

export const AnswerForm = ({
  answers,
  question,
  answerIndex,
  correctAnswerIndex,
  hasMoreQuestions,
  quizId,
  nextQuestionIndex,
  currentLocale,
}: AnswerFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  return (
    <form
      id="answerForm"
      method="POST"
      onSubmit={() => {
        setIsSubmitting(true);
      }}
      className="flex flex-col gap-8"
    >
      <fieldset
        className={`flex flex-col gap-8 ${
          answerIndex ? "pointer-events-none" : ""
        }`}
      >
        <legend className="sr-only">
          Selectionner la réponse à la question : {question}
        </legend>
        {answers.map((answer, i) => (
          <QuestionRow
            answer={answer}
            key={answer}
            answerIndex={answerIndex}
            correctAnswerIndex={correctAnswerIndex}
            currentIndex={i}
          />
        ))}
      </fieldset>
      {!isNullOrUndefined(answerIndex) ? (
        <>
          {hasMoreQuestions ? (
            <a
              href={
                `${nextQuestionIndex}`}
              className="btn btn-primary w-full btn-md"
            >
              Question suivante
            </a>
          ) : (
            <a
              href={`/quiz/${quizId}/results`}
              className="btn btn-primary w-full btn-md"
            >
              Voir mon résultat
            </a>
          )}
        </>
      ) : (
        <button
          disabled={isSubmitting}
          className="btn btn-primary w-full btn-md"
        >
          Valider ma réponse
        </button>
      )}
    </form>
  );
};
