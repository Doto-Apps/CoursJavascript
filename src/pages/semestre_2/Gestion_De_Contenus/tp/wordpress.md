---
hidden: true
order: 6
layout: "layouts/Layout.astro"
title: "WordPress : intégrer une maquette"
---

## D’une maquette à une page WordPress

La maquette définit une organisation visuelle ; WordPress produit des pages à partir de contenus, de blocs et de modèles. Reprenez les [rôles HTML](/semestre_1/integration/htmltd) avant d’associer chaque zone à un outil du CMS.

| Zone de maquette | Élément du CMS | Information à conserver |
|---|---|---|
| En-tête commun | Modèle ou partie de modèle du thème | Nom et navigation |
| Titre de page | Titre du contenu ou bloc de titre approprié | Hiérarchie du document |
| Présentation | Blocs paragraphe et image | Texte éditable et alternative |
| Catalogue | Bloc ou page WooCommerce | Produits issus de la base |
| Pied de page | Partie commune du thème | Liens durables |

## Blocs et compositions réutilisables

Une composition rassemble des blocs pour répéter une structure, par exemple une fiche d’atelier. Une composition synchronisée partage ses modifications entre utilisations ; une structure copiée peut évoluer indépendamment. Choisissez la synchronisation pour un contenu qui doit rester identique, pas pour des fiches dont les textes diffèrent.

Exemple : une zone « Nous contacter » commune comporte un titre, une phrase et un lien. Après modification de l’adresse de contact dans la version synchronisée, vérifiez deux pages publiques. **Attendu :** elles utilisent la même destination mise à jour. Une simple copie ne possède pas cette relation.

## Espacements et largeur disponible

Traduisez les relations de la maquette : largeur maximale, espace intérieur, écart entre cartes et adaptation des colonnes. Une position absolue reproduite au pixel près devient fragile si le texte change. Le principe reste celui du [modèle de boîte](/semestre_1/integration/csstd#boites), même si l’éditeur présente des champs de réglage.

Vérifiez la page publiée à largeur étroite, avec un titre long et au clavier. N’exportez pas toute la maquette comme une image : les textes, liens et boutons doivent rester des éléments utilisables. Exportez seulement les médias nécessaires et préservez leurs proportions.
