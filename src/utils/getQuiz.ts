import type { APIResponse } from "types";
import type { APIContext } from "astro";
import { z } from "zod";

// Yolo cache but it works
let cachedData: { [x: string]: { res: APIResponse; lastFetch: number } } = {};
const CACHE_DURATION = import.meta.env.DEV ? 60 * 60 * 8 * 1000 : 10 * 60 * 1000; // *hours in dev otherwise 10 minute
const SCRIPT_URL =
	"https://script.google.com/macros/s/AKfycbxsUnyUPjQhv1mjnRLPcIN8Z5W3vjzG1AWvVhcQOEmENHUkkB2mb77oL31pXSW8Q-6J/exec";
const API_KEY = import.meta.env.API_KEY;

// Ces QCM ont été retirés des parcours : ne pas les recharger via le service distant.
const removedQuizIds = new Set([
	"s1-site-01", "s1-site-02", "s1-site-03", "s1-site-04",
	"s1-site-05", "s1-site-06", "s1-site-07", "s1-produire-site",
	"s3-correction-alter-ego",
]);

const localQuizModules = import.meta.glob("../data/quizzes/*.json", {
	eager: true,
	import: "default",
}) as Record<string, unknown>;

const localQuizSchema = z.object({
	name: z.string().min(1),
	mode: z.enum(["exam", "train", "close"]),
	questionsPerTest: z.number().int().positive(),
	timeByQuestionInSeconds: z.number().int().nonnegative(),
	questions: z.array(z.object({
		question: z.string().min(1),
		answers: z.array(z.string().min(1)).length(4),
		correctAnswerIndex: z.number().int().min(0).max(3),
		explanation: z.string().optional(),
		sourceSection: z.string().optional(),
		evidence: z.string().optional(),
	})).min(1),
	uid: z.string().optional(),
	sourceCourse: z.string().optional(),
	sourceSession: z.string().optional(),
	targetCourse: z.string().optional(),
}).refine(quiz => quiz.questionsPerTest <= quiz.questions.length, {
	message: "Le tirage dépasse le nombre de questions disponibles",
	path: ["questionsPerTest"],
});

export function getLocalQuiz(quizId: string): APIResponse | undefined {
	const source = localQuizModules[`../data/quizzes/${quizId}.json`];
	if (!source) return undefined;

	const parsed = localQuizSchema.safeParse(source);
	if (!parsed.success) {
		console.error(`Quiz local invalide (${quizId})`, parsed.error.flatten());
		return undefined;
	}
	return { ...parsed.data, uid: parsed.data.uid ?? quizId };
}

export async function getQuiz(
	quizId: string, sessions? : APIContext["session"]
): Promise<APIResponse | undefined> {
	if (removedQuizIds.has(quizId)) return undefined;

	const now = Date.now();
	if ( quizId === "generated" && (await sessions?.has("generatedQuiz"))) 
	{
		const value = await sessions?.get("generatedQuiz")
		return value;
	}

	const localQuiz = getLocalQuiz(quizId);
	if (localQuiz) return localQuiz;

	if (
		cachedData &&
		cachedData[quizId]?.lastFetch &&
		now - cachedData[quizId].lastFetch < CACHE_DURATION
	) {
		return cachedData[quizId].res;
	}

	cleanCache();

	const fullURL = `${SCRIPT_URL}?${new URLSearchParams({ key: API_KEY, name: quizId }).toString()}`;
	const response = await fetch(fullURL);
	const json = (await response.json()) as APIResponse;


	cachedData[quizId] = { res: json, lastFetch: now };

	return cachedData[quizId].res;
}

function cleanCache() {
	const now = Date.now();
	cachedData = Object.entries(cachedData).reduce<typeof cachedData>(
		(acc, [quizId, resAndLastFetch]) => {
			if (now - resAndLastFetch.lastFetch < CACHE_DURATION) {
				return {
					...acc,
					[quizId]: resAndLastFetch,
				};
			}

			return acc;
		},
		{},
	);
}
