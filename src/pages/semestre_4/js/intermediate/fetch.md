---
layout: "layouts/Layout.astro"
title: "Fetch"
type: "tp"
---

## Requête HTTP et réponse JSON

`fetch` lance une requête HTTP et renvoie une promesse de `Response`. Le contrat HTTP/JSON étudié au S2 reste applicable : méthode, URL, statut, en-têtes et corps ont des rôles distincts. Les exemples réseau de ce support s’exécutent dans un projet servi par HTTP, avec l’API correspondante ; l’aperçu interactif de la plateforme interdit les appels réseau.

```js
async function lireProjets() {
  const response = await fetch('/api/projets.php');
  if (!response.ok) throw new Error(`Lecture refusée : HTTP ${response.status}`);
  const projets = await response.json();
  if (!Array.isArray(projets)) throw new Error('Un tableau de projets est attendu');
  return projets;
}
```

Pour une réponse `200` contenant `[{"id":4,"titre":"Affiche"}]`, la fonction fournit un tableau d’un objet. Pour `200` avec `[]`, elle fournit une collection vide. Pour `404`, elle rejette avec le message `Lecture refusée : HTTP 404`. Un statut HTTP d’erreur ne provoque pas à lui seul le rejet de `fetch` : il faut tester `ok`, vrai pour les statuts 200 à 299.

## Erreur réseau, erreur HTTP et corps illisible

| Situation | Étape concernée | Traitement |
|---|---|---|
| Connexion impossible ou accès CORS refusé | `fetch` | Le rejet conduit au `catch` |
| Réponse 404 ou 500 | `response.ok` | Lever une erreur adaptée |
| HTML reçu à la place du JSON | `response.json` | L’analyse JSON rejette |
| Objet reçu à la place d’une liste | Vérification des données | Refuser le contrat incorrect |

`response.text()` lit du texte ; `response.blob()` lit des données binaires. Le corps n’est normalement consommable qu’une fois : ne faites pas successivement `json()` et `text()` sur la même réponse. Une réponse `204 No Content` ne possède pas de JSON à analyser.

## Envoyer un objet JSON avec POST

```js
const response = await fetch('/api/projets.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify({ titre: 'Affiche' })
});
if (!response.ok) throw new Error(`Création refusée : ${response.status}`);
const projet = await response.json();
```

Avec le contrat du S2, le serveur répond `201` et un objet tel que `{"id":5,"titre":"Affiche"}`. `JSON.stringify` transforme l’objet en texte ; l’en-tête annonce ce format. Le serveur valide les champs et attribue l’identifiant. Pour `FormData`, passez l’objet directement dans `body` et laissez le navigateur choisir le `Content-Type` multipart.

## Attente, annulation et origine

Affichez un état de chargement, conservez la saisie en cas d’échec et réactivez les commandes dans `finally`. Pour limiter un appel, fournissez `signal: AbortSignal.timeout(5000)` ; `AbortController` permet une annulation déclenchée par l’interface. Lors de recherches successives, annulez la précédente ou ignorez sa réponse devenue obsolète.

Une origine associe protocole, hôte et port. Si l’API utilise une autre origine, son serveur doit autoriser l’accès approprié par CORS. `mode: 'no-cors'` ne rend pas son JSON lisible. Commencez par une page et une API de même origine, comme au S2, puis vérifiez dans Réseau l’URL, le statut et le corps avant de modifier le rendu.

[Référence fetch et statuts HTTP — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch).
