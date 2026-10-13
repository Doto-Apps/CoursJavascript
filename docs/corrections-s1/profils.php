<?php
$profils = [
    ['nom' => 'Léa', 'points' => 12],
    ['nom' => 'Sam', 'points' => 8],
    ['nom' => 'Noa', 'points' => 15],
];
if (isset($argv[1]) && $argv[1] === 'vide') { $profils = []; }
if (isset($argv[1]) && $argv[1] === 'html') { $profils[0]['nom'] = '<script>alert(1)</script>'; }
$total = 0;
echo "<ul>\n";
foreach ($profils as $profil) {
    $total += $profil['points'];
    echo '<li>' . htmlspecialchars($profil['nom'], ENT_QUOTES, 'UTF-8') . ' : ' . $profil['points'] . " points</li>\n";
}
echo "</ul>\n";
if (count($profils) > 0) {
    echo 'Total : ' . $total . ' ; moyenne : ' . number_format($total / count($profils), 2, ',', ' ') . "\n";
} else {
    echo "Aucun profil\n";
}
