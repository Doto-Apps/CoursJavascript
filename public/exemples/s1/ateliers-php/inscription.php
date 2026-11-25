<?php
$erreur = '';
$confirmation = '';
$prenom = '';
$ateliers = ['photo' => 'Photo', 'dessin' => 'Dessin'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') { // Ne traite que les envois du formulaire.
    $valeur = $_POST['prenom'] ?? ''; // La clé correspond au name du champ.
    $choix = $_POST['atelier'] ?? '';
    if (!is_string($valeur) || !is_string($choix)) { // Vérifie les types avant de les utiliser.
        $erreur = 'Les champs doivent contenir du texte.';
    } else {
        $prenom = trim($valeur); // Retire les espaces aux extrémités.
        $atelier = $ateliers[$choix] ?? null; // Cherche la clé choisie dans le tableau.
        if ($prenom === '' || $atelier === null) {
            $erreur = 'Indiquez un prénom et un atelier proposé.';
        } else {
            $confirmation = $prenom . ' est inscrit à l’atelier ' . $atelier . '.';
        }
    }
}
$informations = [ // Quelques données de $_SERVER à observer.
    'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'],
    'SCRIPT_NAME' => $_SERVER['SCRIPT_NAME'],
];
?>
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><title>Inscription à un atelier</title></head>
<body>
<h1>Inscription à un atelier</h1>
<form method="post" action="inscription.php">
    <label for="prenom">Prénom</label>
    <input id="prenom" name="prenom" required value="<?= htmlspecialchars($prenom, ENT_QUOTES, 'UTF-8') ?>">
    <label for="atelier">Atelier</label>
    <select id="atelier" name="atelier">
        <option value="photo">Photo</option>
        <option value="dessin">Dessin</option>
    </select>
    <button type="submit">M’inscrire</button>
</form>
<p role="alert"><?= htmlspecialchars($erreur, ENT_QUOTES, 'UTF-8') ?></p>
<p><?= htmlspecialchars($confirmation, ENT_QUOTES, 'UTF-8') ?></p>
<h2>Contenu de $_POST</h2>
<pre><?= htmlspecialchars(print_r($_POST, true), ENT_QUOTES, 'UTF-8') ?></pre>
<h2>Quelques entrées de $_SERVER</h2>
<pre><?= htmlspecialchars(print_r($informations, true), ENT_QUOTES, 'UTF-8') ?></pre>
</body>
</html>
