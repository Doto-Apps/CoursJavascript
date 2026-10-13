---
layout: "layouts/Layout.astro"
title: "Construire une mise en page avec Grid"
type: "TD"
order: 5
quizId: "s1-int-04"
previousSession: "/semestre_1/integration/html"
nextSession: "/semestre_1/integration/htmltp"
---

<a id="comprendre"></a>

## Conteneur, pistes, lignes et cellules Grid

Une **piste** est une colonne ou une ligne. Une **cellule** est l’intersection d’une ligne et d’une colonne. Une **ligne de grille** est la limite entre deux pistes. Trois colonnes possèdent quatre lignes verticales : le numéro d’une ligne de grille n’est donc pas le numéro d’une carte.

| Déclaration sur le parent | Lecture | Effet |
|---|---|---|
| `display: grid` | Activer une grille. | Les enfants directs sont organisés par la grille. |
| `grid-template-columns: 1fr 1fr` | Deux parts de même taille. | Deux colonnes partagent l’espace disponible. |
| `repeat(3, 1fr)` | Répéter trois fois une part. | Trois colonnes, sans réécrire la valeur. |
| `gap: 16px` | Espacement entre pistes. | Les cellules ne sont pas collées. |

`fr` est une fraction de l’espace restant pour les pistes flexibles, après la prise en compte des autres tailles et des espaces. Une grille `1fr 2fr` partage cet espace selon un rapport un tiers / deux tiers ; elle ne signifie pas deux colonnes égales.

```html preview title="Deux colonnes, un repère commun" height=180
<div class="grille">
  <p>Affiche</p><p>Photographie</p><p>Vidéo</p><p>Illustration</p>
</div>
<style>
  .grille { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .grille p { margin: 0; padding: 16px; background: #dce9fa; }
</style>
```

## Placement Grid et ordre du DOM

Les propriétés `grid-column` et `grid-row` concernent un enfant, pas le parent. `grid-column: 1 / 3` signifie « commencer à la ligne 1 et finir à la ligne 3 » : cela occupe deux colonnes. `span 2` demande d’occuper deux pistes depuis un point de départ déterminé par le placement.

Le placement visuel ne réécrit pas l’ordre HTML. Si vous déplacez la dernière carte en haut, le parcours clavier et la lecture peuvent rester dans l’ordre du document. Composez donc d’abord un ordre de contenu logique. Pour une navigation sur une ligne, Flexbox reste souvent plus simple ; pour un catalogue dont les lignes doivent partager les mêmes colonnes, Grid donne des repères communs.

**Erreur fréquente :** placer `grid-template-columns` sur les cartes au lieu de leur conteneur. Activez l’overlay Grid de DevTools : il montre le parent, les pistes et leurs limites, ce qu’une capture seule ne permet pas de vérifier.

## Les colonnes et les lignes de la grille

Une grille est composée de pistes : des colonnes et des lignes. Les limites entre les pistes servent de repères de placement. Trois colonnes possèdent quatre limites verticales. `grid-column: 1 / 3` commence à la première limite et s’arrête à la troisième : la carte occupe deux colonnes, et non trois.

| Écriture | Ce qu’elle définit |
|---|---|
| `display: grid` | Le parent devient conteneur de grille. |
| `grid-template-columns` | Les pistes verticales. |
| `repeat(3, 1fr)` | Trois pistes de fraction `1fr`. |
| `gap: 16px` | Les gouttières entre pistes. |
| `grid-column: span 2` | L’étendue d’un enfant sur deux colonnes. |

```html live title="Compter les pistes et placer une carte"
<style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      .grille {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }
      .carte {
        background: #dce9fa;
        padding: 16px;
        border: 1px solid #bcc7d6;
      }
      .vedette {
        grid-column: 1 / 3;
      }
    </style>

<h1>Les lignes de séparation</h1>
    <div class="grille">
      <article class="carte vedette">Carte A : lignes 1 à 3</article>
      <article class="carte">B</article>
      <article class="carte">C</article>
      <article class="carte">D</article>
      <article class="carte">E</article>
    </div>
```

**Lecture accompagnée :** distinguez le code du parent `.grille` et le code de la carte `.vedette`. Le premier crée le rangement ; le second décrit l’étendue de cet enfant. Les autres cartes gardent leur placement automatique.

**Question de transfert :** une navigation de quatre liens nécessite-t-elle forcément Grid ? Justifiez un choix Flexbox pour un axe, et un choix Grid pour plusieurs rangées alignées. Les deux outils peuvent cohabiter.

<a id="grille"></a>

## display: grid et grid-template-columns

Flexbox organise principalement un axe à la fois. Grid organise des lignes et des colonnes ensemble. Pour aligner plusieurs rangées de cartes, Grid est souvent plus direct ; pour aligner les liens d'une navigation, Flexbox suffit. Ces outils peuvent être imbriqués : la page utilise Grid, une carte utilise Flexbox.

```css
.catalogue {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

`display: grid` transforme les enfants directs en éléments de grille. `repeat(3, 1fr)` crée trois colonnes égales ; `fr` partage l'espace disponible après les espacements. `gap` crée des gouttières entre les éléments, sans ajouter de marge au bord extérieur. Avec six cartes, le placement automatique produit deux lignes. `grid-template-rows` définit les hauteurs des lignes ; sans cela, les lignes se dimensionnent selon leur contenu.


À essayer : remplacez trois colonnes par deux. Puis retirez la règle de la grande carte. Expliquez ce qui change, sans modifier le HTML.

<a id="placement"></a>

## grid-column et grid-row

Trois colonnes ont quatre lignes verticales de séparation. `grid-column: 1 / 3` place un élément de la ligne 1 à la ligne 3 : il occupe donc deux colonnes. `grid-column: span 2` lui fait occuper deux colonnes à partir de sa position automatique. `grid-row` applique le même principe aux lignes horizontales.

```css
.vedette { grid-column: 1 / 3; }
```

Autre méthode, les zones nommées décrivent le plan de la page :

```css
.page {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: "entete entete" "contenu aside" "pied pied";
  gap: 24px;
}
header { grid-area: entete; }
main { grid-area: contenu; }
aside { grid-area: aside; }
footer { grid-area: pied; }
```

Chaque zone doit former un rectangle. Le nom d'une zone est un choix CSS, pas une balise HTML ni un identifiant obligatoire. Le sens des éléments reste défini par le HTML.

<a id="verification"></a>

## Le placement des éléments dans la grille

Activez la superposition Grid dans l'inspecteur : elle révèle les pistes et leurs limites. Ne déplacez pas visuellement les éléments au point de rendre l'ordre de lecture incohérent : le clavier et les technologies d'assistance suivent principalement l'ordre du document. Une carte débordante peut venir d'une image trop large, pas du nombre de colonnes. `minmax(0, 1fr)` permet à une piste de se réduire, et `max-width: 100%` empêche une image de dépasser son conteneur.
