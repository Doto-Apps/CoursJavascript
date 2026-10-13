<?php
declare(strict_types=1);
require __DIR__ . '/common.php';

function todoResult(array $row): array
{
    return ['id' => (int) $row['id'], 'title' => $row['title'], 'done' => (bool) $row['done']];
}

try {
    $method = $_SERVER['REQUEST_METHOD'];
    if (!in_array($method, ['GET', 'POST', 'PATCH', 'DELETE'], true)) {
        header('Allow: GET, POST, PATCH, DELETE');
        respond(['error' => 'Méthode non prévue.'], 405);
    }
    $pdo = database();
    if ($method === 'GET') {
        $rows = $pdo->query('SELECT id, title, done FROM todos ORDER BY id DESC')->fetchAll();
        respond(array_map('todoResult', $rows));
    }
    if ($method === 'POST') {
        $data = input();
        $title = text($data, 'title', 120);
        $statement = $pdo->prepare('INSERT INTO todos (title) VALUES (:title)');
        $statement->execute(['title' => $title]);
        respond(todoResult(find($pdo, 'todos', (int) $pdo->lastInsertId())), 201);
    }
    $id = identifier();
    $row = find($pdo, 'todos', $id);
    if ($method === 'DELETE') {
        $statement = $pdo->prepare('DELETE FROM todos WHERE id = :id');
        $statement->execute(['id' => $id]);
        respond(['deleted' => $id]);
    }
    $data = input();
    if (!array_key_exists('title', $data) && !array_key_exists('done', $data)) {
        respond(['error' => 'title ou done attendu.'], 422);
    }
    $title = array_key_exists('title', $data) ? text($data, 'title', 120) : $row['title'];
    $done = $data['done'] ?? (bool) $row['done'];
    if (array_key_exists('done', $data) && !is_bool($data['done'])) {
        respond(['error' => 'done doit être booléen.'], 422);
    }
    $statement = $pdo->prepare('UPDATE todos SET title = :title, done = :done WHERE id = :id');
    $statement->execute(['title' => $title, 'done' => $done ? 1 : 0, 'id' => $id]);
    respond(todoResult(find($pdo, 'todos', $id)));
} catch (Throwable $error) {
    error_log((string) $error);
    respond(['error' => 'Service indisponible. Réessayez ou consultez le journal serveur.'], 500);
}
