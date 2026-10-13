---
hidden: true
order: 7
layout: "layouts/Layout.astro"
quizId: "s2-data-portfolio"
title: "Portfolio dynamique avec JavaScript Fetch, PHP et MySQL"
type: "TP"
---

## Le portfolio dynamique : données et affichage

Le portfolio reprend les échanges HTTP/JSON de la Todo List avec un modèle de données plus riche. Une fiche projet possède un titre, une description, des médias, des dates et des liens. Le [parcours du portfolio](/semestre_2/Site_Web_Avec_Donnees/td/portfolio) développe progressivement ce modèle, son API, ses cartes et sa gestion.

## Données obligatoires et données absentes

| Champ | Rôle | Absence à traiter |
|---|---|---|
| id | Identité générée | Requise pour un projet enregistré |
| title | Titre public | Chaîne vide refusée |
| description | Présentation | Politique de longueur explicite |
| image_url | Média | Image de remplacement ou zone retirée |
| start_date, end_date | Période | `end_date = null` pour un projet en cours |
| technologies | Classification | Tableau vide si aucune catégorie |
| project_url, code_url | Destinations | Pas de lien vide ou inventé |

`null` représente une absence prévue ; `''` représente une chaîne présente mais vide. Un intitulé « En cours » appartient au rendu, pas à une colonne SQL de type date. Le [schéma et l’API de lecture](/semestre_2/Site_Web_Avec_Donnees/td/base) fixent les types avant le CSS.

## Transformer un objet en carte

```html live title="Une fiche de portfolio sans serveur"
<section aria-label="Projets"></section>
<script>
  const projet = { id: 4, title: 'Festival', description: 'Identité visuelle et affiche.', end_date: null };
  const carte = document.createElement('article');
  const titre = document.createElement('h2');
  titre.textContent = projet.title;
  const description = document.createElement('p');
  description.textContent = projet.description;
  const periode = document.createElement('p');
  periode.textContent = projet.end_date === null ? 'Projet en cours' : `Terminé le ${projet.end_date}`;
  carte.append(titre, description, periode);
  document.querySelector('section').append(carte);
</script>
```

Le rendu affiche « Festival », sa description et « Projet en cours ». Aucun appel serveur n’est effectué. `textContent` conserve les données comme texte. Un lien éventuel doit aussi posséder une URL autorisée : protéger le texte ne valide pas une destination.

## Lecture, filtres et gestion

La liste source conserve tous les projets reçus. La vue filtrée est calculée à partir de cette source, puis rendue par une même fonction de carte. Le formulaire de gestion possède un mode ajout ou édition ; l’identifiant de l’objet, jamais son indice visuel, désigne la ligne à modifier.

La [séquence des filtres](/semestre_2/Site_Web_Avec_Donnees/td/filtres) combine texte et technologie. La [gestion](/semestre_2/Site_Web_Avec_Donnees/td/gestion) traite les validations et les erreurs sans perdre la saisie. Le [squelette téléchargeable](/exemples/s2/portfolio-squelette.zip) et sa notice fournissent le point de départ exécutable, tandis que les cours expliquent chaque couche.

## Vérifier une écriture

Après un ajout confirmé, rechargez la liste depuis l’API puis rechargez la page. **Attendu :** le même identifiant et les mêmes données réapparaissent. Une validation refusée laisse le formulaire renseigné et ne crée aucune ligne. Les [tests de qualité](/semestre_2/Site_Web_Avec_Donnees/td/qualite) couvrent aussi les contenus longs, les liens absents et la navigation clavier.
