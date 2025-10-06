export type Question = {
	question: string;
	answers: string[];
	correctAnswerIndex: number;
};

export type Answers = {
	[x: string]: number | null;
};

export type QuizMode = "exam" | "train" | "close";

export type APIResponse = {
	mode: QuizMode;
	questions: Question[];
	questionsPerTest: number;
  timeByQuestionInSeconds: number;
  name: string;
  uid:string|undefined;
};
