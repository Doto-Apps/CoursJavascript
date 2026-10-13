import type { APIContext } from "astro";
import type { APIResponse } from "types";
import { getCookieName } from "utils/getCookieName";

export async function clearLocalQuizAttempt(
  quizId: string,
  quiz: APIResponse,
  session: APIContext["session"],
) {
  if (!session) return;

  session.delete(getCookieName(quizId));
  quiz.questions.forEach((_, index) => {
    session.delete(`${quiz.uid ?? ""}:deadline:${index}`);
  });

  // A redirect in Astro's dev server can finish before session changes reach
  // storage. A new session ID keeps the next request from reading old answers.
  await session.regenerate();
}
