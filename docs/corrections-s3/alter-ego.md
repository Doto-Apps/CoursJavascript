# Évaluation Alter Ego · Fiche enseignant

Réserver 30 minutes à l’évaluation. Demander une démonstration en simulation puis une explication du passage en mode réel. Le contrôle du mode réel peut se limiter à la lecture du code si les accès fournisseur ne sont pas disponibles.

| Critère | Points | Vérification |
|---|---:|---|
| Application fonctionnelle | 2 | Un envoi valide produit une réplique. Une erreur est signalée et le chat permet un nouvel essai. |
| Communication fetch / Express | 2 | L’étudiant retrouve le POST, le JSON envoyé et la propriété renvoyée. Le serveur refuse le texte vide et trop long. |
| Utilisation de l’API LLM | 2 | Le SDK et la clé sont côté serveur. Le prompt est transmis dans les instructions et la saisie reste le message utilisateur. La sortie et la fréquence sont limitées. |
| Interface et messages | 2 | Les deux interlocuteurs sont identifiables. Un double clic ne lance pas deux appels. |
| Compréhension du code | 2 | L’étudiant montre le serveur, la lecture de req.body, la configuration et l’affichage de la réponse. |

## Essais rapides

- Saisie valide, vide puis trop longue. Vérifier la réponse simulée et le message côté navigateur.
- Envoyer plusieurs fois pour vérifier la limite serveur. Simuler un quota épuisé côté fournisseur pour vérifier le message affiché.
- En correction collective, partir du statut HTTP avant d’inspecter JSON. Vérifier la présence du parseur, la correspondance des champs et les deux attentes côté navigateur. Pour le fournisseur, vérifier le nom du modèle, le chargement de l’environnement et la présence d’une sortie exploitable.
- Pour le TP conseiller culturel, réutiliser ces essais en vérifiant aussi les quatre propriétés nécessaires à la carte.

## Accès au fournisseur

L’usage d’une clé commune peut entraîner une divulgation ou une consommation non maîtrisée. Privilégier un proxy pédagogique avec contrôle d’accès et quotas, ou des clés de projet limitées et révocables. Tester avec des réponses simulées et réserver les appels réels à une courte démonstration. Le modèle proposé est modifiable via OPENAI_MODEL. [Tarifs du modèle](https://developers.openai.com/api/docs/models/gpt-6-luna).
