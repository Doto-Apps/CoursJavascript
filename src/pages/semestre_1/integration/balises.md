---
layout: "layouts/Layout.astro"
title: "Mémento des balises et attributs HTML"
hidden: true
---

Cette fiche accompagne les séances de structure. Choisissez une balise pour son sens, puis utilisez CSS pour son apparence. Les éléments ci-dessous ne sont pas une liste exhaustive : la [référence complète MDN](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements) décrit leurs attributs et règles d'imbrication.

## Le document

| Élément | Fonction | Exemple / attention |
|---|---|---|
| `<!doctype html>` | Déclaration du mode standard | Avant `html` ; ce n'est pas un élément de contenu. |
| `html` | Racine du document | `<html lang="fr">`. |
| `head` | Métadonnées | Encodage, titre, liens de styles. |
| `body` | Contenu de la page | Les zones visibles vont ici. |
| `title` | Nom du document | Nom de l'onglet, différent du titre principal visible. |
| `meta` | Métadonnée | `charset="utf-8"` et viewport ; élément vide. |
| `link` | Relation avec une ressource | `rel="stylesheet" href="css/styles.css"` ; élément vide. |
| `style` | Règles CSS internes | Pour un petit exemple ; privilégier une feuille commune pour le projet. |
| `script` | Script ou référence à un script | JavaScript, pas exécution de PHP dans le navigateur. |

## Zones et texte

| Élément | Fonction | Attention |
|---|---|---|
| `header` | Introduction d'une page ou section | Ce n'est pas le `head`. |
| `nav` | Bloc important de navigation | Contient des liens. |
| `main` | Contenu principal | Un contenu principal visible dans nos pages. |
| `section` | Partie thématique | Habituellement identifiée par un titre. |
| `article` | Unité de contenu autonome | Projet, fiche, article. |
| `aside` | Contenu complémentaire | Son rôle ne se définit pas seulement par sa position visuelle. |
| `footer` | Informations de fin | Mentions, contact, crédits. |
| `div` | Conteneur générique de bloc | Quand aucun rôle plus précis ne convient. |
| `span` | Conteneur générique dans le texte | Ne crée pas une section du document. |
| `h1` à `h6` | Titres hiérarchiques | Choisir le niveau pour le plan, pas pour la taille. |
| `p` | Paragraphe | Ne pas y imbriquer un bloc comme `div`. |
| `strong` | Importance | Le sens ne se limite pas au gras. |
| `em` | Emphase | Le sens ne se limite pas à l'italique. |
| `br` | Retour à la ligne | Ne remplace pas une marge entre paragraphes. |
| `ul`, `ol`, `li` | Listes et leurs entrées | `ul` non ordonnée, `ol` ordonnée. |
| `a` | Lien de navigation | Destination dans `href`, texte explicite. |
| `img` | Image | `src` et alternative contextuelle `alt` ; élément vide. |
| `figure`, `figcaption` | Figure avec légende | Une légende ne remplace pas toujours l'alternative. |

## Formulaires et données tabulaires

| Élément | Usage | Exemple de point à vérifier |
|---|---|---|
| `form` | Regroupe des contrôles pour envoi | `action` et `method`. |
| `label` | Nom d'un contrôle | `for` correspondant à l'`id`. |
| `input` | Champ de saisie | `type`, `name`, contraintes ; élément vide. |
| `textarea` | Texte sur plusieurs lignes | Possède une balise de fermeture. |
| `select`, `option` | Choix dans une liste | Donner un label au select. |
| `button` | Action | Définir `type="button"` ou `type="submit"` selon le besoin. |
| `fieldset`, `legend` | Groupe de contrôles et son titre | Utile pour des choix liés. |
| `table` | Données réellement tabulaires | Ne sert pas à disposer la page. |
| `caption` | Titre de tableau | Aide à en comprendre le sujet. |
| `tr`, `th`, `td` | Ligne, en-tête, cellule | `th scope="col"` pour un en-tête de colonne simple. |

## Les attributs à reconnaître

`id` identifie un élément de manière unique dans le document. `class` regroupe des éléments pour partager des styles. `href` donne une destination de lien ; `src` une source de média ; `alt` l'alternative d'une image. `name` définit la clé envoyée d'un champ ; `id` ne la remplace pas. `lang` indique la langue. `required` impose une saisie côté navigateur, avec validation serveur indispensable pour un traitement PHP.

Exercice : choisissez la bonne balise pour un titre de section, un lien vers un projet, un contrôle qui déclenche une action et une carte autonome. Justifiez les rôles avant de vérifier leur apparence.

```html live title="Voir les balises dans une page complète"
<style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      nav {
        display: flex;
        gap: 16px;
      }
      article {
        border: 1px solid #bcc7d6;
        padding: 16px;
      }
    </style>

<header>
      <p>Atelier Pixel</p>
      <nav aria-label="Principale">
        <a href="#projets">Projets</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
    <main>
      <h1>Nos créations</h1>
      <section id="projets">
        <h2>Projets</h2>
        <article>
          <h3>Affiche Pixel</h3>
          <p>Une exploration typographique.</p>
          <a href="#contact">Discuter de l’affiche Pixel</a>
        </article>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p>Données fictives pour cet atelier.</p>
      </section>
    </main>
    <footer><p>Atelier MMI</p></footer>
```

[Tous les attributs MDN](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Attributes) · [Retour au parcours](/semestre_1).
