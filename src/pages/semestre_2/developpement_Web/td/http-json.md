---
layout: "layouts/Layout.astro"
title: "HTTP et JSON : comprendre le contrat d’une API"
type: "TD"
order: 1
nextSession: "/semestre_2/developpement_Web/td/fetch-php"
---

<a id="comprendre"></a>

## Client, serveur et base de données

Le navigateur recueille les actions et affiche les résultats. PHP reçoit les requêtes, valide les données et interroge MySQL. MySQL conserve les enregistrements. Le navigateur ne reçoit pas les identifiants de connexion SQL : il parle à une API, pas directement à la base.

Une **API** est ici un ensemble d’adresses, de méthodes, de données attendues et de réponses. Le **contrat** permet à deux programmes d’être développés séparément tout en se comprenant. « Envoyer une tâche » doit préciser le nom du champ, son type, la méthode et la réponse de réussite.

| Situation | Méthode de notre API | Réponse attendue |
|---|---|---|
| Lire la liste. | GET | Tableau JSON, même si la liste est vide. |
| Ajouter une tâche. | POST | Tâche créée avec son identifiant. |
| Changer un champ. | PATCH | Tâche mise à jour. |
| Supprimer une tâche. | DELETE | Confirmation selon le contrat. |

## Objets, tableaux et valeurs JSON

```json
{"id": 3, "title": "Préparer les photos", "done": false}
```

Un objet associe des noms de propriétés à des valeurs. Les noms et les chaînes sont entre guillemets doubles. Un tableau utilise `[]`. `false` est un booléen ; `"false"` est une chaîne ; `null` signale une absence explicitement prévue. JSON ne contient pas de fonction, de commentaire ni de virgule finale. Il s’agit d’un format de données, pas d’un programme exécuté.

## Statut, en-têtes et corps HTTP

Le statut décrit le résultat de la requête ; les en-têtes précisent des informations comme le format ; le corps contient les données. `Content-Type: application/json` annonce le format du corps. `Accept` exprime le format souhaité par le client. Un statut 200 ne garantit pas que le corps possède les champs attendus : le client doit aussi contrôler sa forme.

`404` et une liste vide ne signifient pas la même chose. Une liste vide peut être une lecture réussie ; une adresse inconnue produit une erreur de ressource. Dans notre API, `422` désigne des données analysables mais refusées par les règles. Ne choisissez pas un statut uniquement pour rendre un message vert ou rouge.

<a id="apprentissage"></a>

## Le trajet d’une requête HTTP

Dans le TP du semestre, le navigateur affiche une liste de tâches. PHP décide quelles données lire et MySQL les conserve. Le navigateur ne connaît ni le mot de passe MySQL ni le code PHP exécuté : il échange des **requêtes et des réponses HTTP** avec le serveur. Une API constitue un contrat : une adresse, une méthode, un format et des statuts annoncés.

Imaginez un restaurant : le client formule une demande ; le serveur la transmet ; la cuisine prépare le résultat. Ce schéma aide à distinguer les rôles. Si le serveur HTTP peut encore répondre, il signale un échec par une réponse d’erreur ; une panne réseau ou un serveur arrêté peut empêcher toute réponse. La base de données n'est pas directement accessible depuis `fetch()`.

```http
GET /api/todos.php HTTP/1.1
Host: localhost:8080
Accept: application/json
```

```json
[
  { "id": 1, "title": "Préparer les photos", "done": false },
  { "id": 2, "title": "Écrire la légende", "done": true }
]
```

**Résultat attendu :** un tableau JSON contient deux objets. Les noms des propriétés sont entre guillemets doubles ; `false` est un booléen, pas la chaîne `"false"`. JSON transporte des valeurs, pas une fonction JavaScript. Un texte JSON doit être analysé avant d'utiliser ses propriétés.

```html live title="Suivre une requête et sa réponse — simulation"
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
          "Navigateur : GET /api/todos.php",
          "PHP : connexion PDO",
          "MySQL : SELECT id, title, done FROM todos",
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
          "Navigateur : GET /api/todos.php",
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
              ? '[{"id":1,"title":"Préparer les photos","done":false}]'
              : '{"error":"Opération impossible"}';
        }
      });
    </script>
```

