---
layout: "layouts/Layout.astro"
title: "TP : mettre en forme Gamer / Creator"
type: "TP"
order: 7
quizId: "s1-int-06"
previousSession: "/semestre_1/integration/htmltp"
nextSession: "/semestre_1/integration/tpCreatorGamer"
---

<a id="comprendre"></a>

## L’organisation de la feuille CSS

Une base concerne toute la page : `box-sizing`, police, couleur et rythme des lignes. Les règles de disposition concernent ensuite les conteneurs, puis les règles de composants concernent les cartes ou la navigation. Cette organisation permet de retrouver l’origine d’un style sans parcourir des dizaines de corrections dispersées.

| Niveau | Exemple | Raison |
|---|---|---|
| Base | `body { line-height: 1.5; }` | Une lecture régulière sur toute la page. |
| Conteneur | `.contenu { max-width: 70rem; margin-inline: auto; }` | Une largeur confortable, centrée. |
| Disposition | `.profils { display: grid; gap: 16px; }` | Une organisation commune aux fiches. |
| Composant | `.profil { padding: 16px; }` | Un espacement intérieur identique. |

`width: 100%` demande toute la largeur disponible ; `max-width` fixe une limite supérieure. Les deux se complètent. Une largeur fixe de 1100 px ne devient pas automatiquement adaptée à un écran plus petit. `margin-inline: auto` distribue l’espace extérieur libre sur les deux côtés de l’axe en ligne.

## Largeurs fluides et hauteur automatique

Le texte occupe une hauteur variable. Une carte à hauteur fixe peut couper un titre long ou une description traduite. Préférez une hauteur naturelle ; employez un espacement interne commun pour la régularité. Pour les images, `aspect-ratio` réserve un rapport largeur/hauteur et `object-fit: cover` remplit un cadre en recadrant. Vérifiez que le recadrage ne supprime pas l’information utile.

Les valeurs en `rem` dépendent de la taille de police racine ; elles sont utiles pour construire une échelle cohérente. Ne mélangez pas vingt tailles différentes sans besoin. Une même classe sur six profils permet de modifier leur style en une seule règle : corriger chaque fiche avec un style inline ferait perdre cette cohérence.

**Méthode :** choisir une police, deux ou trois tailles de texte et une courte échelle d’espacements ; appliquer ces choix ; tester une carte avec un titre long ; corriger les dimensions avant d’ajouter des ombres et des détails décoratifs.

## Typographie, couleurs et espacements

Une page cohérente utilise des choix répétés : une famille typographique, une échelle d’espacements, des couleurs de texte et de fond compatibles. Créer une règle commune est plus fiable que régler chaque carte séparément. Le CSS doit supporter un nom court comme un nom long sans demander une nouvelle exception.

```css
:root {
  --accent: #2457a7;
}

.profil {
  padding: 1rem;
  border: 1px solid #bcc7d6;
  border-radius: 12px;
  line-height: 1.5;
}

.profil a {
  color: var(--accent);
}
```

**Lecture accompagnée :** `--accent` stocke une valeur commune ; `var(--accent)` la lit. `line-height` laisse respirer les lignes ; `border-radius` change la forme des coins. Aucune de ces règles ne crée les colonnes de la liste : cette responsabilité appartient au parent.

```html live title="Un style commun pour des contenus différents"
<style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      :root {
        --accent: #2457a7;
      }
      * {
        box-sizing: border-box;
      }
      h1 {
        color: var(--accent);
      }
      .profils {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 24px;
      }
      .carte {
        padding: 16px;
        border: 1px solid #bcc7d6;
        border-radius: 12px;
        background: white;
      }
    </style>

<h1>La communauté Pixel</h1>
    <section class="profils" aria-label="Profils">
      <article class="carte">
        <h2>Léa</h2>
        <p>Création graphique et jeux coopératifs.</p>
      </article>
      <article class="carte">
        <h2>Sam et ses projets</h2>
        <p>
          Photographie, montage et un texte un peu plus long pour tester la
          carte.
        </p>
      </article>
      <article class="carte">
        <h2>Noa</h2>
        <p>Illustration.</p>
      </article>
    </section>
```

**Erreur à éviter :** fixer une hauteur arbitraire pour cacher un débordement. Demandez d’abord si le contenu peut naturellement occuper davantage de place. Une capture avec trois textes identiques ne prouve pas que la disposition fonctionne avec de vrais contenus.

<a id="base"></a>

## Les styles de base du document

Créez `css/styles.css` et liez-le dans `head` avec `href="css/styles.css"`. Une feuille absente est visible dans l'onglet Réseau. Utilisez `box-sizing: border-box` pour inclure padding et bordures dans les dimensions déclarées. Retirer la marge du `body` évite le décalage initial du navigateur.

```css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; line-height: 1.5; }
img { max-width: 100%; height: auto; }
.conteneur { max-width: 1100px; margin-inline: auto; padding: 24px; }
```

`max-width` fixe une limite supérieure, contrairement à une largeur fixe qui peut déborder. `margin-inline: auto` répartit l'espace disponible de chaque côté. `line-height` règle la hauteur des lignes, pas la taille des lettres.

<a id="identite"></a>

## La cohérence des styles de composants

Choisissez une couleur de fond, une couleur de texte et une couleur d'accent. Réutilisez une petite échelle d'espacements, par exemple 8, 16, 24 et 32 px. Les unités `rem` se réfèrent à la taille de police racine. Les variables CSS déclarées avec `--` et lues avec `var()` permettent de modifier une couleur partagée à un seul endroit.

```css
:root { --accent: #2457a7; --espace: 1rem; }
h1, h2 { color: var(--accent); }
.carte { padding: var(--espace); border: 1px solid #bcc7d6; border-radius: 12px; }
```

Une bordure aide à délimiter une carte ; une ombre ne doit pas rendre le texte flou. Gardez un contraste lisible. Ne donnez pas une taille différente à chaque titre au hasard : définissez une hiérarchie réutilisable.

<a id="disposition"></a>

## Le conteneur Flexbox des cartes

La navigation peut être un conteneur Flexbox avec `gap`. Les profils peuvent former une grille à trois colonnes. Les propriétés de disposition s'appliquent au parent ; les règles de présentation des cartes s'appliquent à leurs classes. Le même `.carte` doit fonctionner dans les deux catégories.

```css
nav { display: flex; flex-wrap: wrap; gap: 16px; }
.profils { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.carte img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
```

`object-fit: cover` recadre une image pour remplir son cadre en conservant ses proportions. Vérifiez que ce recadrage ne coupe pas une information essentielle. `aspect-ratio` définit le rapport largeur/hauteur du cadre. La version mobile sera approfondie à la séance suivante.


À essayer : changez l'accent puis le gap. Constatez quels éléments héritent du changement et lesquels utilisent une règle spécifique.

## Exemple court — une image limitée par son conteneur

La carte garde une largeur maximale ; l’image ne dépasse pas cette carte. Sa hauteur automatique préserve ses proportions. Une largeur maximale ne signifie pas que le bloc atteint toujours cette largeur.

```html preview title="Carte et image adaptables" height=220
<article class="carte">
  <h2>Un paysage</h2>
  <img src="/images/learning/landscape.svg" alt="Paysage illustré de montagnes">
</article>
<style>
  .carte {
    max-width: 18rem;
    margin-inline: auto;
  }
  img {
    max-width: 100%;
    height: auto;
  }
</style>
```
