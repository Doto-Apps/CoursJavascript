<?php
declare(strict_types=1);
require __DIR__ . '/common.php';

function projectResult(array $row): array
{
    $fields = ['title', 'description', 'image_url', 'start_date', 'end_date', 'technologies', 'project_url', 'code_url'];
    return ['id' => (int) $row['id']] + array_intersect_key($row, array_flip($fields));
}

function validateProject(array $data): array
{
    $result = [
        'title' => text($data, 'title', 120),
        'description' => text($data, 'description', 5000),
        'image_url' => urlValue(text($data, 'image_url', 500, false), true),
        'start_date' => dateValue($data['start_date'] ?? null),
        'end_date' => dateValue($data['end_date'] ?? null, true),
        'technologies' => text($data, 'technologies', 200, false),
        'project_url' => urlValue(text($data, 'project_url', 500, false)),
        'code_url' => urlValue(text($data, 'code_url', 500, false)),
    ];
    if ($result['end_date'] !== null && $result['end_date'] < $result['start_date']) {
        respond(['error' => 'La fin doit suivre ou égaler le début.'], 422);
    }
    return $result;
}

try {
    $method = $_SERVER['REQUEST_METHOD'];
    if (!in_array($method, ['GET', 'POST', 'PATCH', 'DELETE'], true)) {
        header('Allow: GET, POST, PATCH, DELETE');
        respond(['error' => 'Méthode non prévue.'], 405);
    }
    $pdo = database();
    if ($method === 'GET') {
        $rows = $pdo->query('SELECT id, title, description, image_url, start_date, end_date,
                            technologies, project_url, code_url
                            FROM projects ORDER BY start_date DESC, id DESC')->fetchAll();
        respond(array_map('projectResult', $rows));
    }
    if ($method === 'POST') {
        $values = validateProject(input());
        $statement = $pdo->prepare('INSERT INTO projects (title, description, image_url, start_date,
                                   end_date, technologies, project_url, code_url)
                                   VALUES (:title, :description, :image_url, :start_date,
                                   :end_date, :technologies, :project_url, :code_url)');
        $statement->execute($values);
        respond(projectResult(find($pdo, 'projects', (int) $pdo->lastInsertId())), 201);
    }
    $id = identifier();
    $row = find($pdo, 'projects', $id);
    if ($method === 'DELETE') {
        $statement = $pdo->prepare('DELETE FROM projects WHERE id = :id');
        $statement->execute(['id' => $id]);
        respond(['deleted' => $id]);
    }
    $input = input();
    $allowed = ['title', 'description', 'image_url', 'start_date', 'end_date', 'technologies', 'project_url', 'code_url'];
    $changes = array_intersect_key($input, array_flip($allowed));
    if (!$changes) respond(['error' => 'Un champ éditable est attendu.'], 422);
    $values = validateProject(array_replace($row, $changes));
    $statement = $pdo->prepare('UPDATE projects SET title = :title, description = :description,
                               image_url = :image_url, start_date = :start_date, end_date = :end_date,
                               technologies = :technologies, project_url = :project_url, code_url = :code_url
                               WHERE id = :id');
    $statement->execute($values + ['id' => $id]);
    respond(projectResult(find($pdo, 'projects', $id)));
} catch (Throwable $error) {
    error_log((string) $error);
    respond(['error' => 'Service indisponible. Réessayez ou consultez le journal serveur.'], 500);
}
