---
layout: "layouts/Layout.astro"
title: "Cadrer le projet de site Web"
type: "CM"
order: 1
nextSession: "/semestre_1/produire_Un_Site_Web/figma"
---

<a id="comprendre"></a>
## Le besoin, le public et le périmètre d’un site

Le commanditaire demande le site ; l’utilisateur le consulte pour réaliser une tâche. Ces rôles peuvent être distincts. Un objectif associe un public à une action et à un résultat observables : « permettre à un responsable de stage de consulter trois projets et de contacter leur auteur » est vérifiable ; « faire un beau site » ne précise pas la tâche.

| Élément du brief | Exemple | Conséquence |
|---|---|---|
| Public | Responsable de stage découvrant vos travaux | Expliquer votre contribution |
| Action | Choisir et consulter un projet | Liste puis fiche accessible |
| Contenus | Titres, descriptions, images et crédits | Préparer les ressources avant le CSS |
| Contraintes | Site vitrine HTML/CSS sur plusieurs écrans | Navigation, responsive et vérifications |

Le périmètre technique du site vitrine S1 comprend HTML/CSS, navigation et vérifications. Les bases de données et les comptes utilisateurs seront étudiés ultérieurement. Un formulaire sans traitement doit annoncer « Démonstration sans envoi » : son apparence ne crée ni message ni inscription.

## Arborescence et parcours utilisateur

L’arborescence décrit l’organisation des pages ou rubriques. Un parcours décrit les étapes d’une tâche. La présence d’une page Contact dans un plan ne garantit pas qu’un visiteur trouvera son lien.

```text
Accueil
├── Projets
│   ├── Projet Photo
│   └── Projet Affiche
└── Contact

Parcours : accueil → projets → projet Photo → contact
```

Le plan présente les contenus disponibles ; le parcours précise un usage. Pour chaque lien, indiquez une destination ; pour chaque bouton, indiquez une action. Un lien sans destination réelle empêche le parcours, même si sa présentation semble terminée.

## Priorités et dépendances

La liste indispensable / utile / optionnel classe les priorités. L’indispensable permet de réaliser la tâche principale ; l’utile la facilite ; l’optionnel peut être différé sans la bloquer.

| Priorité | Exemple pour le portfolio |
|---|---|
| Indispensable | Trois projets lisibles et un contact accessible |
| Utile | Classement des projets par domaine |
| Optionnel | Animation décorative d’apparition |

Les tâches ont aussi des dépendances : une carte nécessite son contenu ; une grille nécessite des cartes ; un test de navigation nécessite les destinations. Une répartition de travail doit préserver la compréhension de l’ensemble du parcours.

## Critères de réussite, livrables et jalons

« Les trois projets sont accessibles depuis l’accueil » est un critère concret. Un livrable est un élément remis et vérifiable : fichiers du site, médias, notice ou grille de tests. Un jalon est un point de contrôle intermédiaire, par exemple une version HTML lisible avant sa mise en forme.

| Test | Résultat attendu |
|---|---|
| Suivre Projets depuis l’accueil | Liste des trois projets |
| Ouvrir une fiche | Titre, rôle personnel et description |
| Suivre Contact | Coordonnées ou destination réelle |
| Réduire la fenêtre | Contenu et liens toujours accessibles |

Le [support de maquette](figma) transforme ces besoins en relations de contenu et de disposition. La structure technique sera ensuite construite en HTML avant les finitions CSS.
