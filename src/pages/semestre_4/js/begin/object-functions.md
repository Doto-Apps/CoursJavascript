---
layout: "layouts/Layout.astro"
title: "Object functions"
type: "tp"
---

## Object.keys, Object.values et Object.entries

Ces méthodes statiques transforment les propriétés propres, énumérables et nommées par des chaînes d’un objet en tableaux. Elles ne nécessitent pas de créer une instance de `Object`. Les propriétés héritées ne font pas partie de ces résultats.

```js live title="Noms, valeurs et couples"
const projet = { titre: 'Affiche', annee: 2026 };
console.log(Object.keys(projet));
console.log(Object.values(projet));
console.log(Object.entries(projet));
```

Sorties : `['titre', 'annee']`, `['Affiche', 2026]`, puis `[['titre', 'Affiche'], ['annee', 2026]]`. Une entrée est un tableau de deux valeurs : le nom puis la valeur.

## Parcourir les couples avec la déstructuration

```js
const projet = { titre: 'Affiche', annee: 2026 };
for (const [nom, valeur] of Object.entries(projet)) {
  console.log(`${nom} : ${valeur}`);
}
```

La console affiche `titre : Affiche` puis `annee : 2026`. `[nom, valeur]` déstructure chaque couple. Cette forme est utile pour générer un récapitulatif de champs sans écrire un traitement par propriété.

## Reconstituer un objet avec Object.fromEntries

```js
const valeurs = [['titre', 'Photo'], ['annee', 2026]];
console.log(Object.fromEntries(valeurs)); // { titre: 'Photo', annee: 2026 }
```

Si le même nom apparaît plusieurs fois, la dernière valeur remplace les précédentes. Cette limite est importante pour `Object.fromEntries(new FormData(form))` : plusieurs cases partageant le même `name` demandent plutôt `FormData.getAll`. Ne supposez pas non plus que l’ordre des clés d’un objet représente l’ordre métier d’une liste ; utilisez un tableau quand cet ordre est essentiel.
