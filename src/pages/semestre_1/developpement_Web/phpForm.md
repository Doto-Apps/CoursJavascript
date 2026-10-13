---
layout: "layouts/Layout.astro"
title: "TP PHP : recevoir et valider un message"
type: "TP"
order: 5
quizId: "s1-dev-04"
previousSession: "/semestre_1/developpement_Web/phpVarTab"
nextSession: "/semestre_1/developpement_Web/phpminichat2"
---

<a id="comprendre"></a>

## action, method et name

| Élément | Syntaxe | Fonction |
|---|---|---|
| Destination | `<form action="message.php">` | Adresse du script recevant les données. |
| Méthode | `method="post"` | Envoi des champs dans le corps de la requête. |
| Nom de champ | `name="pseudo"` | Clé utilisée par PHP pour retrouver la valeur. |
| Association | `<label for="pseudo">` et `id="pseudo"` | Relie un intitulé visible à son contrôle. |
| Soumission | `<button type="submit">` | Déclenche l’envoi du formulaire. |

Un `id` permet l’association du label et les sélections dans le document. Il ne remplace pas `name` pour l’envoi. Une méthode GET place les données dans l’URL ; POST les place dans le corps. POST ne chiffre pas le transport : le chiffrement relève de HTTPS.

```html preview title="Nommer un champ avant de le transmettre" height=150
<form>
  <label for="pseudo">Votre pseudo</label>
  <input id="pseudo" name="pseudo" required maxlength="30">
  <button type="submit">Envoyer</button>
</form>
```

Ce rendu fixe montre l’association et la syntaxe. Il n’envoie rien : le véritable formulaire du TP doit être ouvert sur votre serveur PHP. Les attributs `required` et `maxlength` aident l’utilisateur dans le navigateur, mais une requête fabriquée peut les contourner.

## La validation des champs reçus en PHP

L’absence de `$_POST['pseudo']` n’est pas équivalente à un pseudo vide. Récupérez d’abord une valeur si elle existe ; vérifiez qu’il s’agit d’une chaîne ; retirez les espaces de bord avec `trim` ; appliquez la règle de longueur. Un contrôle de type empêche de traiter un tableau reçu à la place du texte attendu.

`trim('   ')` donne une chaîne vide. Une erreur doit nommer le champ et expliquer la correction possible. Gardez les autres valeurs pour éviter de faire tout ressaisir. Lors de leur réaffichage dans le HTML, échappez les valeurs avec `htmlspecialchars` : une saisie ne doit pas devenir une balise.

**Méthode de test :** envoyer un message normal, un champ absent, un texte composé d’espaces, une valeur trop longue et des caractères comme `<` ou `&`. Le serveur doit refuser les données invalides et afficher les données valides comme du texte.

## Du formulaire HTML à $_POST

Un formulaire prépare une requête ; PHP doit ensuite comprendre et vérifier cette requête. Le texte visible du label, l’identifiant du champ et le nom envoyé ne sont pas la même chose. `for` et `id` associent le label au contrôle ; `name` fournit la clé reçue côté PHP.

```html live title="Label, identifiant et nom transmis"
<style>
      body {
        font-family: system-ui, sans-serif;
        margin: 16px;
        color: #203047;
        background: #f3f6fa;
      }
      label {
        display: block;
        margin-top: 16px;
      }
      input,
      button {
        font: inherit;
        padding: 8px;
      }
      output {
        display: block;
        margin-top: 16px;
        white-space: pre-wrap;
      }
      input:focus-visible,
      button:focus-visible {
        outline: 3px solid #2457a7;
        outline-offset: 3px;
      }
    </style>

<h1>Une saisie, une clé</h1>
    <p>Démonstration locale : aucun serveur ni stockage.</p>
    <form>
      <label for="pseudo">Votre pseudo</label>
      <input id="pseudo" name="pseudo" required />
      <label for="message">Votre message</label>
      <input id="message" name="message" required />
      <button type="submit">Voir les données préparées</button>
    </form>
    <output aria-live="polite"></output>
    <script>
      document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        document.querySelector("output").textContent = JSON.stringify(
          Object.fromEntries(data),
          null,
          2,
        );
      });
    </script>
```

