---
layout: "layouts/Layout.astro"
title: "CSS : sélecteurs, boîtes et Flexbox"
type: "TD"
order: 3
quizId: "s1-int-02"
previousSession: "/semestre_1/integration/htmltd"
nextSession: "/semestre_1/integration/html"
---

<a id="comprendre"></a>

## Les règles et les sélecteurs CSS

Une règle CSS associe un sélecteur à des déclarations. Dans `.carte { padding: 16px; color: #203047; }`, `.carte` choisit les éléments ayant la classe `carte`. Les accolades contiennent des couples `propriété: valeur`, séparés par des points-virgules. Une règle valide sans élément correspondant ne produit aucun changement visible.

<a id="selecteurs"></a>

### Sélectionner les éléments par balise

Le nom de balise sélectionne tous les éléments de ce type. Ici, les deux paragraphes deviennent bleus, mais le titre garde sa couleur normale.

`color` règle la couleur du texte ; `background-color` règle celle du fond. Ces deux propriétés ne ciblent donc pas la même partie de l’élément.

```html preview title="Sélecteur de balise" height=160
<h2>Atelier</h2>
<p>Premier paragraphe</p>
<p>Second paragraphe</p>
<style>p { color: #1d4ed8; }</style>
```

### Sélectionner des éléments avec une classe

Le point précède le nom de classe dans le CSS, jamais dans l’attribut HTML. Plusieurs éléments peuvent partager cette classe ; un élément peut posséder plusieurs classes séparées par des espaces.

```html preview title="Seule la classe selection est ciblée" height=140
<p class="selection">Projet sélectionné</p>
<p>Autre projet</p>
<style>.selection { background: #fef08a; }</style>
```

### Sélectionner un élément avec son identifiant

`#programme` cible l’élément ayant `id="programme"`. Un identifiant est unique dans le document ; pour un style réutilisé, choisissez une classe.

```html preview title="Sélecteur d’identifiant" height=140
<p id="programme">Programme de la journée</p>
<p>Informations pratiques</p>
<style>#programme { border-left: 5px solid #1d4ed8; }</style>
```

### Sélectionner les descendants et les enfants directs

L’espace dans `.carte p` sélectionne tous les paragraphes à l’intérieur d’une carte, même profondément imbriqués. Le signe `>` dans `.carte > p` sélectionne seulement les enfants directs.

```html live title="Descendants et enfants directs"
<div class="carte">
  <p>Enfant direct : fond jaune et texte bleu</p>
  <div><p>Descendant imbriqué : texte bleu seulement</p></div>
</div>
<p>Extérieur : aucune des deux règles</p>
<style>
  .carte p { color: #1d4ed8; }
  .carte > p { background: #fef08a; }
</style>
```

Les deux paragraphes intérieurs sont bleus ; seul le premier a un fond jaune. Retirer `>` ferait aussi apparaître le fond sur le paragraphe imbriqué.

### Combiner et regrouper les sélecteurs

`.carte.active` sélectionne un élément portant les deux classes. `.carte .active` sélectionne un descendant portant `active` : l’espace change le sens. `h1, h2` applique les mêmes déclarations aux deux types de titres. Une pseudo-classe comme `a:hover` limite la règle à un état ; `a:focus-visible` permet de signaler le focus clavier.

Dans une feuille `style.css`, n’écrivez pas de balises `<style>`. Le document charge ce fichier dans son `head` avec `<link rel="stylesheet" href="style.css">`. Les démonstrations regroupent HTML et CSS uniquement pour rendre chaque exemple autonome.

La couleur du texte est souvent héritée par les enfants ; marge, bordure et padding ne sont pas hérités de cette façon. Quand plusieurs règles ciblent un élément, la cascade détermine la déclaration appliquée ; la [séance suivante](/semestre_1/integration/html) détaille la spécificité.

<a id="boites"></a>

## Le modèle de boîte et les espacements CSS

