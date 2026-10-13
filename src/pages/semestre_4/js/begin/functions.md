---
layout: "layouts/Layout.astro"
title: "Functions"
type: "tp"
---

## Déclarer et appeler une fonction

Une fonction regroupe un traitement réutilisable. Ses paramètres sont les noms utilisés dans sa définition ; les arguments sont les valeurs transmises lors de l’appel. La déclaration seule n’exécute pas son corps.

```js live title="Une fonction de calcul"
function calculerTotal(prix, quantite = 1) {
  return prix * quantite;
}
const total = calculerTotal(12, 3);
console.log(total);
console.log(calculerTotal(12));
```

Résultats : `36`, puis `12`. `quantite = 1` définit une valeur utilisée quand l’argument est absent ou `undefined`. `return` transmet le résultat à l’appelant et termine l’appel. Sans `return`, la fonction renvoie `undefined` ; `console.log` affiche mais ne remplace pas ce retour.

## Portée et effets de bord

Une variable déclarée dans une fonction n’est pas accessible à l’extérieur. Un calcul qui utilise ses paramètres et renvoie une valeur se teste facilement. À l’inverse, changer une variable extérieure ou modifier le DOM constitue un effet de bord ; réservez ces effets aux fonctions qui gèrent l’interface.

```js
function formaterPrix(prix) {
  return `${prix.toFixed(2)} €`;
}
console.log(formaterPrix(12)); // 12.00 €
```

Ici `prix` doit être un nombre : une chaîne n’a pas cette méthode. La validation d’une saisie se fait avant l’appel.

## Expressions de fonctions et fonctions fléchées

```js
const doubler = nombre => nombre * 2;
const annoncer = nom => {
  const message = `Bonjour ${nom}`;
  return message;
};
console.log(doubler(4)); // 8
console.log(annoncer('Léa')); // Bonjour Léa
```

Sans accolades, l’expression est renvoyée implicitement. Avec accolades, `return` est nécessaire pour renvoyer une valeur. Une fonction fléchée ne possède pas son propre `this` ; elle n’est donc pas interchangeable avec toutes les méthodes ou les anciennes fonctions constructeurs.

## Fonctions de rappel

```js
const nombres = [2, 4];
console.log(nombres.map(doubler)); // [4, 8]
```

`doubler` transmet la fonction à `map`, qui l’appelle pour chaque valeur. `doubler(4)` exécute immédiatement la fonction et transmettrait son résultat. Cette différence est aussi essentielle avec `addEventListener('click', fonction)`.

Les fonctions constructeurs appelées avec `new` et les classes concernent la création d’objets ; elles sont présentées après les [objets](/semestre_4/js/begin/objects), plutôt qu’au milieu des premiers calculs.
