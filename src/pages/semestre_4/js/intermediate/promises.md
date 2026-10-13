---
layout: "layouts/Layout.astro"
title: "Promise"
type: "tp"
---

## Une promesse représente un résultat futur

Une `Promise` est d’abord en attente (*pending*), puis réussie (*fulfilled*) avec une valeur ou rejetée (*rejected*) avec une raison. Une fois réglée, elle ne change plus d’état. Elle permet d’enchaîner un traitement après une opération, sans bloquer l’interface pendant l’attente. Elle n’exécute pas automatiquement les calculs lourds dans un autre thread.

```js live title="L’ordre d’exécution"
console.log('Début');
const resultat = new Promise(resolve => {
  setTimeout(() => resolve('Données disponibles'), 200);
});
resultat.then(message => console.log(message));
console.log('Suite du programme');
```

Ordre attendu : `Début`, `Suite du programme`, puis `Données disponibles` après le délai. La fonction passée au constructeur est exécutée immédiatement ; c’est ici le minuteur qui diffère la résolution. Le délai n’est pas une garantie d’exécution à la milliseconde exacte.

## then, catch et finally

```js
Promise.resolve(12)
  .then(prix => prix * 2)
  .then(total => console.log(total))
  .catch(error => console.error(error.message))
  .finally(() => console.log('Terminé'));
```

Sorties : `24`, puis `Terminé`. Chaque `then` renvoie une nouvelle promesse : la valeur renvoyée par sa fonction devient la valeur de l’étape suivante. Un `throw` rejette cette nouvelle promesse et conduit au prochain `catch`. Oublier `return` dans une fonction avec accolades transmettrait `undefined` à la suite.

`catch` peut récupérer un échec en renvoyant une valeur ; la chaîne redevient alors réussie. `finally` sert au nettoyage, par exemple réactiver un bouton, que l’opération réussisse ou échoue. Il ne reçoit pas la valeur du résultat.

## Promise.all et Promise.allSettled

`Promise.all([appelA(), appelB()])` attend toutes les réussites et renvoie les valeurs dans l’ordre du tableau, même si B termine avant A. Il rejette dès qu’un des appels rejette, sans annuler les autres opérations. `Promise.allSettled` attend tous les états et permet de présenter des réussites partielles.

## Promise.race et annulation

`Promise.race` adopte le premier résultat réglé, réussite ou échec. Il n’annule pas les opérations perdantes. Pour annuler une requête `fetch`, il faut un `AbortController` ou un signal de délai ; faire seulement la course avec un minuteur laisse la requête continuer. [async/await](/semestre_4/js/intermediate/async-await) propose une écriture plus linéaire de ces mêmes promesses.
