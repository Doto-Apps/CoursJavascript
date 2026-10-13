---
hidden: true
order: 2
layout: "layouts/Layout.astro"
title: "TD : Création de la Maquette Figma pour le Site Birbone"
type: "TD"
---

## Le plan d’une maquette de site vitrine

Cette référence applique les notions de [wireframe, maquette et prototype](figma) à un site de présentation. Une page unique regroupe les rubriques avec des ancres ; un site multipage donne une adresse propre aux contenus qui demandent un développement distinct.

| Contenu | Page unique | Plusieurs pages |
|---|---|---|
| Présentation courte | Section de l’accueil | Page d’accueil |
| Catalogue bref | Cartes et ancres | Page de liste |
| Description détaillée | Peut allonger fortement la page | Fiche dédiée |
| Contact | Section identifiée | Page Contact |

## Frames, styles et composants

Créez un frame représentant une largeur d’écran. Placez les zones selon leur hiérarchie : titre, présentation, catalogue et contact. Des règles de largeur et d’espacement doivent relier les zones ; une collection de coordonnées ne précise pas le comportement responsive.

Définissez les styles de texte et les couleurs communes, puis un composant de carte. Une instance de carte peut changer de titre et de média tout en conservant sa structure. **Résultat observable :** deux fiches possèdent les mêmes marges intérieures et la même hiérarchie, malgré des contenus différents.

## Prototype et export

Reliez une action à une destination dans le prototype pour décrire un parcours. Le clic peut changer d’écran dans la simulation sans effectuer de requête HTTP ni enregistrer de données. Exportez les médias utiles séparément et gardez le texte éditable pour l’intégration. Une exportation PNG de toute la page sert de référence visuelle, pas de remplacement au HTML.

Notez les comportements non montrés : titre long, écran étroit, focus clavier et image manquante. Ces décisions complètent les spécifications nécessaires à la [structure HTML](integration).
