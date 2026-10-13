---
layout: "layouts/Layout.astro"
title: "TP : un conte corse raconté par nos services"
type: "TP"
order: 3
quizId: "s3-node-services"
previousSession: "/semestre_3/deploiement_Services/nodeS2"
---

<a id="contexte"></a>

## Le contexte source du récit généré

**Contexte fourni, adaptation pédagogique :** un berger choisit la promesse de devenir roi plutôt que son engagement auprès d’une fée. Les merveilles qu’il croyait posséder disparaissent ; la reine le repousse. La magie fait alors payer les conséquences de ce choix. Notre suite peut introduire un médiateur et proposer une issue différente : chaque personnage doit réagir au dernier événement plutôt que recommencer l’histoire.

Source : J.-B. Frédéric Ortoli, *Les Contes populaires de l’île de Corse*, 1883, [extrait p. 290](https://fr.wikisource.org/wiki/Page:Ortoli_-_Les_Contes_populaires_de_l%E2%80%99%C3%AEle_de_Corse,_1883.djvu/310). Le recueil attribue ce passage à un récit communiqué par Antoine-Joseph Ortoli, d’Olmiccia, en 1882. Le résumé ci-dessus est reformulé ; vos répliques constituent une nouvelle adaptation, pas une citation du conte.

Le contexte est envoyé au modèle pendant une requête. Il ne sert pas à entraîner ses paramètres. En simulation, le texte sert uniquement à vérifier le trajet : une réplique répétitive est acceptable pour le test technique, pas pour la présentation finale.

<a id="orchestration"></a>

## L’orchestrateur des services de personnages

| Élément | Responsabilité | Limite explicite |
|---|---|---|
| Personnage | Répondre à POST /message avec personnage et reply. | Réplique courte, contrat constant. |
| Orchestrateur | Appeler les personnages dans l’ordre et assembler leurs réponses. | Deux tours de liste. |
| Historique | Garder les répliques pour la restitution. | Le dernier message seulement circule dans ce squelette. |
| Arrêt | Terminer ou signaler la première panne. | Pas de relance infinie ni d’appel récursif entre personnages. |

Pour N personnages et deux tours, il y a 2 × N appels, exécutés l’un après l’autre. Le personnage suivant reçoit la dernière réplique et le contexte initial. Ce n’est pas une mémoire intégrale : le choix conserve la taille du message sous la limite de l’API. Le programme conserve cependant toutes les réponses pour l’export final.

<a id="programme"></a>

## La boucle asynchrone de l’orchestrateur

Remplacez les adresses d’exemple par les IP et ports réellement testés. Tous les appels passent par l’API de personnage, jamais directement par LM Studio.

```js
import { writeFile } from "node:fs/promises";

const services = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
];
const contexte = "Un berger a trahi une fée pour devenir roi. La magie disparaît. Trouvons une issue.";
const source = "Adaptation : Ortoli, Les Contes populaires de l’île de Corse, 1883, p. 290.";
const tours = 2;
const recit = [source, contexte];
let derniere = "Le berger demande comment réparer son choix.";

try {
  for (let tour = 1; tour <= tours; tour++) {
    for (const service of services) {
      const message = `${contexte}\nDernière réplique : ${derniere.slice(0, 600)}\nFais avancer le récit en deux phrases.`;
      const response = await fetch(`${service}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(45000),
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error(`${service} : HTTP ${response.status}`);
      const data = await response.json();
      if (typeof data.personnage !== "string" || typeof data.reply !== "string" || !data.reply.trim()) {
        throw new Error(`${service} : réponse hors contrat`);
      }
      derniere = data.reply.trim();
      const ligne = `Tour ${tour} — ${data.personnage} : ${derniere}`;
      recit.push(ligne);
      console.log(ligne);
    }
  }
  await writeFile("conte.txt", recit.join("\n\n"), "utf8");
  console.log("Récit enregistré dans conte.txt");
} catch (error) {
  console.error("Récit interrompu :", error.message);
  process.exitCode = 1;
}
```

**Résultat attendu avec deux services :** quatre répliques puis conte.txt. Une panne interrompt explicitement le récit ; aucun succès final n’est annoncé. Le délai de l’orchestrateur dépasse celui du personnage pour laisser celui-ci renvoyer son erreur. Le fichier n’est écrit qu’après les tours réussis.

## Le contrat partagé entre les personnages

Attribuez un nom, un rôle et un objectif : la fée protège l’engagement, le berger cherche une réparation, la reine veut une preuve, un guide propose une étape. Dans la consigne system de la séance précédente, ajoutez ces informations et demandez de réagir au message reçu. Ne changez pas les champs JSON pour chaque rôle.

Gardez une trace de ce qui vient du texte source et de ce qui a été généré ou réécrit. Une réponse incohérente peut être éditée pour la restitution, mais documentez cette intervention. La qualité du récit ne démontre pas que le modèle « comprend » l’histoire comme une personne.

## Pour approfondir

- [fetch dans Node](https://nodejs.org/docs/latest-v22.x/api/globals.html#fetch).
- [Écrire un fichier avec fs/promises](https://nodejs.org/docs/latest-v22.x/api/fs.html#fspromiseswritefilefile-data-options).
- [Le recueil d’Ortoli](https://fr.wikisource.org/wiki/Livre:Ortoli_-_Les_Contes_populaires_de_l%E2%80%99%C3%AEle_de_Corse,_1883.djvu).
