---
layout: "layouts/Layout.astro"
title: "Projet : créer des composants cohérents"
type: "TD"
order: 5
previousSession: "/semestre_1/produire_Un_Site_Web/disposition"
nextSession: "/semestre_1/produire_Un_Site_Web/responsive"
---

<a id="comprendre"></a>
## Classes communes et variantes de composants

Une carte réutilisable conserve sa structure et ses règles communes quand le contenu change. La classe `.carte` partage les styles entre plusieurs éléments ; un identifiant unique ne convient pas pour cibler toutes les cartes. Des styles inline différents sur chaque copie rendent la maintenance incohérente : une correction devrait être répétée et peut être oubliée.

```html preview title="Une base commune et une variante" height=220
<article class="carte"><h2>Photo</h2><p>Reportage en atelier.</p></article>
<article class="carte carte--vedette"><h2>Affiche</h2><p>Identité du festival.</p></article>
<style>
  .carte { padding: 12px; margin-block: 12px; border: 2px solid #94a3b8; }
  .carte h2 { margin: 0; }
  .carte--vedette { border-color: #1d4ed8; background: #dbeafe; }
</style>
```

La seconde carte reçoit une différence explicite sans recopier toute la structure : c’est une variante. Le nom `carte--vedette` est une convention de nommage, pas un mot-clé CSS. Son texte reste différent mais sa base de padding et de titre reste commune.

## Propriétés personnalisées : --accent et var()

Une propriété personnalisée commence par deux tirets, par exemple `--accent`. `var(--accent)` lit sa valeur. Le sélecteur `:root` permet de déclarer les valeurs communes à la racine du document.

```html live title="Une valeur commune à deux éléments"
<h2>Festival</h2><p class="carte">Une même couleur sert au titre et au cadre.</p>
<style>
  :root { --accent: #1d4ed8; --espace: 16px; }
  h2 { color: var(--accent); }
  .carte { border: 2px solid var(--accent); padding: var(--espace); }
</style>
```

Changer `--accent` modifie la couleur du titre et de la bordure. Une couleur écrite directement dans une autre règle ne change pas pour autant. Une propriété personnalisée suit la cascade et l’héritage ; une valeur peut être redéfinie sur une zone particulière. `var(--accent, blue)` fournit une valeur de repli lorsque la propriété n’est pas définie.

## aspect-ratio et object-fit

`aspect-ratio: 4 / 3` définit un rapport largeur/hauteur. Pour une largeur de 240 px et une hauteur automatique, le cadre mesure 180 px de haut. `object-fit` décide comment l’image occupe ce cadre tout en conservant ses proportions.

```html live title="Même image : cover et contain"
<div class="images">
  <figure><img class="cover" src="/images/learning/landscape.svg" alt="Paysage stylisé avec soleil et montagnes"><figcaption>cover</figcaption></figure>
  <figure><img class="contain" src="/images/learning/landscape.svg" alt="Le même paysage entier"><figcaption>contain</figcaption></figure>
</div>
<style>
  .images { display: flex; flex-wrap: wrap; gap: 16px; }
  figure { margin: 0; }
  img { display: block; width: 240px; max-width: 100%; aspect-ratio: 4 / 3; background: #dbeafe; border: 2px solid #1d4ed8; }
  .cover { object-fit: cover; }
  .contain { object-fit: contain; }
</style>
```

`cover` remplit le cadre et peut recadrer l’image ; `contain` conserve l’image entière et peut laisser des zones libres. Pour une affiche contenant du texte essentiel, le recadrage peut supprimer une information. Le texte alternatif exprime l’information utile de l’image dans son contexte ; une image purement décorative possède `alt=""`.

## États normal, hover et focus-visible

Un contrôle interactif possède au moins un état normal, un survol et un focus. Le survol ne couvre pas le clavier ; `:focus-visible` rend le contrôle courant perceptible.

```html live title="Une destination et un focus visibles"
<a class="action" href="#details">Détails du projet Photo</a>
<p id="details">Reportage photographique réalisé en atelier.</p>
<style>
  .action { display: inline-block; padding: 12px; background: #dbeafe; color: #172554; }
  .action:hover { background: #bfdbfe; }
  .action:focus-visible { outline: 3px solid #be123c; outline-offset: 3px; }
</style>
```

Un lien stylisé comme un bouton reste un lien de navigation ; une action locale utilise un `button`. Dans cette démonstration, Tab fait apparaître le focus et Entrée rejoint la destination. La couleur ne doit pas être le seul signal d’un état important : un libellé ou un autre signe peut compléter l’information.

## Travail sur les composants

Définissez une carte commune et une variante « projet mis en avant ». Centralisez couleur d’accent et espacements avec des propriétés personnalisées. Testez trois contenus différents, un titre long et une image contenant une information à ne pas recadrer.

Ajoutez une destination explicite au lien, un état de survol et un focus perceptible. Comparez `cover` et `contain`, puis documentez votre choix. La remise doit permettre de changer une valeur commune à un seul endroit sans retoucher chaque carte.
