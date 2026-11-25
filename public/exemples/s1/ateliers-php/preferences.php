<?php
session_start(); // Toujours avant d’envoyer du HTML.
$erreur = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $prenom = $_POST['prenom'] ?? '';
    $theme = $_POST['theme'] ?? '';
    if (!is_string($prenom) || !is_string($theme)) {
        $erreur = 'Valeurs incorrectes.';
    } else {
        $prenom = trim($prenom);
        if ($prenom === '' || ($theme !== 'clair' && $theme !== 'sombre')) {
            $erreur = 'Indiquez un prénom et un thème proposé.';
        } else {
            $_SESSION['preferences'] = [ // Choisit les informations à conserver.
                'prenom' => $prenom,
                'theme' => $theme,
            ];
            header('Location: lecture.php', true, 303); // Ouvre la seconde page en GET.
            exit; // Arrête le traitement après la redirection.
        }
    }
}
?>
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><title>Mes préférences de lecture</title></head>
<body>
<h1>Préparer mon espace de lecture</h1>
<form method="post" action="preferences.php">
    <label for="prenom">Prénom</label>
    <input id="prenom" name="prenom" required>
    <label for="theme">Ambiance</label>
    <select id="theme" name="theme">
        <option value="clair">Claire</option>
        <option value="sombre">Sombre</option>
    </select>
    <button type="submit">Conserver mes choix</button>
</form>
<p role="alert"><?= htmlspecialchars($erreur, ENT_QUOTES, 'UTF-8') ?></p>
<a href="lecture.php">Voir l’espace de lecture</a>
</body>
</html>
