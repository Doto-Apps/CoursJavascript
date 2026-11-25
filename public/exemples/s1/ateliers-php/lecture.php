<?php
session_start(); // Retrouve la session commencée sur preferences.php.

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    unset($_SESSION['preferences']); // Retire seulement cette entrée de la session.
    header('Location: preferences.php', true, 303);
    exit;
}
$preferences = $_SESSION['preferences'] ?? []; // Une absence donne un tableau vide.
$valide = is_array($preferences)
    && isset($preferences['prenom'], $preferences['theme'])
    && is_string($preferences['prenom']) && is_string($preferences['theme']);
$theme = 'clair';
if ($valide) {
    $theme = $preferences['theme'];
}
?>
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8"><title>Mon espace de lecture</title>
    <style>
        body { font-family: sans-serif; padding: 24px; }
        .sombre { background: #172235; color: #f4f7ff; }
        .sombre a { color: #bfdbfe; }
    </style>
</head>
<body class="<?= htmlspecialchars($theme, ENT_QUOTES, 'UTF-8') ?>">
<h1>Mon espace de lecture</h1>
<?php if ($valide): ?>
    <p>Bienvenue <?= htmlspecialchars($preferences['prenom'], ENT_QUOTES, 'UTF-8') ?>.</p>
    <p>Votre thème est <?= htmlspecialchars($theme, ENT_QUOTES, 'UTF-8') ?>.</p>
<?php else: ?>
    <p>Aucune préférence enregistrée.</p>
<?php endif; ?>
<h2>Contenu de $_SESSION</h2>
<pre><?= htmlspecialchars(print_r($_SESSION, true), ENT_QUOTES, 'UTF-8') ?></pre>
<a href="preferences.php">Modifier mes choix</a>
<form method="post" action="lecture.php">
    <button type="submit">Oublier mes préférences</button>
</form>
</body>
</html>
