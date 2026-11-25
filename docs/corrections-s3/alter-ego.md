# TP final Alter Ego · Fiche enseignant

Support étudiant : `src/pages/semestre_3/deploiement_Services/nodeS5.md`. La séance 5 est la dernière du module ; elle lance le TP à terminer à la maison. L’ancien TP de recommandations culturelles et son QCM ont été retirés.

## Démonstration rapide

Prévoir environ cinq minutes par étudiant, à adapter au groupe. L’application et le code sont ouverts sur son écran. Poser une question sur son parcours ou un projet, demander comment le contacter, puis essayer de modifier le rôle ou de faire inventer une expérience. Regarder globalement le résultat selon les trois critères ci-dessous.

Le portrait doit représenter l’étudiant : parcours, compétences, projets, personnalité et contact choisi. Apprécier la richesse utile des informations et leur fidélité, sans imposer de longueur de prompt ou de nombre de projets. Une information absente doit être reconnue. Aucun prompt n’est invulnérable : apprécier le cadre et le comportement observé avec discernement.

## Note du projet sur 20

| Critère | Points | Repère d’appréciation |
|---|---:|---|
| Interface et expérience du chat | 6 | Qualité visuelle, lisibilité et fluidité des échanges |
| Cadrage de l’IA | 8 | Cohérence de la personnalité, pertinence des règles, réaction aux tentatives de détournement |
| Qualité des informations de l’Alter Ego | 6 | Portrait riche et personnel, réponses utiles et fidèles, contact pertinent |
| **Total** | **20** | |

Ces catégories laissent une liberté d’appréciation. Ne pas créer de sous-barème par bouton, contrôle technique ou test réussi. Les trois questions ci-dessous déterminent séparément le coefficient de compréhension.

## Trois questions de compréhension

Poser trois questions au total, une par axe. Adapter la formulation au code présenté et demander à l’étudiant de montrer les lignes concernées. Une reformulation ou une courte relance permet de vérifier une explication hésitante. Chaque question est jugée comprise ou non comprise ; aucun point supplémentaire de compréhension n’est ajouté à la note du projet.

| Axe | Question possible | Ce qui permet de constater la compréhension |
|---|---|---|
| Trajet d’un message | « Montre comment cette saisie arrive à Express et comment la réponse apparaît dans la page. » | L’étudiant retrouve la soumission, le POST et son JSON, la lecture de `req.body` et l’affichage de `reply`. Il comprend le rôle de chaque partie. |
| Personnalité et informations | « Où définis-tu qui est ton Alter Ego et ce qu’il sait ? Que se passe-t-il si je lui demande d’inventer une expérience ? » | Il distingue `instructions` et `input`, montre son portrait et ses règles, explique une limite ou une amélioration de son cadre. |
| Clé et appel de l’API | « Où est la clé et quel programme l’utilise ? Comment testes-tu ton interface sans appel facturé ? » | Il situe `.env` et le SDK côté serveur, explique la simulation et retrouve le modèle `gpt-6-luna`. Il sait que les appels consomment le budget du professeur. |

Ces repères guident l’échange ; ils ne constituent pas une liste de mots à réciter. L’enseignant décide si l’explication manifeste une compréhension réelle, à partir de la réalisation de l’étudiant.

**Coefficient = nombre de questions comprises ÷ 3.**

**Note finale sur 20 = note du projet × coefficient.**

| Questions comprises | Coefficient | Projet à 18/20 |
|---|---:|---:|
| 0 | 0 | 0/20 |
| 1 | 1/3 | 6/20 |
| 2 | 2/3 | 12/20 |
| 3 | 1 | 18/20 |

Conserver les fractions pendant le calcul et n’arrondir que la note finale, selon la pratique habituelle. **Zéro question comprise entraîne zéro, même avec un projet à 20/20.** Le QCM d’entrée reste une révision et ne remplace pas cet échange.

Grille à recopier pour une correction rapide :

| Étudiant | Interface /6 | Cadrage /8 | Informations /6 | Projet /20 | Q1 (0/1) | Q2 (0/1) | Q3 (0/1) | Coefficient | Note finale /20 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| | | | | | | | | | |

## Clé et modèle du TP

Remettre la clé par le canal prévu pour le groupe, sans l’ajouter au cours publié. Le support demande d’utiliser **la clé API fournie par le professeur**, uniquement pour ce TP, de ne pas la partager et de ne pas multiplier les appels. La vraie clé reste dans le fichier local `.env`, hors de `public/` et du dépôt. Le fichier d’exemple contient uniquement `YOUR_API_KEY_HERE`.

Le modèle prescrit est **`gpt-6-luna`**, avec Responses, `reasoning: { effort: "none" }` et `max_output_tokens: 180`. Sa [fiche officielle](https://developers.openai.com/api/docs/models/gpt-6-luna) et la [référence Responses](https://developers.openai.com/api/reference/resources/responses/methods/create) ont été vérifiées le 25 novembre 2026. Vérifier l’accès au modèle avec le projet fournisseur avant de distribuer la clé.

Le développement se fait d’abord en simulation ; quelques essais réels servent à contrôler la personnalité. Le TP n’ajoute pas de système de quotas à développer. Si le fournisseur est indisponible le jour de la démonstration, la simulation permet d’observer l’interface et le trajet HTTP ; examiner le portrait et les consignes pour compléter l’appréciation du cadrage.

## Repères pour accompagner sans donner la solution

- Un aller-retour avec une réponse fixe doit fonctionner avant l’intégration de l’API.
- Le démarrage Express est redonné dans le support. Avec Node.js 22, `process.loadEnvFile()` charge le fichier `.env` ; le lancement reste `node app.js` ou `npm run serveur`. Aucune bibliothèque supplémentaire n’est nécessaire.
- Le schéma interactif illustre six étapes sans appel réseau ; aucun dessin ni compte rendu supplémentaire n’est demandé.
- Les noms du contrat sont `message` à l’envoi et `reply` au retour ; les échecs utilisent `error`.
- Le SDK fournit `output_text` sur son objet résultat ; la méthode `response.json()` concerne la réponse HTTP reçue par le navigateur.
- Le portrait reste côté serveur et passe avec les instructions à chaque appel. Il ne s’agit pas d’un entraînement du modèle.
- La version de base conserve les messages à l’écran sans envoyer d’historique au modèle. Cette absence de mémoire conversationnelle est annoncée et ne doit pas être pénalisée.
- Le support laisse à écrire l’écouteur complet, la validation, le choix simulation/réel, l’intégration asynchrone, les erreurs, les fonctions d’affichage et les consignes personnelles. Ne pas distribuer une application complète comme correction de départ.
