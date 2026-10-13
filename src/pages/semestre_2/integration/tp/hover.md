---
layout: "layouts/Layout.astro"
title: "Media queries : adapter une interface"
type: "TP"
order: 4
quizId: "s2-int-03"
previousSession: "/semestre_2/integration/tp/transition"
nextSession: "/semestre_2/integration/tp/dropdown"
---

<a id="comprendre"></a>

## La syntaxe des media queries

```css
.cartes { display: grid; grid-template-columns: 1fr; }
@media (min-width: 768px) {
  .cartes { grid-template-columns: repeat(2, 1fr); }
}
```

La grille existe à toutes les largeurs. Seul le nombre de colonnes change à partir de 768 px. À 767 px, la base s’applique ; à 768 px, la règle conditionnelle devient applicable. Les autres propriétés restent déterminées par la cascade.

| Terme | Sens | Confusion fréquente |
|---|---|---|
| Viewport | Zone de présentation de la page. | Ce n’est pas forcément la résolution physique de l’écran. |
| Breakpoint | Seuil choisi pour modifier la disposition. | Ce n’est pas une marque d’appareil. |
| `min-width` | Condition au moins égale au seuil. | Le cas exactement égal est inclus. |
| `max-width` | Condition au plus égale au seuil. | Des conditions peuvent se chevaucher. |

## Media queries et cascade CSS

Si deux conditions correspondent en même temps, leurs déclarations participent à la cascade habituelle. Évitez des dizaines de seuils pour corriger chaque carte séparément. Commencez par les règles communes et ajoutez un seuil lorsque le contenu l’exige.

## Largeurs minimales et débordements CSS

Testez une image large, un titre long, un lien contenant beaucoup de caractères et une navigation chargée. Une largeur fixe ou un enfant trop large peut faire déborder son conteneur. Un simple `overflow: hidden` masque parfois le défaut en coupant une information ; inspectez la boîte responsable avant de l’utiliser.

Une image fluide conserve généralement `max-width: 100%` et `height: auto`. Une navigation peut passer à la ligne. Les boutons ne doivent pas devenir inutilisables parce qu’un texte a été raccourci pour faire entrer une capture.

<a id="apprentissage"></a>

## Les conditions min-width et max-width

Une media query applique des déclarations si sa condition est vraie. Elle décrit la zone d’affichage, pas une liste de modèles de téléphone. `min-width: 700px` inclut 700 ; `max-width: 700px` inclut également 700. Deux conditions peuvent donc être vraies au même seuil : l’ordre et les autres critères de cascade comptent.

```css
.galerie {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 700px) {
  .galerie { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1000px) {
  .galerie { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

**Prédiction :** à 320 px, une colonne ; à 768 px, deux ; à 1024 px, trois. Dans ce fichier et cette couche, les sélecteurs ont la même spécificité : la dernière déclaration applicable fixe les colonnes. `minmax(0, 1fr)` autorise le rétrécissement des pistes, mais un contenu trop long peut encore nécessiter une règle adaptée.

```html live title="Observer les seuils et les contenus longs"
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

      .cards {
        grid-template-columns: 1fr;
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

<h1>Le contenu décide des seuils</h1>
    <section class="cards" id="grille">
      <article>
        <h2>Photo</h2>
        <p>Une description qui reste lisible.</p>
      </article>
      <article>
        <h2>Musique</h2>
        <p>Un titre et une description.</p>
      </article>
      <article>
        <h2>Sport</h2>
        <p>La grille suit l’espace disponible.</p>
      </article>
    </section>
    <p>Une colonne ; deux dès 700 px ; trois dès 1000 px.</p>

    <script></script>
```

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Media query | Une media query applique des règles lorsque sa condition est satisfaite. |
| <a id="notion-2"></a>Minimum | min-width: 700px signifie au moins 700 pixels CSS. |
| <a id="notion-3"></a>Maximum | max-width: 700px signifie au plus 700 pixels CSS. |
| <a id="notion-4"></a>Pixels CSS | Les seuils du cours utilisent la largeur en pixels CSS de la fenêtre. |
| <a id="notion-5"></a>Base | Le cours définit d'abord la grille pour une petite largeur. |
| <a id="notion-6"></a>Grille de base | La grille du cours a une colonne sous 700 px. |
| <a id="notion-7"></a>Grille moyenne | La grille du cours a deux colonnes dès 700 px et avant 1000 px. |
| <a id="notion-8"></a>Grille large | La grille du cours a trois colonnes dès 1000 px. |
| <a id="notion-9"></a>Activation de Grid | display: grid active Grid. |
| <a id="notion-10"></a>Colonnes égales | repeat(2, minmax(0, 1fr)) définit deux colonnes de fractions égales avec minimum zéro. |
| <a id="notion-11"></a>Espacement | gap règle l'espace entre les cellules de grille. |
| <a id="notion-12"></a>Cascade | À spécificité et priorité égales, une règle applicable placée après l'autre peut la remplacer. |
| <a id="notion-13"></a>Orientation | orientation décrit le rapport largeur/hauteur de la zone d'affichage. |
| <a id="notion-14"></a>Viewport | La meta viewport permet notamment une largeur adaptée au dispositif sur mobile. |
| <a id="notion-15"></a>Largeur fluide | Une largeur fluide s'adapte à l'espace disponible plutôt qu'imposer partout une grande largeur fixe. |
| <a id="notion-16"></a>Image | max-width: 100% empêche une image de dépasser la largeur disponible de son conteneur. |
| <a id="notion-17"></a>Contenu long | overflow-wrap: anywhere permet de couper un contenu textuel long si nécessaire. |
| <a id="notion-18"></a>Zoom | Tester le zoom à 200 % vérifie que le contenu reste utilisable lorsque son affichage grossit. |
| <a id="notion-19"></a>Seuil de contenu | Un breakpoint se choisit d'après les besoins du contenu. |
| <a id="notion-20"></a>Même document | Le responsive adapte le même contenu sans imposer un fichier HTML par largeur. |

## Exemple court — une longue chaîne ne dicte pas la largeur

La boîte est étroite et la chaîne peut se couper. Comparez overflow-wrap: anywhere avec white-space: nowrap dans le laboratoire. Une règle de coupure résout ici une contrainte de contenu ; masquer toute la page ne la résoudrait pas.

```html preview title="Une URL longue reste dans son conteneur" height=160
<p>https://example.org/projets/une-adresse-particulierement-longue</p>
<style>
  p {
    width: 14rem;
    max-width: 100%;
    overflow-wrap: anywhere;
    padding: 8px;
    border: 1px solid #2457a7;
    box-sizing: border-box;
  }
</style>
```
