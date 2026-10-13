<?php
session_start();
$_SESSION['messages'] ??= [];
$erreurs = [];
$pseudo = '';
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pseudoBrut = $_POST['pseudo'] ?? '';
    $messageBrut = $_POST['message'] ?? '';
    $pseudo = is_string($pseudoBrut) ? trim($pseudoBrut) : '';
    $message = is_string($messageBrut) ? trim($messageBrut) : '';
    if ($pseudo === '') { $erreurs[] = 'Le pseudo est obligatoire.'; }
    if ($message === '') { $erreurs[] = 'Le message est obligatoire.'; }
    if (strlen($pseudo) > 120) { $erreurs[] = 'Pseudo trop long.'; }
    if (strlen($message) > 1120) { $erreurs[] = 'Message trop long.'; }
    if ($erreurs === []) {
        $_SESSION['messages'][] = ['pseudo' => $pseudo, 'message' => $message];
        $_SESSION['messages'] = array_slice($_SESSION['messages'], -20);
        header('Location: mini-chat.php', true, 303);
        exit;
    }
}
function h(string $text): string { return htmlspecialchars($text, ENT_QUOTES, 'UTF-8'); }
?>
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Mini-chat personnel</title></head>
<body><main><h1>Mini-chat personnel</h1>
<?php foreach ($erreurs as $erreur): ?><p role="alert"><?= h($erreur) ?></p><?php endforeach; ?>
<?php if ($_SESSION['messages'] === []): ?><p>Aucun message</p><?php endif; ?>
<ul>
<?php foreach ($_SESSION['messages'] as $item): ?>
  <li><?= h($item['pseudo']) ?> : <?= h($item['message']) ?></li>
<?php endforeach; ?>
</ul>
<form method="post" action="mini-chat.php">
  <label for="pseudo">Pseudo</label><input id="pseudo" name="pseudo" required maxlength="30" value="<?= h($pseudo) ?>">
  <label for="message">Message</label><textarea id="message" name="message" required maxlength="280"><?= h($message) ?></textarea>
  <button type="submit">Envoyer</button>
</form></main></body></html>
