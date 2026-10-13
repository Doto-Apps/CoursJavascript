<?php
declare(strict_types=1);
require __DIR__ . '/common.php';
// Étape 1 : GET fixe ; étape 2 : SELECT PDO ; étape 3 : POST préparé ; étape 4 : PATCH / DELETE.
// Helpers fournis : database(), input(), identifier(), text(), respond().
// Conservez la validation serveur et les codes du contrat.
try {
    $method = $_SERVER['REQUEST_METHOD'];
    if (!in_array($method, ['GET', 'POST', 'PATCH', 'DELETE'], true)) {
        header('Allow: GET, POST, PATCH, DELETE');
        respond(['error' => 'Méthode non prévue.'], 405);
    }
    // À compléter pendant les séances : remplacer cette réponse par le traitement réel.
    respond(['error' => 'Traitement à compléter pendant le TP.'], 501);
} catch (Throwable $error) {
    error_log((string) $error);
    respond(['error' => 'Service indisponible.'], 500);
}
