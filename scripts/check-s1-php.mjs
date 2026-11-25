import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import assert from 'node:assert/strict';
import { spawn, execFileSync } from 'node:child_process';

// Essai fonctionnel de la référence enseignant, sur un historique temporaire.
const php = process.env.PHP_BINARY || (fs.existsSync('C:/xampp/php/php.exe') ? 'C:/xampp/php/php.exe' : 'php');
const project = path.resolve('docs/corrections-s1/messagerie');
for (const file of ['common.php', 'public/connexion.php', 'public/index.php', 'public/deconnexion.php', 'public/mini-chat.php']) {
  execFileSync(php, ['-l', path.join(project, file)], { stdio: 'pipe', windowsHide: true });
}
// Dev 04 reste autonome ; Dev 05 fournit des exemples complets et Dev 06 des fragments guidés.
for (const name of ['phpVarTab']) {
  const course = fs.readFileSync(`src/pages/semestre_1/developpement_Web/${name}.md`, 'utf8');
  const start = course.indexOf('<a id="exercices-autonomes"></a>');
  assert(start >= 0, name + ' : section autonome absente');
  const exercise = course.slice(start);
  assert(!exercise.includes('```'), name + ' : code dans les exercices');
}
const teachingCourse = fs.readFileSync('src/pages/semestre_1/developpement_Web/phpForm.md', 'utf8').replaceAll('\r\n', '\n');
assert.equal([...teachingCourse.matchAll(/^## [123]\./gm)].length, 3, 'Dev 05 : trois parties attendues');
for (const name of ['inscription.php', 'preferences.php', 'lecture.php', 'carnet.php']) {
  const file = path.resolve('public/exemples/s1/ateliers-php', name);
  execFileSync(php, ['-l', file], { stdio: 'pipe', windowsHide: true });
  const code = fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n').trimEnd();
  assert(teachingCourse.includes('```php\n' + code + '\n```'), name + ' : exemple différent entre cours et téléchargement');
}
const guidedCourse = fs.readFileSync('src/pages/semestre_1/developpement_Web/phpminichat2.md', 'utf8');
assert(guidedCourse.includes('<a id="tp-autonome"></a>'), 'Dev 06 : sujet autonome absent');
assert(guidedCourse.includes('// TODO'), 'Dev 06 : fragments à compléter absents');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'mmi-s1-chat-'));
const data = path.join(temporary, 'stockage');
fs.mkdirSync(data);
const storage = path.join(data, 'messages.txt');
const socket = net.createServer();
await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve));
const port = socket.address().port;
await new Promise(resolve => socket.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const server = spawn(php, ['-S', `127.0.0.1:${port}`, '-t', path.join(project, 'public')], {
  windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, MMI_CHAT_STORAGE: storage },
});
let logs = '';
server.stdout.on('data', chunk => { logs += chunk; });
server.stderr.on('data', chunk => { logs += chunk; });
let startupError;
server.on('error', error => { startupError = error; });
async function request(client, route, fields) {
  const response = await fetch(origin + '/' + route, {
    redirect: 'manual', method: fields ? 'POST' : 'GET',
    headers: client.cookie ? { Cookie: client.cookie } : {},
    body: fields ? new URLSearchParams(fields) : undefined,
  });
  for (const cookie of response.headers.getSetCookie()) client.cookie = cookie.split(';')[0];
  return { status: response.status, location: response.headers.get('location'), text: await response.text() };
}
async function login(client, identifiant, mot_de_passe) {
  const response = await request(client, 'connexion.php', { identifiant, mot_de_passe });
  assert.equal(response.status, 303);
  assert.equal(response.location, 'index.php');
}
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (startupError) throw startupError;
    try { await fetch(origin + '/connexion.php'); ready = true; break; }
    catch { await new Promise(resolve => setTimeout(resolve, 100)); }
  }
  assert(ready, 'Le serveur PHP ne démarre pas');
  const guest = {}, lea = {}, sam = {};
  assert.equal((await request(guest, 'mini-chat.php')).location, 'connexion.php');
  assert.equal((await request(guest, 'mini-chat.php', { message: 'Interdit' })).status, 303);
  assert(!fs.existsSync(storage));
  await request(lea, 'connexion.php');
  assert.equal((await request(lea, 'connexion.php', { identifiant: 'lea', mot_de_passe: 'incorrect' })).status, 200);
  assert.equal((await request(lea, 'index.php')).status, 303);
  assert.equal((await request(lea, 'connexion.php', { 'identifiant[]': 'lea', mot_de_passe: 'atelier' })).status, 200);
  const previousCookie = lea.cookie;
  await login(lea, 'lea', 'atelier');
  assert.notEqual(lea.cookie, previousCookie, 'Renouvellement de session absent');
  assert((await request(lea, 'index.php')).text.includes('Léa'));
  assert((await request(lea, 'mini-chat.php')).text.includes('Aucun message'));
  const creation = await request(lea, 'mini-chat.php', { message: '<b>Bonjour</b>', pseudo: 'Pirate' });
  assert.equal(creation.status, 303);
  assert.equal(fs.readFileSync(storage, 'utf8').trim(), 'Léa|<b>Bonjour</b>');
  const content = fs.readFileSync(storage, 'utf8');
  assert((await request(lea, 'mini-chat.php')).text.includes('&lt;b&gt;Bonjour&lt;/b&gt;'));
  for (const message of ['', '   ', 'x'.repeat(1121), 'a|b', '\nabc', 'abc\r', 'a\nb']) {
    assert.equal((await request(lea, 'mini-chat.php', { message })).status, 200);
    assert.equal(fs.readFileSync(storage, 'utf8'), content);
  }
  await request(lea, 'mini-chat.php', { 'message[]': 'tableau' });
  assert.equal(fs.readFileSync(storage, 'utf8'), content);
  await login(sam, 'sam', 'campus');
  assert.notEqual(lea.cookie, sam.cookie);
  assert.equal((await request(sam, 'mini-chat.php', { message: 'Salut' })).status, 303);
  const shared = (await request(lea, 'mini-chat.php')).text;
  assert(shared.includes('Sam') && shared.includes('Salut') && shared.includes('Bonjour'));
  const persisted = fs.readFileSync(storage, 'utf8');
  await request(lea, 'mini-chat.php');
  assert.equal(fs.readFileSync(storage, 'utf8'), persisted, 'Doublon après GET');
  assert.equal((await request(lea, 'deconnexion.php', {})).status, 303);
  assert.equal((await request(lea, 'mini-chat.php')).status, 303);
  assert.equal(fs.readFileSync(storage, 'utf8'), persisted);
  await login(lea, 'lea', 'atelier');
  assert((await request(lea, 'mini-chat.php')).text.includes('Salut'));
  fs.appendFileSync(storage, 'ligne-incomplete\nchamps|en|trop\n');
  assert(!(await request(lea, 'mini-chat.php')).text.includes('ligne-incomplete'));
  const beforeFailure = fs.readFileSync(storage, 'utf8');
  fs.renameSync(data, path.join(temporary, 'stockage-indisponible'));
  try {
    const failure = await request(lea, 'mini-chat.php', { message: 'Non enregistré' });
    assert.equal(failure.status, 200);
    assert(failure.text.includes('Enregistrement impossible'));
    assert(failure.text.includes('Non enregistré'));
  } finally { fs.renameSync(path.join(temporary, 'stockage-indisponible'), data); }
  assert.equal(fs.readFileSync(storage, 'utf8'), beforeFailure);
  console.log('PHP S1 : exemples du cours synchronisés et syntaxe valide ; référence connexion, sessions, fichiers, validation, affichage et déconnexion vérifiée.');
} catch (error) {
  console.error(logs.slice(-2500));
  throw error;
} finally {
  const stopped = new Promise(resolve => server.once('exit', resolve));
  if (server.exitCode === null) { server.kill(); await stopped; }
  if (fs.existsSync(storage)) fs.unlinkSync(storage);
  fs.rmdirSync(data);
  fs.rmdirSync(temporary);
}
