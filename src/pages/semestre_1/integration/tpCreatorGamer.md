---
layout: "layouts/Layout.astro"
title: "TP : Profils Flexbox (Gamer / Creator)"
type: "TP"
---

---

## Objectifs du TP

1. Construire une page de **profils** (au choix : tableau de bord *Gamer* ou galerie *Creator/Influencer*).
2. Utiliser **Flexbox** pour mettre en page :
   - la structure générale de la page,
   - les cartes de profils,
   - les mini-cartes de statistiques.
3. Travailler une **charte graphique cohérente** :
   - thème sombre pour l’option **Gamer**,
   - thème clair type **Insta** pour l’option **Creator**.
4. Réutiliser vos connaissances HTML/CSS **sans que tout le code soit donné**.

> ⚠️ Vous choisissez **une seule option** :  
> **Option 1 – Gamer** *ou* **Option 2 – Creator**.  
> Le but est de travailler la mise en page et les Flexbox, pas de recopier un exemple.

---

## Présentation générale

Vous devez créer une page de profils avec :

- Un **header** (titre du site + petit menu de navigation).
- Un **conteneur principal** centré.
- Plusieurs **sections** (une section par jeu ou par catégorie de créateurs).
- Dans chaque section : des **cartes de profils**.
- Dans chaque carte de profil : des **mini-cartes de stats**.

La structure HTML globale sera **très proche** entre les deux options.  
Ce qui change surtout :

- les **textes**,
- les **couleurs**,
- le **thème graphique** (sombre vs clair).

---

## Option 1 – Tableau de bord “Gamer” (thème sombre)

> 🎮 Thème : ambiance sombre, style “dashboard” gaming, plusieurs jeux (CS:GO, Apex, Valorant, LoL…).

### Aperçu intégré (exemple)

**Un exemple de rendu** sera affiché juste en dessous (dans le cours) :

<section class="preview-wrapper">
  <h3>Aperçu (Option 1 – Tableau de bord Gamer)</h3>
  <div class="preview-frame">
    <iframe
      src="/exercises/html_example/gamer/index.html"
      loading="lazy"
    ></iframe>
  </div>
</section>

