---
layout: "layouts/Layout.astro"
title: "Complément : interface de conversation et états"
hidden: true
---

Cette ressource prolonge le [service de personnage](/semestre_3/deploiement_Services/nodeS1). Le rendu conserve le même contrat de message et de réponse.

| Élément | Fonction | Précaution |
|---|---|---|
| form et événement submit | Envoyer aussi avec le clavier. | Annuler la navigation native dans la version JavaScript. |
| label lié au champ | Nommer le message. | Un placeholder seul ne suffit pas. |
| button de soumission | Déclencher une demande. | Désactivé seulement pendant l’attente. |
| Zone role status | Annoncer attente ou erreur. | Message compréhensible, sans secret. |
| Liste de répliques | Conserver la conversation visible. | Afficher les contenus avec textContent. |

Cette démonstration simule la réponse localement pour observer les états sans serveur. Elle ne contacte ni Ollama ni LM Studio.

```html live title="Conversation simulée : attente et reprise"
<form id="formulaire">
  <label for="message">Votre message</label>
  <input id="message" name="message" required maxlength="1000">
  <button>Envoyer</button>
</form>
<label><input id="panne" type="checkbox"> Simuler une panne</label>
<p id="etat" role="status"></p>
<ol id="conversation"></ol>
<style>
  body { font: 16px system-ui; padding: 20px; }
  form { display: grid; gap: 10px; max-width: 32rem; }
  input, button { font: inherit; padding: 8px; }
  li { margin-block: 12px; overflow-wrap: anywhere; }
  :focus-visible { outline: 3px solid #2457a7; outline-offset: 3px; }
</style>
<script>
  const form = document.querySelector('#formulaire');
  const champ = document.querySelector('#message');
  const bouton = form.querySelector('button');
  const etat = document.querySelector('#etat');
  const liste = document.querySelector('#conversation');
  async function demander(message) {
    await new Promise(resolve => setTimeout(resolve, 400));
    if (document.querySelector('#panne').checked) throw new Error('Réponse indisponible. Réessayez.');
    return { personnage: 'A Fata', reply: `J’ai reçu : ${message}` };
  }
  function ajouter(texte) {
    const ligne = document.createElement('li');
    ligne.textContent = texte;
    liste.append(ligne);
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const message = champ.value.trim();
    if (!message || bouton.disabled) return;
    bouton.disabled = true;
    etat.textContent = 'En attente de réponse…';
    try {
      const data = await demander(message);
      ajouter(`Vous : ${message}`);
      ajouter(`${data.personnage} : ${data.reply}`);
      form.reset();
      etat.textContent = 'Réponse reçue.';
    } catch (error) {
      etat.textContent = error.message;
    } finally {
      bouton.disabled = false;
    }
  });
</script>
```

**Lecture :** le formulaire est vidé seulement après réussite. Enfin, finally réactive le bouton dans les deux cas. La simulation retarde volontairement sa réponse de 400ms pour rendre l’état d’attente observable ; ce délai n’est pas à ajouter à votre API réelle.

## La requête HTTP vers le service

Dans votre projet, remplacez demander par un fetch POST qui sérialise message, contrôle response.ok, analyse le JSON et vérifie les deux champs. Le navigateur doit joindre un serveur accessible ; localhost désigne son propre poste. Si la page et l’API ont des origines différentes, leur communication doit être autorisée explicitement ou passer par le serveur de la même origine. no-cors ne rend pas le JSON lisible.

L’aperçu du site est sandboxé : la connexion aux services de la salle doit être essayée dans votre vrai projet, pas supposée fonctionnelle depuis cette simulation. L’ancienne adresse Ollama /api/ask n’est pas une route de notre API ; le parcours principal connecte LM Studio **côté Node**, sans dépendre d’une API de modèle directement dans le navigateur.
