---
hidden: true
order: 1
layout: "layouts/Layout.astro"
title: "WordPress : architecture, installation et contenus"
---

## WordPress : contenu, thème et extensions

Un CMS (*Content Management System*) permet de publier des contenus sans modifier directement chaque fichier HTML. Avec WordPress, PHP s’exécute sur le serveur, la base conserve les contenus et les réglages, et le navigateur reçoit une page. Les fichiers de médias restent aussi nécessaires : la base seule ne constitue pas une sauvegarde complète.

| Élément | Responsabilité | Exemple |
|---|---|---|
| Cœur WordPress | Comptes, édition, publication et fonctions communes | Enregistrer une page |
| Thème | Modèles et présentation | En-tête et mise en page |
| Extension | Fonction supplémentaire | Catalogue WooCommerce |
| Contenu | Informations publiées | Texte d’une page ou d’un article |

Changer un thème ne doit pas être confondu avec supprimer les contenus. Une extension ajoute aussi du code à maintenir : installez-la pour un besoin identifié et vérifiez son effet.

## Installer un site local

WordPress demande un serveur HTTP, PHP et MySQL ou MariaDB compatibles avec sa version. Les versions requises évoluent : consultez les [exigences officielles](https://wordpress.org/about/requirements/) avant l’installation. Dans XAMPP, démarrez Apache et MySQL, puis placez les fichiers WordPress dans un sous-dossier de `htdocs`, par exemple `mon-site`.

1. Téléchargez WordPress depuis le [site officiel](https://fr.wordpress.org/download/), puis décompressez-le dans `htdocs/mon-site`.
2. Dans phpMyAdmin, créez une base dédiée, par exemple `wordpress_mmi`, avec un encodage Unicode adapté.
3. Ouvrez `http://localhost/mon-site` et indiquez le nom de base, l’hôte et les identifiants de votre serveur SQL local.
4. Créez le compte administrateur WordPress et le titre du site.

**Résultat observable :** `http://localhost/mon-site` affiche la partie publique ; `http://localhost/mon-site/wp-admin/` ouvre la connexion à l’administration. Le compte WordPress est différent du compte SQL. Les identifiants SQL dépendent de l’installation : `root` sans mot de passe n’est pas une règle générale ni une configuration à reproduire en ligne.

Une page de connexion SQL en erreur se diagnostique avec le service MySQL, le nom de base et les identifiants. Une URL qui ne répond pas se diagnostique d’abord avec Apache et le chemin du dossier. Ouvrir un fichier PHP en double-cliquant ne lance pas WordPress.

## Pages, articles et publication

Une page convient à un contenu stable comme « Contact ». Un article convient à une publication datée et classable. Un brouillon n’est pas une page publique ; la prévisualisation d’un administrateur ne prouve pas qu’un visiteur peut y accéder.

Exemple : créez une page « Horaires », ajoutez « Du mardi au samedi, de 10 h à 18 h », puis publiez-la. Ouvrez son adresse dans une fenêtre privée. **Attendu :** le titre et le texte sont lisibles sans connexion. Une modification enregistrée en brouillon reste différente d’une mise à jour publiée.

Dans les thèmes à blocs, l’éditeur de site gère les modèles et la navigation. Les thèmes classiques peuvent proposer le personnalisateur et l’écran Menus. Identifiez le type de thème avant de chercher un écran qui n’existe pas dans cette configuration. Le [support de composition](/semestre_2/Gestion_De_Contenus/td/cms) distingue l’éditeur natif et un constructeur de pages.
