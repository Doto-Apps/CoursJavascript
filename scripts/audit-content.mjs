import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

// Vérifications de structure ; la pertinence pédagogique demande aussi une relecture.
const read = file => fs.readFileSync(file, 'utf8');
const normalize = value => value.normalize('NFC').replace(/\s+/g, ' ').trim();
const walk = directory => fs.readdirSync(directory, { withFileTypes: true })
  .flatMap(entry => entry.isDirectory()
    ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const pages = new Map(walk('src/pages').filter(file => file.endsWith('.md'))
  .map(file => ['/' + file.replaceAll('\\', '/').replace(/^src\/pages\//, '').replace(/\.md$/, ''), read(file)]));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const resolvePage = route => pages.get(route.replace(/\/$/, '') || '/index')
  ?? pages.get(route.replace(/\/$/, '') + '/index');
const quizzes = new Map(fs.readdirSync('src/data/quizzes').filter(file => file.endsWith('.json'))
  .map(file => [file.slice(0, -5), JSON.parse(read('src/data/quizzes/' + file))]));
let questions = 0;
for (const [id, quiz] of quizzes) {
  check(!quiz.sourceCourse?.startsWith('/semestre_1/produire_Un_Site_Web/')
    && !quiz.targetCourse?.startsWith('/semestre_1/produire_Un_Site_Web/'),
    `${id} : le parcours SAE 105 ne comporte plus de QCM`);
  const course = resolvePage(quiz.sourceCourse);
  check(Boolean(course), `${id} : cours source absent (${quiz.sourceCourse})`);
  check(Boolean(resolvePage(quiz.targetCourse)), `${id} : cours cible absent`);
  check(quiz.uid === id, `${id} : uid incohérent`);
  check(['train', 'exam', 'close'].includes(quiz.mode), `${id} : mode invalide`);
  check(Number.isInteger(quiz.questionsPerTest) && quiz.questionsPerTest > 0
    && quiz.questionsPerTest <= quiz.questions.length, `${id} : tirage invalide`);
  check(Number.isInteger(quiz.timeByQuestionInSeconds) && quiz.timeByQuestionInSeconds >= 0,
    `${id} : durée invalide`);
  const seen = new Set();
  for (const [index, question] of quiz.questions.entries()) {
    questions++;
    const label = `${id} Q${index + 1}`;
    check(typeof question.question === 'string' && question.question.trim(), `${label} : énoncé vide`);
    const studentText = [question.question, ...question.answers, question.explanation].join(' ');
    check(!/(?:borne basse|borne haute|borne[^.]*inclusive|résultat métier|population concernée)/i.test(studentText),
      `${label} : reformuler avec des mots directs et un contexte compréhensible`);
    check(!/(?:quel total donne|quel total pour|quelle largeur totale|combien de secondes représentent|avec les mêmes stocks|sa valeur de stock\s*\?)/i.test(question.question),
      `${label} : remplacer le calcul d’un exemple par une question de connaissance`);
    check(!seen.has(normalize(question.question)), `${label} : question répétée`);
    seen.add(normalize(question.question));
    check(question.answers.length === 4 && question.answers.every(answer => typeof answer === 'string' && answer.trim()),
      `${label} : quatre réponses non vides attendues`);
    check(new Set(question.answers.map(normalize)).size === 4, `${label} : réponses dupliquées`);
    check(Number.isInteger(question.correctAnswerIndex) && question.correctAnswerIndex >= 0
      && question.correctAnswerIndex < 4, `${label} : correction invalide`);
    check(Boolean(question.explanation?.trim()), `${label} : explication absente`);
    check(Boolean(question.sourceSection) && course?.includes(`id="${question.sourceSection}"`),
      `${label} : ancre source absente (${question.sourceSection})`);
    check(Boolean(question.evidence?.trim()) && course && normalize(course).includes(normalize(question.evidence)),
      `${label} : extrait absent du cours`);
    if (course && question.sourceSection && question.evidence) {
      const start = course.indexOf(`<a id="${question.sourceSection}"></a>`);
      const end = course.indexOf('<a id="', start + 1);
      const section = course.slice(start, end < 0 ? undefined : end);
      check(start >= 0 && normalize(section).includes(normalize(question.evidence)),
        `${label} : extrait hors de la section indiquée`);
      check(!/^#{1,6}\s/.test(question.evidence), `${label} : un titre seul ne justifie pas une réponse`);
    }
  }
}
let sessions = 0;
for (const semester of [1, 2, 3]) {
  const registry = JSON.parse(read(`src/data/s${semester}-sessions.json`));
  const byId = new Map(registry.map(session => [session.id, session]));
  check(byId.size === registry.length, `S${semester} : identifiants de séances dupliqués`);
  for (const session of registry) {
    sessions++;
    const course = resolvePage(session.coursePath);
    check(Boolean(course), `${session.id} : cours absent`);
    check(!/^hidden:\s*true\s*$/m.test(course ?? ''), `${session.id} : cours encore caché`);
    const metadataQuiz = course?.match(/^quizId:\s*"([^"]+)"/m)?.[1];
    check(metadataQuiz === session.quizId, `${session.id} : quiz du cours et registre différents`);
    if (session.coursePath.startsWith('/semestre_1/produire_Un_Site_Web/')) {
      check(!metadataQuiz && !session.quizId && session.entryActivity.type !== 'quiz',
        `${session.id} : QCM restant dans le parcours SAE 105`);
    }
    check(course?.includes(`title: "${session.title}"`), `${session.id} : titre différent du registre`);
    if (session.previousSession) {
      const previous = byId.get(session.previousSession);
      check(Boolean(previous), `${session.id} : séance précédente absente`);
      check(course?.includes(`previousSession: "${previous?.coursePath}"`), `${session.id} : navigation précédente incohérente`);
    }
    if (session.entryActivity.type === 'quiz') {
      const quiz = quizzes.get(session.entryActivity.quizId);
      const source = byId.get(session.entryActivity.sourceSession);
      check(Boolean(quiz), `${session.id} : QCM absent`);
      check(quiz?.sourceSession === source?.id && quiz?.sourceCourse === source?.coursePath,
        `${session.id} : le QCM ne révise pas la séance annoncée`);
      check(quiz?.targetCourse === session.coursePath, `${session.id} : QCM affecté à une autre séance`);
    }
  }
}
for (const [route, markdown] of pages) {
  if (route !== '/index') check(!/^hidden:\s*true\s*$/m.test(markdown), `${route} : cours caché restant`);
  check(!markdown.includes('\uFFFD'), `${route} : caractère de remplacement Unicode`);
  const outsideExamples = markdown.replace(/```[^\n]*\n[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  for (const match of outsideExamples.matchAll(/(?:\]\(|href=")([^\s")]+)(?:\)|")/g)) {
    const href = match[1];
    if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(href)) continue;
    const pathname = href.split(/[?#]/)[0];
    const target = pathname.startsWith('/') ? pathname : path.posix.resolve(path.posix.dirname(route), pathname);
    if (target.startsWith('/quiz/')) {
      check(quizzes.has(target.split('/')[2]), `${route} : QCM lié absent (${target})`);
    } else if (target.startsWith('/semestre_') || target.startsWith('/extra/')) {
      check(Boolean(resolvePage(target)), `${route} : lien de cours cassé (${target})`);
    } else if (target.startsWith('/exemples/') || target.startsWith('/images/') || target.startsWith('/vendor/')) {
      check(fs.existsSync('public' + target), `${route} : ressource absente (${target})`);
    }
  }
}
for (const [alias, canonical] of Object.entries({
  's1-developpement-php': 's1-dev-02', 's1-integration-html': 's1-int-02',
  's1-integration-css': 's1-int-03',
  's2-data-portfolio': 's2-site-01', 's2-integration-js-css': 's2-int-05',
})) {
  const { uid: aliasUid, ...aliasContent } = quizzes.get(alias);
  const { uid: canonicalUid, ...canonicalContent } = quizzes.get(canonical);
  try { assert.deepEqual(aliasContent, canonicalContent); }
  catch { errors.push(`${alias} : ancien identifiant désynchronisé de ${canonical}`); }
}
if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`${errors.length} anomalie(s).`);
  process.exitCode = 1;
} else {
  console.log(`${pages.size} pages, ${sessions} séances, ${quizzes.size} banques et ${questions} questions : contrôles réussis.`);
}
