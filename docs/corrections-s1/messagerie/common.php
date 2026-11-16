<?php
declare(strict_types=1);
session_start();

// Comptes fictifs de l'atelier : comparaison directe des textes étudiée en S1.
$comptes = [
    'lea' => ['pseudo' => 'Léa', 'mot_de_passe' => 'atelier'],
    'sam' => ['pseudo' => 'Sam', 'mot_de_passe' => 'campus'],
];

function h(string $texte): string
{
    return htmlspecialchars($texte, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function rediriger(string $destination): void
{
    header('Location: ' . $destination, true, 303);
    exit;
}

function identite(): ?array
{
    $valeur = $_SESSION['utilisateur'] ?? null;
    if (!is_array($valeur) || !isset($valeur['identifiant'], $valeur['pseudo'])
        || !is_string($valeur['identifiant']) || !is_string($valeur['pseudo'])) {
        return null;
    }
    return $valeur;
}

function exigerConnexion(): array
{
    $utilisateur = identite();
    if ($utilisateur === null) rediriger('connexion.php');
    return $utilisateur;
}
