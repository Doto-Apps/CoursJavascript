---
layout: "layouts/Layout.astro"
title: "Array functions"
type: "tp"
---

## map : transformer chaque élément

`map` appelle une fonction pour chaque élément et construit un nouveau tableau de même longueur. La fonction doit renvoyer la nouvelle valeur.

```js live title="Transformer, sélectionner et additionner"
const prix = [12, 8, 15];
console.log(prix.map(montant => montant * 2));
console.log(prix.filter(montant => montant >= 12));
console.log(prix.reduce((total, montant) => total + montant, 0));
console.log(prix);
```

Sorties : `[24, 16, 30]`, `[12, 15]`, `35`, puis `[12, 8, 15]`. Le tableau source garde ici ses valeurs.

## filter : sélectionner des éléments

La fonction de rappel renvoie un résultat vrai pour les éléments conservés. Le nouveau tableau peut être vide ; son ordre reste celui de la source. Dans un portfolio, `projets.filter(projet => projet.publie)` sélectionne les fiches publiées. Filtrez toujours la source si l’utilisateur peut ensuite effacer ou modifier son filtre.

## reduce : calculer une valeur accumulée

Le premier paramètre de la fonction est l’accumulateur ; le second, l’élément courant. Dans le calcul précédent, 0 est la valeur initiale : les valeurs successives de l’accumulateur sont 12, 20 et 35. Avec un tableau vide, le résultat reste 0. Sans valeur initiale, `reduce` échoue sur un tableau vide.

## find, some et every

```js
const projets = [{ id: 4, publie: true }, { id: 9, publie: false }];
console.log(projets.find(p => p.id === 9)); // { id: 9, publie: false }
console.log(projets.some(p => p.publie)); // true
console.log(projets.every(p => p.publie)); // false
```

`find` renvoie le premier élément correspondant ou `undefined` ; `some` indique si au moins un élément convient ; `every` exige que tous conviennent. `filter` renvoie toujours un tableau, même pour un seul résultat.

## Les méthodes qui modifient le tableau

| Méthode | Effet | Valeur renvoyée |
|---|---|---|
| `push(valeur)` | Ajoute à la fin | Nouvelle longueur |
| `pop()` | Retire le dernier | Élément retiré |
| `splice(index, nombre)` | Retire à partir d’un indice | Tableau des éléments retirés |
| `sort(comparateur)` | Trie sur place | Même tableau |
| `slice(debut, fin)` | Copie une portion, fin exclue | Nouveau tableau |

```js
const valeurs = [10, 2, 30];
const triees = [...valeurs].sort((a, b) => a - b);
console.log(triees); // [2, 10, 30]
console.log(valeurs.slice(0, 2)); // [10, 2]
```

Sans comparateur, `sort` compare des représentations textuelles : `[10, 2, 30]` ne serait pas trié numériquement. Une nouvelle collection peut encore contenir les mêmes objets : ne modifiez pas leurs propriétés dans `map` si vous souhaitez conserver la source.
