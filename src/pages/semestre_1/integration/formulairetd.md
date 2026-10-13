---
hidden: true
order: 8
layout: "layouts/Layout.astro"
title: "Référence : construire un formulaire HTML accessible"
type: "TD"
---

## Les champs et l?envoi d?un formulaire HTML

Un formulaire regroupe des contr?les et d?crit les donn?es ? transmettre. La structure HTML ne cr?e ni compte ni courriel : un traitement serveur est n?cessaire pour enregistrer ou envoyer les donn?es. La [s?quence PHP](/semestre_1/developpement_Web/phpForm) explique ce traitement.

| Élément ou attribut | Syntaxe | Rôle et précaution |
|---|---|---|
| form | `<form action="/traitement.php" method="post">` | Adresse du traitement et méthode ; sans traitement, ne pas annoncer un vrai envoi. |
| label | `<label for="email">Courriel</label>` | Le for rejoint l’id du champ ; le nom reste visible pendant la saisie. |
| input text | `<input id="nom" name="nom" type="text">` | Une ligne de texte ; name donne la clé envoyée. |
| input email | `<input id="email" name="email" type="email">` | Aide à vérifier une forme ; ne prouve pas que l’adresse existe. |
| input password | `<input type="password" name="motdepasse">` | Masque l’affichage ; ne chiffre pas le transport à lui seul. |
| textarea | `<textarea name="message"></textarea>` | Texte multiligne. |
| select et option | `<select name="theme"><option value="photo">Photo</option></select>` | Choix parmi des valeurs explicitement définies. |
| button | `<button type="submit">Envoyer</button>` | Soumission ; type button sert à une autre action locale. |
| required, maxlength | `required maxlength="100"` | Contraintes navigateur, à revérifier côté serveur. |

Un id est unique dans le document ; plusieurs contrôles peuvent partager un name dans des cas particuliers, mais chaque champ de cet exemple possède sa clé. Le placeholder propose un exemple, pas une étiquette permanente. Pour regrouper des cases liées, utilisez fieldset avec legend et nommez chaque case.

## L’association du label et du champ

Le champ possède un nom annoncé et une contrainte. Le résultat ci-dessous est un aperçu d’apparence ; il ne collecte rien.

```html preview title="Une étiquette et son champ" height=130
<label for="courriel">Courriel</label>
<input id="courriel" name="courriel" type="email" required>
<style>
  label {
    display: block;
    margin-bottom: 8px;
  }
  input {
    font: inherit;
    max-width: 100%;
  }
</style>
```

## La validation native des champs HTML

La démonstration annule la soumission et affiche les valeurs comme du texte. Elle ne crée pas une inscription.

```html live title="Formulaire de démonstration sans envoi"
<form id="formulaire">
  <label for="nom">Nom</label>
  <input id="nom" name="nom" required maxlength="100">
  <label for="email">Courriel</label>
  <input id="email" name="email" type="email" required>
  <label for="theme">Thème</label>
  <select id="theme" name="theme">
    <option value="photo">Photo</option>
    <option value="musique">Musique</option>
  </select>
  <button>Vérifier la saisie</button>
</form>
<p id="resultat" role="status"></p>
<style>
  body { font: 16px system-ui; padding: 20px; }
  form { display: grid; gap: 10px; max-width: 30rem; }
  input, select, button { font: inherit; padding: 8px; min-width: 0; }
  :focus-visible { outline: 3px solid #2457a7; outline-offset: 3px; }
  button { transition: background-color 200ms; }
  button:hover { background-color: #dce9fa; }
</style>
<script>
  const form = document.querySelector('#formulaire');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const valeurs = new FormData(form);
    document.querySelector('#resultat').textContent =
      `Démonstration : ${valeurs.get('nom')}, thème ${valeurs.get('theme')}. Aucun envoi effectué.`;
  });
</script>
```

Le CSS place les champs dans une grille et conserve un focus perceptible. Pour une rangée, Flexbox peut organiser les contrôles, mais des retours à la ligne restent nécessaires sur une petite fenêtre. La transition est déclarée sur l’état de base pour accompagner aussi le retour depuis le survol. Le comportement JavaScript est fourni : les événements sont approfondis au S2.
