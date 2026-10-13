<?php
$quantite = isset($argv[1]) ? (int) $argv[1] : 3;
$prixUnitaire = 12;
if ($quantite < 1 || $quantite > 6) {
    echo "Quantité invalide\n";
} else {
    $totalInitial = $quantite * $prixUnitaire;
    $reduction = 0;
    if ($quantite >= 4) {
        $reduction = 6;
    }
    $totalFinal = $totalInitial - $reduction;
    echo $totalFinal . " euros\n";
}
