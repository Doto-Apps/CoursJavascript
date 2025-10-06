---
layout: "layouts/Layout.astro"
title: "Sélecteurs CSS & Flexbox — Cours CSS (rendus visuels aux couleurs du site)"
type: "CM"
---

CSS (Cascading Style Sheets) permet de **styliser** les pages HTML. On décrit **où** appliquer un style (le **sélecteur**) et **quoi** appliquer (les **propriétés** et leurs **valeurs**).
> NB : Les **blocs de code** ci-dessous sont en **CSS/HTML pur**.  
> Les **rendus visuels** (les petites démos) sont du **HTML** qui peut recevoir tes classes *site* (ex. `bg-primary`, `bg-secondary`, etc.) côté Astro/Tailwind **uniquement pour l’aperçu**.

---

## 1) Cibler un élément : 3 façons essentielles

1) **Par type de balise** — cible toutes les balises d’un même nom (`p`, `h1`, `a`, …).  
2) **Par identifiant** — cible un **élément unique** portant `id="..."`.  
3) **Par classe** — cible un ou plusieurs éléments portant `class="..."`.

### Code (CSS + HTML)

```css
/* Sélecteur de type */
p { color: #333; }

/* Sélecteur d'ID */
#entete { background: #f0f8ff; padding: 1rem; }

/* Sélecteur de classe */
.carte { border: 1px solid #ccc; padding: .5rem; border-radius: .5rem; }
```

```html
<div id="entete">Je suis l'entête (ID unique)</div>
<p>Paragraphe 1 (tous les &lt;p&gt; deviennent gris foncé).</p>
<p class="carte">Paragraphe 2 dans une "carte".</p>
```

### Rendu visuel (HTML d’exemple — couleurs du site)
<div class="border border-gray-300 p-4 rounded-md font-sans text-sm space-y-2">
  <div class="bg-primary/10 text-primary p-4 rounded-md">Je suis l'entête (ID unique)</div>
  <p class="text-gray-700">Paragraphe 1 (tous les &lt;p&gt; deviennent gris foncé).</p>
  <p class="border border-gray-300 rounded-md p-2">Paragraphe 2 dans une « carte ».</p>
</div>

---

## 2) Sélecteur vs Propriétés : bien comprendre

- **Sélecteur** : indique **où** s’applique le style (ex. `p`, `#entete`, `.carte`, `nav ul li a`…).  
- **Propriétés** : indiquent **quoi** changer (ex. `color`, `background`, `padding`, `font-size`…).  
- **Valeurs** : précisent **comment** (ex. `color: red;`, `padding: 8px;`).

### Code (CSS + HTML)

```css
/* Sélecteur = .bouton | Propriétés = background, color, padding, border-radius, border */
.bouton {
  background: #007bff;
  color: #fff;
  padding: .6rem 1rem;
  border-radius: .5rem;
  border: none;
  cursor: pointer;
}
.bouton:hover { background: #0065d1; }
```

```html
<button class="bouton">Bouton stylisé</button>
```

### Rendu visuel (HTML d’exemple — couleurs du site)
<div class="border border-primary/40 p-6 rounded-md flex justify-center items-center">
  <button class="bg-primary text-white px-4 py-2 rounded-md border-0 hover:bg-primary/90 transition">Bouton stylisé</button>
</div>

---

## 3) Combinateurs utiles : descendant & enfant direct

- **Descendant (espace)** `A B` : cible **tout** `B` à l’intérieur de `A` (peu importe la profondeur).  
- **Enfant direct (>)** `A > B` : cible uniquement les `B` **enfants directs** de `A`.

### Code (CSS + HTML)

```css
/* Tout lien à l'intérieur d'un .carte, même profondément imbriqué */
.carte a { color: #0056b3; text-decoration: underline; }

/* Seulement les <li> qui sont enfants directs d'un <ul> sous .menu */
.menu > ul > li { list-style: "• "; padding-left: .25rem; }
```

```html
<div class="carte">
  <p>Un <a href="#">lien</a> stylisé.</p>
  <div><span>Imbrication profonde avec <a href="#">un autre lien</a>.</span></div>
</div>

<nav class="menu">
  <ul>
    <li>Élément 1</li>
    <li>Élément 2</li>
  </ul>
  <div>
    <ul>
      <li>(Non ciblé par .menu > ul > li)</li>
    </ul>
  </div>
</nav>
```

### Rendu visuel (HTML d’exemple — couleurs du site)
<div class="border border-gray-300 rounded-md p-3 font-sans text-sm">
  <p>Un <a href="#" class="text-primary underline">lien</a> stylisé.</p>
  <div><span>Imbrication profonde avec <a href="#" class="text-primary underline">un autre lien</a>.</span></div>
