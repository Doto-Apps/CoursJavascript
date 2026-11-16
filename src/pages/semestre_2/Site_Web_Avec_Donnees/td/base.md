---
layout: "layouts/Layout.astro"
title: "Portfolio : créer la base et une API de lecture"
type: "TD"
order: 2
quizId: "s2-site-01"
previousSession: "/semestre_2/Site_Web_Avec_Donnees/td/portfolio"
nextSession: "/semestre_2/Site_Web_Avec_Donnees/td/affichage"
---

<a id="comprendre"></a>

## NULL, chaîne vide et réponse en erreur

Un projet en cours peut avoir une date de fin absente, représentée par `NULL` en base et `null` en JSON. Une description vide est une chaîne ; une table vide est une liste sans projet ; une connexion en échec est une erreur. Ces situations appellent des réponses différentes.

| Situation | Représentation attendue | Sens |
|---|---|---|
| Projet sans date de fin. | `end_date: null` | Projet encore en cours. |
| Aucun projet enregistré. | `[]` | Lecture réussie sans résultat. |
| Identifiant du projet. | Nombre entier. | Identité indépendante du classement. |
| Panne de base. | Réponse d’erreur contrôlée. | Lecture impossible, pas liste vide. |

## Le schéma JSON des projets

Sélectionnez explicitement les colonnes utiles et définissez un ordre. Les noms du JSON doivent rester ceux du dictionnaire. Le serveur transforme les types si nécessaire avant l’encodage. Un champ absent par accident ne doit pas être traité comme une valeur optionnelle sans vérifier le contrat.

Le DSN et les identifiants de connexion restent côté PHP. Un fichier JavaScript public ne doit pas contenir un mot de passe SQL. Le navigateur consomme une adresse d’API, même si les deux services tournent sur le même ordinateur.

## La réponse de l’API avant le rendu

Importez le schéma dans une base de test, insérez quelques projets variés et ouvrez la réponse GET. Vérifiez identité, noms, types et ordre avant de construire des cartes. Testez aussi une table vide et une panne contrôlée. Cela sépare une erreur de stockage d’une erreur de rendu.

**Attention aux dates :** une valeur `DATE` représente une date de calendrier, pas un instant avec fuseau horaire. Le dictionnaire et le formulaire doivent annoncer le format attendu. Ne convertissez pas silencieusement une date de calendrier en un autre jour à cause d’un fuseau.

<a id="apprentissage"></a>

## Le schéma SQL du portfolio

Le portfolio réutilise les échanges Fetch/PHP/PDO vus en développement web. On change le domaine métier, pas les rôles du navigateur, du serveur et de la base. Une clé primaire reste l'identité du projet ; le titre seul ne suffit pas car deux créations peuvent porter le même nom.

```sql
CREATE TABLE projects (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500) NOT NULL DEFAULT '',
  start_date DATE NOT NULL,
  end_date DATE NULL,
  technologies VARCHAR(200) NOT NULL DEFAULT '',
  project_url VARCHAR(500) NOT NULL DEFAULT '',
  code_url VARCHAR(500) NOT NULL DEFAULT '',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

`NULL` signifie une valeur absente ; ce n'est ni la chaîne `"NULL"` ni une date vide. `created_at` est un instant d'enregistrement, distinct de la date à laquelle le projet a commencé. Le dictionnaire fixe ces différences avant la saisie.

```php
$sql = 'SELECT id, title, description, image_url, start_date, end_date,
               technologies, project_url, code_url
        FROM projects ORDER BY start_date DESC, id DESC';
$projects = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
```

**Sortie attendue :** un tableau JSON, `[]` si la table est vide. Le tri utilise d'abord la date, puis l'id pour départager deux dates identiques. Sélectionner explicitement les colonnes stabilise le contrat et évite d'envoyer des champs internes sans nécessité.

```html live title="Replacer le portfolio dans l'architecture — simulation"
<style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 20px;
        font-family: system-ui, sans-serif;
        color: #18324c;
        background: #f1f5f9;
      }
      button,
      input,
      select,
      textarea {
        font: inherit;
        max-width: 100%;
      }
      button {
        padding: 8px 12px;
        cursor: pointer;
      }
      input,
      select,
      textarea {
        padding: 8px;
      }
      :focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 3px;
      }
      article,
      .panel {
        padding: 16px;
        background: white;
        border-radius: 12px;
        min-width: 0;
      }
      .cards {
        display: grid;
        gap: 16px;
      }
      label {
        display: block;
        margin-block: 12px 4px;
      }
      h1 {
        font-size: 1.4rem;
      }
      h2 {
        font-size: 1.15rem;
      }
      p,
      h2,
      a {
        overflow-wrap: anywhere;
      }
      .note {
        font-size: 0.9rem;
      }

      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
    </style>