## Le panneau Réseau du navigateur

Dans F12 → Réseau, observez l'adresse, la méthode, le statut, les en-têtes et la réponse. `200` indique ici une lecture réussie ; `201` une création ; `400` une requête mal formée ; `404` une ressource absente ; `422` des données valides en JSON mais refusées par les règles du projet ; `500` une erreur du serveur. Le statut n'est pas la note de l'étudiant ! `Content-Type` décrit le corps envoyé ; `Accept` exprime le format souhaité par le client.

Les méthodes choisies pour notre contrat seront GET pour lire, POST pour créer, PATCH pour modifier certains champs et DELETE pour supprimer. Ce sont des conventions de cette API, qu'il faut respecter des deux côtés. GET ne doit pas supprimer une tâche au simple chargement d'un lien.

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Client | Le navigateur est le client qui demande et affiche les données. |
| <a id="notion-2"></a>Serveur | PHP traite la requête côté serveur. |
| <a id="notion-3"></a>Stockage | MySQL conserve les données persistantes. |
| <a id="notion-4"></a>API | Une API définit un contrat d'échange. |
| <a id="notion-5"></a>Lecture | GET sert à lire dans le contrat de notre API. |
| <a id="notion-6"></a>Création | POST crée une tâche dans notre contrat. |
| <a id="notion-7"></a>Modification | PATCH modifie certains champs d'une tâche. |
| <a id="notion-8"></a>Suppression | DELETE supprime une tâche ciblée. |
| <a id="notion-9"></a>Lecture réussie | HTTP 200 est le statut d'une lecture réussie ici. |
| <a id="notion-10"></a>Création réussie | HTTP 201 confirme une création réussie. |
| <a id="notion-11"></a>Introuvable | HTTP 404 indique une ressource absente. |
| <a id="notion-12"></a>Données refusées | HTTP 422 signale des données analysables mais refusées par les règles. |
| <a id="notion-13"></a>Erreur serveur | HTTP 500 indique une erreur interne du serveur. |
| <a id="notion-14"></a>Format envoyé | Content-Type décrit le format du corps envoyé. |
| <a id="notion-15"></a>Format souhaité | Accept exprime le format souhaité par le client. |
| <a id="notion-16"></a>Objet JSON | Un objet JSON associe des noms de propriétés à des valeurs. |
| <a id="notion-17"></a>Tableau JSON | La liste JSON est un tableau d'objets. |
| <a id="notion-18"></a>Booléen | false sans guillemets est un booléen JSON. |
| <a id="notion-19"></a>Chaîne | "false" avec guillemets est une chaîne, pas un booléen. |
| <a id="notion-20"></a>Observation | L'onglet Réseau montre méthode, statut, en-têtes et corps des échanges. |

## Environnement du projet Todo List

Téléchargez le [squelette Todo List](/exemples/s2/todo-squelette.zip) et suivez son README. Le parcours utilise PHP 8.1 ou plus, les extensions `pdo_mysql` et `mbstring`, MySQL/MariaDB et un navigateur. Démarrez l’application et son API sur la même origine, par exemple `http://localhost:8080`. Astro sert les cours séparément.

## Contrat à relever dans Réseau

| Opération | Adresse et corps | Réponse de réussite |
|---|---|---|
| Lire | GET `/api/todos.php` | 200, tableau de tâches |
| Ajouter | POST, objet `{ "title": "Préparer les photos" }` | 201, tâche créée avec id |
| Modifier | PATCH `/api/todos.php?id=3`, champs `title` et/ou `done` | 200, tâche confirmée |
| Supprimer | DELETE `/api/todos.php?id=3` | 200, `{ "deleted": 3 }` |

Une tâche possède `id` entier positif, `title` texte non vide de 120 caractères maximum après nettoyage et `done` booléen. Relevez méthode, statut, Content-Type et corps d’une lecture réelle. Comparez ensuite `[]`, un objet et un JSON invalide. Remettez le contrat et un échange annoté. Les opérations encore incomplètes du squelette renvoient 501 jusqu’à leur réalisation.
