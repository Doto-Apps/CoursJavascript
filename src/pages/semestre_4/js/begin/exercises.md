---
layout: "layouts/Layout.astro"
title: "Exemples commentés : calculs et collections"
type: "td"
---

## Calculer un total à partir d’une collection

Ces exemples corrigés réunissent les [fonctions](/semestre_4/js/begin/functions), les [tableaux](/semestre_4/js/begin/arrays) et les [conditions](/semestre_4/js/begin/conditions). Ils peuvent être lus et modifiés librement ; ils ne constituent pas un travail à remettre.

```js live title="Le total d’un panier"
const panier = [
  { titre: 'Affiche', prix: 12, quantite: 2 },
  { titre: 'Carte', prix: 3, quantite: 4 }
];
const total = panier.reduce((somme, ligne) => somme + ligne.prix * ligne.quantite, 0);
console.log(total);
```

Résultat : `36`, soit `12 × 2 + 3 × 4`. L’accumulateur démarre à zéro ; chaque objet fournit le prix et la quantité de sa ligne. Un panier vide donne zéro.

## Sélectionner les projets publiés

```js
const projets = [{ titre: 'Photo', publie: true }, { titre: 'Son', publie: false }];
const titres = projets.filter(p => p.publie).map(p => p.titre);
console.log(titres); // ['Photo']
console.log(projets.length); // 2
```

`filter` conserve l’objet publié ; `map` extrait son titre. La source reste complète : elle pourra servir à une autre vue. Inverser ces opérations retirerait d’abord l’information `publie`, nécessaire au filtre.

## Traiter une collection vide

```js
function decrireResultats(projets) {
  return projets.length === 0 ? 'Aucun projet' : `${projets.length} projet(s)`;
}
console.log(decrireResultats([])); // Aucun projet
```

Le test porte sur `length` : le tableau vide est une valeur vraie dans une condition. Cette règle évite d’afficher une liste prétendument remplie alors qu’aucune fiche ne correspond.
