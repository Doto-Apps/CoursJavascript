# Référence enseignant — connexion puis mini-chat

Cette correction complète n’est pas distribuée dans les énoncés. Dev 05 est un cours sur trois sujets distincts : inscription à un atelier, préférences de lecture et carnet de sorties. Le mini-chat est un nouveau projet, lu pendant les 30 dernières minutes puis réalisé seul à la maison avec le guide Dev 06. La dernière séance sert à la démonstration, à la correction et à la compréhension.

## Déroulement proposé pour Dev 05 — 26 novembre 2026

| Temps | Travail en cours |
|---|---|
| 0–10 min | QCM et rappel des tableaux, conditions et boucles |
| 10–35 min | Inscription : formulaire, tableaux associatifs, inspection de `$_POST` et `$_SERVER`, validation |
| 35–60 min | Préférences : conserver, relire et retirer les données de `$_SESSION` sur deux pages |
| 60–90 min | Carnet de sorties : ajouter, relire et découper les lignes d’un fichier texte |
| 90–120 min | Lecture du guide Dev 06, attentes, améliorations au choix et compréhension, sans réaliser le projet avec le groupe |

Les quatre fichiers de `public/exemples/s1/ateliers-php` sont complets et copiables : `inscription.php`, `preferences.php`, `lecture.php` et `carnet.php`. Ils sont reproduits dans le cours et réunis dans une archive. Les placer dans `htdocs` de XAMPP. Montrer le contenu des tableaux, faire modifier un name, une préférence ou le séparateur du carnet. Il n’y a ni connexion au chat ni messagerie préfabriquée dans Dev 05.

Dev 06 explique comment adapter ces mécanismes : comptes fictifs et vérification, identité en session, accès protégé, message, ajout, lecture et déconnexion. Des fragments aident à démarrer ; les contrôles, les traitements complets, les boucles et l’interface restent à construire. Prévoir ensuite les démonstrations, les questions individuelles et une correction collective.

## Lancer la référence enseignant

Placer le dossier `messagerie` dans le dossier `htdocs` de XAMPP. Le dossier `stockage` doit exister et être accessible en écriture par PHP. Aucun serveur SQL ni extension mbstring n’est requis.

Comptes fictifs : `lea` / `atelier` et `sam` / `campus`. Le mot de passe est en clair dans le tableau serveur et comparé directement avec `===`, comme demandé pour réutiliser les bases du S1. Seuls identifiant et pseudo sont mémorisés dans `$_SESSION['utilisateur']`.

Le guide Dev 06 adapte les tableaux et les sessions du cours à une connexion, puis les fichiers à un historique commun. Une ligne contient pseudo et texte séparés par `|`. Le pseudo reçu dans une requête est ignoré. Les caractères réservés sont contrôlés avant nettoyage. Les textes sont échappés à l’affichage. L’organisation des dossiers proposée aux étudiants reste simple ; cette référence enseignant conserve son propre sous-dossier `public`.

Les écritures utilisent ajout et verrou exclusif. La lecture simple n’acquiert pas de verrou partagé ; chaque ligne est vérifiée dans cette petite application.

Pour les tests automatisés, `MMI_CHAT_STORAGE` peut désigner un fichier d’essai dans un dossier temporaire existant. Aucun historique réel n’est nécessaire. Tester accès direct refusé, mauvais identifiants, compte reconnu, deux sessions, faux pseudo reçu, caractères réservés, liste vide, ligne mal formée, erreur d’écriture et persistance après rechargement/déconnexion.

## Note du projet sur 20

Faire une démonstration courte : connexion, deux messages, changement d’utilisateur et déconnexion. Apprécier globalement les trois critères, sans multiplier les sous-points.

| Critère | Points | Repère |
|---|---:|---|
| Fonctionnalités PHP du mini-chat | 12 | Connexion, session, accès contrôlé, envoi, historique et déconnexion |
| Beauté et utilisation de l’interface | 5 | Présentation, lisibilité et facilité d’utilisation |
| Améliorations personnelles | 3 | Une ou plusieurs idées utiles, réalisées et expliquées |
| **Total** | **20** | |

Les trois points d’amélioration sont inclus dans le total sur 20. L’étudiant peut présenter un alignement selon l’auteur, une image de profil, un horodatage ou une autre idée. Apprécier son apport et sa réalisation ; ne pas imposer trois fonctions ni une option déterminée. La beauté du socle et les ajouts personnels restent deux appréciations distinctes.

## Trois questions de compréhension

Poser trois questions au total, adaptées au code de l’étudiant, une par axe. Demander de montrer les lignes concernées ; l’explication compte davantage qu’une récitation de noms de fonctions. Chaque réponse est jugée comprise ou non comprise, avec une courte relance si nécessaire.

| Axe | Question possible | Repère de compréhension |
|---|---|---|
| Formulaire et traitement | « Montre le trajet de ce message, depuis le bouton jusqu’au traitement PHP. Où vérifies-tu qu’il est accepté ? » | L’étudiant retrouve le formulaire POST, le name, la lecture de `$_POST` et les vérifications avant écriture. |
| Session et identité | « Comment connais-tu l’auteur ? Que se passe-t-il si je remplace le pseudo envoyé par le formulaire ? » | Il distingue une donnée reçue d’une identité vérifiée en session et explique le contrôle d’accès. |
| Fichier et persistance | « Où retrouves-tu les anciens messages ? Comment ajoutes-tu le nouveau sans les effacer ? Que reste-t-il après déconnexion ? » | Il montre le fichier, l’ajout et la relecture, et distingue la durée de vie de la session de celle de l’historique. |

**Coefficient = nombre de réponses comprises ÷ 3.**

**Note finale = note du projet × coefficient.**

| Réponses comprises | Coefficient | Projet à 18/20 |
|---|---:|---:|
| 0 | 0 | 0/20 |
| 1 | 1/3 | 6/20 |
| 2 | 2/3 | 12/20 |
| 3 | 1 | 18/20 |

Zéro réponse comprise donne zéro, même avec un projet à 20/20. Le QCM de révision ne remplace pas cet échange. Conserver les fractions et n’arrondir que la note finale.

| Étudiant | PHP /12 | Interface /5 | Améliorations /3 | Projet /20 | Q1 (0/1) | Q2 (0/1) | Q3 (0/1) | Coefficient | Note finale /20 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| | | | | | | | | | |
