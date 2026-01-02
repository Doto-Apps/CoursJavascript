---
layout: "layouts/Layout.astro"
title: "Introduction aux Formulaires HTML et CSS"
type: "TD"
---

## Qu'est-ce qu'un formulaire HTML ?

Un formulaire HTML est un moyen pour les utilisateurs d'interagir avec une page web en envoyant des informations via des champs de saisie. Les formulaires peuvent être utilisés pour recueillir des informations telles que des noms, des adresses e-mail, des mots de passe, etc.

## Structure de base d'un formulaire HTML

Un formulaire HTML de base est constitué de la balise `<form>` et de différents éléments de saisie comme `<input>`, `<textarea>`, et `<button>`.

### Exemple de formulaire de base

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Formulaire de base</title>
</head>
<body>
  <form>
    <label for="name">Nom :</label>
    <input type="text" id="name" name="name"><br><br>
    <label for="email">Email :</label>
    <input type="email" id="email" name="email"><br><br>
    <input type="submit" value="Envoyer">
  </form>
</body>
</html>
```
<div style="margin:auto;">
<form>
  <label for="name">Nom :</label>
  <input type="text" id="name" name="name"><br><br>
  <label for="email">Email :</label>
  <input type="email" id="email" name="email"><br><br>
  <input type="submit" value="Envoyer">
</form>
</div>

### Explications

- `<form>` : La balise de formulaire qui enveloppe tous les éléments du formulaire.
- `<label>` : La balise pour les étiquettes des champs de formulaire.
- `<input>` : La balise pour les champs de saisie.
- `type="text"` : Champ de saisie de texte.
- `type="email"` : Champ de saisie pour les adresses e-mail.
- `<input type="submit">` : Bouton pour envoyer le formulaire.

## Ajouter du CSS aux Formulaires

Ajouter du CSS aux formulaires permet de les styliser pour les rendre plus attrayants et plus faciles à utiliser.

### Exemple de formulaire stylisé

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Formulaire stylisé</title>
  <style>
    form {
      max-width: 400px;
      margin: auto;
      padding: 1em;
      background: #f9f9f9;
      border-radius: 5px;
    }
    label {
      margin-bottom: .5em;
      color: #333333;
      display: block;
    }
    input[type="text"],
    input[type="email"] {
      border: 1px solid #CCCCCC;
      padding: .5em;
      font-size: 1em;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 1em;
    }
    input[type="submit"] {
      padding: 0.7em;
      color: #fff;
      background-color: #007BFF;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    input[type="submit"]:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <form>
    <label for="name">Nom :</label>
    <input type="text" id="name" name="name">
    <label for="email">Email :</label>
    <input type="email" id="email" name="email">
    <input type="submit" value="Envoyer">
  </form>
</body>
</html>
```
<div style="margin:auto;">
<form style="max-width: 400px; margin: auto; padding: 1em; background: #f9f9f9; border-radius: 5px;">
  <label for="name">Nom :</label>
  <input type="text" id="name" name="name" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
  <label for="email">Email :</label>
  <input type="email" id="email" name="email" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
  <input type="submit" value="Envoyer" style="padding: 0.7em; color: #fff; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">
</form>
</div>

### Explications

- `form` : Définit le conteneur du formulaire avec une largeur maximale, des marges automatiques pour le centrer, du padding pour l'espacement intérieur, un fond et des bordures arrondies.
- `label` : Stylise les étiquettes pour les espacer et les rendre plus lisibles.
- `input[type="text"], input[type="email"]` : Stylise les champs de saisie pour les rendre uniformes.
- `input[type="submit"]` : Stylise le bouton de soumission pour le rendre plus attrayant et interactif.

## Types de champs de saisie

HTML5 a introduit de nombreux nouveaux types de champs de saisie qui facilitent la validation et la saisie de données.

