<?php
require dirname(__DIR__) . '/common.php';
$utilisateur = exigerConnexion();
$chemin = getenv('MMI_CHAT_STORAGE') ?: dirname(__DIR__) . '/stockage/messages.txt';
$erreurs = [];
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $brut = $_POST['message'] ?? '';
    if (!is_string($brut)) {
        $erreurs[] = 'Le message doit être du texte.';
    } else {
        $message = trim($brut);
        if ($message === '' || strlen($message) > 1120) $erreurs[] = 'Message obligatoire, au plus 1120 octets.';
        if (str_contains($brut, '|') || str_contains($brut, "\r") || str_contains($brut, "\n")) {
            $erreurs[] = 'Le message doit tenir sur une ligne et ne pas contenir de barre verticale.';
        }
    }
    if ($erreurs === []) {
        // L'auteur vient exclusivement de la session ; aucun pseudo reçu n'est utilisé.
        $ligne = $utilisateur['pseudo'] . '|' . $message . PHP_EOL;
        if (!is_writable(dirname($chemin)) || (file_exists($chemin) && !is_writable($chemin))) {
            $erreurs[] = 'Enregistrement impossible.';
        } else {
            $ecrit = file_put_contents($chemin, $ligne, FILE_APPEND | LOCK_EX);
            if ($ecrit === false || $ecrit !== strlen($ligne)) $erreurs[] = 'Enregistrement impossible.';
            else rediriger('mini-chat.php');
        }
    }
}
$messages = [];
if (file_exists($chemin)) {
    if (!is_readable($chemin)) {
        $erreurs[] = 'Lecture de l’historique impossible.';
    } else {
        $lignes = file($chemin, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lignes === false) $erreurs[] = 'Lecture de l’historique impossible.';
        else foreach ($lignes as $ligne) {
            $champs = explode('|', $ligne);
            if (count($champs) !== 2 || $champs[0] === '' || trim($champs[1]) === '') continue;
            $messages[] = ['pseudo' => $champs[0], 'message' => $champs[1]];
        }
    }
}
?>
<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Mini-chat de l’atelier</title></head>
<body><main><h1>Mini-chat</h1>
<p>Connecté : <?= h($utilisateur['pseudo']) ?></p>
<?php foreach ($erreurs as $erreur): ?><p role="alert"><?= h($erreur) ?></p><?php endforeach; ?>
<?php if ($messages === [] && $erreurs === []): ?><p>Aucun message</p><?php endif; ?>
<ul>
<?php foreach ($messages as $item): ?>
  <li><?= h($item['pseudo']) ?> : <?= h($item['message']) ?></li>
<?php endforeach; ?>
</ul>
<form method="post" action="mini-chat.php">
  <label for="message">Message sur une ligne</label>
  <input id="message" name="message" required value="<?= h($message) ?>">
  <button type="submit">Envoyer</button>
</form>
<form method="post" action="deconnexion.php"><button type="submit">Se déconnecter</button></form>
</main></body></html>