</div>
<nav class="mt-3">
  <ul class="ml-4 space-y-1">
    <li class="list-disc marker:text-secondary">Élément 1</li>
    <li class="list-disc marker:text-secondary">Élément 2</li>
  </ul>
  <div>
    <ul class="ml-4 mt-2">
      <li class="opacity-70">(Non enfant direct du premier ul)</li>
    </ul>
  </div>
</nav>

---

## 4) Flexbox pas à pas (en **CSS pur**)

Flexbox facilite la mise en page **1D** (lignes ou colonnes). On l’active avec `display: flex` sur le **conteneur**.

### 4.1 Avant / après `display: flex`

#### Code (sans flex)

```html
<section class="boites">
  <div class="b">A</div>
  <div class="b">B</div>
  <div class="b">C</div>
</section>
```

```css
.boites .b {
  display: inline-block;
  width: 60px; height: 60px;
  background: #eaeaea; border: 1px solid #ccc;
  margin: .25rem; text-align: center; line-height: 60px; border-radius: .5rem;
}
```

### Rendu sans flex (HTML d’exemple — couleurs du site)
<div class="border border-gray-300 p-2 rounded-md">
  <span class="inline-block w-16 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md align-middle">A</span>
  <span class="inline-block w-16 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md align-middle">B</span>
  <span class="inline-block w-16 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md align-middle">C</span>
</div>

#### Code (avec flex)

```css
.boites-flex { display: flex; gap: .5rem; }
.boites-flex .b {
  width: 60px; height: 60px;
  background: #eaeaea; border: 1px solid #ccc;
  text-align: center; line-height: 60px; border-radius: .5rem;
}
```

```html
<section class="boites-flex">
  <div class="b">A</div>
  <div class="b">B</div>
  <div class="b">C</div>
</section>
```

### Rendu avec flex (HTML d’exemple — couleurs du site)
<div class="flex gap-2 border border-gray-300 p-2 rounded-md">
  <div class="w-16 h-16 bg-primary/10 border border-primary text-primary text-center leading-[4rem] rounded-md">A</div>
  <div class="w-16 h-16 bg-primary/10 border border-primary text-primary text-center leading-[4rem] rounded-md">B</div>
  <div class="w-16 h-16 bg-primary/10 border border-primary text-primary text-center leading-[4rem] rounded-md">C</div>
</div>

---

### 4.2 Axe principal & axe transversal

- **Axe principal** : `flex-direction` (`row` par défaut → horizontal).  
- **Axe transversal** : perpendiculaire à l’axe principal.

#### Code (CSS + HTML)

```css
.ligne { display: flex; flex-direction: row; gap: .5rem; }
.colonne { display: flex; flex-direction: column; gap: .5rem; }
```

```html
<div class="ligne">
  <div class="b">1</div><div class="b">2</div><div class="b">3</div>
</div>
<div class="colonne">
  <div class="b">1</div><div class="b">2</div><div class="b">3</div>
</div>
```

### Flex direction : Row
<div class="flex flex-row gap-2 mb-3">
  <div class="w-16 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md">1</div>
  <div class="w-16 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md">2</div>
  <div class="w-16 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md">3</div>
</div>

### Flex direction : Column
<div class="flex flex-col gap-2">
  <div class="w-16 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md">1</div>
  <div class="w-16 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md">2</div>
  <div class="w-16 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md">3</div>
</div>

---

### 4.3 `justify-content` (axe **principal**)

Valeurs fréquentes : `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`.

#### Code (CSS + HTML)

```css
.demo-justify { display: flex; gap: .5rem; padding: .5rem; border: 1px dashed #ddd; background: #f9f9f9; }
.jc-start   { justify-content: flex-start; }
.jc-center  { justify-content: center; }
.jc-end     { justify-content: flex-end; }
.jc-between { justify-content: space-between; }
.jc-around  { justify-content: space-around; }
.jc-evenly  { justify-content: space-evenly; }
.demo-justify .b { width:60px; height:60px; border:1px solid #ccc; text-align:center; line-height:60px; border-radius:.5rem; background:#eaeaea; }
```

```html
<div class="demo-justify jc-start"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>
<div class="demo-justify jc-center"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>
<div class="demo-justify jc-end"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>
<div class="demo-justify jc-between"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>
<div class="demo-justify jc-around"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>
<div class="demo-justify jc-evenly"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>
```

### Justify-Content : flex-start
<div class="flex gap-2 p-2 mb-2 border border-gray-300 rounded-md justify-start bg-primary/5">
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">A</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">B</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">C</div>
</div>

### Justify-Content : center
<div class="flex gap-2 p-2 mb-2 border border-gray-300 rounded-md justify-center bg-primary/5">
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">A</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">B</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">C</div>
</div>