**Le laboratoire est une démonstration front-end :** il affiche les données qui seraient envoyées, sans requête PHP ni stockage. Pour le vrai TP, utilisez le serveur local et le code de réception décrit plus bas.

```php
<?php
$valeur = $_POST['pseudo'] ?? '';
$pseudo = is_string($valeur) ? trim($valeur) : '';
```

**Lecture accompagnée :** `??` fournit une valeur de secours si la clé manque. Le test de type empêche de traiter un tableau comme une chaîne. `trim` retire les espaces aux extrémités ; une saisie composée d’espaces devient vide. Ces étapes préparent la validation, mais n’acceptent pas automatiquement le message.

**Résultat attendu :** pour une valeur reçue `'  Sam  '`, `$pseudo` contient `'Sam'`. Pour une clé absente ou une valeur de type tableau, il contient une chaîne vide. Ce fragment prépare une variable ; il n’affiche rien à lui seul.

**Thèmes possibles :** avis sur un film, message à un club ou commentaire d’un projet. Gardez une entrée textuelle, une validation et un affichage explicite du résultat.

<a id="formulaire"></a>

## GET et POST dans un formulaire

```html
<form method="post" action="message.php">
  <label for="pseudo">Pseudo</label>
  <input id="pseudo" name="pseudo" required maxlength="30">
  <label for="message">Message</label>
  <textarea id="message" name="message" required maxlength="280"></textarea>
  <button type="submit">Envoyer</button>
</form>
```

`action` indique la destination ; `method` le mode d'envoi. `name` définit la clé transmise au serveur. `id` relie ici le champ à son label ; il ne remplace pas `name`. GET place les paramètres dans l'URL et convient notamment à une recherche ; POST transmet les données dans le corps de la requête. POST n'est pas un chiffrement : HTTPS protège le transport.

<a id="reception"></a>

## Les champs absents de $_POST

```php
$pseudoBrut = $_POST['pseudo'] ?? '';
$messageBrut = $_POST['message'] ?? '';
$pseudo = is_string($pseudoBrut) ? trim($pseudoBrut) : '';
$message = is_string($messageBrut) ? trim($messageBrut) : '';
```

`$_POST` contient les données POST ; `$_GET` les paramètres de l'URL. `??` fournit une valeur de repli si la clé est absente ou vaut null. `trim` retire les espaces aux extrémités, pas au milieu. Un client peut envoyer une valeur inattendue, même un tableau : vérifier le type évite de traiter aveuglément toutes les données comme une chaîne.

<a id="validation"></a>

## Les types et limites des valeurs reçues

Les attributs `required` et `maxlength` aident dans le navigateur, mais peuvent être contournés. Le serveur doit vérifier à nouveau : pseudo non vide, message non vide, tailles autorisées. Pour cet atelier, `strlen` compte des octets ; une lettre accentuée peut en occuper plusieurs en UTF-8. Les limites serveur sont donc des limites d'octets clairement indiquées. Une évolution pourra utiliser `mb_strlen` si l'extension est disponible pour compter des caractères.

```php
$erreurs = [];
if ($pseudo === '') { $erreurs[] = 'Le pseudo est obligatoire.'; }
if ($message === '') { $erreurs[] = 'Le message est obligatoire.'; }
if (strlen($pseudo) > 120) { $erreurs[] = 'Pseudo trop long.'; }
if (strlen($message) > 1120) { $erreurs[] = 'Message trop long.'; }
```

Ces plafonds en octets sont distincts des limites de confort 30/280 caractères du formulaire. Affichez les erreurs et ne traitez pas un message invalide. Les validations décrivent les règles acceptées ; elles ne rendent pas automatiquement un texte sûr à insérer dans du HTML.

<a id="sortie"></a>

## L’échappement avec htmlspecialchars

```php
if ($erreurs === []) {
    echo '<p>' . htmlspecialchars($pseudo, ENT_QUOTES, 'UTF-8') . ' : '
        . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p>';
}
```

Échapper la sortie protège le contexte HTML texte. Ce n'est ni une suppression des données originales ni une protection universelle pour SQL ou JavaScript. Un message `<script>alert(1)</script>` doit être visible comme texte et ne déclencher aucune alerte. N'affichez pas directement `$_POST['message']`.
