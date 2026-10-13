---
hidden: true
order: 3
layout: "layouts/Layout.astro"
title: "WooCommerce : installation et structure de boutique"
---

## WooCommerce : la structure d’une boutique

WooCommerce ajoute à WordPress des produits, un panier et des commandes. Le [site WordPress local](/semestre_2/Gestion_De_Contenus/cm/cms) doit déjà s’exécuter avec PHP et sa base. La boutique de démonstration utilise des données fictives ; les paiements restent désactivés.

## Installer et activer WooCommerce

Depuis l’administration, ouvrez les extensions, recherchez WooCommerce, installez-le et activez-le. L’installation dépose les fichiers ; l’activation exécute l’intégration au CMS. L’assistant peut proposer des services supplémentaires : ils ne sont pas nécessaires pour étudier un catalogue local.

Choisissez une devise, une localisation de test et un type de produit cohérents. Ces réglages influencent l’affichage des prix et les étapes de commande. Ils ne remplacent pas une configuration commerciale complète.

## Les pages et les données métier

| Élément | Fonction | Résultat à observer |
|---|---|---|
| Boutique | Liste des produits publiés | Catalogue public |
| Fiche produit | Description, prix et disponibilité | Une ressource par produit |
| Panier | Sélection et quantités | Total recalculé |
| Commande | Coordonnées et validation | Parcours distinct du simple panier |
| Mon compte | Accès du client | Données selon la configuration |

Vérifiez les pages créées et leur affectation dans les réglages WooCommerce avant d’en créer des doublons. Selon l’installation, panier et commande utilisent des blocs ou les mécanismes historiques correspondants. Une page portant le nom « Panier » mais sans le contenu WooCommerce ne présente pas le panier.

## Thème et accueil

Le thème modifie la présentation, pas la définition des produits. Affectez une page publiée à l’accueil statique et reliez la boutique depuis la navigation. **Attendu :** un visiteur atteint l’accueil puis la boutique sans connaître leurs adresses. Une boutique vide peut être correctement installée : les [produits](/semestre_2/Gestion_De_Contenus/tp/tp-2) sont ajoutés dans le support suivant.

Une commande sans moyen de paiement actif peut être impossible à finaliser. Cette situation ne signifie pas que le panier est cassé. Pour tester une commande complète, utilisez uniquement un mode de test explicitement configuré ; n’annoncez pas un paiement réalisé sur la base d’un simple affichage.
