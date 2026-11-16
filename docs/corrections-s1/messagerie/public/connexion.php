<?php
require dirname(__DIR__) . '/common.php';
$erreurs = [];
$identifiant = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Toute tentative repart d'une identité non connectée.
    unset($_SESSION['utilisateur']);
    $identifiantBrut = $_POST['identifiant'] ?? '';
    $motDePasse = $_POST['mot_de_passe'] ?? '';
    if (!is_string($identifiantBrut) || !is_string($motDePasse)) {
        $erreurs[] = 'Identifiants incorrects.';
    } else {
        $identifiant = trim($identifiantBrut);
        $compte = $comptes[$identifiant] ?? null;
        if ($compte !== null && $motDePasse === $compte['mot_de_passe']) {
            session_regenerate_id(true);
            $_SESSION['utilisateur'] = ['identifiant' => $identifiant, 'pseudo' => $compte['pseudo']];
            rediriger('index.php');
        }
        $erreurs[] = 'Identifiants incorrects.';
    }
}
?>
<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Connexion à l’atelier</title></head>
<body><main><h1>Connexion</h1>
<?php foreach ($erreurs as $erreur): ?><p role="alert"><?= h($erreur) ?></p><?php endforeach; ?>
<form method="post" action="connexion.php">
  <label for="identifiant">Identifiant</label>
  <input id="identifiant" name="identifiant" required value="<?= h($identifiant) ?>">
  <label for="mot_de_passe">Mot de passe de test</label>
  <input id="mot_de_passe" name="mot_de_passe" type="password" required>
  <button type="submit">Se connecter</button>
</form></main></body></html>
