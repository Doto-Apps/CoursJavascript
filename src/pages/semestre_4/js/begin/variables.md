---
layout: "layouts/Layout.astro"
title: "Variables"
type: "tp"
---

## Déclarer une variable avec const ou let

Une variable associe un nom à une valeur. `const` empêche de réaffecter ce nom ; `let` autorise une nouvelle affectation. Utilisez `const` tant qu’une réaffectation n’est pas nécessaire. `=` affecte une valeur, il ne compare pas deux valeurs.

```js live title="Prix et quantité"
const prix = 12;
let quantite = 2;
quantite = quantite + 1;
const total = prix * quantite;
console.log(quantite);
console.log(total);
```

La console affiche successivement `3` et `36`. Les instructions s’exécutent dans leur ordre : `total` reçoit le résultat du calcul à cet instant. Une modification ultérieure de `quantite` ne recalcule pas automatiquement `total`.

## Affectation et incrémentation

`quantite += 2` signifie `quantite = quantite + 2`. `quantite++` ajoute un. Préférez une instruction séparée pour éviter de mêler le calcul et son effet de bord. Lire une variable `let` ou `const` avant sa déclaration provoque une `ReferenceError` ; réaffecter une constante provoque une `TypeError`.

## Portée de bloc

```js
const nom = 'Léa';
if (true) {
  const message = `Bonjour ${nom}`;
  console.log(message);
}
// console.log(message); // ReferenceError si cette ligne est exécutée
```

La sortie est `Bonjour Léa`. `message` n’est accessible que dans les accolades du `if`. `nom`, déclaré à l’extérieur, reste lisible dans ce bloc. L’ancienne déclaration `var` a une portée de fonction et des comportements de remontée différents ; elle sera surtout rencontrée dans du code existant.

## Constantes et objets modifiables

```js
const projet = { titre: 'Affiche' };
projet.titre = 'Portfolio';
console.log(projet.titre); // Portfolio
// projet = {}; // TypeError : réaffectation interdite
```

`const` protège l’association entre le nom et l’objet, pas les propriétés de cet objet. Les [types](/semestre_4/js/begin/types) expliquent la différence entre valeurs primitives et références. Choisissez des noms comme `nombreProjets` plutôt que `x` et respectez la casse : `prix` et `Prix` sont deux noms différents.
