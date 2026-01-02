---
layout: "layouts/Layout.astro"
title: "TP HTML pour Étudiants de Première Année en Informatique"
type: "TP"
---

## Objectifs

1. Apprendre la structure de base d'un document HTML.
2. Comprendre l'importance des éléments du `head` et du `body`.
3. Utiliser des balises HTML pour structurer une page web.
4. Ajouter des éléments multimédias comme des images et des vidéos.

## Instructions

### Étape 1 : Structure de Base

Créez un fichier HTML appelé `index.html` et ajoutez la structure de base suivante :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projet Web Étudiant</title>
</head>
<body>
    <!-- Contenu ici -->
</body>
</html>
```

**Explications :**
- La balise `<!DOCTYPE html>` indique au navigateur qu'il s'agit d'un document HTML5.
- La balise `<html>` est l'élément racine de la page.
- L'attribut `lang="fr"` spécifie que la langue de la page est le français.
- La balise `<head>` contient des métadonnées sur le document, comme le jeu de caractères (`<meta charset="UTF-8">`), et le titre de la page (`<title>`).
- La balise `<body>` contient le contenu de la page visible par les utilisateurs.

**Importance du Charset :**
- L'attribut `charset="UTF-8"` dans la balise `<meta>` spécifie l'encodage des caractères pour la page. UTF-8 est un encodage universel qui prend en charge presque tous les caractères et est recommandé pour une compatibilité maximale.

### Étape 2 : Changer l'Icône d'Onglet

Ajoutez une icône pour l'onglet du navigateur. Pour cela, téléchargez une petite image (par exemple, un fichier `.png`) et placez-la dans le même répertoire que votre fichier HTML. Ajoutez ensuite cette ligne dans la section `<head>` :

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projet Web Étudiant</title>
    <link rel="icon" href="votre-icone.png" type="image/png">
</head>
```

**Explications :**
- La balise `<link rel="icon" href="votre-icone.png" type="image/png">` permet de définir une icône pour l'onglet du navigateur.
- Tout ce qui se trouve dans la balise `<head>` n'est pas directement visible sur la page, mais impacte le site de manière générale.

### Étape 3 : Structuration avec `header`, `main`, et `footer`

Divisez votre page en trois sections : `header`, `main`, et `footer`. Ajoutez des liens dans le `header`, y compris un lien vers une page de contact `contact.html`.

```html
<body>
    <header>
        <h1>Mon Projet Web</h1>
        <nav>
            <ul>
                <li><a href="#about">À Propos</a></li>
                <li><a href="#interests">Centres d'Intérêt</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h1>Bienvenue sur Mon Projet Web</h1>
        <p>Bienvenue sur ma page web. Voici un exemple de contenu.</p>
        <p>Vous pouvez générer du texte Lorem Ipsum en utilisant ce site : <a href="https://www.lipsum.com/" target="_blank">Lorem Ipsum</a>.</p>
    </main>
    <footer>
        <p>Contactez-moi à : <a href="mailto:etudiant@example.com">etudiant@example.com</a></p>
    </footer>
</body>
```

