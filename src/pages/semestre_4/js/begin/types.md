---
layout: "layouts/Layout.astro"
title: "Types"
type: "tp"
---

## Les valeurs primitives

JavaScript attribue un type aux valeurs. Une même variable déclarée avec `let` peut recevoir des valeurs de types différents, mais cette souplesse ne dispense pas de vérifier ce qu’une fonction attend.

| Type | Exemple | Utilisation |
|---|---|---|
| string | `'MMI'` | Texte |
| number | `12.5` | Calcul ; entiers et décimaux usuels |
| boolean | `true` ou `false` | Condition |
| undefined | `undefined` | Valeur non fournie |
| null | `null` | Absence choisie explicitement |
| bigint | `12n` | Entiers de grande taille ; pas de mélange direct avec number |
| symbol | `Symbol('id')` | Identifiant unique, surtout dans les API avancées |

## typeof et conversion des saisies

```js live title="Une saisie est souvent du texte"
const saisie = '12';
console.log(typeof saisie);
console.log(saisie + 3);
console.log(Number(saisie) + 3);
console.log(Number.isNaN(Number('douze')));
```

Sorties : `string`, `123`, `15`, `true`. Avec une chaîne, `+` peut concaténer. `Number` convertit ; une conversion impossible produit `NaN`. `Number('')` produit `0` : pour un champ obligatoire, vérifier le vide avant la conversion. `typeof null` donne historiquement `object` ; utilisez `valeur === null` pour tester cette absence.

## Objets, tableaux et références

```js
const original = { titre: 'Affiche' };
const copieDuNom = original;
copieDuNom.titre = 'Vidéo';
console.log(original.titre); // Vidéo
console.log(Array.isArray([1, 2])); // true
```

Les deux variables désignent le même objet. Une affectation ne crée pas une copie indépendante. Un tableau est un objet spécialisé : `typeof []` renvoie `object`, d’où le test `Array.isArray`. Les copies avec `{ ...original }` ou `[...tableau]` sont superficielles : les objets imbriqués restent partagés.

## Comparaison stricte

`12 === '12'` vaut `false` : le type et la valeur diffèrent. `==` effectue des conversions implicites ; utilisez `===` et convertissez la saisie explicitement. Les valeurs `false`, `0`, `''`, `null`, `undefined` et `NaN` sont fausses dans une condition. Un tableau vide et l’objet `{}` sont vrais : tester un tableau vide demande `tableau.length === 0`.
