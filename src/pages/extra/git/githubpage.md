---
order: 2

layout: "layouts/Layout.astro"
title: "Publier un site avec GitHub Pages — du zéro à l’URL publique"
type: "TP"
---

## Publier un site statique avec GitHub Pages

GitHub Pages héberge des fichiers statiques : HTML, CSS, JavaScript et médias. Il n’exécute ni PHP ni MySQL. Une application nécessitant ces services doit utiliser un hébergement adapté. Les [commandes Git](/extra/git) permettent d’enregistrer et d’envoyer les versions du site.

## Dépôt et chemins

Un site de compte utilise un dépôt nommé `compte.github.io`. Un site de projet est généralement accessible sous `https://compte.github.io/nom-du-depot/`. Ce sous-chemin explique pourquoi `/images/photo.jpg` peut viser la mauvaise destination : il part de la racine du domaine, tandis que `images/photo.jpg` part du dossier de la page.

```text
mon-site/
  index.html
  css/styles.css
  images/photo.jpg
```

Dans `index.html`, `<link rel="stylesheet" href="css/styles.css">` référence ici la feuille. Dans cette feuille, `url('../images/photo.jpg')` est résolu par rapport au dossier `css`, pas au HTML.

## Envoyer un projet local

Créez un dépôt GitHub, puis utilisez dans un dossier déjà initialisé avec Git :

```sh
git remote add origin https://github.com/VOTRE_COMPTE/mon-site.git
git branch -M main
git add index.html css images
git commit -m "Publie la première version du site"
git push -u origin main
```

Remplacez le compte et le dépôt par leurs valeurs réelles. Si `origin` existe, inspectez-le avec `git remote -v` avant de changer son adresse. `-u` associe la branche locale à la branche distante pour les prochains échanges. Ne réinitialisez pas un dépôt existant pour résoudre une simple erreur d’authentification.

## Configurer la publication

Dans les réglages du dépôt, ouvrez Pages. Pour un site HTML/CSS simple, choisissez la publication depuis la branche et le dossier contenant `index.html`, puis enregistrez. L’emplacement et les options dépendent du type de publication ; un site Astro compilé peut utiliser une action de construction plutôt que publier les sources directement.

**Résultat attendu :** un déploiement terminé fournit une adresse publique. Ouvrez cette adresse et vérifiez titre, feuille CSS, images et destinations. Envoyer un commit et terminer un déploiement sont deux événements distincts : consultez le résultat de la publication avant d’attribuer une ancienne page à un problème de cache.

## Mettre à jour et diagnostiquer

Après une correction locale, contrôlez `git diff`, préparez les fichiers concernés, créez un commit et envoyez-le. Le prochain déploiement doit correspondre à cette version.

| Symptôme | Contrôle |
|---|---|
| 404 sur l’accueil | Dossier source et présence de `index.html` |
| Page sans style | URL réelle de la feuille, casse et sous-chemin du dépôt |
| Image absente | Chemin et nom exact du fichier |
| PHP affiché ou non exécuté | Pages ne fournit pas de moteur PHP |
| Ancien contenu | Dernier commit publié et état du déploiement |

[Configuration de la source de publication — documentation GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
