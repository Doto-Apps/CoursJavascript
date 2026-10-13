---
layout: "layouts/Layout.astro"
title: "Structurer une page HTML sémantique"
type: "TD"
order: 2
quizId: "s1-int-01"
previousSession: "/semestre_1/integration/web"
nextSession: "/semestre_1/integration/csstd"
---

<a id="comprendre"></a>

## Balises, attributs et imbrication HTML

Dans `<a href="projets.html">Nos projets</a>`, `a` est le nom de la balise ; `href` est un attribut ; `projets.html` est sa valeur ; « Nos projets » est le contenu. La balise fermante reprend le nom avec `/`. Écrivez les attributs dans la balise ouvrante et entourez leurs valeurs de guillemets. L’imbrication suit l’ordre inverse des ouvertures : `<p><strong>Attention</strong> au chemin.</p>` est cohérent.

`img`, `meta`, `input` et `br` sont des éléments vides : ils ne contiennent pas de texte et n’ont pas de balise fermante en HTML. `br` produit un saut de ligne utile dans une adresse, mais ne remplace pas plusieurs paragraphes. Un nouveau sujet appelle un nouveau `p`, pas une succession de `br`.

| Balise et syntaxe | Rôle | Attributs / vigilance |
|---|---|---|
| `<h2>Programme</h2>` | Titre d’une section du document. | Son niveau dépend du plan, non de la taille souhaitée. |
| `<p>Une idée.</p>` | Paragraphe de texte. | Ne contient pas une section entière ni un autre paragraphe. |
| `<ul><li>Photo</li></ul>` | Liste sans ordre significatif. | Chaque entrée est un `li`. |
| `<ol><li>Enregistrer</li></ol>` | Suite d’étapes ordonnées. | Changer l’ordre change le sens. |
| `<strong>Obligatoire</strong>` | Importance particulière. | La graisse visuelle peut être modifiée en CSS. |
| `<em>Vraiment</em>` | Emphase dans une phrase. | Ce n’est pas un outil de décoration à appliquer partout. |
| `<a href="projets.html">Voir les projets</a>` | Navigation vers une destination. | Le texte doit annoncer cette destination. |
| `<img src="photo.jpg" alt="Atelier de sérigraphie">` | Image avec alternative selon son rôle. | `alt=""` pour une image uniquement décorative. |
| `<button type="button">Ouvrir</button>` | Action dans l’interface. | Ne pas utiliser un lien sans destination pour imiter un bouton. |

```html preview title="Un titre, une idée et une liste" height=210
<h2>Préparer l’atelier</h2>
<p>Apportez <strong>un carnet</strong> pour les essais.</p>
<ol>
  <li>Choisir une image.</li>
  <li>Préparer les couleurs.</li>
</ol>
```

**Résultat :** un titre introduit le sujet, un paragraphe donne une consigne et deux étapes numérotées expriment un ordre. Le rendu est fixe pour concentrer la lecture sur ces quelques lignes. La démonstration suivante présente un document plus complet.

## Le document HTML et les chemins de fichiers

`head` contient les informations sur le document ; `body` contient le contenu affiché. `title` nomme l’onglet, alors que `h1` est le titre visible dans la page. `lang="fr"` précise la langue ; `charset="utf-8"` permet d’interpréter les caractères selon l’encodage du fichier. Il faut aussi enregistrer réellement le fichier en UTF-8.

Un chemin relatif comme `images/atelier.jpg` part du dossier de la page. `../images/atelier.jpg` remonte d’un dossier. Un lien interne `#programme` désigne l’élément dont l’`id` est `programme`. Un identifiant ne doit désigner qu’un seul élément. Plusieurs éléments peuvent en revanche partager la même `class` pour être stylisés ensemble.

**Erreurs fréquentes :** un `src` qui pointe vers un fichier local hors du projet ; un nom d’image dont la casse diffère ; un lien « ici » incompréhensible hors contexte ; une image informative décrite seulement par « image » ; un titre choisi pour sa taille plutôt que pour sa place dans le plan.

## La sémantique des éléments HTML

HTML décrit ce que représente chaque morceau de contenu. Un titre n’est pas simplement du texte gros : il organise la lecture. Un lien n’est pas simplement du texte bleu : il possède une destination. Vous pouvez changer leur apparence en CSS sans changer leur rôle. Commencez donc par vous demander « qu’est-ce que ce contenu ? », avant « à quoi doit-il ressembler ? ».

| Élément | Rôle | Décision à prendre |
|---|---|---|
| `h1`, `h2`, `h3` | Titres de niveaux différents | Quelle place dans le plan ? |
| `p` | Paragraphe | Où commence une nouvelle idée ? |
| `nav` | Navigation | Quels liens constituent le parcours principal ? |
| `main` | Contenu principal | Qu’est-ce qui appartient à cette page ? |
| `section` | Ensemble thématique | Quel titre nomme ce thème ? |
| `article` | Unité de contenu autonome | Cette fiche se comprend-elle séparément ? |
| `a` | Lien vers une ressource | Quelle valeur de `href` ? |
| `img` | Image | Quelle source et quelle alternative utile ? |

