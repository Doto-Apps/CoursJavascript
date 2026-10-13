---
layout: "layouts/Layout.astro"
title: "Application JavaScript : recherche et favoris"
type: "tp"
---

## Application de recherche de personnages

Cette application rassemble les formulaires, `fetch`, le rendu DOM et les favoris. L’API Rick and Morty fournit les personnages ; l’application gère sa propre sélection. Les notions sont développées dans [fetch](/semestre_4/js/intermediate/fetch), les [tableaux](/semestre_4/js/begin/array-functions) et le [stockage](/semestre_4/js/intermediate/storages). Le projet sert ici de cas commenté, sans exercice final imposé.

## Construire l’URL de recherche

`URL` sépare l’adresse et ses paramètres ; `searchParams` encode les saisies. Le nom et le statut sont des filtres du contrat de l’API.

```js live title="Une URL construite à partir de données"
const url = new URL('https://rickandmortyapi.com/api/character/');
url.searchParams.set('name', 'rick');
url.searchParams.set('status', 'alive');
console.log(url.href);
```

Sortie : `https://rickandmortyapi.com/api/character/?name=rick&status=alive`. Avec une saisie contenant espaces ou accents, `searchParams` assure l’encodage ; concaténer la saisie brute dans l’URL serait fragile.

## Réponse, absence de résultats et pagination

La réponse d’une liste contient `results` et `info`. `info.next` et `info.prev` fournissent les adresses des pages voisines, ou `null` si elles n’existent pas. Ne figez pas le nombre de personnages ou de pages dans le code.

```js
async function chercher(url, signal) {
  const response = await fetch(url, { signal });
  if (response.status === 404) return { results: [], info: { next: null, prev: null } };
  if (!response.ok) throw new Error(`Recherche indisponible : ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data.results) || !data.info) throw new Error('Réponse inattendue');
  return data;
}
```

Cette fonction s’exécute dans le projet HTTP réel ; l’aperçu du cours interdit les appels réseau. Une recherche sans correspondance est présentée comme une liste vide selon ce contrat. Un échec réseau ou un autre statut d’erreur reste une panne à annoncer, pas « Aucun personnage ». Une nouvelle recherche repart de sa première page.

## État et rendu d’une carte

Conservez le personnage comme donnée ; le DOM représente cette donnée. Un identifiant désigne un personnage même si la liste est triée ou paginée. Le rendu local suivant isole une carte et la sélection :

```html live title="Une sélection identifiée, sans API"
<div id="cartes"></div>
<p role="status">Aucun favori</p>
<script>
  const personnage = { id: 1, name: 'Rick Sanchez', species: 'Human' };
  const favoris = new Map();
  const carte = document.createElement('article');
  const titre = document.createElement('h2');
  titre.textContent = personnage.name;
  const description = document.createElement('p');
  description.textContent = personnage.species;
  const bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.textContent = 'Ajouter aux favoris';
  bouton.addEventListener('click', () => {
    favoris.set(personnage.id, personnage);
    document.querySelector('[role="status"]').textContent = `${favoris.size} favori(s)`;
  });
  carte.append(titre, description, bouton);
  document.querySelector('#cartes').append(carte);
</script>
```

La carte affiche le nom et l’espèce. Plusieurs clics conservent un seul favori : la clé de `Map` est l’identifiant, donc une seconde écriture remplace l’entrée. La sélection reste en mémoire et disparaît au rechargement.

## Recherches successives et persistance

Lors d’une soumission, annulez la requête précédente avec `AbortController`, affichez le chargement puis rendez les résultats confirmés. Dans les blocs `catch` et `finally`, vérifiez que la requête est encore la plus récente avant de modifier le statut : une ancienne requête ne doit pas effacer l’état de la nouvelle.

Pour conserver les favoris, sérialisez `[...favoris.values()]` dans une clé dédiée de `localStorage`. À la lecture, vérifiez que chaque objet possède l’identifiant et le nom attendus. Une erreur de stockage ne doit pas empêcher la sélection en mémoire. Les contrôles de pagination sont désactivés lorsque leur adresse vaut `null` et la liste vide possède un message explicite.

| Cas | Résultat à observer |
|---|---|
| Recherche avec correspondances | Cartes issues de `results` |
| Nom inexistant | Message de liste vide |
| Service inaccessible | Erreur et possibilité de réessayer |
| Deux recherches rapides | Seule la plus récente modifie la vue |
| Deux ajouts du même id | Un seul favori |
| Rechargement dans le projet réel | Favoris retrouvés si le stockage est autorisé |

[Contrat des filtres et de la pagination — documentation de l’API](https://rickandmortyapi.com/documentation).
