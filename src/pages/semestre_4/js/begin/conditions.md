---
layout: "layouts/Layout.astro"
title: "Conditions"
type: "tp"
---

## if, else if et else

Une condition choisit les instructions à exécuter. Le programme teste les branches dans l’ordre et exécute seulement la première dont la condition est vraie ; `else` couvre les autres cas.

```js live title="Classer une note"
const note = 14;
let mention;
if (note >= 16) {
  mention = 'Très bien';
} else if (note >= 10) {
  mention = 'Validé';
} else {
  mention = 'À retravailler';
}
console.log(mention);
```

Résultat : `Validé`. Le seuil 16 doit être testé avant 10 : sinon une note de 18 entrerait déjà dans la première branche. À 10, la validation est acquise ; à 9, elle ne l’est pas. Le contrôle du domaine, par exemple de 0 à 20, reste distinct de cette classification.

## Comparaisons et opérateurs logiques

| Syntaxe | Sens | Exemple vrai |
|---|---|---|
| `===`, `!==` | Égalité ou différence strictes | `12 !== '12'` |
| `>`, `>=`, `<`, `<=` | Ordre et seuils | `10 >= 10` |
| `&&` | Les deux conditions | `age >= 18 && inscrit` si les deux sont vrais |
| `\|\|` | Au moins une condition | `admin \|\| auteur` |
| `!` | Négation | `!false` |

`if (age = 18)` affecte 18 au lieu de comparer : c’est une erreur courante. Convertissez et validez les données avant de comparer une saisie numérique.

## switch : plusieurs valeurs d’un même champ

```js
const format = 'image';
let extension;
switch (format) {
  case 'image': extension = '.png'; break;
  case 'texte': extension = '.txt'; break;
  default: extension = 'inconnue';
}
console.log(extension); // .png
```

`switch` compare strictement sa valeur aux `case`. `break` quitte le bloc ; sans lui, l’exécution continue dans le cas suivant. Pour des intervalles comme une note, `if` est généralement plus lisible.

## L’opérateur conditionnel

`const statut = publie ? 'En ligne' : 'Brouillon';` choisit une valeur. Cette forme convient à une alternative courte ; les branches comportant plusieurs instructions restent plus claires avec `if`.
