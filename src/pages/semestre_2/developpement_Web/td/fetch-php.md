---
layout: "layouts/Layout.astro"
title: "Fetch et PHP : parcourir la chaîne complète"
type: "TD"
order: 2
quizId: "s2-dev-01"
previousSession: "/semestre_2/developpement_Web/td/http-json"
nextSession: "/semestre_2/developpement_Web/tp/lecture"
---

<a id="comprendre"></a>

## fetch et response.json

`fetch(url)` renvoie une **promesse**, c’est-à-dire une valeur représentant une opération encore en cours ou terminée. Dans une fonction `async`, `await` attend le résultat de cette promesse pour poursuivre la fonction. Il n’immobilise pas l’ensemble du navigateur.

```javascript
async function charger() {
  const reponse = await fetch('/api/todos.php');
  if (!reponse.ok) throw new Error('Lecture refusée');
  const taches = await reponse.json();
  if (!Array.isArray(taches)) throw new Error('Liste attendue');
  return taches;
}
```

La première attente fournit un objet `Response` avec son statut. La seconde lit et analyse son corps comme JSON. Une réponse HTTP 404 ne fait pas automatiquement rejeter la promesse de Fetch ; `ok` est donc contrôlé. Un JSON mal formé peut faire échouer `json()` même après un statut de réussite.

| Frontière | Vérification | Ce qu’elle distingue |
|---|---|---|
| Réseau. | `try / catch` autour de l’opération. | Serveur inaccessible ou échange interrompu. |
| HTTP. | `response.ok` / `status` | Réponse reçue mais refusée. |
| Format. | Analyse JSON. | Corps lisible ou invalide. |
| Contrat. | Type et champs attendus. | Donnée JSON valable mais forme incorrecte. |

## Les états chargement, vide et erreur

Affichez un état de chargement avant la requête, une liste ou un état vide après réussite, puis un message utile en cas d’erreur. `finally` permet de terminer l’état de chargement quelle que soit l’issue. Ne retirez pas l’ancien contenu avant de savoir si le nouveau peut être affiché, sauf si ce comportement est clairement voulu.

## L’origine HTTP

Une origine associe protocole, hôte et port. Un front servi par Apache et une API sur le même service évitent un échange inter-origines. `localhost:4321` et `localhost:8000` sont deux origines différentes. Une erreur CORS ne se résout pas en changeant au hasard le JSON : vérifiez d’abord où sont servis la page et l’API.

<a id="apprentissage"></a>

## Les requêtes asynchrones avec fetch

`fetch()` lance une requête et renvoie une promesse. `await` suspend la fonction asynchrone jusqu'au résultat de cette promesse ; le navigateur continue à gérer les interactions. Une réponse HTTP 404 ne rejette pas automatiquement la promesse : testez `response.ok`. La conversion `response.json()` est elle aussi asynchrone et peut échouer si le serveur renvoie une page HTML.

```js
async function lireTaches() {
  const etat = document.querySelector('#etat');
  etat.textContent = 'Chargement…';

  try {
    const response = await fetch('/api/todos.php');
    if (!response.ok) {
      throw new Error(`Lecture impossible (${response.status})`);
    }
    const taches = await response.json();
    afficherTaches(taches);
    etat.textContent = `${taches.length} tâche(s)`;
  } catch (error) {
    etat.textContent = error.message;
  }
}
```

Un chargement, une liste vide et une erreur sont trois états différents. L'interface doit les distinguer. Pour afficher un titre reçu, créez un élément et affectez `textContent` : le titre est du texte, même s'il contient des caractères ressemblant à des balises.

