---
layout: "layouts/Layout.astro"
title: "HTML5"
type: "TD"
---

## Qu'est-ce que HTML5 ?

HTML5 est la dernière version du langage HTML (HyperText Markup Language). Il est utilisé pour structurer et présenter le contenu sur le Web. HTML5 introduit de nouvelles balises et fonctionnalités qui facilitent la création de sites Web modernes et interactifs.

## Structure de base d'un document HTML5

Un document HTML5 typique commence par une déclaration de type de document (`<!DOCTYPE html>`), suivie de la structure de base suivante :

```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Titre de la page</title>
  </head>
  <body>
    <header>
      <h1>Bienvenue sur mon site</h1>
    </header>
    <main>
      <p>Ceci est un paragraphe de contenu.</p>
    </main>
    <footer>
      <p>Pied de page</p>
    </footer>
  </body>
</html>
```

### Explications

- `<!DOCTYPE html>` : Cette ligne indique que le document utilise HTML5.
- `<html lang="fr">` : La balise `<html>` enveloppe tout le contenu de la page. L'attribut `lang="fr"` indique que la langue de la page est le français.
- `<head>` : La balise `<head>` contient des informations sur la page, comme son titre et les paramètres de caractère.
- `<meta charset="UTF-8">` : Cette ligne indique que la page utilise l'encodage de caractères UTF-8.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` : Cette ligne permet de rendre la page réactive, c'est-à-dire qu'elle s'adapte aux différentes tailles d'écran.
- `<title>Titre de la page</title>` : Cette balise définit le titre de la page, qui apparaît dans l'onglet du navigateur.
- `<body>` : La balise `<body>` contient tout le contenu visible de la page web.
- `<header>`, `<main>`, `<footer>` : Ces balises structurent le contenu de la page en en-tête, contenu principal et pied de page respectivement.
- `<h1>` : Cette balise définit un titre de premier niveau.
- `<p>` : Cette balise définit un paragraphe.

## Nouvelles balises HTML5

### Sectionnement

HTML5 introduit de nouvelles balises de sectionnement pour une meilleure organisation du contenu :

- `<header>` : Utilisée pour définir l'en-tête d'un document ou d'une section. Exemple :

```html
<header>
  <h1>Bienvenue sur mon site</h1>
</header>
```

- `<nav>` : Utilisée pour définir une section de navigation. Exemple :

```html
<nav>
  <ul>
    <li><a href="#home">Accueil</a></li>
    <li><a href="#about">À propos</a></li>
  </ul>
</nav>
```

- `<section>` : Utilisée pour définir une section générale. Exemple :

```html
<section>
  <h2>Section 1</h2>
  <p>Ceci est une section de contenu.</p>
</section>
```

- `<article>` : Utilisée pour définir un contenu indépendant comme un article de blog. Exemple :

```html
<article>
  <h2>Mon premier article</h2>
  <p>Ceci est le contenu de l'article.</p>
</article>
```

- `<aside>` : Utilisée pour définir du contenu associé, comme une barre latérale. Exemple :

```html
<aside>
  <h2>Informations complémentaires</h2>
  <p>Voici des informations supplémentaires.</p>
</aside>
```

- `<footer>` : Utilisée pour définir le pied de page d'un document ou d'une section. Exemple :

```html
<footer>
  <p>&copy; 2024 Mon Site Web</p>
</footer>
```

### Média

HTML5 facilite l'intégration des médias avec les nouvelles balises suivantes :

- `<audio>` : Utilisée pour intégrer des fichiers audio. Exemple :

```html
<audio controls>
  <source src="audio.mp3" type="audio/mp3" />
  Votre navigateur ne supporte pas la balise audio.
</audio>
```

<div style="margin:auto;">
<audio controls>
    <source src="audio.mp3" type="audio/mp3">
    Votre navigateur ne supporte pas la balise audio.
</audio>
</div>

- `<video>` : Utilisée pour intégrer des fichiers vidéo. Exemple :

```html
<video controls>
  <source src="video.mp4" type="video/mp4" />
  Votre navigateur ne supporte pas la balise vidéo.
</video>
```

<div style="margin:auto;">
<video controls>
    <source src="video.mp4" type="video/mp4">
    Votre navigateur ne supporte pas la balise vidéo.
</video>
</div>

- `<canvas>` : Utilisée pour dessiner des graphiques à la volée avec JavaScript. Exemple :

```html
<canvas
  id="myCanvas"
  width="200"
  height="100"
  style="border:1px solid #000000;"
></canvas>
```

<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>

### Formulaires

HTML5 améliore les formulaires avec de nouveaux types de champs et attributs :

- `<input type="email">` : Champ pour les adresses e-mail. Exemple :

```html
<label for="email">Email :</label>
<input type="email" id="email" name="email" required />
```

- `<input type="url">` : Champ pour les URL. Exemple :

```html
<label for="website">Site Web :</label>
<input type="url" id="website" name="website" />
```

- `<input type="date">` : Champ pour les dates. Exemple :

```html
<label for="birthday">Date de naissance :</label>
<input type="date" id="birthday" name="birthday" />
```

- `<input type="range">` : Champ pour les valeurs numériques dans une plage. Exemple :

```html
<label for="volume">Volume :</label>
<input type="range" id="volume" name="volume" min="0" max="100" />
```

- Attributs de validation : `required`, `pattern`, `min`, `max`, etc.

Exemple de formulaire HTML5 complet :

```html
<form>
  <label for="email">Email :</label>
  <input type="email" id="email" name="email" required />

  <label for="website">Site Web :</label>
  <input type="url" id="website" name="website" />

  <label for="birthday">Date de naissance :</label>
  <input type="date" id="birthday" name="birthday" />

  <label for="volume">Volume :</label>
  <input type="range" id="volume" name="volume" min="0" max="100" />

  <button type="submit">Envoyer</button>
</form>
```

<form>
    <label for="email">Email :</label>
    <input type="email" id="email" name="email" required>

    <label for="website">Site Web :</label>
    <input type="url" id="website" name="website">

    <label for="birthday">Date de naissance :</label>
    <input type="date" id="birthday" name="birthday">

    <label for="volume">Volume :</label>
    <input type="range" id="volume" name="volume" min="0" max="100">

    <button type="submit">Envoyer</button>

</form>

## Conclusion

HTML5 offre de nombreuses nouvelles fonctionnalités pour améliorer la structure, l'accessibilité et l'interactivité des sites Web. En utilisant ces nouvelles balises et fonctionnalités, vous pouvez créer des sites Web modernes et réactifs.

---
