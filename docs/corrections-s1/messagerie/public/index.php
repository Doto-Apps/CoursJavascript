<?php
require dirname(__DIR__) . '/common.php';
$utilisateur = exigerConnexion();
?>
<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Accueil de l’atelier</title></head>
<body><main><h1>Bonjour <?= h($utilisateur['pseudo']) ?></h1>
<p>Cette identité provient du compte vérifié en séance 5.</p>
<a href="mini-chat.php">Rejoindre le mini-chat de la séance 6</a>
<form method="post" action="deconnexion.php"><button type="submit">Se déconnecter</button></form>
</main></body></html>