**Explications :**
- La balise `<header>` contient l'en-tête de la page, avec un titre et un menu de navigation.
- La balise `<main>` contient le contenu principal de la page, ici avec un titre (`<h1>`) et plusieurs paragraphes (`<p>`).
- La balise `<footer>` contient le pied de page, avec des informations de contact.
- Les balises `<a>` sont utilisées pour créer des liens hypertextes. L'attribut `href` spécifie la destination du lien.
- Le Lorem Ipsum est un texte de remplissage utilisé pour simuler du contenu. Vous pouvez générer du Lorem Ipsum sur des sites comme [lipsum.com](https://www.lipsum.com/).

### Étape 4 : Balises Multimédias

Ajoutez une image et une vidéo à votre page. Utilisez les balises `<img>` et `<video>`.

```html
<main>
    <h1>Bienvenue sur Mon Projet Web</h1>
    <p>Bienvenue sur ma page web. Voici un exemple de contenu.</p>
    <img src="https://via.placeholder.com/300" alt="Image de placeholder">
    <p>Vous pouvez générer du texte Lorem Ipsum en utilisant ce site : <a href="https://www.lipsum.com/" target="_blank">Lorem Ipsum</a>.</p>
    <video controls>
        <source src="chemin/vers/votre/video.mp4" type="video/mp4">
        Votre navigateur ne supporte pas la balise vidéo.
    </video>
</main>
```

**Explications :**
- La balise `<img>` est utilisée pour afficher une image. L'attribut `src` définit la source de l'image, et l'attribut `alt` fournit un texte alternatif si l'image ne peut pas être affichée.
- La balise `<video>` est utilisée pour intégrer une vidéo. L'attribut `controls` ajoute des contrôles de lecture. La balise `<source>` spécifie le chemin de la vidéo et son type (`type`).

### Étape 5 : Créer la Page de Contact

Créez un fichier HTML appelé `contact.html` pour la page de contact, même si elle peut rester vide pour l'instant.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact</title>
</head>
<body>
    <header>
        <h1>Contactez-moi</h1>
    </header>
    <main>
        <p>Cette page est dédiée aux informations de contact.</p>
    </main>
    <footer>
        <p>&copy; 2024 Mon Projet Web Étudiant</p>
    </footer>
</body>
</html>
```

**Explications :**
- La structure de cette page est similaire à celle de `index.html`, mais avec un contenu spécifique pour le contact.

### Étape 6 : Recherche et Résolution de Problèmes

Pour cette étape, vous allez devoir trouver des solutions par vous-même en utilisant des ressources en ligne. Voici comment procéder :

1. **Identifier le besoin** : Que souhaitez-vous accomplir ? Par exemple, afficher une boîte de dialogue sur votre page web.

2. **Formuler la recherche** : Utilisez un moteur de recherche (comme Google) pour trouver des informations. Par exemple, si vous voulez savoir comment afficher une boîte de dialogue, recherchez "HTML afficher balise dialog".

3. **Analyser les résultats** : Regardez plusieurs sources pour vérifier les informations. Utilisez des sites fiables comme MDN Web Docs, W3Schools, Stack Overflow, etc.

4. **Tester et appliquer** : Une fois que vous avez trouvé la solution, testez-la dans votre propre projet pour voir si elle fonctionne.

### Exemple de recherche :

Si vous voulez savoir comment afficher une balise dialog dans votre page HTML, vous pouvez rechercher "HTML balise dialog". Vous trouverez des ressources et des exemples de code qui vous montreront comment utiliser la balise `<dialog>` pour créer des boîtes de dialogue.

### Étape 7 : Ajouter un Tableau

Pour cette étape, vous allez ajouter un tableau à votre site en utilisant ChatGPT comme ressource. Voici comment procéder :

1. **Formuler la recherche** : Utilisez ChatGPT pour poser des questions spécifiques. Par exemple, vous pouvez demander "Comment ajouter un tableau en HTML ?".

2. **Analyser la réponse** : Utilisez les informations fournies par ChatGPT pour comprendre comment créer et structurer un tableau en HTML.

3. **Tester et appliquer** : Ajoutez le tableau à votre fichier HTML en utilisant les informations obtenues.

### Exemple de recherche sur ChatGPT :

Vous pouvez utiliser le lien suivant pour accéder à ChatGPT et poser votre question : [ChatGPT](https://chat.openai.com)

### Conclusion

En suivant ces étapes, vous avez créé une page web structurée et ajouté des éléments multimédias. Vous avez également appris à rechercher des informations pour résoudre des problèmes par vous-même et à utiliser ChatGPT pour obtenir de l'aide. N'hésitez pas à expérimenter davantage pour améliorer vos compétences en HTML.

## Résultats

Une fois que vous avez terminé toutes les étapes, soumettez votre travail en utilisant le lien suivant : [Lien de soumission des résultats](#)

---