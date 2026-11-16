---
layout: "layouts/Layout.astro"
title: "Portfolio : afficher les projets comme des composants"
type: "TD"
order: 3
quizId: "s2-site-02"
previousSession: "/semestre_2/Site_Web_Avec_Donnees/td/base"
nextSession: "/semestre_2/Site_Web_Avec_Donnees/td/filtres"
---

<a id="comprendre"></a>

## createElement, textContent et append

`document.createElement('h2')` crée un élément. `textContent` lui affecte du texte. `append` l’ajoute dans un conteneur. Cette construction garde les données textuelles séparées du balisage.

```javascript
const titre = document.createElement('h2');
titre.textContent = projet.title;
const carte = document.createElement('article');
carte.append(titre);
```

Si `projet.title` contient `<script>`, `textContent` affiche ces caractères comme du texte ; `innerHTML` les interpréterait comme du balisage. La construction DOM n’est pas un contrôle universel : une URL doit encore être validée pour son usage et le serveur doit contrôler les données reçues.

| Partie de la carte | Origine | Vérification |
|---|---|---|
| Titre et description. | Texte du JSON. | Affichage textuel et hiérarchie correcte. |
| Média. | Champ d’image valide ou repli prévu. | Alternative adaptée et image absente traitée. |
| Lien. | URL autorisée par le contrat. | Destination et intitulé explicites. |
| Date. | Champ prévu dans le contrat. | Date de fin absente clairement présentée. |

## Chargement, liste vide et erreur de lecture

Avant la réponse, affichez le chargement. Après réussite, affichez les cartes ou un message d’état vide. Après échec, affichez une erreur et une possibilité de reprise. L’absence de projet n’est pas un écran blanc inexpliqué.

## Images absentes et textes longs

Une fonction `creerCarte(projet)` ne doit pas supposer que tous les titres ont la même longueur. Testez trois projets : titre court, description longue et image absente. Utilisez la même structure pour chacun. Un nouveau projet doit devenir une nouvelle carte sans ajouter une branche spécifique à son nom.

<a id="apprentissage"></a>

## La fonction de rendu d’une carte

L'API livre des données ; le navigateur construit l'interface. Une fonction de rendu commune évite d'écrire à la main une carte par projet. Le contenu peut varier en longueur et certains champs sont absents : un composant doit traiter ces cas sans laisser des liens vides.

```js
function creerCarte(project) {
  const article = document.createElement('article');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  title.textContent = project.title;
  description.textContent = project.description;
  article.append(title, description);
  return article;
}

liste.replaceChildren(...projects.map(creerCarte));
```

**Résultat attendu :** autant de cartes que de projets, sans interpréter un titre comme HTML. Le remplacement vide d'abord le conteneur, donc une actualisation ne duplique pas les cartes. La carte utilise `article`, son titre reste dans une hiérarchie cohérente avec le `h1` de page.

```html live title="Comparer données, cartes et états de liste"
<style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 20px;
        font-family: system-ui, sans-serif;
        color: #18324c;
        background: #f1f5f9;
      }
      button,
      input,
      select,
      textarea {
        font: inherit;
        max-width: 100%;
      }
      button {
        padding: 8px 12px;
        cursor: pointer;
      }
      input,
      select,
      textarea {
        padding: 8px;
      }
      :focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 3px;
      }
      article,
      .panel {
        padding: 16px;
        background: white;
        border-radius: 12px;
        min-width: 0;
      }
      .cards {
        display: grid;
        gap: 16px;
      }
      label {
        display: block;
        margin-block: 12px 4px;
      }
      h1 {
        font-size: 1.4rem;
      }
      h2 {
        font-size: 1.15rem;
      }
      p,
      h2,
      a {
        overflow-wrap: anywhere;
      }
      .note {
        font-size: 0.9rem;
      }

      @media (min-width: 700px) {
        .cards {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (min-width: 1000px) {
        .cards {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
    </style>

<h1>Portfolio : une carte par objet</h1>
    <p class="note">
      Prototype en mémoire ; la version PHP/MySQL du TP conserve les données.
    </p>
    <p id="etat" role="status"></p>
    <section id="projets" class="cards"></section>

    <script>
      const projects = [
        {
          id: 1,
          title: "Festival étudiant",
          description: "Une identité et un site.",
          technologies: "HTML, CSS",
        },
        {
          id: 2,
          title: "Galerie photo",
          description: "Un catalogue de portraits.",
          technologies: "PHP, CSS",
        },
        {
          id: 3,
          title: "Tournoi du campus",
          description: "Une page événement.",
          technologies: "HTML",
        },
      ];
      function render() {
        const results = projects;
        const cards = results.map((p) => {
          const article = document.createElement("article");
          const h2 = document.createElement("h2");
          h2.textContent = p.title;
          const description = document.createElement("p");
          description.textContent = p.description;
          const technologies = document.createElement("p");
          technologies.textContent = p.technologies;
          article.append(h2, description, technologies);
          return article;
        });
        document.querySelector("#projets").replaceChildren(...cards);
        document.querySelector("#etat").textContent = results.length
          ? `${results.length} projet(s)`
          : "Aucun résultat pour ces filtres.";
      }
      render();
    </script>
```

