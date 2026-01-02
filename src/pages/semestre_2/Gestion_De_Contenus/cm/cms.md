---
layout: "layouts/Layout.astro"
title: "Introduction à WordPress et Installation Locale"
---

**WordPress** est un système de gestion de contenu (CMS) open source qui permet de créer facilement des sites web dynamiques et personnalisés. Il est largement utilisé pour les blogs, les sites vitrines, les boutiques en ligne, et bien plus.

---

## 1. Pourquoi utiliser WordPress ?

- **Facilité d'utilisation** : Interface intuitive et accessible aux débutants.
- **Grande communauté** : Une multitude de thèmes, plugins et tutoriels.
- **Flexible** : Peut être utilisé pour créer tout type de site web.
- **Open source** : Gratuit et modifiable.

---

## 2. Prérequis pour l’installation locale

Avant d’installer WordPress localement, vous devez disposer :

- D’un environnement serveur local : **XAMPP**, **MAMP**, **WAMP**, ou **Laragon**.
- D’un navigateur web.
- D’un éditeur de code (ex. : VS Code) – optionnel mais recommandé.

---

## 3. Installation pas à pas de WordPress en local (avec XAMPP)

### Étape 1 : Télécharger et installer XAMPP

- Rendez-vous sur [https://www.apachefriends.org/fr/index.html](https://www.apachefriends.org/fr/index.html)
- Téléchargez la version adaptée à votre système d’exploitation.
- Installez XAMPP et lancez le **panneau de contrôle**.
- Démarrez **Apache** et **MySQL**.

---

### Étape 2 : Télécharger WordPress

- Allez sur [https://fr.wordpress.org/download/](https://fr.wordpress.org/download/)
- Téléchargez le fichier `.zip` de WordPress.
- Décompressez-le dans le dossier `htdocs` de XAMPP (généralement situé dans `C:\xampp\htdocs\`).
- Renommez le dossier si nécessaire (ex. : `mon-site`).

---

### Étape 3 : Créer une base de données

1. Ouvrez votre navigateur et allez sur `http://localhost/phpmyadmin`.
2. Cliquez sur **Nouvelle base** de données.
3. Donnez un nom à votre base (ex. : `wordpress_db`) et cliquez sur **Créer**.

---

### Étape 4 : Configuration de WordPress

1. Allez sur `http://localhost/mon-site`.
2. Choisissez la langue.
3. Renseignez les informations suivantes :
   - **Nom de la base** : `wordpress_db`
   - **Identifiant** : `root`
   - **Mot de passe** : (laissez vide)
   - **Hôte** : `localhost`
4. Lancez l'installation.

---

### Étape 5 : Finaliser l’installation

- Remplissez les informations du site :
  - Titre du site
  - Identifiant administrateur
  - Mot de passe
  - Email
- Cliquez sur **Installer WordPress**.

Félicitations ! 🎉 Votre site WordPress est installé en local.

---

## 4. Premiers pas dans l’administration WordPress

### Accéder au tableau de bord

Allez sur : `http://localhost/mon-site/wp-admin`  
Connectez-vous avec les identifiants créés à l’étape précédente.

### Interface du tableau de bord

- **Articles** : Pour écrire des publications.
- **Pages** : Pour créer des pages statiques.
- **Apparence** : Pour personnaliser le thème du site.
- **Extensions** : Pour ajouter des fonctionnalités.
- **Réglages** : Pour configurer le site (titre, URL, etc.).

---

## 5. Et maintenant ?

Ceux qui ont terminé peuvent :
- Explorer le tableau de bord,
- Tester différents thèmes,
- Installer quelques extensions utiles (comme Elementor, Contact Form 7, ou WP Super Cache),
- Ou simplement **chiller tranquille 😎**.

**Bon boulot à tous !**
