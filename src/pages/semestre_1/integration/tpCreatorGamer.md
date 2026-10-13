---
layout: "layouts/Layout.astro"
title: "TP : finaliser une page responsive et accessible"
type: "TP"
order: 8
quizId: "s1-int-07"
previousSession: "/semestre_1/integration/csstp"
---

<a id="comprendre"></a>

## Largeur disponible et disposition responsive

Le **viewport** est la zone de présentation de la page. La métadonnée viewport évite une mise en page mobile simulant un grand écran. Une **media query** est une condition qui rend certaines déclarations applicables : elle ne crée pas un second document et ne change pas les balises.

```css
.profils { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 48rem) {
  .profils { grid-template-columns: repeat(3, 1fr); }
}
img { max-width: 100%; height: auto; }
```

La base utilise une colonne. Au seuil indiqué, trois colonnes deviennent applicables. Le bon seuil vient du contenu : six longs titres peuvent nécessiter plus d’espace que six titres courts. Testez une largeur juste sous et juste au-dessus du seuil, pas seulement les trois tailles d’un menu de DevTools.

## Focus, contenus longs et débordements

| Cas de test | Attendu | Défaut révélé |
|---|---|---|
| Écran étroit et titre long. | Texte visible sans défilement horizontal de toute la page. | Largeur ou hauteur trop rigide. |
| Parcours avec Tab. | Tous les liens sont atteignables et le focus est visible. | Focus masqué ou faux contrôle. |
| Image absente. | Le rôle de l’image reste compréhensible par son alternative. | Chemin incorrect ou texte alternatif inutile. |
| Zoom du navigateur. | Contenu lisible et actions encore accessibles. | Dimensions trop contraintes. |

`hover` décrit le survol ; `focus-visible` signale une interaction nécessitant un repère visible, notamment au clavier. Conserver une bordure ou un contour de focus est une aide, pas une décoration facultative. Une information importante ne doit pas dépendre uniquement d’un changement de couleur ou du survol.

Rédigez un test avec une **entrée** — largeur, texte, moyen de navigation — et un **résultat attendu**. Notez le résultat réellement observé. Si l’observation diffère, corrigez une cause puis répétez le même test : changer de scénario après chaque correction ne permet pas de savoir si le défaut a disparu.

## Les adaptations aux petits écrans

Le responsive ne consiste pas à réduire une page de bureau comme une image. Les textes doivent rester lisibles et les actions atteignables. On peut changer le nombre de colonnes, laisser les liens revenir à la ligne ou ajuster les espacements. Le contenu important reste disponible.

| Vérification | Action concrète | Ce qu’il faut observer |
|---|---|---|
| Largeur | Passer l’aperçu à 320 puis 768 px | Colonnes et éventuel débordement |
| Clavier | Utiliser Tab, puis Entrée | Ordre, focus, destination des liens |
| Texte | Remplacer un titre par un titre long | Retour à la ligne sans coupure |
| Image | Examiner l’information apportée | Alternative utile ou `alt=""` |

```html live title="Voir la disposition changer avec la largeur"
<style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      * {
        box-sizing: border-box;
      }
      .profils {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
      }
      .carte {
        padding: 16px;
        background: white;
        border: 1px solid #bcc7d6;
      }
      @media (min-width: 700px) {
        .profils {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
    </style>

<h1>Testez 320 et 768 px</h1>
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

**Lecture accompagnée :** la base définit une colonne ; la media query à 700 px en définit trois. Dans le laboratoire, la largeur pertinente est celle de l’iframe. À 699 et à 700 px, la condition n’a pas le même résultat.

**Erreur à éviter :** masquer tout le débordement avec `overflow: hidden` sur la page. Cela peut cacher le problème et du contenu utile ; identifiez d’abord l’élément responsable.

<a id="responsive"></a>

## Media queries et tailles fluides

Une page responsive réorganise ses blocs selon l'espace disponible. La métadonnée viewport permet au navigateur mobile d'utiliser la largeur du dispositif comme largeur de mise en page. Une media query applique des règles lorsque sa condition est satisfaite.

```css
.profils { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 700px) {
  .profils { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
```

Ici, la base est une seule colonne : c'est une approche mobile d'abord. À partir de 700 px inclus, trois colonnes sont utilisées. Le seuil doit être choisi selon le contenu, pas selon une marque de téléphone. Testez aussi 699 px et 700 px. `flex-wrap: wrap` autorise la navigation à revenir à la ligne.


Sélectionnez 320 px, puis 768 px. Changez le seuil et constatez que l'iframe, pas seulement la fenêtre du cours, sert de zone de test.

<a id="interaction"></a>

## Les états hover et focus-visible

Un lien doit rester identifiable sans dépendre uniquement de sa couleur. `:hover` concerne le survol ; `:focus-visible` permet de rendre visible le focus lors de la navigation au clavier. Ne retirez pas `outline` sans fournir un indicateur équivalent.

```css
a:hover { text-decoration-thickness: 3px; }
a:focus-visible { outline: 3px solid #e07700; outline-offset: 4px; }
```

Le focus indique où l'action se produira si l'utilisateur appuie sur Entrée. Un état de survol ne remplace pas un état de focus. Évitez les interactions qui exigent une souris lorsque le même résultat peut être atteint avec un lien natif.

<a id="audit"></a>

## Les tests de rendu et de navigation

| Test | Résultat attendu |
|---|---|
| Largeur 320 px | Aucun défilement horizontal de la page, textes lisibles |
| Largeur 768 et 1024 px | Colonnes cohérentes, espaces réguliers |
| Zoom à 200 % | Contenu et liens restent utilisables |
| Navigation Tab / Entrée | Focus visible, ordre cohérent, liens fonctionnels |
| Image absente | Texte alternatif informatif si nécessaire |
| Texte de profil long | La carte s'agrandit sans masquer le texte |

Ne masquez pas un débordement avec `overflow-x: hidden` avant d'en trouver la cause : vous risquez de cacher le contenu. Inspectez les largeurs fixes, les images et les mots longs. Une vérification HTML détecte des erreurs de structure ; elle ne garantit pas toute l'accessibilité.

## Exemple court — garder une base lisible

Cette liste est une grille à une colonne tant que l’aperçu n’atteint pas 700px. Au seuil et au-delà, elle passe à deux colonnes. Comparez les rendus dans le laboratoire avec son réglage de largeur.

```html preview title="La largeur déclenche la disposition" height=180
<div class="projets">
  <p>Projet photo</p>
  <p>Projet sonore</p>
</div>
<style>
  .projets {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }
  @media (min-width: 700px) {
    .projets {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
```