### Exemple de différents types de champs

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Formulaire avec différents types de champs</title>
  <style>
    form {
      max-width: 400px;
      margin: auto;
      padding: 1em;
      background: #f9f9f9;
      border-radius: 5px;
    }
    label {
      margin-bottom: .5em;
      color: #333333;
      display: block;
    }
    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="url"],
    input[type="date"],
    input[type="range"] {
      border: 1px solid #CCCCCC;
      padding: .5em;
      font-size: 1em;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 1em;
    }
    input[type="submit"] {
      padding: 0.7em;
      color: #fff;
      background-color: #007BFF;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    input[type="submit"]:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <form>
    <label for="name">Nom :</label>
    <input type="text" id="name" name="name">
    <label for="email">Email :</label>
    <input type="email" id="email" name="email">
    <label for="tel">Téléphone :</label>
    <input type="tel" id="tel" name="tel">
    <label for="url">Site Web :</label>
    <input type="url" id="url" name="url">
    <label for="date">Date de naissance :</label>
    <input type="date" id="date" name="date">
    <label for="range">Volume :</label>
    <input type="range" id="range" name="range" min="0" max="100">
    <input type="submit" value="Envoyer">
  </form>
</body>
</html>
```
<div style="margin:auto;">
<form style="max-width: 400px; margin: auto; padding: 1em; background: #f9f9f9; border-radius: 5px;">
  <label for="name">Nom :</label>
  <input type="text" id="name" name="name" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
  <label for="email">Email :</label>
  <input type="email" id="email" name="email" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
  <label for="tel">Téléphone :</label>
  <input type="tel" id="tel" name="tel" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
  <label for="url">Site Web :</label>
  <input type="url" id="url" name="url" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
  <label for="date">Date de naissance :</label>
  <input type="date" id="date" name="date" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
  <label for="range">Volume :</label>
  <input type="range" id="range" name="range" min="0" max="100" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
  <input type="submit" value="Envoyer" style="padding: 0.7em; color: #fff; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">
</form>
</div>

### Explications

- `type="tel"` : Champ de saisie pour les numéros de téléphone.
- `type="url"` : Champ de saisie pour les URL.
- `type="date"` : Champ de saisie pour les dates.
- `type="range"` : Champ de saisie pour les valeurs numériques dans une plage.

## Textarea et Sélection

### Exemple avec textarea et sélection

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <title>Formulaire avec textarea et sélection</title>
  <style>
    form {
      max-width: 400px;
      margin: auto;
      padding: 1em;
      background: #f9f9f9;
      border-radius: 5px;
    }
    label {
      margin-bottom: .5em;
      color: #333333;
      display: block;
    }
    input[type="text"],
    input[type="email"],
    textarea,
    select {
      border: 1px solid #CCCCCC;
      padding: .5em;
      font-size: 1em;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 1em;
    }
    input[type="submit"] {
      padding: 0.7em;
      color: #fff;
      background-color: #007BFF;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    input[type="submit"]:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <form>
    <label for="name">Nom :</label>
    <input type="text" id="name" name="name">
    <label for="email">Email :</label>
    <input type="email" id="email" name="email">
    <label for="message">Message :</label>
    <textarea id="message" name="message"></textarea>
    <label for="country">Pays :</label>
    <select id="country" name="country">
      <option value="france">France</option>
      <option value="usa">USA</option>
      <option value="canada">Canada</option>
    </select>
    <input type="submit" value="Envoyer">
  </form>
</body>
</html>
```
<div style="margin:auto;">
<form style="max-width: 400px; margin: auto; padding: 1em; background: #f9f9f9; border-radius: 5px;">
  <label for="name">Nom :</label>
  <input type="text" id="name" name="name" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
  <label for="email">Email :</label>
  <input type="email" id="email" name="email" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
  <label for="message">Message :</label>
  <textarea id="message" name="message" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;"></textarea>
  <label for="country">Pays :</label>
  <select id="country" name="country" style="border: 1px solid #CCCCCC; padding: .5em; font-size: 1em; width: 100%; box-sizing: border-box; margin-bottom: 1em;">
    <option value="france">France</option>
    <option value="usa">USA</option>
    <option value="canada">Canada</option>
  </select>
  <input type="submit" value="Envoyer" style="padding: 0.7em; color: #fff; background-color: #007BFF; border: none; border-radius: 5px; cursor: pointer;">
</form>
</div>

### Explications

- `<textarea>` : Champ de saisie de texte multilignes.
- `<select>` : Menu déroulant pour sélectionner une option parmi plusieurs.

## Conclusion

Dans ce cours, nous avons couvert les bases des formulaires HTML et de leur stylisation avec CSS. Vous avez appris comment créer différents types de champs de saisie, ajouter des styles pour améliorer l'apparence et la convivialité des formulaires, et utiliser des éléments comme `<textarea>` et `<select>`. Pratiquez en créant et en stylisant vos propres formulaires pour renforcer vos compétences.

---
