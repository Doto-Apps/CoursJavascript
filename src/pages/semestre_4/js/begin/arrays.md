---
layout: "layouts/Layout.astro"
title: "Array"
type: "tp"
---

## Créer un tableau et lire un élément

Un tableau ordonne plusieurs valeurs dans une seule collection. Les indices commencent à zéro. Les objets du portfolio étudié au S2 étaient déjà regroupés dans des tableaux : ces outils permettent de les manipuler avant le rendu.

```js live title="Indices et longueur"
const titres = ['Affiche', 'Vidéo', 'Portfolio'];
console.log(titres[0]);
console.log(titres.length);
console.log(titres[titres.length - 1]);
console.log(titres[3]);
```

Sorties : `Affiche`, `3`, `Portfolio`, `undefined`. La longueur est le nombre d’emplacements, pas l’indice du dernier. Lire un indice absent ne produit pas automatiquement une erreur : cela donne `undefined`, qui peut provoquer une erreur plus tard si on appelle une méthode dessus.

## Modifier une collection

```js
const titres = ['Affiche', 'Vidéo'];
titres[0] = 'Photo';
titres.push('Portfolio');
const dernier = titres.pop();
console.log(titres); // ['Photo', 'Vidéo']
console.log(dernier); // Portfolio
```

Un tableau déclaré avec `const` reste modifiable. `push` ajoute à la fin et renvoie la nouvelle longueur ; `pop` retire et renvoie le dernier élément, ou `undefined` si le tableau est vide. `delete titres[0]` laisse un emplacement vide : utilisez `splice` pour retirer un élément et décaler la suite.

## Copier et parcourir un tableau

```js
const titres = ['Photo', 'Vidéo'];
const copie = [...titres];
copie.push('Son');
console.log(titres.length); // 2
console.log(copie.length); // 3
```

La copie possède ses propres emplacements. Si les éléments sont des objets, ces objets restent partagés : il s’agit d’une copie superficielle. Une affectation `const copie = titres` partagerait le tableau lui-même.

Les [méthodes de tableaux](/semestre_4/js/begin/array-functions) distinguent la transformation avec `map`, la sélection avec `filter` et l’accumulation avec `reduce`. N’utilisez pas une boucle qui supprime des éléments pendant son parcours si une sélection non destructive suffit.
