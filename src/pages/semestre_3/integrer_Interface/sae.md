---
layout: "layouts/Layout.astro"
title: "Accompagnement : vérifier et présenter son projet"
hidden: true
---

## Diagnostiquer un projet d’interface et de services

Une interface fonctionnelle repose sur des frontières vérifiables : contrôle, événement, requête, service et stockage. Le catalogue Retool et l’API de personnage utilisent des outils différents, mais une panne se localise avec la même démarche : une entrée connue et un résultat attendu.

## Le rapport d’anomalie

Un signalement contient l’environnement, les étapes exactes, le résultat attendu et le résultat observé. Une hypothèse aide à choisir le prochain test ; elle ne doit pas être présentée comme une cause prouvée.

| Observation | Test suivant | Interprétation possible |
|---|---|---|
| Ligne visible mais perdue au rechargement | Relancer la lecture de la ressource | Modification locale sans écriture confirmée |
| Mauvais produit modifié après tri | Comparer id sélectionné et id envoyé | Position confondue avec identité |
| API accessible sur son poste seulement | Appeler health depuis un autre poste autorisé | Adresse d’écoute ou réseau à vérifier |
| Bouton bloqué après une panne | Rejouer le parcours en erreur | Nettoyage absent du finally |

## Correction et test de régression

Exemple : après un tri du catalogue, modifier le prix de l’id `p7` changeait `p2`. La requête utilisait un indice dans le tableau d’origine. La correction utilise l’identifiant stable de la sélection. **Attendu après correction :** `p7` change, `p2` garde sa valeur, puis une nouvelle lecture de la base confirme les deux valeurs.

Rejouez le cas qui échouait, puis un cas voisin sans tri. Ce second contrôle vérifie que la correction n’a pas dégradé le fonctionnement normal. Une capture montre un état ; la séquence de tests explique comment cet état a été obtenu.

## Installation et limites connues

La notice indique comment démarrer, configurer et joindre les services avec des valeurs d’exemple. `localhost` désigne toujours le poste qui l’utilise : une démonstration réseau demande une adresse réellement joignable. Décrivez les opérations simulées, les dépendances nécessaires et les fonctions effectivement persistantes pour qu’un autre lecteur puisse reproduire le résultat.
