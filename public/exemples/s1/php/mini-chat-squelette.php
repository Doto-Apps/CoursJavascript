<?php
// Atelier DEV-06 : à compléter. Lancez via un serveur PHP local.
session_start();
$_SESSION['messages'] ??= [];
$erreurs = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // TODO 1 : recevoir pseudo/message, vérifier leur type et utiliser trim.
    // TODO 2 : vérifier champs non vides et limites d'octets du cours.
    // TODO 3 : si aucune erreur, ajouter un enregistrement dans la session.
    // TODO 4 : conserver au plus 20 messages et rediriger en 303, puis exit.
}
?>
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Mini-chat personnel</title></head>
<body>
<main>
  <h1>Mini-chat personnel</h1>
  <p>Historique de cette session, non partagé avec les autres postes.</p>
  <!-- TODO 5 : afficher les erreurs, puis parcourir et échapper les messages. -->
  <form method="post" action="mini-chat.php">
    <label for="pseudo">Pseudo</label><input id="pseudo" name="pseudo" required maxlength="30">
    <label for="message">Message</label><textarea id="message" name="message" required maxlength="280"></textarea>
    <button type="submit">Envoyer</button>
  </form>
</main>
</body>
</html>
