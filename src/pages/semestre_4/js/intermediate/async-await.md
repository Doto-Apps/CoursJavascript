---
layout: "layouts/Layout.astro"
title: "Async/Await"
type: "tp"
---

## async : une fonction qui renvoie une promesse

`async` autorise `await` dans une fonction et garantit que celle-ci renvoie une promesse. Une valeur renvoyée avec `return` devient sa valeur de réussite ; une exception devient un rejet.

```js live title="Attendre une valeur"
async function calculerTotal() {
  return 36;
}
async function afficher() {
  const total = await calculerTotal();
  console.log(total);
}
afficher();
console.log('Appel lancé');
```

Sortie : `Appel lancé`, puis `36`. `await` suspend la suite de la fonction `afficher`, pas tout le programme. Sans `await`, `calculerTotal()` fournit un objet Promise, pas directement le nombre 36. Au niveau supérieur d’un fichier, `await` exige un module ; dans un script classique, placez-le dans une fonction `async`.

## try, catch et finally

```js
async function charger() {
  try {
    const valeur = await Promise.reject(new Error('Service indisponible'));
    console.log(valeur);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log('Fin du chargement');
  }
}
charger();
```

Sorties : `Service indisponible`, puis `Fin du chargement`. La ligne qui utilise `valeur` n’est pas atteinte. Pour intercepter le rejet d’un appel dans ce bloc, il faut l’attendre ou renvoyer sa promesse à une chaîne qui gère l’erreur.

## Appels successifs et appels indépendants

```js
// Les deux fonctions sont définies par le projet et renvoient des promesses.
const [projets, categories] = await Promise.all([
  lireProjets(),
  lireCategories()
]);
```

Les deux appels démarrent sans attendre le résultat de l’autre. Ils peuvent être groupés si leurs données sont indépendantes. Pour lire les détails d’un identifiant reçu d’un premier appel, il faut au contraire attendre cet identifiant. `for…of` avec `await` traite une collection en série ; `Promise.all(tableau.map(fonctionAsync))` lance les traitements ensemble, ce qui demande de limiter le nombre d’appels pour une grande collection.

## Attendre une réponse HTTP

`await fetch(url)` attend les en-têtes et fournit une `Response`. `await response.json()` attend la lecture et l’analyse du corps. Le statut et la forme des données restent à vérifier : une écriture linéaire ne supprime aucune de ces responsabilités. Le support [fetch](/semestre_4/js/intermediate/fetch) montre la chaîne complète.
