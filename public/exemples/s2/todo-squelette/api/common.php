<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(mixed $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    exit;
}

function database(): PDO
{
    return new PDO(
        getenv('S2_DB_DSN') ?: 'mysql:host=127.0.0.1;dbname=mmi_s2;charset=utf8mb4',
        getenv('S2_DB_USER') !== false ? getenv('S2_DB_USER') : 'root',
        getenv('S2_DB_PASSWORD') !== false ? getenv('S2_DB_PASSWORD') : '',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
         PDO::ATTR_EMULATE_PREPARES => false,
         PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
}

function input(): array
{
    try {
        $object = json_decode(file_get_contents('php://input'), false, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException $e) {
        respond(['error' => 'Corps JSON invalide.'], 400);
    }
    if (!$object instanceof stdClass) respond(['error' => 'Un objet JSON est attendu.'], 422);
    return (array) $object;
}

function identifier(): int
{
    $value = $_GET['id'] ?? '';
    if (!is_string($value) || !preg_match('/^[1-9][0-9]*$/D', $value)
        || filter_var($value, FILTER_VALIDATE_INT) === false) {
        respond(['error' => 'Identifiant entier positif attendu.'], 422);
    }
    return (int) $value;
}

function text(array $data, string $key, int $maximum, bool $required = true): string
{
    $value = $data[$key] ?? '';
    if (!is_string($value)) respond(['error' => "$key doit être du texte."], 422);
    $value = trim($value);
    if (($required && $value === '') || mb_strlen($value, 'UTF-8') > $maximum) {
        respond(['error' => "$key : longueur invalide (maximum $maximum caractères)."], 422);
    }
    return $value;
}

function find(PDO $pdo, string $table, int $id): array
{
    // The table name comes exclusively from these server-side constants, never from HTTP.
    if (!in_array($table, ['todos', 'projects'], true)) throw new LogicException('Unknown table');
    $statement = $pdo->prepare("SELECT * FROM $table WHERE id = :id");
    $statement->execute(['id' => $id]);
    $row = $statement->fetch();
    if (!$row) respond(['error' => 'Élément introuvable.'], 404);
    return $row;
}

function dateValue(mixed $value, bool $optional = false): ?string
{
    if ($optional && $value === null) return null;
    if (!is_string($value)) respond(['error' => 'Date invalide.'], 422);
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);
    if (!$date || $date->format('Y-m-d') !== $value) respond(['error' => 'Date invalide.'], 422);
    return $value;
}

function urlValue(string $value, bool $image = false): string
{
    if ($value === '') return '';
    // Known local image paths only; reject protocol-relative paths and traversal.
    if ($image && preg_match('~^/images/[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp|svg)$~D', $value)) return $value;
    $scheme = strtolower(parse_url($value, PHP_URL_SCHEME) ?? '');
    if (!in_array($scheme, ['http', 'https'], true) || !filter_var($value, FILTER_VALIDATE_URL)) {
        respond(['error' => 'URL HTTP(S) attendue, ou chemin local connu pour une image.'], 422);
    }
    return $value;
}