```html live title="Transformer du JSON en cartes — données locales"
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
    </style>

<h1>Du texte JSON aux cartes</h1>
    <label for="json">Données JSON à analyser</label>
    <textarea id="json" rows="5" style="width: 100%">
[{"title":"Atelier photo"},{"title":"Rencontre musicale"}]</textarea
    >
    <button id="afficher">Analyser et afficher</button>
    <p id="etat" role="status"></p>
    <section id="cartes" class="cards"></section>

    <script>
      document.querySelector("#afficher").addEventListener("click", () => {
        const etat = document.querySelector("#etat");
        try {
          const data = JSON.parse(document.querySelector("#json").value);
          if (
            !Array.isArray(data) ||
            data.some((item) => !item || typeof item.title !== "string")
          ) {
            throw new Error(
              "Un tableau d’objets avec un titre texte est attendu.",
            );
          }
          const cartes = data.map((item) => {
            const article = document.createElement("article");
            const h2 = document.createElement("h2");
            h2.textContent = item.title;
            article.append(h2);
            return article;
          });
          document.querySelector("#cartes").replaceChildren(...cartes);
          etat.textContent = `${data.length} carte(s)`;
        } catch (error) {
          etat.textContent = error.message;
        }
      });
      document.querySelector("#afficher").click();
    </script>
```

## La partie PHP et la même origine

```php
<?php
header('Content-Type: application/json; charset=utf-8');
$taches = [
    ['id' => 1, 'title' => 'Préparer les photos', 'done' => false],
];
echo json_encode($taches, JSON_UNESCAPED_UNICODE);
```

**Sortie attendue du serveur PHP :** `[{"id":1,"title":"Préparer les photos","done":false}]`. Le navigateur reçoit le résultat, jamais ce code PHP. Placez `index.html` et `api/todos.php` dans le même projet et lancez `C:\xampp\php\php.exe -S localhost:8080 -t .` depuis son dossier. Sur macOS, utilisez `php -S localhost:8080 -t .` après installation de PHP. Ouvrez `http://localhost:8080` ; ouvrir le fichier avec `file://` n'exécute pas PHP.

Le site de cours Astro sur 4321 et le projet PHP sur 8080 sont deux origines différentes. Les exemples étudiants utilisent une URL relative dans le **projet PHP**, pour garder la même origine. N'utilisez pas `mode: 'no-cors'` comme réparation : une réponse opaque n'offre pas un JSON lisible à votre code.

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Promesse | fetch renvoie une promesse. |
| <a id="notion-2"></a>Asynchronisme | await attend une promesse dans une fonction asynchrone. |
| <a id="notion-3"></a>Fonction async | Une fonction utilisant await dans l'exemple est déclarée async. |
| <a id="notion-4"></a>Succès HTTP | response.ok est vrai pour les statuts HTTP de 200 à 299. |
| <a id="notion-5"></a>404 et promesse | Un statut HTTP 404 ne rejette pas automatiquement fetch. |
| <a id="notion-6"></a>Analyse JSON | response.json analyse le corps JSON de façon asynchrone. |
| <a id="notion-7"></a>JSON invalide | response.json peut échouer si le corps n'est pas du JSON valide. |
| <a id="notion-8"></a>Gestion d'erreur | catch traite les erreurs du bloc try. |
| <a id="notion-9"></a>Chargement | L'état Chargement est présenté pendant l'attente. |
| <a id="notion-10"></a>Liste vide | Un tableau vide reçu avec succès est un état vide normal. |
| <a id="notion-11"></a>Texte sûr | textContent affiche un titre comme texte. |
| <a id="notion-12"></a>Création DOM | createElement crée un élément dans le document. |
| <a id="notion-13"></a>En-tête PHP | PHP annonce application/json par Content-Type. |
| <a id="notion-14"></a>Encodage PHP | json_encode transforme les données PHP en texte JSON. |
| <a id="notion-15"></a>Serveur PHP | Le serveur PHP exécute le script et renvoie son résultat. |
| <a id="notion-16"></a>Fichier local | Ouvrir file:// n'exécute pas PHP. |
| <a id="notion-17"></a>Serveur intégré | php -S localhost:8080 -t . lance le serveur du projet local. |
| <a id="notion-18"></a>Origine | Une origine inclut notamment schéma, hôte et port. |
| <a id="notion-19"></a>URL relative | L'URL /api/todos.php est résolue sur l'origine de la page ouverte. |
| <a id="notion-20"></a>Réponse opaque | no-cors ne fournit pas une réponse JSON lisible à ce code. |