Le contenu est entouré successivement par le padding, la bordure et la marge extérieure. Le fond de l’élément couvre son contenu et son padding ; sa marge reste extérieure à ce fond.

### padding : l’espace intérieur

`padding` éloigne le contenu de sa bordure. Augmenter le padding ne sépare pas directement deux bordures voisines : cela agrandit l’espace à l’intérieur de chacune.

```html preview title="Même texte, deux paddings" height=180
<div class="carte">Padding de 4 px</div>
<div class="carte large">Padding de 24 px</div>
<style>
  .carte { padding: 4px; border: 2px solid #1d4ed8; background: #dbeafe; }
  .large { padding: 24px; }
</style>
```

### margin : les marges extérieures

`margin` éloigne la boîte de son environnement. Une marge ne reçoit pas la couleur du fond de l’élément. Les quatre côtés peuvent être réglés séparément ou avec un raccourci.

| Syntaxe | Répartition |
|---|---|
| `margin: 12px` | Quatre côtés |
| `margin: 12px 24px` | Haut/bas : 12 ; gauche/droite : 24 |
| `margin: 12px 24px 8px` | Haut : 12 ; gauche/droite : 24 ; bas : 8 |
| `margin: 12px 24px 8px 4px` | Haut, droite, bas, gauche |

Ces raccourcis valent aussi pour le padding. En flux normal, certaines marges verticales de blocs fusionnent : deux marges positives de 20 et 30 px peuvent produire 30 px, pas 50. Ce phénomène ne concerne pas les marges entre éléments flex ou grid. `margin-inline: auto` peut centrer un bloc dont la largeur est inférieure à celle de son conteneur.

```html preview title="La marge se trouve hors du fond bleu" height=180
<div class="zone"><div class="boite">Contenu</div></div>
<style>
  .zone { display: flow-root; background: #fef08a; }
  .boite { margin: 24px; padding: 12px; border: 3px solid #1e3a8a; background: #dbeafe; }
</style>
```

Le bleu clair montre contenu et padding, le trait bleu foncé la bordure, le jaune la zone extérieure rendue visible par la marge. Le parent utilise `flow-root` pour éviter ici la fusion de marges avec son enfant.

### border et box-sizing : le calcul des dimensions

`border: 2px solid #1d4ed8` combine épaisseur, style et couleur. `border-radius` arrondit les coins sans définir une nouvelle marge. Avec `content-box`, la largeur déclarée concerne le contenu : une largeur de 240 px, un padding de 16 px de chaque côté et une bordure de 2 px donnent **276 px hors marge** (`240 + 2 × 16 + 2 × 2`). Avec `border-box`, les 240 px incluent padding et bordures : le contenu dispose de 204 px.

```html live title="Comparer content-box et border-box"
<div class="boite">content-box : 276 px hors marge</div>
<div class="boite incluse">border-box : 240 px hors marge</div>
<style>
  .boite { width: 240px; padding: 16px; border: 2px solid #1d4ed8; margin: 8px; background: #dbeafe; }
  .incluse { box-sizing: border-box; }
</style>
```

Une unité `px` est un pixel CSS ; `rem` dépend de la taille de police de la racine. Avec `border-box`, augmenter le padding réduit la largeur disponible pour le contenu tant que la largeur totale peut respecter les contraintes.

<a id="display"></a>

## Les modes d’affichage avec display

| Valeur | Comportement courant |
|---|---|
| `block` | Nouvelle ligne et largeur disponible en flux normal |
| `inline` | Contenu dans la ligne ; width et height ne règlent pas sa boîte comme un bloc |
| `inline-block` | Dans la ligne, avec largeur et hauteur réglables |
| `none` | Élément retiré de la mise en page et de l’arbre d’accessibilité |
| `flex`, `grid` | Organisation des enfants directs |

Changer `display` ne change pas le rôle sémantique d’une balise. Un lien reste un lien même présenté comme un bloc. `visibility: hidden` conserve l’espace, contrairement à `display: none`.