### Justify-Content : flex-end
<div class="flex gap-2 p-2 mb-2 border border-gray-300 rounded-md justify-end bg-primary/5">
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">A</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">B</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">C</div>
</div>

### Justify-Content : space-between
<div class="flex p-2 mb-2 border border-gray-300 rounded-md justify-between bg-primary/5">
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">A</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">B</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">C</div>
</div>

### Justify-Content : space-around
<div class="flex p-2 mb-2 border border-gray-300 rounded-md justify-around bg-primary/5">
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">A</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">B</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">C</div>
</div>

### Justify-Content : space-evenly
<div class="flex p-2 mb-2 border border-gray-300 rounded-md justify-evenly bg-primary/5">
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">A</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">B</div>
  <div class="w-16 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md">C</div>
</div>

---

### 4.4 `align-items` (axe **transversal**)

Valeurs : `stretch` (défaut), `flex-start`, `center`, `flex-end`, `baseline`.

#### Code (CSS + HTML)

```css
.wrap { display:flex; gap:.5rem; height:100px; border:1px dashed #ddd; padding:.5rem; background:#f9f9f9; }
.wrap .b { width:60px; border:1px solid #ccc; text-align:center; border-radius:.5rem; background:#eaeaea; }
.ai-stretch  { align-items: stretch; }
.ai-start    { align-items: flex-start; }
.ai-center   { align-items: center; }
.ai-end      { align-items: flex-end; }
.ai-baseline { align-items: baseline; }
```

```html
<div class="wrap ai-stretch">
  <div class="b" style="height:40px;line-height:40px;">A</div>
  <div class="b" style="height:60px;line-height:60px;">B</div>
  <div class="b" style="height:80px;line-height:80px;">C</div>
</div>

<div class="wrap ai-start">
  <div class="b" style="height:40px;line-height:40px;">A</div>
  <div class="b" style="height:60px;line-height:60px;">B</div>
  <div class="b" style="height:80px;line-height:80px;">C</div>
</div>

<div class="wrap ai-center">
  <div class="b" style="height:40px;line-height:40px;">A</div>
  <div class="b" style="height:60px;line-height:60px;">B</div>
  <div class="b" style="height:80px;line-height:80px;">C</div>
</div>

<div class="wrap ai-end">
  <div class="b" style="height:40px;line-height:40px;">A</div>
  <div class="b" style="height:60px;line-height:60px;">B</div>
  <div class="b" style="height:80px;line-height:80px;">C</div>
</div>

<div class="wrap ai-baseline">
  <div class="b" style="height:40px; line-height:40px; font-size:12px;">A</div>
  <div class="b" style="height:60px; line-height:60px; font-size:24px;">B</div>
  <div class="b" style="height:80px; line-height:80px; font-size:16px;">C</div>
</div>
```

### align-items: stretch
<div class="flex gap-2 bg-primary/5 p-2 h-24 border border-gray-300 rounded-md items-stretch mb-2">
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-10 leading-10">A</div>
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-14 leading-[3.5rem]">B</div>
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-20 leading-[5rem]">C</div>
</div>

### align-items: flex-start
<div class="flex gap-2 bg-primary/5 p-2 h-24 border border-gray-300 rounded-md items-start mb-2">
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-10 leading-10">A</div>
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-14 leading-[3.5rem]">B</div>
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-20 leading-[5rem]">C</div>
</div>

### align-items: center
<div class="flex gap-2 bg-primary/5 p-2 h-24 border border-gray-300 rounded-md items-center mb-2">
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-10 leading-10">A</div>
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-14 leading-[3.5rem]">B</div>
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-20 leading-[5rem]">C</div>
</div>

### align-items: flex-end
<div class="flex gap-2 bg-primary/5 p-2 h-24 border border-gray-300 rounded-md items-end mb-2">
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-10 leading-10">A</div>
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-14 leading-[3.5rem]">B</div>
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-20 leading-[5rem]">C</div>
</div>

### align-items: baseline
<div class="flex gap-2 bg-primary/5 p-2 h-24 border border-gray-300 rounded-md items-baseline">
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-10 leading-10 text-xs">A</div>
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-14 leading-[3.5rem] text-2xl">B</div>
  <div class="w-16 bg-secondary/20 border border-gray-300 text-center rounded-md h-20 leading-[5rem] text-base">C</div>
</div>

---

### 4.5 `flex-direction`, `gap`, `flex-wrap`

#### Code (CSS + HTML)