## Image, lien et état vide

Une image informative reçoit un `alt` utile ; ne recopiez pas mécaniquement le nom de fichier. Laissez une place stable avec `aspect-ratio` et `object-fit: cover` pour éviter une mise en page qui saute au chargement. Un lien « Voir Festival étudiant » possède une destination réelle. Si `project_url` est vide, n'affichez pas de lien cliquable vers `#`.

Une liste vide affiche « Aucun projet enregistré ». Une erreur affiche un message d'échec et un moyen de réessayer. Le chargement affiche un état provisoire : ces trois messages ne sont pas interchangeables. Le rendu doit rester utilisable avec les seules touches Tab et Entrée.

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Rendu | Une fonction commune transforme un objet projet en carte. |
| <a id="notion-2"></a>Création élément | createElement construit un élément DOM. |
| <a id="notion-3"></a>Texte | textContent traite le titre comme du texte. |
| <a id="notion-4"></a>Assemblage | append ajoute les éléments enfants à la carte. |
| <a id="notion-5"></a>Transformation tableau | map produit une carte pour chaque projet. |
| <a id="notion-6"></a>Remplacement | replaceChildren remplace les enfants existants du conteneur. |
| <a id="notion-7"></a>Sémantique | article décrit un contenu de projet autonome. |
| <a id="notion-8"></a>Hiérarchie | Les titres de cartes gardent une hiérarchie cohérente avec le h1. |
| <a id="notion-9"></a>Image informative | Une image informative a un texte alternatif adapté. |
| <a id="notion-10"></a>Ratio | aspect-ratio réserve un rapport largeur/hauteur à l'image. |
| <a id="notion-11"></a>Recadrage | object-fit: cover remplit la boîte en conservant les proportions, avec recadrage possible. |
| <a id="notion-12"></a>Lien absent | Un lien vide n'est pas remplacé par un faux lien vers #. |
| <a id="notion-13"></a>Lien explicite | Le texte du lien décrit le projet ciblé. |
| <a id="notion-14"></a>Chargement | Le chargement est un état provisoire en attendant les données. |
| <a id="notion-15"></a>Vide | Aucun projet enregistré décrit une liste reçue vide. |
| <a id="notion-16"></a>Erreur | Une erreur de lecture présente un échec et un moyen de réessayer. |
| <a id="notion-17"></a>Clavier | Les liens et contrôles doivent être utilisables avec Tab et Entrée. |
| <a id="notion-18"></a>Titre long | Une carte doit rester lisible avec un titre long. |
| <a id="notion-19"></a>Image absente | Le composant doit traiter une image absente sans casser les autres champs. |
| <a id="notion-20"></a>Responsive | La grille doit être vérifiée sur un écran étroit. |

## Exemple court — un cadre, une image et un texte

La carte possède une unité de contenu et un niveau de titre. Le cadre réserve une proportion régulière ; cover peut recadrer l’image, mais ne doit pas couper l’information importante. Le rendu dynamique réutilise cette structure à partir des données.

```html preview title="Structure d’une carte de projet" height=290
<article>
  <img src="/images/learning/landscape.svg" alt="Illustration des montagnes du projet">
  <h2>Regards sur la montagne</h2>
  <p>Un projet photographique.</p>
</article>
<style>
  article {
    max-width: 18rem;
  }
  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
</style>
```

## Travail à réaliser : rendre tous les champs utiles

Écrivez `creerCarte(project)` pour afficher titre, description, technologies, dates, image éventuelle et liens disponibles. Pour une date de fin `null`, indiquez « En cours ». Évitez de convertir une date de calendrier en un autre jour par une conversion de fuseau. Validez les protocoles HTTP(S) avant d’affecter les liens externes et traitez les exceptions d’analyse d’URL.

Utilisez `textContent` pour les textes et une alternative adaptée pour une image informative. Si l’image est absente ou ne charge pas, gardez les autres informations et un repli lisible. Réactualisez deux fois la liste : le nombre de cartes reste égal au nombre de projets. Testez titre long, URL absente, image absente, liste vide et erreur API ; remettez code et observations à 320 px et au clavier.
