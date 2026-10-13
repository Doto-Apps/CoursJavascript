---
layout: "layouts/Layout.astro"
title: "Object"
type: "tp"
---

## Propriétés et méthodes d’un objet

Un objet regroupe des propriétés nommées pour représenter une même entité. Contrairement à un tableau ordonné, il est généralement consulté par nom de propriété. Une méthode est une propriété contenant une fonction.

```js live title="Une fiche projet"
const projet = {
  id: 4,
  titre: 'Affiche',
  publie: false,
  publier() { this.publie = true; }
};
console.log(projet.titre);
projet.publier();
console.log(projet.publie);
```

Sorties : `Affiche`, puis `true`. Dans cet appel, `this` désigne `projet`, l’objet placé avant le point. Une fonction fléchée n’aurait pas ce même `this` ; utilisez une méthode normale lorsque le traitement dépend de l’objet appelant.

## Accès, ajout et suppression de propriétés

`projet.titre` lit un nom connu. `projet[champ]` utilise la valeur de la variable `champ`, utile dans un formulaire. Lire une propriété absente donne `undefined`. `projet.auteur = 'Léa'` ajoute une propriété ; `delete projet.auteur` la retire.

```js
const projet = { titre: 'Affiche', auteur: { nom: 'Léa' } };
const copie = { ...projet, titre: 'Vidéo' };
console.log(projet.titre); // Affiche
console.log(copie.titre); // Vidéo
copie.auteur.nom = 'Sam';
console.log(projet.auteur.nom); // Sam
```

La copie par décomposition est superficielle : l’objet `auteur` est partagé. La déstructuration `const { titre } = projet` extrait une valeur dans une variable ; elle ne crée pas une liaison qui suivrait les modifications futures de la propriété.

## Prototypes et classes

Lorsqu’une propriété n’existe pas directement sur un objet, JavaScript peut la rechercher dans son prototype. Ce mécanisme partage notamment les méthodes entre instances.

```js
class Projet {
  constructor(titre) { this.titre = titre; }
  decrire() { return `Projet : ${this.titre}`; }
}
const affiche = new Projet('Affiche');
console.log(affiche.decrire()); // Projet : Affiche
```

`new` crée une instance et appelle `constructor`. `decrire` est partagé via le prototype. L’ancienne forme `function Projet(titre) { this.titre = titre; }` peut aussi servir de constructeur avec `new`. `extends` établit un héritage entre classes et `super` appelle le constructeur ou une méthode du parent. Une simple fiche reçue en JSON reste toutefois un objet de données : elle ne devient pas automatiquement une instance de `Projet` et ne transporte aucune méthode.