```css
.demo-flex { display:flex; gap:.5rem; border:1px dashed #ddd; padding:.5rem; margin-bottom:.5rem; }
.row { flex-direction: row; }
.column { flex-direction: column; }
.nowrap { flex-wrap: nowrap; }
.wrapit { flex-wrap: wrap; }
.demo-flex .b {
  width: 120px; height: 60px;
  background:#eaeaea; border:1px solid #ccc; text-align:center; line-height:60px; border-radius:.5rem;
}
```

```html
<div class="demo-flex row nowrap">
  <div class="b">1</div><div class="b">2</div><div class="b">3</div>
</div>
<div class="demo-flex column nowrap">
  <div class="b">1</div><div class="b">2</div><div class="b">3</div>
</div>
<div class="demo-flex row wrapit">
  <div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div>
</div>
```

### No wrap
<div class="flex flex-row gap-2 border border-gray-300 p-2 rounded-md mb-2">
  <div class="w-28 h-16 bg-primary/10 border border-primary text-primary text-center leading-[4rem] rounded-md">1</div>
  <div class="w-28 h-16 bg-primary/10 border border-primary text-primary text-center leading-[4rem] rounded-md">2</div>
  <div class="w-28 h-16 bg-primary/10 border border-primary text-primary text-center leading-[4rem] rounded-md">3</div>
</div>

### Wrap
<div class="flex flex-row flex-wrap gap-2 border border-gray-300 p-2 rounded-md mb-2 max-w-[260px]">
  <div class="w-28 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md">1</div>
  <div class="w-28 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md">2</div>
  <div class="w-28 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md">3</div>
  <div class="w-28 h-16 bg-secondary/10 border border-gray-300 text-center leading-[4rem] rounded-md">4</div>
</div>

---

### 4.6 Exemple synthèse : `display:flex` + `justify-content` + `align-items`

#### Code (CSS + HTML)

```css
.synthese {
  display: flex;                 /* activer flex */
  flex-direction: row;           /* axe principal horizontal */
  justify-content: space-between;/* répartir sur l'axe principal */
  align-items: center;           /* centrer sur l'axe transversal */
  gap: 1rem;
  padding: 1rem;
  background: #f6f9fc;
  border: 1px solid #e5eaf0;
  border-radius: .75rem;
}
.synthese .item {
  width: 120px; height: 60px;
  background: #eaeaea;
  border: 1px solid #ccc;
  text-align: center; line-height: 60px; border-radius: .5rem; font-weight: 600;
}
```

```html
<section class="synthese">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</section>
```

### Aligné verticalement et horizontalement
<section class="flex flex-row justify-between items-center gap-4 p-4 h-48 bg-primary/5 border border-primary/30 rounded-lg">
  <div class="w-28 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md font-semibold">A</div>
  <div class="w-28 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md font-semibold">B</div>
  <div class="w-28 h-16 bg-secondary text-white text-center leading-[4rem] rounded-md font-semibold">C</div>
</section>

---

## 5) Résumé rapide

- **Sélecteur** = *où* appliquer (type, `#id`, `.classe`, combinateurs `A B`, `A > B`…).  
- **Propriétés** = *quoi* appliquer (`color`, `padding`, `background`, …).  
- **Flexbox** = mise en page 1D : activer avec `display:flex`, piloter l’axe avec `flex-direction`,  
  distribuer sur l’axe principal avec `justify-content`, aligner sur l’axe transversal avec `align-items`, gérer l’espace avec `gap`, retourner à la ligne avec `flex-wrap`.

---

### Mini-fiche Flex (valeurs clés)

- `display: flex | inline-flex`  
- `flex-direction: row | row-reverse | column | column-reverse`  
- `justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly`  
- `align-items: stretch | flex-start | center | flex-end | baseline`  
- `gap: <longueur>`  
- `flex-wrap: nowrap | wrap | wrap-reverse`

---

## 6) Atelier : expérimentez

1) Créez trois boîtes.  
2) Ajoutez `display: flex` sur le parent.  
3) Testez toutes les valeurs de **`justify-content`** et **`align-items`**.  
4) Alternez `flex-direction`.  
5) Ajoutez `gap` et testez `flex-wrap`.

### Code de départ (CSS + HTML)

```html
<section class="stage">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</section>
```

```css
/* Styles de base */
.stage { border:1px dashed #ddd; padding:.5rem; margin:.5rem 0; }

/* Activez/désactivez progressivement ces lignes : */
/* .stage { display:flex; } */
/* .stage { display:flex; justify-content:center; } */
/* .stage { display:flex; justify-content:space-between; align-items:center; } */
/* .stage { display:flex; flex-direction:column; align-items:flex-end; gap:.5rem; } */

.box {
  width: 80px; height: 60px; line-height: 60px;
  text-align:center; border:1px solid #ccc; background:#eaeaea; border-radius:.5rem;
  font-weight:600;
}
```
