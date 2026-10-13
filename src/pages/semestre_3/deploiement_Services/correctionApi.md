---
layout: "layouts/Layout.astro"
title: "Correction séparée : API de devoirs"
hidden: true
---

Cette implémentation commentée correspond au [contrat de l’API de devoirs](/semestre_3/deploiement_Services/api). Les validations, les paramètres SQL et les réponses HTTP y forment une chaîne complète : chaque route doit conserver le contrat annoncé.

## Préparer l’exécution

Dans un dossier neuf, lancez `npm init -y`, puis `npm install express@5 mysql2@3`. Créez app.mjs avec le bloc ci-dessous. Créez une base de test, exécutez le schéma de l’énoncé et préparez `.env` :

```ini
HOST=127.0.0.1
PORT=3002
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=utilisateur_de_test
DB_PASSWORD=mot_de_passe_de_test
DB_NAME=devoirs
ADMIN_TOKEN=remplacer-par-un-jeton-de-test-long
```

Les valeurs sont des exemples, pas des identifiants distribués. Ne placez pas ce fichier dans le dépôt. Lancez `node --env-file=.env app.mjs`. Le serveur écoute localement ; une mise en ligne et une authentification multi-utilisateur exigent un autre dispositif.

Les limites sont déclarées dans un seul objet. Le validateur renvoie des valeurs normalisées ; le SQL reçoit uniquement ces valeurs. L’identité est validée séparément du contenu. La date est contrôlée par sa forme **et** par une reconversion exacte : le 30 février ne devient pas silencieusement une date de mars.

```js
import express from "express";
import mysql from "mysql2/promise";

const app = express();
const token = process.env.ADMIN_TOKEN;
if (!token || token.length < 16) throw new Error("ADMIN_TOKEN de test requis, 16 caractères minimum");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
  dateStrings: true,
});
app.use(express.json({ limit: "32kb" }));

function refuser(status, message) {
  const erreur = new Error(message);
  erreur.status = status;
  throw erreur;
}
function identite(value) {
  if (!/^\d+$/.test(value)) refuser(422, "Id entier positif requis");
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) refuser(422, "Id entier positif requis");
  return id;
}
function dateValide(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function valider(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) refuser(422, "Objet attendu");
  const limites = { nom: 120, description: 2000, matiere: 80, professeur: 80 };
  const result = {};
  for (const [champ, limite] of Object.entries(limites)) {
    if (typeof data[champ] !== "string") refuser(422, `${champ} textuel requis`);
    const texte = data[champ].trim();
    if (!texte || [...texte].length > limite) refuser(422, `${champ} vide ou trop long`);
    result[champ] = texte;
  }
  if (!dateValide(data.date_debut) || !dateValide(data.date_rendu)) refuser(422, "Date invalide");
  if (data.date_rendu < data.date_debut) refuser(422, "Fin avant début");
  return { ...result, date_debut: data.date_debut, date_rendu: data.date_rendu };
}
function autoriser(req, res, next) {
  if (req.get("Authorization") !== `Bearer ${token}`) {
    return res.status(401).json({ error: "Jeton d’écriture requis" });
  }
  next();
}
async function lire(id) {
  const [rows] = await pool.execute("SELECT * FROM devoir WHERE id = ?", [id]);
  if (!rows.length) refuser(404, "Devoir absent");
  return rows[0];
}

app.get("/devoirs", async (req, res) => {
  const [rows] = await pool.execute("SELECT * FROM devoir ORDER BY id DESC");
  res.json(rows);
});
app.get("/devoirs/:id", async (req, res) => res.json(await lire(identite(req.params.id))));

app.post("/devoirs", autoriser, async (req, res) => {
  const d = valider(req.body);
  const [resultat] = await pool.execute(
    "INSERT INTO devoir (nom, description, date_debut, date_rendu, matiere, professeur) VALUES (?, ?, ?, ?, ?, ?)",
    [d.nom, d.description, d.date_debut, d.date_rendu, d.matiere, d.professeur],
  );
  res.status(201).json(await lire(resultat.insertId));
});
app.put("/devoirs/:id", autoriser, async (req, res) => {
  const id = identite(req.params.id);
  const d = valider(req.body);
  await lire(id);
  await pool.execute(
    "UPDATE devoir SET nom = ?, description = ?, date_debut = ?, date_rendu = ?, matiere = ?, professeur = ? WHERE id = ?",
    [d.nom, d.description, d.date_debut, d.date_rendu, d.matiere, d.professeur, id],
  );
  res.json(await lire(id));
});
app.delete("/devoirs/:id", autoriser, async (req, res) => {
  const id = identite(req.params.id);
  const [resultat] = await pool.execute("DELETE FROM devoir WHERE id = ?", [id]);
  if (!resultat.affectedRows) refuser(404, "Devoir absent");
  res.json({ deleted: id });
});
app.all(["/devoirs", "/devoirs/:id"], (req, res) => res.status(405).json({ error: "Méthode non prise en charge" }));
app.use((req, res) => res.status(404).json({ error: "Route inconnue" }));
app.use((error, req, res, next) => {
  console.error(error.message);
  const status = error.status >= 400 && error.status < 500 ? error.status : 500;
  const message = status === 500 ? "Service de données indisponible" :
    status === 400 ? "JSON invalide" : error.message;
  res.status(status).json({ error: message });
});
app.listen(Number(process.env.PORT || 3002), process.env.HOST || "127.0.0.1", () => {
  console.log("API de devoirs démarrée");
});
```

**Résultat attendu :** une liste vide après installation, puis un devoir relu après POST. PUT avec les mêmes valeurs réussit : une absence de changement ne signifie pas que l’id est absent. Le validateur ne traite pas les champs inconnus comme des colonnes SQL. L’empreinte du jeton partagé ne constitue pas une identité par étudiant.