<a id="flex"></a>

## Organiser les éléments avec Flexbox

### display: flex et flex-direction

`display: flex` s’applique au parent ; ses enfants directs deviennent les éléments flex. `flex-direction: row` organise selon la direction de la ligne, `column` selon celle de la colonne. L’axe transversal est perpendiculaire à l’axe principal.

```html live title="Les axes d’un conteneur Flexbox"
<div class="ligne"><span>A</span><span class="grand">B</span><span>C</span></div>
<style>
  .ligne { display: flex; flex-direction: row; min-height: 140px; border: 2px dashed #1d4ed8; }
  span { padding: 12px; background: #dbeafe; }
  .grand { font-size: 2rem; }
</style>
```

Les trois enfants sont placés en ligne. Passer à `column` les empile et change les axes. Les valeurs `row-reverse` et `column-reverse` changent l’affichage sans réordonner le DOM : évitez une contradiction entre lecture visuelle et navigation clavier.

### justify-content et align-items

`justify-content` distribue l’espace libre sur l’axe principal : `flex-start`, `center`, `flex-end`, `space-between`, `space-around` et `space-evenly` offrent des répartitions différentes. `align-items` agit sur l’axe transversal : `stretch`, `center`, `flex-start`, `flex-end`, `baseline`. `stretch` étire les éléments dont la taille transversale est automatique.

```html live title="Alignement et espace disponible"
<div class="ligne"><span>A</span><span class="grand">B</span><span>C</span></div>
<style>
  .ligne { display: flex; justify-content: space-between; align-items: center; min-height: 160px; border: 2px dashed #1d4ed8; }
  span { padding: 12px; background: #dbeafe; }
  .grand { font-size: 2rem; }
</style>
```

A et C se rapprochent des extrémités, et les centres des trois boîtes s’alignent transversalement. `justify-content` a peu d’effet s’il ne reste aucun espace à distribuer. L’appliquer aux enfants ne les répartit pas dans leur parent.

### flex-wrap et gap

`flex-wrap: wrap` autorise plusieurs lignes quand la place manque. `gap` réserve des gouttières entre les éléments ou les lignes d’un conteneur flex ou grid. Il ne crée pas d’espace au bord extérieur et n’est donc pas interchangeable avec `margin` ou le padding du parent.

```html live title="Retour à la ligne et gouttières"
<div class="liste"><span>A</span><span>B</span><span>C</span></div>
<style>
  .liste { display: flex; flex-wrap: wrap; gap: 16px; max-width: 300px; border: 2px dashed #1d4ed8; }
  span { flex: 0 0 120px; padding-block: 12px; background: #dbeafe; }
</style>
```

Deux éléments de 120 px et leur gouttière tiennent dans 300 px ; le troisième passe à la ligne. La gouttière mesure 16 px ; aucun padding n’a été ajouté au conteneur.

### flex-grow, flex-shrink et flex-basis

Ces propriétés appartiennent aux enfants. `flex-basis` définit la taille de base sur l’axe principal ; `flex-grow` partage l’espace positif selon des proportions ; `flex-shrink` répartit la réduction en tenant compte des tailles de base. Le raccourci `flex: 1 1 160px` signifie grandir, rétrécir et partir de 160 px.

```html live title="Partager l’espace disponible"
<div class="liste"><span>A : grow 1</span><span class="double">B : grow 2</span></div>
<style>
  .liste { display: flex; gap: 12px; }
  span { flex: 1 1 100px; min-width: 0; padding-block: 12px; background: #dbeafe; }
  .double { flex-grow: 2; }
</style>
```

Au-delà des bases et de la gouttière, B reçoit deux parts de l’espace libre et A une part. B ne mesure pas nécessairement deux fois A : chacun possède déjà sa base de 100 px. La grille à pistes communes sera étudiée dans [CSS Grid](/semestre_1/integration/grid).
