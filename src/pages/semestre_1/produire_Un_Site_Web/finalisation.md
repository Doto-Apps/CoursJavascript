---
layout: "layouts/Layout.astro"
title: "Projet : finaliser, remettre et présenter le site"
type: "TD"
order: 8
previousSession: "/semestre_1/produire_Un_Site_Web/norme"
---

<a id="comprendre"></a>
## Les défauts bloquants et les finitions

La finalisation vérifie le parcours complet du site. Un lien cassé bloque une tâche ; un intitulé vague gêne la compréhension ; une ombre irrégulière affecte surtout la cohérence visuelle. Corrigez d’abord ce qui empêche l’usage prévu par le brief.

| Défaut | Conséquence | Vérification après correction |
|---|---|---|
| Destination de projet absente | Impossible de consulter la réalisation | Suivre le lien depuis l’accueil |
| Focus invisible | Position clavier inconnue | Parcourir avec Tab et Maj+Tab |
| Image manquante | Information ou illustration absente | Contrôler la ressource et son alternative |
| Texte coupé sur petit écran | Contenu incomplet | Réduire la fenêtre et augmenter le zoom |

Un rapport d’anomalie précise les étapes, l’attendu et l’observé. Après correction, rejouez le même test puis un cas voisin. Une capture montre un état ; la séquence rend la correction reproductible.

## Le dossier du site et la notice

Le dossier contient les pages, les styles, les médias utilisés et leurs crédits. La notice ou README indique le point d’entrée, le mode de lancement et les éventuelles limites. Un chemin vers un fichier situé uniquement sur votre poste ne fonctionnera pas ailleurs.

```text
site/
  index.html
  css/styles.css
  images/
  credits.md
  README.md
```

**Résultat attendu sur une copie du dossier :** l’accueil s’ouvre, ses médias se chargent et ses liens rejoignent les destinations prévues. Les fichiers temporaires ou une ancienne version portant presque le même nom ne doivent pas remplacer la version annoncée.

## Vérifier la version finale

Vérifiez le dossier réellement remis ou publié, pas seulement celui qui fonctionnait avant une copie. Les noms et la casse des fichiers, les chemins CSS et les adresses des liens sont des causes fréquentes d’écart. Les [tests responsive](responsive) et [d’accessibilité](norme) restent applicables à cette version.

| Scénario | Preuve utile |
|---|---|
| Accueil → projet → contact | Parcours complet avec destinations réelles |
| Fenêtre étroite et zoom | Contenus disponibles sans coupure |
| Navigation clavier | Contrôles atteignables et focus visible |
| Copie ou publication | Ressources présentes dans la version diffusée |

## Présenter un choix technique et ses limites

Une explication technique relie un besoin, une règle et un résultat. Exemple : « Grid partage les colonnes de plusieurs rangées ; ajouter une carte conserve leurs alignements ». Montrez la déclaration concernée puis son effet. Pour Flexbox, nommez l’axe principal avant d’expliquer un alignement.

Les limites connues font partie de la description : un formulaire sans serveur est une démonstration, une liste statique n’est pas une base de données et un test sur une largeur ne couvre pas tous les écrans. Une contribution d’outil ou d’assistant doit pouvoir être expliquée et vérifiée par les personnes qui maintiennent le code.

## Remise et démonstration

Préparez une copie propre du dossier et faites-la ouvrir par un autre groupe en suivant uniquement le README. Vérifiez accueil, trois projets, contact, ressources, petit écran et clavier dans cette copie. Écartez les anciennes versions et conservez les crédits des médias utilisés.

Remettez les fichiers du site, la notice, la grille de tests finale et les limites connues. Préparez une démonstration courte du parcours, puis expliquez un choix de structure et un choix CSS à partir de leurs déclarations et de leur effet visible.
