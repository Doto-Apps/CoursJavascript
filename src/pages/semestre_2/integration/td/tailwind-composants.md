---
layout: "layouts/Layout.astro"
title: "Tailwind : composants, états et responsive"
type: "TD"
order: 2
quizId: "s2-int-01"
previousSession: "/semestre_2/integration/td/bootstrap"
nextSession: "/semestre_2/integration/tp/transition"
---

<a id="comprendre"></a>

## Classes utilitaires Tailwind et structure de carte

Une carte possède une structure : titre, texte, média et action éventuelle. Définissez cette structure avant les classes. Choisissez ensuite une disposition, un espace intérieur, une bordure et une hiérarchie de texte. Chaque famille d’utilitaires répond à une question différente.

| Question | Famille de classes | Vérification |
|---|---|---|
| Comment les enfants sont-ils disposés ? | `flex`, `grid`, `items-center` | Le bon parent porte la classe. |
| Où placer les espaces ? | `p-*`, `m-*`, `gap-*` | Ne pas confondre intérieur et extérieur. |
| Comment distinguer le texte ? | `text-*`, `font-*`, `leading-*` | Le titre reste un vrai titre HTML. |
| Que se passe-t-il au clavier ? | `focus-visible:*` | Le contrôle ciblé reste identifiable. |

## Les variantes responsive de Tailwind

La base doit rester lisible sur écran étroit. Une condition de largeur peut ensuite augmenter le nombre de colonnes. Une règle de couleur au survol ne doit pas remplacer une indication de focus. Les états normaux restent nécessaires sur les appareils sans survol.

Un texte court peut masquer un mauvais composant. Testez une carte dont le titre prend deux lignes et une autre sans image. Une hauteur arbitraire peut couper le contenu ; les classes n’empêchent pas les défauts de conception CSS.

## Les variantes de composants Tailwind

Une variante réutilise la même structure en changeant un petit ensemble de classes, par exemple la couleur d’une action secondaire. Notez les valeurs communes pour éviter six cartes avec six échelles d’espacement. Si plusieurs variantes nécessitent des corrections contradictoires, revoyez d’abord la structure.

**Méthode de diagnostic :** relever la classe, traduire son intention en CSS, vérifier le parent et la largeur de l’aperçu, puis observer la règle calculée. Une modification isolée permet de relier une classe à son effet.

<a id="apprentissage"></a>

## Variantes hover, focus-visible et responsive

Une classe conditionnelle s’applique lorsque sa condition est satisfaite. `hover:bg-blue-800` change le fond au survol ; `focus-visible:ring-2` aide à rendre le focus perceptible. La couleur au survol ne suffit pas pour une personne qui utilise le clavier. Une action utilise un bouton natif ; une navigation utilise un lien avec une destination.

La base mobile est écrite sans préfixe. Avec la configuration Tailwind 3 par défaut, `md:` commence à 768 pixels et `lg:` à 1024 pixels. Les préfixes signifient « à partir de », pas « uniquement sur tablette ». Ces seuils sont configurables : le nom du préfixe ne reconnaît pas la marque d’un appareil.

```html
<section class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <article class="rounded-lg bg-white p-4 shadow-md">
    <h2 class="text-xl font-bold">Festival du campus</h2>
    <a class="text-blue-700 underline hover:text-blue-900
              focus-visible:ring-2 focus-visible:ring-blue-700"
       href="#contact">Contacter le festival</a>
  </article>
</section>
```

**Résultat attendu :** une colonne en base, deux dès 768 px, trois dès 1024 px. Le nombre de cartes n’impose pas le nombre de colonnes. Le lien change d’état sans perdre sa destination ni son intitulé.

```html live title="Composants et classes responsive"
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
      article,
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

<h1>Base mobile, puis deux et trois colonnes</h1>
    <section
      id="grille"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <article class="rounded-lg bg-white p-4 shadow-md">
        <h2>Photo</h2>
        <a
          class="underline text-blue-700 hover:text-blue-900 focus-visible:ring-2"
          href="#contact"
        >
          Contacter l’atelier photo
        </a>
      </article>
      <article class="rounded-lg bg-white p-4 shadow-md">
        <h2>Musique</h2>
        <p>Créer ensemble.</p>
      </article>
      <article class="rounded-lg bg-white p-4 shadow-md">
        <h2>Sport</h2>
        <p>Préparer le tournoi.</p>
      </article>
    </section>
    <p id="contact">Essayez les largeurs 320, 768 et 1024 pixels.</p>

    <script></script>
```

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Base mobile | Les classes sans préfixe forment la base, valable aussi aux grandes largeurs si rien ne la remplace. |
| <a id="notion-2"></a>Seuil md | Avec la configuration par défaut Tailwind 3, md commence à 768 px. |
| <a id="notion-3"></a>Seuil lg | Avec la configuration par défaut Tailwind 3, lg commence à 1024 px. |
| <a id="notion-4"></a>Condition minimale | md signifie à partir du seuil, pas uniquement dans une catégorie d'appareils. |
| <a id="notion-5"></a>Grille étroite | grid-cols-1 md:grid-cols-2 lg:grid-cols-3 donne une colonne à 320 px. |
| <a id="notion-6"></a>Grille intermédiaire | La grille du cours donne deux colonnes de 768 px jusqu'avant 1024 px. |
| <a id="notion-7"></a>Grille large | La grille du cours donne trois colonnes dès 1024 px. |
| <a id="notion-8"></a>Survol | hover: applique une variante au survol. |
| <a id="notion-9"></a>Focus | focus-visible: permet de rendre le focus visible dans les situations concernées. |
| <a id="notion-10"></a>Anneau | ring-2 définit un anneau de largeur 2 px dans Tailwind 3. |
| <a id="notion-11"></a>Bouton | Une action locale utilise un bouton natif. |
| <a id="notion-12"></a>Lien | Une navigation vers une destination utilise un lien. |
| <a id="notion-13"></a>Clavier | Le survol seul ne couvre pas l'utilisation au clavier. |
| <a id="notion-14"></a>Structure | Les variantes Tailwind ne remplacent pas la sémantique HTML. |
| <a id="notion-15"></a>Seuils configurables | Les seuils responsive sont configurables. |
| <a id="notion-16"></a>Parent | Les classes grid et de colonnes organisent les enfants depuis leur parent. |
| <a id="notion-17"></a>Contenu long | Un composant doit rester lisible avec un titre long. |
| <a id="notion-18"></a>Réutilisation | Un composant commun conserve une structure cohérente malgré des contenus différents. |
| <a id="notion-19"></a>Largeur réelle | Les variantes répondent à la largeur CSS disponible, pas au nom commercial de l'appareil. |
| <a id="notion-20"></a>Contrôle du rendu | Le code et le résultat doivent être comparés à plusieurs largeurs. |
