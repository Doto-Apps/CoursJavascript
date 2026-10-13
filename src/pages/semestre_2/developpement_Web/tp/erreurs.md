---
layout: "layouts/Layout.astro"
title: "Erreurs et validations : garder une interface fiable"
type: "TP"
order: 6
quizId: "s2-dev-05"
previousSession: "/semestre_2/developpement_Web/tp/modification"
nextSession: "/semestre_2/developpement_Web/tp/integration"
---

<a id="comprendre"></a>

## Erreurs réseau, HTTP, JSON et métier

| Frontière | Exemple | Ce que le client peut faire |
|---|---|---|
| Saisie. | Titre vide après trim. | Signaler le champ et conserver la saisie. |
| Réseau. | Service arrêté. | Expliquer l’échec et proposer de réessayer. |
| HTTP. | Réponse 404 ou 422. | Lire le statut et le message du contrat. |
| Format. | PHP produit un avertissement avant le JSON. | Signaler une réponse illisible et diagnostiquer côté serveur. |
| Base. | Table absente ou connexion en échec. | Réponse serveur contrôlée, détails dans le diagnostic du développeur. |

## Messages publics et journaux serveur

L’utilisateur doit savoir si l’action a réussi et comment continuer. Le développeur a besoin d’un statut, d’une opération et d’un journal. Afficher un mot de passe de connexion ou une trace SQL complète dans l’interface n’aide pas l’utilisateur à corriger son titre.

Le JSON d’erreur possède une forme stable, par exemple un champ `error`. Un nom constant évite au client de rechercher tour à tour `message`, `erreur` et `description`. Un serveur en erreur ne doit pas renvoyer un statut de réussite uniquement pour que Fetch se termine sans exception.

## Les jeux de données de test

Utilisez une base et des données d’essai. Préparez une action, un défaut introduit et un résultat attendu ; rétablissez ensuite l’état normal. Arrêter le serveur teste le réseau ; envoyer un titre vide teste la validation ; demander un id absent teste le contrat. Ces essais ne sont pas interchangeables.

## Reprise après erreur et conservation de la saisie

`try` exécute l’opération ; `catch` traite l’échec ; `finally` termine l’état de chargement. Un bouton restant désactivé après une erreur constitue un défaut supplémentaire. Les messages doivent être visibles et compréhensibles, sans dépendre uniquement d’une couleur. `textContent` affiche un message comme du texte plutôt que comme du HTML.

<a id="apprentissage"></a>

## Le diagnostic navigateur, PHP et SQL

Une erreur peut venir du formulaire, du réseau, d'une réponse HTTP, d'un JSON illisible ou de la base. « Ça ne marche pas » ne permet pas de choisir une correction. Localisez la frontière : le submit a-t-il eu lieu ? Une requête apparaît-elle ? Quel statut revient ? Quel corps est reçu ? Le DOM a-t-il changé ?

```js
async function demander(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ?? `Erreur HTTP ${response.status}`);
  }
  return data;
}
```

Ce helper correspond à notre API qui répond toujours en JSON, y compris pour les erreurs applicatives. Une panne renvoyant du HTML peut faire échouer `json()` : le `catch` extérieur doit aussi couvrir ce cas. Ne faites jamais disparaître un message d'erreur en affichant « succès » dans `finally`.

```js
button.disabled = true;
try {
  await demander('/api/todos.php', options);
  form.reset();
  await lireTaches();
} catch (error) {
  etat.textContent = error.message;
} finally {
  button.disabled = false;
}
```

## Validation et réponses utiles

Le serveur vérifie le type du titre avant `trim`, sa longueur avec `mb_strlen`, le type booléen de `done` et l'id entier strictement positif. Un JSON cassé reçoit 400, une donnée refusée 422, une tâche absente 404, une méthode non prévue 405. Une exception de connexion est journalisée côté serveur ; le client reçoit un message général avec 500, sans mot de passe ni requête SQL complète.

```html live title="Comparer réussite et erreur — simulation"
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

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Diagnostic | Le diagnostic suit formulaire, requête, statut, corps et DOM. |
| <a id="notion-2"></a>Réseau | L'onglet Réseau montre si la requête est partie. |
| <a id="notion-3"></a>Statut | Le statut HTTP permet de distinguer réussite et refus applicatif. |
| <a id="notion-4"></a>Corps | Le corps reçu doit être inspecté lors d'une erreur de conversion JSON. |
| <a id="notion-5"></a>JSON invalide | Notre API répond 400 à un JSON mal formé. |
| <a id="notion-6"></a>Valeur invalide | Notre API répond 422 à une valeur refusée. |
| <a id="notion-7"></a>Absent | Notre API répond 404 à une tâche absente. |
| <a id="notion-8"></a>Méthode refusée | Notre API répond 405 à une méthode non prévue. |
| <a id="notion-9"></a>Erreur interne | Une exception serveur non destinée au client reçoit 500. |
| <a id="notion-10"></a>Message général | Le client reçoit un message général sans secrets de connexion. |
| <a id="notion-11"></a>Journal | Les détails techniques des erreurs serveur restent dans le journal serveur. |
| <a id="notion-12"></a>Finally | finally s'exécute pour rétablir les contrôles après succès ou erreur. |
| <a id="notion-13"></a>Catch | catch présente l'échec à l'utilisateur. |
| <a id="notion-14"></a>Pas de faux succès | Un message de succès ne doit pas être produit inconditionnellement dans finally. |
| <a id="notion-15"></a>Saisie conservée | La saisie reste disponible si l'envoi est refusé. |
| <a id="notion-16"></a>Type avant trim | Le type chaîne du titre est vérifié avant trim. |
| <a id="notion-17"></a>Longueur Unicode | mb_strlen compte les caractères selon l'encodage plutôt que les octets. |
| <a id="notion-18"></a>Annonce | role="status" identifie une zone de message d'état. |
| <a id="notion-19"></a>Matrice de tests | Une matrice associe entrée, statut, message et effet en base. |
| <a id="notion-20"></a>Réessai | Après une erreur, les contrôles doivent permettre de réessayer. |
