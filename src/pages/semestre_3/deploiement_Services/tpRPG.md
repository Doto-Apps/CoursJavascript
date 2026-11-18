---
layout: "layouts/Layout.astro"
title: "Filtrer un catalogue et envoyer des données avec POST"
type: "TD"
order: 3
quizId: "s3-node-services"
previousSession: "/semestre_3/deploiement_Services/nodeS2"
nextSession: "/semestre_3/deploiement_Services/nodeS4"
---

<a id="filtre"></a>

## Filtrer puis actualiser les cartes

Le tableau reçu du serveur contient les données. Les cartes sont la représentation de ces données dans le DOM. `filter()` produit un nouveau tableau contenant les éléments qui vérifient la condition. Le tableau source reste disponible pour les recherches suivantes.

```js
const films = catalogue.filter((fiche) => fiche.categorie === "Film");
console.log(films.length);
```

Le catalogue de la séance 2 contient trois films. Essayez ensuite la catégorie « Jeu vidéo ».

1. Ajoutez un bouton qui affiche uniquement les films. À chaque rafraîchissement de la grille, videz le conteneur avec `replaceChildren()` avant d’ajouter les cartes visibles.
2. Ajoutez un champ de recherche. L’événement `input` signale une modification du champ. Comparez le titre et la recherche après les avoir passés en minuscules. La méthode `includes()` permet de vérifier si le titre contient le texte.
3. Affichez la longueur du tableau filtré dans un compteur. Testez une recherche vide et une recherche sans résultat. Les cartes et le compteur se mettent à jour sans recharger la page.

<a id="methodes-http"></a>

## Choisir entre GET et POST

GET sert à récupérer des données. POST permet d’envoyer des données dans le corps de la requête pour que le serveur les traite. Ici, le serveur recevra un texte et renverra une réponse construite à partir de ce texte.

Navigateur → requête HTTP → serveur Express → traitement → réponse JSON → navigateur.

<a id="envoyer-json"></a>

## Envoyer un objet au serveur

Dans les options de `fetch()`, `method: "POST"` choisit la méthode HTTP. L’en-tête `Content-Type: application/json` annonce le format du corps. `JSON.stringify()` convertit l’objet JavaScript en texte JSON à envoyer dans `body`.

```js
const options = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ texte: "Bonjour" }),
};
```

Appelez `fetch(url, options)` quand votre formulaire est soumis. L’onglet Réseau du navigateur doit afficher une requête POST avec un corps JSON contenant la propriété `texte`.

<a id="recevoir-json"></a>

## Lire et vérifier le texte dans Express

Placez `app.use(express.json())` avant la route. `express.json()` analyse le corps JSON. La route peut ensuite accéder à l’objet reçu via `req.body`. Pour lire sa propriété `texte`, utilisez `req.body?.texte`.

```js
const texte = req.body?.texte;
if (typeof texte !== "string" || !texte.trim()) {
  return res.status(400).json({ error: "Texte requis" });
}
```

Ce fragment appartient à la fonction de traitement du POST. Avec un texte absent ou vide, le serveur répond 400. `return` termine cette branche après l’envoi de la réponse. Essayez un corps vide et vérifiez le statut dans l’onglet Réseau.

<a id="aller-retour"></a>

## Faire un aller-retour complet

1. Créez une route `POST /echo` avec `app.post()`. Appliquez la vérification du texte dans le traitement de la route.
2. Pour un texte valide, envoyez en JSON un objet doté d’une propriété `reponse`. Sa valeur doit commencer par « Reçu » et reprendre le texte saisi.
3. Côté navigateur, vérifiez `response.ok`, lisez la réponse avec `response.json()` et affichez `reponse`. Si la requête échoue ou si le statut indique une erreur, affichez un message lisible.
4. Testez « Bonjour » et une saisie vide. Dans le premier cas, la page affiche le texte renvoyé. Dans le second cas, elle affiche une erreur.