```html live title="Titres, paragraphes, listes et liens"
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Balises et rôles</title>
    <style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      section {
        border: 1px solid #bcc7d6;
        padding: 16px;
      }
      a:focus-visible {
        outline: 3px solid #2457a7;
      }
    </style>
  </head>
  <body>
    <header>
      <nav aria-label="Principale">
        <a href="#programme">Programme</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
    <main>
      <h1>Le festival du campus</h1>
      <p>Un paragraphe présente le sujet.</p>
      <section id="programme">
        <h2>Le programme</h2>
        <ul>
          <li>Découvrir une exposition</li>
          <li>Rencontrer les artistes</li>
        </ul>
        <article>
          <h3>Atelier photographie</h3>
          <p>Une fiche autonome décrit un atelier.</p>
          <a href="#contact">Poser une question sur l’atelier photographie</a>
        </article>
      </section>
      <section id="contact">
        <h2>Contact</h2>
        <p>Zone de contact fictive de cette démonstration.</p>
      </section>
    </main>
  </body>
</html>
```

**Lecture accompagnée :** la balise ouvrante porte les attributs ; le texte entre les balises est le contenu. Dans un lien, `href` précise la destination. Dans `section id="programme"`, l’identifiant rend possible le lien `href="#programme"`. Ce nom doit correspondre exactement et rester unique dans le document.

**Erreur à éviter :** choisir `h3` uniquement parce que `h2` paraît trop grand. Le niveau dépend de la hiérarchie ; la taille se règle ensuite en CSS.

<a id="document"></a>

## Doctype, head et body

Un élément HTML associe une balise à un contenu et, éventuellement, des attributs. Un attribut ajoute une information dans la balise ouvrante. Les éléments doivent être correctement imbriqués : le dernier ouvert est le premier fermé. `img` et `meta` sont des éléments vides, sans balise de fermeture.

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Les créateurs du campus</title>
  </head>
  <body>
    <h1>Les créateurs du campus</h1>
    <p>Découvrez nos projets.</p>
  </body>
</html>
```

Le doctype demande le mode standard du navigateur. `head` contient les métadonnées ; `body` contient le contenu de la page. `title` nomme l'onglet. `charset="utf-8"` indique l'encodage. `lang="fr"` indique la langue, notamment aux technologies d'assistance. La balise viewport prépare un affichage adapté aux appareils mobiles.

<a id="structure"></a>

## Titres, paragraphes et zones du document

| Élément | Rôle dans notre page |
|---|---|
| `header` | Introduction du site ou d'une section. |
| `nav` | Ensemble important de liens de navigation. |
| `main` | Contenu principal ; un seul contenu principal visible dans notre page. |
| `section` | Partie thématique, généralement introduite par un titre. |
| `article` | Contenu autonome, par exemple une fiche de profil. |
| `footer` | Informations de fin et mentions. |
| `div` | Regroupement générique sans signification particulière. |

Les titres `h1` à `h6` indiquent une hiérarchie. Utilisez `h1` pour le titre principal de ce document, puis `h2` pour ses sections. La taille visuelle se règle en CSS : choisir `h4` uniquement parce qu'il paraît plus petit dégrade la structure. Une liste non ordonnée utilise `ul` ; une liste ordonnée utilise `ol`. Dans les deux cas, chaque entrée est un `li`.

```html live title="Lire une page sans décoration"
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Une page sémantique</title>
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
  </head>
  <body>
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
  </body>
</html>
```

**Essayez :** transformez une fiche autonome en `article`, ajoutez une deuxième fiche et vérifiez que les titres restent cohérents. L'apparence ne change pas nécessairement : la sémantique exprime d'abord le rôle.

<a id="liens-images"></a>

## Liens et images

Un lien `a` utilise `href` pour sa destination. Un lien vers `#equipe` cible l'élément dont l'attribut `id` vaut `equipe`. Un identifiant doit être unique dans le document. Le texte d'un lien doit annoncer sa destination : « Voir les profils » est plus clair que « Cliquez ici ».

```html
<nav><a href="#equipe">Voir les profils</a></nav>
<section id="equipe">
  <h2>Les profils</h2>
  <article>
    <h3>Le projet d'Anna</h3>
    <img src="images/anna.svg" alt="Anna présente sa maquette de jeu">
    <p>Une galerie de personnages.</p>
  </article>
</section>
```

`src` indique le fichier de l'image. `alt` fournit une alternative textuelle utile dans le contexte. Une image purement décorative reçoit `alt=""`. Un lien mène à une destination ; un bouton déclenche une action. `strong` marque une importance particulière et `em` une emphase, indépendamment de leur apparence par défaut. Les caractères réservés peuvent être écrits avec des entités : `&lt;` affiche le signe `<`.

## Pour approfondir

- [Liste des balises HTML et leur rôle — MDN](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements).
- [Attributs HTML — MDN](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Attributes).
- [Images accessibles — W3C WAI](https://www.w3.org/WAI/tutorials/images/).
