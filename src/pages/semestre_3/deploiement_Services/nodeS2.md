---
layout: "layouts/Layout.astro"
title: "Récupérer des données avec fetch et créer des cartes"
type: "TD"
order: 2
quizId: "s3-node-chatbot"
previousSession: "/semestre_3/deploiement_Services/nodeS1"
nextSession: "/semestre_3/deploiement_Services/tpRPG"
---

Repartez du serveur Express de la séance 1. Le navigateur va récupérer un catalogue, puis construire une carte HTML par élément.

<a id="catalogue"></a>

## Renvoyer une collection depuis Express

Téléchargez le [catalogue de six jeux et films fictifs](/exemples/s3/catalogue.json) dans votre projet. Chaque entrée contient un identifiant, un titre, une année, une description, une catégorie, une note sur 10 et une référence vers une illustration générique. Le premier objet est « Le phare immobile ».

Dans un projet CommonJS, `require("./catalogue.json")` charge le fichier en tableau JavaScript. Déclarez une route `GET /catalogue` qui envoie ce tableau avec `res.json(catalogue)`. Cette méthode sérialise les données et les envoie dans une réponse HTTP au format JSON. Ouvrez la route dans le navigateur et vérifiez que la réponse contient six objets. Si le client tourne sur une autre origine, reprenez le réglage CORS de la séance 1.

<a id="fetch"></a>

## Lire la réponse HTTP

`fetch(url)` envoie une requête HTTP à l’URL indiquée. Par défaut, la méthode utilisée est GET. L’appel retourne une promesse qui fournit un objet de réponse HTTP quand les en-têtes sont arrivés.

`await` attend le résultat d’une promesse avant de poursuivre dans la fonction en cours. À l’intérieur d’une fonction, cette fonction doit être déclarée avec `async`. `response.json()` lit le corps et analyse le texte JSON pour produire une valeur JavaScript. Cette lecture renvoie aussi une promesse.

```js
async function lireCatalogue() {
  const response = await fetch("http://localhost:3000/catalogue");
  if (!response.ok) throw new Error("Catalogue indisponible");
  const catalogue = await response.json();
  console.log(catalogue);
}
```

Appelez la fonction dans le JavaScript de votre page et ouvrez la console. Si votre serveur écoute ailleurs, adaptez l’URL. Vous devez voir un tableau de six objets. `response.ok` indique un statut HTTP de réussite. Essayez un chemin inexistant puis rétablissez la bonne URL.

Le JSON transmis est du texte. Après lecture, vous manipulez des valeurs JavaScript, par exemple un tableau contenant des objets.

<a id="tableaux-objets"></a>

## Lire un tableau et les propriétés d’un objet

Un tableau contient plusieurs valeurs ordonnées. Son premier élément est à l’indice `0` et sa propriété `length` donne le nombre d’éléments. Dans un objet, la notation `objet.propriete` lit la valeur de la propriété indiquée.

```js
console.log(catalogue[0].titre);
console.log(catalogue.length);
```

Après la lecture du catalogue, ces lignes affichent « Le phare immobile » et `6`. Affichez ensuite la catégorie du deuxième élément.

<a id="boucles"></a>

## Parcourir la collection

Une boucle `for...of` donne successivement les valeurs du tableau. `forEach()` appelle la fonction fournie une fois par élément.

```js
catalogue.forEach((fiche) => {
  console.log(fiche.titre);
});
```

Vous obtenez six lignes dans la console. Affichez maintenant le titre et l’année sur la même ligne.

<a id="dom"></a>

## Créer et insérer un élément HTML

Un *template literal* s’écrit entre accents graves. Il permet d’insérer la valeur d’une expression avec `${expression}`. `document.createElement()` crée un élément du DOM. `append()` ajoute cet élément à un conteneur déjà présent dans la page.

```html live title="Un titre créé à partir d’un objet"
<div id="apercu"></div>
<script>
  const fiche = { titre: "Le phare immobile", annee: 2024 };
  const titre = document.createElement("h3");
  titre.textContent = `${fiche.titre} (${fiche.annee})`;
  document.querySelector("#apercu").append(titre);
</script>
```

L’aperçu affiche « Le phare immobile (2024) ». Changez l’année dans l’objet et relancez. Pour insérer du texte provenant d’une réponse, utilisez `textContent`.

<a id="cartes"></a>

## Construire une grille de cartes

1. Créez un conteneur vide dans `index.html`. Affichez d’abord une seule carte avec le premier objet du catalogue.
2. Affichez l’image, le titre, la catégorie, la description et l’année ou la note. Placez [l’illustration générique](/images/learning/landscape.svg) dans le dossier servi par votre client sous `images/learning/landscape.svg` ou adaptez le chemin dans le catalogue.
3. Construisez les cartes dans une boucle. Avec le fichier fourni, vous devez obtenir six cartes. Ajoutez un objet au tableau et vérifiez qu’une septième carte apparaît sans ajouter de carte à la main dans le HTML.
4. Mettez en page le conteneur en CSS. Vérifiez que les cartes restent lisibles avec une fenêtre étroite.

**Pour aller plus loin.** Triez par note, filtrez par catégorie et affichez le nombre de cartes visibles. En bonus, ajoutez une recherche par titre et affichez un message quand la recherche ne donne aucun résultat ou si le serveur est indisponible.
