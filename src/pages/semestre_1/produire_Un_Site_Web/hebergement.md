---
layout: "layouts/Layout.astro"
title: "TP : Héberger un Site Web sur GitHub Pages"
type: "TP"
---

## Objectif

L'objectif de ce TP est de vous apprendre à héberger votre site web sur GitHub Pages. Ce TP est conçu pour les débutants, sans aucune connaissance préalable en programmation ou en ligne de commande. À la fin de ce TP, votre site web sera en ligne, accessible à tous, et vous saurez comment le mettre à jour.

## Prérequis

- Un ordinateur avec Windows ou macOS.
- Une connexion Internet.
- Un site web simple (fichiers HTML, CSS, images) que vous souhaitez héberger.

## Étapes du TP

### 1. Création d'un Compte GitHub

1. **Rendez-vous sur [GitHub](https://github.com/)**.
2. **Cliquez sur "Sign up" pour créer un compte**.
   - Suivez les instructions pour créer votre compte. Vous devrez fournir une adresse e-mail, choisir un nom d'utilisateur et un mot de passe.
3. **Vérifiez votre adresse e-mail** pour activer votre compte.

### 2. Installation de Git

Git est un logiciel de contrôle de version qui vous permettra de gérer votre code et de le publier sur GitHub.

#### 2.1. Installation de Git sur Windows

1. **Téléchargez Git** depuis [le site officiel](https://git-scm.com/).
2. **Ouvrez le fichier téléchargé** et suivez les instructions pour installer Git.
   - Lors de l'installation, acceptez les paramètres par défaut. Assurez-vous que l'option "Git Bash Here" est cochée.

#### 2.2. Installation de Git sur macOS

1. **Ouvrez le Terminal**. Vous pouvez le trouver dans Applications > Utilitaires > Terminal.
2. **Tapez la commande suivante** et appuyez sur `Entrée` :
   ```sh
   git --version
   ```
   - Si Git est déjà installé, vous verrez le numéro de version.
   - Sinon, vous serez invité à installer les outils en ligne de commande d'Apple. Suivez les instructions pour terminer l'installation.

### 3. Clonage du Dépôt sur Votre Ordinateur

Maintenant que Git est installé, vous allez créer un dépôt GitHub pour votre site web, puis le cloner (c'est-à-dire copier) sur votre ordinateur.

#### 3.1. Création d'un Nouveau Dépôt sur GitHub

1. **Connectez-vous à GitHub**.
2. **Cliquez sur le bouton "New" pour créer un nouveau dépôt**.
3. **Nommez votre dépôt** : par exemple, `mon-site-web`.
4. **Assurez-vous que l'option "Public" est sélectionnée**.
5. **Cochez la case "Add a README file"**.
6. **Cliquez sur "Create repository"**.

#### 3.2. Clonage du Dépôt

##### Pour Windows :

1. **Ouvrez Git Bash** (clique droit dans le dossier où vous voulez cloner votre dépôt, puis choisissez "Git Bash Here").
2. **Tapez la commande suivante** et appuyez sur `Entrée` :
   ```sh
   git clone https://github.com/votre_nom_utilisateur/mon-site-web.git
   ```
   - Remplacez `votre_nom_utilisateur` par votre nom d'utilisateur GitHub.

##### Pour macOS :

1. **Ouvrez le Terminal**.
2. **Naviguez jusqu'au dossier où vous voulez cloner votre dépôt** avec la commande `cd` :
   ```sh
   cd ~/Desktop
   ```
3. **Tapez la commande suivante** et appuyez sur `Entrée` :
   ```sh
   git clone https://github.com/votre_nom_utilisateur/mon-site-web.git
   ```

### 4. Ajouter Votre Site Web au Dépôt

1. **Copiez les fichiers de votre site web (HTML, CSS, images) dans le dossier cloné** (`mon-site-web`).
2. **Ajoutez ces fichiers à Git** :
   - Ouvrez Git Bash (Windows) ou le Terminal (macOS).
   - Tapez la commande suivante pour ajouter les fichiers :
     ```sh
     git add .
     ```
   - Puis, commitez les changements :
     ```sh
     git commit -m "Ajout de mon site web"
     ```

### 5. Déploiement avec GitHub Pages

1. **Poussez vos fichiers vers GitHub** :
   ```sh
   git push origin main
   ```
2. **Activez GitHub Pages** :
   - Allez dans les "Settings" de votre dépôt sur GitHub.
   - Faites défiler vers le bas jusqu'à la section "GitHub Pages".
   - Sous "Source", sélectionnez la branche `main` (ou `master`) et cliquez sur "Save".
   - GitHub Pages va générer une URL pour votre site web, par exemple : `https://votre_nom_utilisateur.github.io/mon-site-web/`.

### 6. Vérification du Site en Ligne

1. **Accédez à l'URL fournie par GitHub Pages** pour voir votre site en ligne.
2. **Vérifiez que toutes les images et les fichiers fonctionnent correctement**.

### 7. Modifier et Mettre à Jour Votre Site

Si vous souhaitez modifier votre site à l'avenir, suivez ces étapes :

1. **Modifiez les fichiers de votre site sur votre ordinateur** (par exemple, en ajoutant ou modifiant du contenu dans vos fichiers HTML ou CSS).
2. **Ouvrez Git Bash ou le Terminal** et naviguez jusqu'au dossier de votre dépôt.
3. **Ajoutez et commitez les modifications** :
   ```sh
   git add .
   git commit -m "Mise à jour du site"
   ```
4. **Poussez les modifications vers GitHub** :
   ```sh
   git push origin main
   ```
5. **Vérifiez les mises à jour** en rechargeant votre site à l'URL fournie par GitHub Pages.

## Barème d'Évaluation

L'évaluation sera basée sur les critères suivants :

- **Site en Ligne (5 points)** : Votre site doit être accessible en ligne via GitHub Pages.
- **Fonctionnalité des Images et Liens (3 points)** : Toutes les images et les liens doivent fonctionner correctement.
- **Structure de Base du Site (2 points)** : Le site doit avoir une structure HTML et CSS cohérente.

## Conclusion

Ce TP vous permet de mettre en ligne votre site web **Birbone** en utilisant GitHub Pages. Vous avez appris à créer un dépôt GitHub, à cloner ce dépôt sur votre ordinateur, à ajouter vos fichiers de site, et à déployer le tout en ligne. Vous savez maintenant aussi comment modifier votre site et le mettre à jour.

Bonne chance, et n'oubliez pas de vérifier que votre site est en ligne et que toutes les images fonctionnent correctement avant la fin du TP !
