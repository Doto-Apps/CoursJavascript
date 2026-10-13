---
hidden: true
order: 2
layout: "layouts/Layout.astro"
quizId: "s2-data-portfolio"
title: "JavaScript Fetch avec PHP et base de données SQL"
type: "TD"
---

## La chaîne navigateur, API PHP et MySQL

Une liste persistante traverse trois environnements : JavaScript demande et affiche, PHP valide et répond, MySQL stocke. La [séquence HTTP/JSON](/semestre_2/developpement_Web/td/http-json) introduit le contrat ; [fetch et PHP](/semestre_2/developpement_Web/td/fetch-php) explique les deux attentes ; [PDO](/semestre_2/developpement_Web/tp/lecture) ajoute le stockage.

| Étape | Donnée | Observation |
|---|---|---|
| Formulaire | Titre textuel | Valeur saisie |
| Requête POST | `{"title":"Préparer les photos"}` | Corps visible dans Réseau |
| Validation PHP | Chaîne non vide et longueur autorisée | Réponse 4xx si refus |
| INSERT préparé | Titre transmis séparément du SQL | Une nouvelle ligne |
| Réponse 201 | Objet créé avec identifiant | Corps JSON |
| Rendu DOM | Texte de l’objet confirmé | Nouvelle tâche affichée |

## Lire une liste confirmée

```js
async function lireTaches() {
  const response = await fetch('/api/todos.php');
  if (!response.ok) throw new Error(`Lecture refusée : ${response.status}`);
  const taches = await response.json();
  if (!Array.isArray(taches)) throw new Error('Liste attendue');
  return taches;
}
```

Une réponse `200` avec `[{"id":3,"title":"Préparer les photos","done":false}]` fournit une tâche identifiée. `200` avec `[]` fournit une liste vide. Le script doit être chargé par une page HTTP ayant accès à la route ; les aperçus de cours ne contactent pas PHP.

## Produire du JSON côté serveur

```php
<?php
// Exemple autonome à enregistrer dans un fichier .php servi par PHP.
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    ['id' => 3, 'title' => 'Préparer les photos', 'done' => false]
], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
```

**Sortie HTTP :** `[{"id":3,"title":"Préparer les photos","done":false}]`. Le navigateur reçoit ce texte, pas le programme PHP. Cet exemple fixe n’effectue aucune lecture SQL ; remplacer la collection par le résultat PDO est une étape distincte. Aucun espace, HTML ou message de débogage ne doit polluer le corps JSON.

## Du prototype à la liste persistante

Une simulation JavaScript vérifie les interactions, mais seule une écriture suivie d’une nouvelle lecture serveur prouve la persistance. Le [squelette Todo List](/exemples/s2/todo-squelette.zip) contient les fichiers de départ et sa notice. La [séquence de développement](/semestre_2/developpement_Web/tp/ajout) explique ensuite l’ajout, la modification, la suppression et les erreurs, sans recopier toute l’application dans ce support.

Pour rechercher une panne, vérifiez successivement la route seule, le statut, le corps JSON, le contenu SQL puis le rendu. Une carte affichée à partir d’une valeur locale ne prouve pas que la base a accepté une écriture.
