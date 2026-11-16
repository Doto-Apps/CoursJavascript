<?php
require dirname(__DIR__) . '/common.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit;
}
unset($_SESSION['utilisateur']);
rediriger('connexion.php');
