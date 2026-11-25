<?php
$chemin = __DIR__ . '/idees.txt'; // Le fichier est placé à côté de ce script.
$erreur = '';
$idee = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $valeur = $_POST['idee'] ?? '';
    if (!is_string($valeur)) {
        $erreur = 'L’idée doit être du texte.';
    } else {
        $idee = trim($valeur);
        if ($idee === '' || strlen($idee) > 300) {
            $erreur = 'Écrivez une idée non vide, de 300 octets maximum.';
        } elseif (str_contains($valeur, ';') || str_contains($valeur, "\n") || str_contains($valeur, "\r")) {
            $erreur = 'Écrivez sur une ligne, sans point-virgule.';
        } else {
            $ligne = date('Y-m-d') . ';' . $idee . PHP_EOL; // Une ligne : date ; idée.
            $octets = file_put_contents($chemin, $ligne, FILE_APPEND | LOCK_EX);
            if ($octets === false || $octets !== strlen($ligne)) {
                $erreur = 'Enregistrement impossible.';
            } else {
                header('Location: carnet.php', true, 303);
                exit;
            }
        }
    }
}
$lignes = []; // Le premier affichage est vide si le fichier n’existe pas encore.
if (file_exists($chemin)) {
    $lecture = file($chemin, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if ($lecture === false) {
        $erreur = 'Lecture impossible.';
    } else {
        $lignes = $lecture;
    }
}
?>
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><title>Idées de sorties</title></head>
<body>
<h1>Mon carnet d’idées de sorties</h1>
<form method="post" action="carnet.php">
    <label for="idee">Une idée, sur une seule ligne</label>
    <input id="idee" name="idee" required value="<?= htmlspecialchars($idee, ENT_QUOTES, 'UTF-8') ?>">
    <button type="submit">Ajouter au carnet</button>
</form>
<p role="alert"><?= htmlspecialchars($erreur, ENT_QUOTES, 'UTF-8') ?></p>
<?php if ($lignes === [] && $erreur === ''): ?><p>Aucune idée pour le moment.</p><?php endif; ?>
<ul>
<?php foreach ($lignes as $ligne): ?>
    <?php
    $champs = explode(';', $ligne); // Sépare la date de l’idée.
    if (count($champs) !== 2 || $champs[0] === '' || trim($champs[1]) === '') {
        continue; // Ignore une ligne abîmée sans arrêter les suivantes.
    }
    ?>
    <li>
        <?= htmlspecialchars($champs[0], ENT_QUOTES, 'UTF-8') ?> :
        <?= htmlspecialchars($champs[1], ENT_QUOTES, 'UTF-8') ?>
    </li>
<?php endforeach; ?>
</ul>
</body>
</html>
