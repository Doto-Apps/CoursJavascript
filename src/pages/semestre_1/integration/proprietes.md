---
layout: "layouts/Layout.astro"
title: "Mémento des propriétés CSS"
hidden: true
---

Une propriété exprime ce qui change ; une valeur précise comment. Vérifiez le sélecteur et le chargement du fichier avant d'ajouter des règles. La [référence CSS complète](https://developer.mozilla.org/fr/docs/Web/CSS/Reference) permet d'approfondir chaque entrée.

## Texte, couleur et boîtes

| Propriété | Effet | Exemple |
|---|---|---|
| `color` | Couleur du texte | `color: #203047` |
| `background-color` | Couleur de fond | `background-color: white` |
| `font-family` | Famille de police | `font-family: system-ui, sans-serif` |
| `font-size` | Taille des lettres | `font-size: 1rem` |
| `font-weight` | Graisse | `font-weight: 700` |
| `line-height` | Hauteur des lignes | `line-height: 1.5` |
| `text-align` | Alignement du texte | `text-align: center` |
| `text-decoration` | Décoration du texte | `text-decoration: underline` |
| `width`, `height` | Dimensions | Attention aux valeurs fixes sur mobile. |
| `max-width` | Limite supérieure de largeur | `max-width: 1100px` |
| `padding` | Espace intérieur | `padding: 16px` |
| `margin` | Espace extérieur | `margin: 24px` |
| `margin-inline` | Marges selon l'axe en ligne | `margin-inline: auto` pour centrer notre bloc. |
| `border` | Bordure | `border: 1px solid #bcc7d6` |
| `border-radius` | Arrondi des coins | `border-radius: 12px` |
| `box-sizing` | Modèle des dimensions | `border-box` inclut padding et bordure. |
| `box-shadow` | Ombre | À garder discrète pour préserver la lisibilité. |
| `outline`, `outline-offset` | Contour et distance | Indicateur de focus, sans modifier la disposition. |

## Disposition

| Propriété | Fonction | Piège courant |
|---|---|---|
| `display` | Mode de boîte/disposition | `none` retire l'espace ; `flex`/`grid` organisent des enfants. |
| `flex-direction` | Axe principal Flexbox | `column` change les axes. |
| `justify-content` | Distribution sur l'axe principal | Ce n'est pas toujours horizontal. |
| `align-items` | Alignement transversal | La direction du parent compte. |
| `flex-wrap` | Retour à la ligne | `nowrap` par défaut. |
| `flex` | Souplesse d'un élément flex | S'applique à l'enfant flex. |
| `gap` | Gouttières entre éléments | Pas une marge au bord extérieur. |
| `grid-template-columns` | Pistes verticales | `repeat(3, 1fr)` : trois colonnes. |
| `grid-template-rows` | Pistes horizontales | Souvent laissées au contenu. |
| `grid-column`, `grid-row` | Placement d'un élément | Les numéros désignent les lignes de séparation. |
| `grid-template-areas`, `grid-area` | Zones nommées et affectation | Une zone doit former un rectangle. |
| `overflow` | Traitement du débordement | Ne pas cacher le contenu pour masquer un défaut. |
| `position` | Mode de positionnement | `absolute` quitte le flux normal. |
| `aspect-ratio` | Rapport du cadre | `4 / 3` pour une zone de média. |
| `object-fit` | Ajustement du média | `cover` recadre sans déformer. |

```html live title="Tester le modèle de boîte"
<style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      .boite {
        box-sizing: content-box;
        width: 240px;
        padding: 16px;
        border: 2px solid #2457a7;
        margin: 24px;
        background: #dce9fa;
      }
    </style>

<p>Largeur déclarée : 240 px ; padding : 16 px ; bordure : 2 px.</p>
    <div class="boite">
      Le contenu est entouré de padding, puis d’une bordure. La marge est à
      l’extérieur.
    </div>
    <p>Essayez border-box et observez la largeur totale.</p>
```
```html live title="Tester la direction et les axes"
<style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      .ligne {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
        min-height: 180px;
        border: 2px dashed #2457a7;
        padding: 12px;
      }
      .bloc {
        padding: 16px;
        background: #dce9fa;
      }
      .haut {
        padding-block: 35px;
      }
    </style>

<h1>Le parent organise ses enfants</h1>
    <div class="ligne">
      <div class="bloc">A</div>
      <div class="bloc haut">B, plus haut</div>
      <div class="bloc">C</div>
    </div>
    <p>Direction row : axe principal horizontal. Essayez column.</p>
```

## Sélecteurs, unités et adaptation

`p` cible une balise, `.carte` une classe, `#contact` un id. `.carte a` cible les liens descendants ; `.carte > a` les liens enfants directs. `:hover` vise le survol et `:focus-visible` le focus visible. `px` est une unité de pixel CSS ; `rem` dépend de la police racine ; `%` dépend de la propriété et de son contexte ; `fr` partage l'espace disponible en Grid.

Une media query conditionne des règles : `@media (min-width: 700px) { ... }`. Une variable se déclare avec `--accent` et s'utilise avec `var(--accent)`. Ces syntaxes ne sont pas des balises HTML.

[Guide Grid](https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Grid_layout) · [Guide Flexbox](https://developer.mozilla.org/fr/docs/Web/CSS/Guides/Flexible_box_layout) · [Référence des sélecteurs](https://developer.mozilla.org/fr/docs/Web/CSS/Reference/Selectors) · [Retour au parcours](/semestre_1).
