---
layout: "layouts/Layout.astro"
title: "Loops"
type: "tp"
---

## Parcourir les valeurs avec for…of

Une boucle répète un bloc. Pour parcourir les valeurs d’un tableau, `for…of` évite de gérer un indice manuellement.

```js live title="Parcourir trois prix"
const prix = [12, 8, 15];
let total = 0;
for (const montant of prix) {
  total += montant;
  console.log(total);
}
```

La console affiche `12`, `20`, puis `35`. À chaque tour, `montant` reçoit la valeur suivante et le total accumulé est mis à jour. Avec un tableau vide, le corps ne s’exécute pas et `total` reste 0.

## for : initialisation, condition, progression

```js
for (let indice = 0; indice < 3; indice++) {
  console.log(indice);
}
```

Sortie : `0`, `1`, `2`. L’initialisation s’exécute une fois, la condition avant chaque tour et l’incrémentation après chaque tour. Pour un tableau, le dernier indice est `length - 1` : utilisez `< tableau.length`, pas `<=`.

## while et do…while

```js
let restant = 3;
while (restant > 0) {
  console.log(restant);
  restant--;
}
```

Résultat : `3`, `2`, `1`. `while` teste avant d’entrer. `do { ... } while (condition);` teste après le corps, qui s’exécute donc au moins une fois. Chaque boucle doit atteindre une condition d’arrêt ; oublier `restant--` bloque l’exécution dans cet exemple.

## break, continue et for…in

`break` quitte la boucle ; `continue` saute le reste du tour courant. Dans une recherche, `break` permet de s’arrêter au premier résultat. `for…in` parcourt des noms de propriétés, pas directement les valeurs d’un tableau ; pour les tableaux, préférez `for…of`, `map` ou `filter` selon le résultat recherché. Une opération asynchrone dans une boucle demande aussi de décider si les appels doivent être séquentiels ou parallèles, ce qui sera traité avec les promesses.
