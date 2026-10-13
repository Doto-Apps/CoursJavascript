---
layout: "layouts/Layout.astro"
title: "Tailwind : comprendre les classes utilitaires"
type: "TD"
order: 1
nextSession: "/semestre_2/integration/td/tailwind-composants"
---

<a id="comprendre"></a>

## Classes utilitaires, composants et balises

Un utilitaire réalise une tâche de style ciblée. Un composant combine une structure HTML et plusieurs règles. Ajouter `font-bold` à un paragraphe ne le transforme pas en titre : le rôle reste déterminé par sa balise.

| Classe | Déclaration ou effet | À reconnaître |
|---|---|---|
| `flex` | `display: flex` | La disposition du parent. |
| `grid` | `display: grid` | Des pistes communes. |
| `p-4` | Padding de l’échelle d’espacement. | L’espace intérieur, pas la marge. |
| `gap-4` | Espacement entre enfants flex/grid. | Le parent doit utiliser la bonne disposition. |
| `text-center` | Texte aligné au centre. | Ne centre pas la boîte dans son parent. |
| `font-bold` | Graisse du texte. | Ne change pas le niveau du titre. |

## La compilation des classes Tailwind

Le navigateur ne connaît pas spontanément ces classes. Le projet doit charger une feuille qui contient leurs règles. La compilation Tailwind repère les classes utilisées et génère le CSS. Le compilateur fourni dans les aperçus du cours sert aux essais ; le projet remis doit suivre les commandes de compilation du support.

Les démonstrations locales utilisent Tailwind 3.4.17. Les instructions de projet doivent annoncer leur version : Tailwind 4 utilise un autre mode d’installation et d’import CSS. Mélanger un tutoriel v3 et une commande v4 peut donner un projet qui semble correct mais ne génère aucune règle attendue.

## Les variantes d’état et de largeur

`hover:bg-blue-700` concerne l’état de survol ; `focus-visible:outline` concerne un repère de focus ; `md:grid-cols-2` applique deux colonnes au seuil `md` et au-delà, selon la configuration de la version. Le préfixe ne choisit pas une marque de téléphone. Les classes sans préfixe donnent la base.

Construisez une petite carte avec des classes complètes et explicites. Dans un projet compilé, fabriquer une classe comme `'bg-' + couleur + '-500'` peut empêcher sa détection. Préférez un choix parmi des noms complets présents dans les fichiers analysés.

<a id="apprentissage"></a>

## La syntaxe des classes utilitaires

Tailwind est un framework CSS utilitaire : une classe fournit une règle limitée, puis plusieurs classes construisent un composant. `p-4` ajoute du padding ; `m-4` ajoute une marge. Ce n’est pas un langage HTML différent. Les balises gardent leur sens, leurs attributs et leurs responsabilités d’accessibilité.

Le projet de cours utilise **Tailwind 3.4**, comme le site existant. L’aperçu charge le compilateur pédagogique Tailwind 3.4.17 depuis les fichiers du site : aucune connexion à un CDN n’est nécessaire et les nouvelles classes saisies sont prises en compte automatiquement. Ce compilateur dans le navigateur sert aux essais. Dans votre projet livré, utilisez la compilation CLI décrite ci-dessous et chargez la feuille CSS produite ; ne recopiez pas le chemin interne `/vendor/` du site de cours.

```html
<article class="rounded-lg border border-slate-300 bg-white p-4 shadow-md">
  <h2 class="text-xl font-bold text-slate-900">Atelier photo</h2>
  <p class="mt-2 text-slate-700">Une première rencontre autour de l’image.</p>
  <a class="mt-4 inline-block text-blue-700 underline" href="#contact">
    Découvrir l’atelier photo
  </a>
</article>
```

**Lecture accompagnée :** la balise `article` décrit la fiche ; la classe `p-4` règle son espace intérieur. `mt-2` crée un espace avant le paragraphe. `text-xl` règle la taille et `text-slate-700` la couleur : le préfixe seul ne suffit pas pour deviner la propriété.

```html live title="Lire les utilitaires d’une carte"
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
    </style>
    <script src="/vendor/tailwind/tailwind-3.4.17.js"></script>

<h1>Une fiche, plusieurs utilitaires</h1>
    <section class="grid grid-cols-1 gap-4">
      <article
        class="rounded-lg border border-slate-300 bg-white p-4 shadow-md"
      >
        <h2 class="text-xl font-bold text-slate-900">Atelier photo</h2>
        <p class="mt-2 text-slate-700">
          Une première rencontre autour de l’image.
        </p>
        <a class="mt-4 inline-block text-blue-700 underline" href="#contact">
          Découvrir l’atelier
        </a>
      </article>
    </section>
    <p id="contact">Contact : association du campus.</p>
    <p class="note">
      Tailwind 3.4.17 généré dans cet aperçu pédagogique. Essayez p-8, m-4 ou
      grid-cols-3.
    </p>

    <script></script>
```

## Installation et compilation de Tailwind 3.4

Dans un dossier neuf avec Node/npm disponibles : `npm init -y`, puis `npm install -D tailwindcss@3.4` et `npx tailwindcss init`. Le fichier de configuration doit scanner vos fichiers, par exemple `content: ['./*.html', './js/*.js']`. Dans `input.css`, ajoutez les trois directives `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`, puis lancez `npx tailwindcss -i input.css -o styles.css --watch`. Le HTML charge `styles.css` avec un `link rel="stylesheet"`. Ces commandes concernent la version 3.4 ; ne mélangez pas les procédures des versions 3 et 4.

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Utilitaires | Une classe utilitaire exprime une règle CSS limitée. |
| <a id="notion-2"></a>Padding | p-4 règle l'espace intérieur du composant. |
| <a id="notion-3"></a>Marge | m-4 règle la marge extérieure. |
| <a id="notion-4"></a>Marge supérieure | mt-2 ajoute une marge en haut. |
| <a id="notion-5"></a>Taille | text-xl règle la taille du texte. |
| <a id="notion-6"></a>Couleur du texte | text-slate-700 règle la couleur du texte. |
| <a id="notion-7"></a>Fond | bg-white donne un fond blanc. |
| <a id="notion-8"></a>Graisse | font-bold donne une graisse de texte élevée. |
| <a id="notion-9"></a>Bordure | border active une bordure ; border-slate-300 en règle la couleur. |
| <a id="notion-10"></a>Coins | rounded-lg arrondit les coins. |
| <a id="notion-11"></a>Ombre | shadow-md ajoute une ombre. |
| <a id="notion-12"></a>Grid | grid active la mise en page Grid sur le parent. |
| <a id="notion-13"></a>Colonnes | grid-cols-3 définit trois colonnes d'une grille active. |
| <a id="notion-14"></a>Flexbox | flex active Flexbox sur le parent. |
| <a id="notion-15"></a>Espacement | gap-4 règle l'espace entre les éléments du parent Grid ou Flex. |
| <a id="notion-16"></a>Sémantique | article décrit une fiche autonome ; les classes ne changent pas ce sens. |
| <a id="notion-17"></a>Compilation | Tailwind 3.4 génère une feuille CSS à partir des classes détectées. |
| <a id="notion-18"></a>Sources analysées | La configuration content indique les fichiers où chercher les classes. |
| <a id="notion-19"></a>Surveillance | --watch relance la compilation après les modifications surveillées. |
| <a id="notion-20"></a>Version | Les commandes de ce support ciblent Tailwind 3.4. |