<h1>Navigateur → PHP → MySQL → réponse</h1>
    <p>
      Simulation pédagogique : aucun serveur PHP ni base ne s’exécute dans cet
      aperçu.
    </p>
    <label for="scenario">Scénario</label>
    <select id="scenario">
      <option value="ok">Lecture réussie</option>
      <option value="invalid">Titre refusé</option>
      <option value="server">Base indisponible</option>
    </select>
    <button id="suivant">Étape suivante</button>
    <button id="reset">Recommencer</button>
    <ol id="trajet"></ol>
    <pre id="sortie" aria-live="polite"></pre>

    <script>
      const scenarios = {
        ok: [
          "Navigateur : GET /api/projects.php",
          "PHP : connexion PDO",
          "MySQL : SELECT id, title, start_date, end_date FROM projects",
          "PHP : réponse 200 application/json",
          "Navigateur : JSON analysé, puis DOM construit",
        ],
        invalid: [
          "Navigateur : POST avec un titre vide",
          "PHP : validation refusée avant SQL",
          "PHP : réponse 422 application/json",
          "Navigateur : message d’erreur ; saisie conservée",
        ],
        server: [
          "Navigateur : GET /api/projects.php",
          "PHP : connexion PDO impossible",
          "PHP : réponse 500 application/json",
          "Navigateur : message général et possibilité de réessayer",
        ],
      };
      let index = 0;
      const trajet = document.querySelector("#trajet");
      const sortie = document.querySelector("#sortie");
      function reset() {
        index = 0;
        trajet.replaceChildren();
        sortie.textContent = "";
      }
      document.querySelector("#scenario").addEventListener("change", reset);
      document.querySelector("#reset").addEventListener("click", reset);
      document.querySelector("#suivant").addEventListener("click", () => {
        const scenario = document.querySelector("#scenario").value;
        const etapes = scenarios[scenario];
        if (index >= etapes.length) return;
        const li = document.createElement("li");
        li.textContent = etapes[index++];
        trajet.append(li);
        if (index === etapes.length) {
          sortie.textContent =
            scenario === "ok"
              ? '[{"id":1,"title":"Festival étudiant","description":"Identité et site.","image_url":"","start_date":"2027-02-01","end_date":null,"technologies":"HTML, CSS","project_url":"","code_url":""}]'
              : '{"error":"Opération impossible"}';
        }
      });
    </script>
```

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Réutilisation | Le portfolio reprend les rôles navigateur, PHP et MySQL du TP de développement. |
| <a id="notion-2"></a>Clé primaire | id est la clé primaire du projet. |
| <a id="notion-3"></a>Titre | title est un VARCHAR(120) obligatoire dans le schéma. |
| <a id="notion-4"></a>Description | description utilise TEXT dans ce schéma. |
| <a id="notion-5"></a>Début | start_date utilise le type DATE. |
| <a id="notion-6"></a>Fin absente | end_date peut être NULL. |
| <a id="notion-7"></a>Sens de NULL | NULL signifie une valeur absente. |
| <a id="notion-8"></a>Création | created_at indique l'instant d'enregistrement. |
| <a id="notion-9"></a>Début distinct | start_date et created_at décrivent deux événements différents. |
| <a id="notion-10"></a>Valeur par défaut | CURRENT_TIMESTAMP fournit l'instant de création de la ligne. |
| <a id="notion-11"></a>Lecture | SELECT lit les projets pour l'API. |
| <a id="notion-12"></a>Colonnes explicites | Sélectionner les colonnes explicitement stabilise le contrat transmis. |
| <a id="notion-13"></a>Tri principal | ORDER BY start_date DESC trie d'abord les dates du plus récent au plus ancien. |
| <a id="notion-14"></a>Tri secondaire | id DESC départage les dates de début identiques. |
| <a id="notion-15"></a>Liste vide | Une table vide produit un tableau JSON vide pour GET réussi. |
| <a id="notion-16"></a>Erreur distincte | Une erreur de connexion ne doit pas être assimilée à une liste vide normale. |
| <a id="notion-17"></a>JSON | L'API renvoie les données en JSON, pas la requête SQL. |
| <a id="notion-18"></a>Paramètres | Une valeur saisie utilisée dans SQL doit être paramétrée. |
| <a id="notion-19"></a>Noms cohérents | Les noms de propriétés doivent correspondre entre base, API et rendu. |
| <a id="notion-20"></a>Configuration privée | Les identifiants de base restent côté serveur. |

## Travail à réaliser : le contrat de lecture des projets

Importez le schéma du squelette et insérez les trois projets du cadrage. Dans GET `/api/projects.php`, sélectionnez les colonnes prévues, triez par `start_date DESC, id DESC`, convertissez l’id en entier et conservez la fin absente comme `null`. Encodez le tableau avec un Content-Type JSON.

Testez deux projets de même date pour vérifier le second critère de tri, un projet en cours, une table vide et une panne de connexion. Une réussite sans projet renvoie 200 et `[]` ; la panne renvoie 500 et un objet d’erreur. Remettez schéma, PHP et exemples réels de réponses avant de commencer le rendu.
