---
layout: "layouts/Layout.astro"
title: "Projet : adapter le site aux écrans"
type: "TD"
order: 6
previousSession: "/semestre_1/produire_Un_Site_Web/composants"
nextSession: "/semestre_1/produire_Un_Site_Web/norme"
---

<a id="comprendre"></a>
## Le viewport et les dimensions fluides

Une interface responsive adapte sa disposition à l’espace disponible en conservant ses informations et ses actions. Dans le `head` du document, le viewport demande au navigateur mobile une largeur de mise en page correspondant à l’appareil :

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Une largeur fixe de 1100 px peut déborder d’une fenêtre étroite. Une largeur fluide limitée par `max-width` s’adapte. Les images doivent aussi rester limitées à leur conteneur ; leur hauteur automatique préserve les proportions.

```html preview title="Contenu et image limités par le conteneur" height=240
<article><h2>Atelier photo</h2><img src="/images/learning/landscape.svg" alt="Paysage stylisé avec soleil et montagnes"></article>
<style>
  article { box-sizing: border-box; width: 100%; max-width: 360px; margin-inline: auto; padding: 16px; border: 2px solid #1d4ed8; }
  h2 { margin-top: 0; }
  img { display: block; max-width: 100%; height: auto; max-height: 120px; }
</style>
```

Le conteneur peut rétrécir et l’image ne lui impose pas sa largeur naturelle. Ne désactivez pas le zoom et ne masquez pas un débordement avant d’en trouver la cause : le texte ou le focus risqueraient d’être coupés.

## Media queries et approche mobile-first

La base mobile-first définit une disposition étroite sans condition, puis ajoute des possibilités avec `min-width`. Le seuil est inclus : `min-width: 700px` est vrai à 700 px. Les règles de base restent actives pour les propriétés non remplacées.

```html live title="Une, deux ou trois colonnes selon la largeur"
<div class="projets"><article>Photo</article><article>Vidéo</article><article>Affiche</article></div>
<style>
  .projets { display: grid; grid-template-columns: 1fr; gap: 16px; }
  article { padding: 16px; background: #dbeafe; overflow-wrap: anywhere; }
  @media (min-width: 700px) { .projets { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (min-width: 1000px) { .projets { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
</style>
```

| Largeur de l’aperçu | Conditions vraies | Colonnes |
|---|---|---|
| 320 px | Base seule | 1 |
| 699 px | Base seule | 1 |
| 700 px ou 768 px | Base et seuil 700 | 2 |
| 1000 px ou plus | Base et les deux seuils | 3 |

À importance, origine, couche et spécificité égales, la dernière règle applicable gagne pour une même propriété. À 1000 px, les deux conditions sont vraies : l’ordre des règles explique les trois colonnes. Le seuil ne reconnaît pas une marque de téléphone ; choisissez-le selon les besoins du contenu.

## Navigation et contenus longs

```html live title="Une navigation qui reste disponible"
<nav aria-label="Navigation"><a href="#a">Présentation</a><a href="#b">Réalisations</a><a href="#c">Contact</a></nav>
<p id="a">Présentation du site</p><p id="b">Liste des projets</p><p id="c">Coordonnées</p>
<style>
  nav { display: flex; flex-wrap: wrap; gap: 16px; }
  a { padding: 8px; background: #dbeafe; }
  :focus-visible { outline: 3px solid #be123c; outline-offset: 3px; }
</style>
```

`flex-wrap: wrap` adapte la navigation sans masquer les liens. Un menu uniquement au survol ne couvre pas le tactile et le clavier. Le menu repliable sera étudié au S2 avec son état, son bouton et la fermeture par Échap ; il n’est pas nécessaire pour rendre cette navigation utilisable.

Un mot sans espace peut imposer une largeur minimale. `overflow-wrap: anywhere` permet une coupure adaptée ; `min-width: 0` peut être nécessaire sur un enfant flex. Pour Grid, `minmax(0, 1fr)` limite l’influence du minimum intrinsèque. Ces propriétés répondent à des causes distinctes : inspectez l’élément qui déborde.

## Vérifier les seuils et le zoom

Vérifiez juste avant le seuil, au seuil et juste après, puis à une largeur intermédiaire. Dans cet exemple : 699, 700 et 701 px. Complétez par un zoom à 200 pour cent, un titre long et une navigation au clavier. Le résultat attendu conserve tous les contenus et les contrôles accessibles, même si le nombre de colonnes change. Dans un aperçu, les media queries utilisent la largeur de l’iframe.

## Travail d’adaptation et relevé des seuils

Reprenez votre site avec une base à une colonne et une navigation qui peut revenir à la ligne. Ajoutez les seuils au moment où le contenu gagne réellement à changer de disposition. Notez pour chaque seuil la difficulté observée et la modification choisie.

Remettez une grille de contrôle à 320 px, juste sous/au-dessus de chaque seuil, à 1024 px et avec un zoom à 200 %. Ajoutez un titre long et un lien sans espaces. Chaque contrôle doit rester accessible et le focus visible ; expliquez la cause de tout débordement corrigé.
