---
hidden: true
order: 5
layout: "layouts/Layout.astro"
title: "WooCommerce : présentation, tests et sauvegarde"
---

## Présentation et navigation d’une boutique

Après le [catalogue](/semestre_2/Gestion_De_Contenus/tp/tp-2), la présentation doit permettre de trouver, comparer et choisir un produit. Les couleurs et la typographie soutiennent ce parcours ; elles ne remplacent pas des intitulés explicites et des prix lisibles.

## Modèles, styles et menus

Un modèle détermine la structure de plusieurs pages, par exemple les fiches produit. Un contenu appartient à une fiche particulière. Une modification de modèle peut donc affecter tous les produits. Dans un thème à blocs, utilisez l’éditeur de site et le bloc Navigation ; dans un thème classique, le personnalisateur et les menus disponibles dépendent du thème.

Conservez une hiérarchie de texte régulière et des états de focus visibles. Un lien « Boutique » ouvre le catalogue ; un bouton « Ajouter au panier » exécute une action. Cette distinction reste celle des éléments HTML étudiés au S1, même quand le CMS produit le code.

## Vérifier un parcours public

| Action | Résultat attendu | Cause possible d’échec |
|---|---|---|
| Ouvrir l’accueil sans connexion | Contenu publié | Page restée en brouillon |
| Suivre Boutique | Catalogue | Mauvaise destination du menu |
| Ouvrir un produit | Fiche et prix | Produit masqué ou non publié |
| Ajouter deux unités | Quantité et total cohérents | Stock ou type de produit mal configuré |
| Réduire la largeur | Contenus et commandes accessibles | Image ou conteneur de largeur fixe |

Vérifiez la page publique après mise à jour. Le cache peut conserver une ancienne version ; vider le cache ne doit toutefois pas remplacer la vérification de la publication et de l’URL.

## Sauvegarde et restauration

Une sauvegarde inclut la base SQL et les fichiers, notamment `wp-content` pour les médias, thèmes et extensions. Restaurer seulement le dossier sans la base ne retrouve pas le catalogue. Une migration doit également traiter les adresses du site : un contenu qui référence `localhost` ne pointe pas vers le nouveau domaine.

Conservez un état avant une mise à jour et vérifiez une restauration dans un environnement de test. Une archive présente sur disque prouve l’existence d’un fichier ; une restauration réussie prouve que le site peut être repris.
