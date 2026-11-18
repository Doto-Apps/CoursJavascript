---
layout: "layouts/Layout.astro"
title: "Évaluer et corriger le projet Alter Ego"
type: "TP"
order: 5
quizId: "s3-alter-ego"
previousSession: "/semestre_3/deploiement_Services/nodeS4"
nextSession: "/semestre_3/deploiement_Services/nodeS6"
---

<a id="evaluation"></a>

## Présenter le projet

Les 30 premières minutes du TP sont consacrées à la démonstration et à l’évaluation. Faites un échange avec votre personnage et montrez ce qui se passe lorsqu’une saisie est invalide. Expliquez le trajet d’un message en vous appuyant sur une requête de l’onglet Réseau et sur votre code Express.

| Critère | Points |
|---|---:|
| Application fonctionnelle | 2 |
| Communication fetch / Express | 2 |
| Utilisation correcte de l’API LLM | 2 |
| Interface et affichage des messages | 2 |
| Compréhension du code et explications | 2 |
| **Total** | **10** |

<a id="diagnostic-http"></a>

## Retrouver une erreur avec l’onglet Réseau

Reproduisez d’abord le problème sur un cas simple. Vérifiez l’URL, la méthode, le corps envoyé et le statut HTTP. Une erreur 404 invite à comparer la méthode et le chemin avec la route Express. Une erreur 400 invite à vérifier le corps reçu et sa validation. Une erreur 429 indique que la fréquence ou le quota a été dépassé.

```js
if (!response.ok) {
  throw new Error("Échec de la requête HTTP");
}
```

`fetch()` peut fournir une réponse HTTP d’erreur. Vérifiez `response.ok` avant d’exploiter le corps comme une réussite. Essayez une URL erronée en simulation. Après correction, vérifiez que la même demande réussit.

<a id="diagnostic-json"></a>

## Vérifier le format de chaque échange

`await response.json()` lit le corps de la réponse et le convertit en valeur JavaScript. Si le serveur renvoie une page HTML d’erreur, cette lecture échoue. Au serveur, `express.json()` doit être placé avant la route pour que celle-ci lise les données via `req.body`. Comparez les noms des champs envoyés par le client et ceux lus par la route.

Dans le chat, le client doit lire `reply`. Vérifiez que la valeur reçue est du texte avant de l’afficher avec `textContent`. Faites un essai en renommant temporairement la propriété dans la réponse simulée. La page doit signaler une réponse invalide.

<a id="diagnostic-llm"></a>

## Vérifier la frontière avec le modèle

Si l’échange fonctionne en simulation, contrôlez ensuite la configuration serveur et la réponse du modèle. Vérifiez que le processus a chargé le bon fichier `.env`, que le nom du modèle est accessible et que le SDK renvoie du texte. Pour vérifier la configuration de la clé, contrôlez sa présence sans afficher sa valeur. Aucun détail brut du fournisseur ne doit apparaître dans la réponse au navigateur.

Pour éviter une demande répétée, laissez le bouton désactivé pendant la requête. Réactivez-le aussi après une erreur. Le serveur conserve sa limite de fréquence quel que soit l’état du bouton.

<a id="preparer-recommandation"></a>

## Passer d’un texte à un objet

Le prochain TP réutilise le même trajet HTTP. Une recommandation contient plusieurs propriétés. Chaque propriété peut alimenter un élément distinct de la carte.

```json
{
  "titre": "Le phare immobile",
  "categorie": "Film",
  "description": "Une gardienne enquête sur un phare.",
  "justification": "Le mystère correspond à l’ambiance recherchée."
}
```

En simulation, remplacez la réplique simple dans une route d’essai par cet objet. Vérifiez que les quatre propriétés sont présentes avant l’affichage. Masquez l’une des propriétés pour tester le message d’erreur. Ce contrôle de structure complète la vérification du statut HTTP.