<style>
  .preview-wrapper {
    margin: 2rem 0;
  }

  .preview-frame {
    max-width: 900px;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid #ddd;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }

  .preview-frame iframe {
    width: 100%;
    height: 500px;
    border: none;
  }
</style>

<!-- Le chemin dans "src" sera remplacé par le lien vers un exemple dans les assets. -->

### Ce que votre page doit contenir (Option Gamer)

- Un **nom de site**, par exemple :  
  “Top Gamers Board”, “Esport Highlights”, etc.
- Un **menu** dans le header avec des liens vers vos jeux :
  - `CS:GO`, `Apex`, `Valorant`, `LoL` (minimum 3 jeux).
- Pour **chaque jeu**, une section avec :
  - un titre (nom du jeu),
  - un sous-titre / petite phrase descriptive,
  - plusieurs **cartes de joueurs** (au moins 2 joueurs par jeu).

Chaque **carte de joueur** doit afficher :

- un **pseudo**,
- un **rôle** (Sniper, Support, Jungler, etc.),
- un **rang** (Global Elite, Radiant, Master…),
- éventuellement :
  - temps de jeu,
  - nombre de tournois,
  - “forme” actuelle, region, etc.
- une zone “stats” avec plusieurs **mini-cartes** :
  - K/D ou KDA,
  - Winrate,
  - Headshot %,
  - Dégâts moyens / partie, etc.

Ambiance visuelle (idées) :

- Fond général **sombre** (bleu nuit, gris très foncé).
- Cartes légèrement plus claires, bords arrondis.
- Quelques couleurs “néon” (vert, violet, bleu électrique).
- Un léger effet `:hover` sur les cartes (ombre, bord coloré…).

---

## Option 2 – Galerie “Creator / Insta-like” (thème clair)

> 📸 Thème : ambiance claire, douce, type Insta / portfolio de créateurs.


### Aperçu intégré (exemple)

**Un exemple de rendu** sera affiché juste en dessous (dans le cours) :

<section class="preview-wrapper">
  <h3>Aperçu (Option  – Tableau de bord Créateur)</h3>
  <div class="preview-frame">
    <iframe
      src="/exercises/html_example/creator/index.html"
      loading="lazy"
    ></iframe>
  </div>
</section>

<style>
  .preview-wrapper {
    margin: 2rem 0;
  }

  .preview-frame {
    max-width: 900px;
    border-radius: 1rem;
    overflow: hidden;
    border: 1px solid #ddd;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }

  .preview-frame iframe {
    width: 100%;
    height: 500px;
    border: none;
  }
</style>

Vous créez une page “**Creator Highlights**” avec plusieurs **catégories**, par exemple :

- Musique (chanteurs, beatmakers…)
- Art & Design (illustrateurs, photographes…)
- Gaming & Streaming (streamers, monteurs)
- Lifestyle & Vlog (vlogs, sport, études…)

Pour chaque **catégorie**, vous devez :

- créer une section avec :
  - un titre (ex. *Créateurs musique*),
  - un petit texte explicatif (ex. “Reprises, covers & prod maison”),
  - plusieurs **cartes de créateurs** (au moins 2 créateurs par catégorie).

Chaque **carte de créateur** doit afficher :

- un **nom**,
- un **pseudo** au format `@monpseudo`,
- un **rôle / spécialité** (Vocal covers, Digital painting, Clips Valorant, Study vlog, etc.),
- éventuellement :
  - ville,
  - style (lo-fi, street photo, lifestyle…),
  - plateforme principale (YouTube, Insta, TikTok...),
- une zone “stats” avec plusieurs **mini-cartes**, par exemple :
  - nombre d’abonnés,
  - vues moyennes,
  - likes moyens,
  - enregistrements ou collaborations.

Ambiance visuelle (idées) :

- Fond général **clair** (blanc, gris très léger, dégradés pastel).
- Cartes blanches avec ombre douce, bords arrondis.
- Avatars ronds, éventuellement entourés d’un “anneau” coloré (rappel stories).
- Couleurs d’accent : rose/orange, bleu pastel, violet clair.

---

## Partie 1 : Structure HTML globale (commune aux deux options)

### Étape 1 : Conteneur principal et header

1. Créez un **conteneur principal** qui limite la largeur de la page :

   - Par exemple un `<main>` avec une largeur max et centré.
   - Utilisez les propriétés classiques pour le centrage.

   Exemple d’idée de CSS (à adapter, **ne copiez pas aveuglément**) :

   ```css
   .page {
     max-width: 1000px;
     margin: 0 auto;
     padding: 2rem 1rem;
     display: flex;
     flex-direction: column;
     gap: 2rem;
   }
   ```

2. Créez un **header** avec :

   - un titre (`<h1>` ou logo texte),
   - un menu (`<nav>` + liste de liens) pointant vers toutes vos sections (ancre avec `href="#idDeLaSection"`).

   L’alignement horizontal (titre à gauche, menu à droite) peut se faire avec Flexbox.

   Idée de base :

   ```css
   header {
     display: flex;
     justify-content: space-between;
     align-items: center;
   }
   ```

---

### Étape 2 : Sections de catégories (jeux ou types de créateurs)

Pour chaque jeu / catégorie :

1. Créez une balise `<section>` avec :
   - un **id** (ex. `id="csgo"` ou `id="music"`),
   - un titre `<h2>`,
   - un petit paragraphe descriptif `<p>`,
   - un conteneur pour les cartes de profils.

   Structure possible :

   ```html
   <section class="category" id="csgo">
     <h2>CS:GO</h2>
     <p>Petit texte qui présente la catégorie.</p>

     <div class="profiles">
       <!-- Cartes de profils -->
     </div>
   </section>
   ```

2. Le conteneur `.profiles` sera un **conteneur Flexbox** qui affiche les cartes côte à côte, avec retour à la ligne si besoin.

   Idée de base :

   ```css
   .profiles {
     display: flex;
     flex-wrap: wrap;
     gap: 1.5rem;
     justify-content: center;
   }
   ```

---

## Partie 2 : Cartes de profils (Flexbox dans la carte)

### Étape 3 : Structure d’une carte de profil

Chaque profil (joueur ou créateur) doit être dans un `<article>` ou une `<div>` avec une classe du type `.profile-card`.

À l’intérieur de la carte, on distingue 3 zones :

1. **En-tête** : avatar + nom/pseudo + rôle/rang.
2. **Meta** : infos secondaires (temps de jeu, ville, style, fréquence de post…).
3. **Stats** : mini-cartes de statistiques.

Structure HTML possible :

```html
<article class="profile-card">
  <div class="profile-header">
    <!-- Avatar + nom + rôle/rang -->
  </div>

  <div class="profile-meta">
    <!-- Infos secondaires -->
  </div>

  <div class="profile-stats">
    <!-- Mini-cartes de stats -->
  </div>
</article>
```

Vous devez remplir ces blocs avec **vos propres infos** (noms inventés, stats fictives mais cohérentes).

### Étape 4 : Flexbox dans l’en-tête de la carte

L’objectif est d’aligner :

- l’avatar et le bloc “nom + rôle” à gauche,
- une petite “pastille” ou texte (rang, spécialité…) à droite.

Par exemple :

```css
.profile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

À l’intérieur, vous pouvez créer une structure du type :

```html
<div class="profile-main">
  <!-- Avatar + bloc nom/rôle -->
</div>
<div class="profile-tag">
  <!-- Rang (Gamer) ou spécialité (Creator) -->
</div>
```

Et ensuite :

```css
.profile-main {
  display: flex;
  align-items: center;
  gap: 0.75rem; /* espace entre avatar et texte */
}
```

---

## Partie 3 : Mini-cartes de stats (Flexbox dans la zone stats)

### Étape 5 : Conteneur de stats

La zone `.profile-stats` doit contenir plusieurs petites “mini-cartes” de stats.

- `.profile-stats` doit être un **conteneur Flex** :
  - `display: flex;`
  - `flex-wrap: wrap;`
  - `gap: ...` pour espacer les stats.

Idée :

```css
.profile-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
```

### Étape 6 : Mini-carte individuelle

Chaque mini-carte de stats contient :

- un **label** (nom de la stat),
- une **valeur** (chiffre, pourcentage, etc.),
- éventuellement un emoji/icône.

Structure simple :

```html
<div class="stat-card">
  <div class="stat-label">K/D</div>
  <div class="stat-value">1.42</div>
</div>
```

Puis en CSS, vous pouvez leur donner :

- une taille minimum pour rester lisibles,
- un fond légèrement différent,
- des bordures arrondies.

Idée :

```css
.stat-card {
  min-width: 90px;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  /* Fond et bordure à choisir selon votre thème */
}
```

Les **statistiques changent** selon votre option :

- Option Gamer : K/D, Winrate, Headshot %, etc.
- Option Creator : Abonnés, vues moyennes, likes, enregistrements, etc.

---

## Partie 4 : Thème graphique et responsive simple

### Étape 7 : Thème visuel cohérent

- Choisissez une **palette de couleurs** adaptée à votre option :
  - Gamer : fond très sombre, texte clair, 1–2 couleurs d’accent “néon”.
  - Creator : fond clair, cartes blanches, accents pastel.

- Pensez à :
  - la lisibilité (contraste suffisant),
  - l’espace entre les cartes (`gap`, `margin`),
  - des bords arrondis pour les cartes (`border-radius`),
  - un peu d’ombre (`box-shadow`) sur les cartes pour les faire “flotter”.


---

## Partie 5 : Choix et imagination

Vous devez :

- **Inventer vos propres profils** (noms, pseudos, stats).
- **Structurer le HTML vous-mêmes** en respectant la logique expliquée.
- **Utiliser Flexbox** :
  - dans le header,
  - pour les conteneurs de cartes,
  - à l’intérieur des cartes si besoin.

> 🧠 L’objectif est que vous soyez capables de :
> - imaginer une structure,
> - choisir où appliquer Flexbox,
> - organiser des cartes et sous-cartes de manière claire.

---

## Barème (TP Profils Flexbox) — /20

| **Critère**                                  | **Description**                                                                                                         | **Points** |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|-----------:|
| **Structure HTML & organisation**            | Structure claire (header, sections, cartes). Code propre et bien organisé.                                             |       4 pts |
| **Utilisation de Flexbox**                   | Flexbox utilisé à bon escient (header, conteneurs de cartes, stats). Mise en page cohérente.                           |       6 pts |
| **Qualité visuelle & thème**                 | Thème respecté (sombre Gamer ou clair Insta). Palette de couleurs cohérente. Cartes lisibles et bien espacées.        |       4 pts |
| **Richesse des profils & stats**             | Profils variés, stats inventées mais crédibles, mini-cartes de stats bien distinctes.                                  |       4 pts |
| **Soin global & petits détails**             | Indentation, lisibilité du code, cohérence des noms de classes, petits plus (hover, légère adaptation mobile, etc.).   |       2 pts |

**Total : 20 points**

---

> 📌 Rappel :  
> Vous ne devez pas recopier un exemple complet. Inspirez-vous des structures proposées, mais **créez votre propre page**, vos propres cartes, vos propres stats.
