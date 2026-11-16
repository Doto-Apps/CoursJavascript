---
layout: "layouts/Layout.astro"
title: "Lire des tâches depuis MySQL avec PDO"
type: "TP"
order: 3
quizId: "s2-dev-02"
previousSession: "/semestre_2/developpement_Web/td/fetch-php"
nextSession: "/semestre_2/developpement_Web/tp/ajout"
---

<a id="comprendre"></a>

## Colonnes, types et clé primaire SQL

Une table contient des lignes ; une ligne représente une tâche ; les colonnes décrivent ses champs. La clé primaire identifie l’enregistrement. Elle reste la même si l’affichage est trié ou filtré.

| Déclaration | Rôle | Limite à comprendre |
|---|---|---|
| `PRIMARY KEY` | Identité unique d’une ligne. | Ne décrit pas son rang affiché. |
| `AUTO_INCREMENT` | Identifiant numérique généré. | Des trous peuvent exister après des suppressions. |
| `VARCHAR(120)` | Texte de longueur maximale définie. | L’application vérifie aussi le contenu et sa longueur. |
| `NOT NULL` | Absence de valeur NULL interdite. | N’interdit pas une chaîne vide. |
| `DEFAULT 0` | Valeur initiale si elle n’est pas fournie. | Ne valide pas tous les futurs changements. |

## Connexion PDO, SELECT et fetchAll

Le **DSN** indique à PDO le pilote, l’hôte, la base et l’encodage de connexion. Les identifiants restent dans la configuration PHP. Une connexion réussie ne prouve pas que la table demandée existe ; une requête doit encore être exécutée.

```sql
SELECT id, title, done
FROM todos
ORDER BY id DESC;
```

`SELECT` choisit les colonnes et les lignes ; `ORDER BY` définit l’ordre. Sans ce tri explicite, le cours ne garantit pas la position des lignes. `DESC` place les plus grandes valeurs en premier : pour 1, 5 et 2, on obtient 5, 2, 1.

## Les types et le tri de la réponse JSON

`PDO::FETCH_ASSOC` produit des enregistrements indexés par noms de colonnes. `fetchAll` récupère les lignes restantes du résultat. Selon le pilote et sa configuration, certains nombres peuvent être reçus comme chaînes ; le contrat transforme explicitement `id` en entier et `done` en booléen avant `json_encode`.

Une table vide donne un tableau vide : le serveur peut répondre normalement avec `[]`. Une erreur de connexion est différente et doit produire une réponse d’erreur sans exposer les détails internes. Vérifiez d’abord le JSON seul dans le navigateur, puis le rendu de la liste.

<a id="apprentissage"></a>

## La persistance des tâches dans MySQL

Une variable PHP disparaît à la fin de la requête. Une ligne enregistrée dans MySQL peut être retrouvée à la requête suivante. Une table décrit des colonnes typées ; une ligne est un enregistrement. La clé primaire identifie une tâche indépendamment de sa position dans la liste.

```sql
CREATE TABLE todos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  done TINYINT(1) NOT NULL DEFAULT 0
);

INSERT INTO todos (title) VALUES ('Préparer les photos');
SELECT id, title, done FROM todos ORDER BY id DESC;
```

**Résultat attendu dans MySQL :** une ligne avec un identifiant généré, le titre et `done = 0`. `ORDER BY id DESC` définit l'ordre du résultat ; sans `ORDER BY`, n'inventez pas une garantie de tri. `NOT NULL` n'interdit pas une chaîne vide : ce contrôle appartient aussi à l'application.

## PDO : une connexion et une lecture

```php
$pdo = new PDO(
    'mysql:host=127.0.0.1;dbname=mmi_s2;charset=utf8mb4',
    'root',
    '',
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
     PDO::ATTR_EMULATE_PREPARES => false]
);
$rows = $pdo->query('SELECT id, title, done FROM todos ORDER BY id DESC')
            ->fetchAll(PDO::FETCH_ASSOC);
$rows = array_map(fn($row) => [
    'id' => (int) $row['id'],
    'title' => $row['title'],
    'done' => (bool) $row['done'],
], $rows);
```

Ces identifiants illustrent une installation XAMPP locale neuve ; adaptez-les à votre installation. Le squelette lit la configuration depuis des variables d'environnement côté PHP. Ne placez jamais ces paramètres dans le navigateur. `FETCH_ASSOC` donne des clés correspondant aux noms de colonnes ; les conversions stabilisent le contrat JSON.

```html live title="Situer la requête SQL dans l'échange — simulation"
<style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 20px;
        font-family: system-ui, sans-serif;
        color: #18324c;
        background: #f1f5f9;
      }
      button,
      input,
      select,
      textarea {
        font: inherit;
        max-width: 100%;
      }
      button {
        padding: 8px 12px;
        cursor: pointer;
      }
      input,
      select,
      textarea {
        padding: 8px;
      }
      :focus-visible {
        outline: 3px solid #2563eb;
        outline-offset: 3px;
      }
      article,
      .panel {
        padding: 16px;
        background: white;
        border-radius: 12px;
        min-width: 0;
      }
      .cards {
        display: grid;
        gap: 16px;
      }
      label {
        display: block;
        margin-block: 12px 4px;
      }
      h1 {
        font-size: 1.4rem;
      }
      h2 {
        font-size: 1.15rem;
      }
      p,
      h2,
      a {
        overflow-wrap: anywhere;
      }
      .note {
        font-size: 0.9rem;
      }

      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
    </style>

<h1>Navigateur → PHP → MySQL → réponse</h1>
    <p>
      Simulation pédagogique : aucun serveur PHP ni base ne s’exécute dans cet
      aperçu.
    </p>
    <label for="scenario">Scénario</label>
    <select id="scenario">
      <option value="ok">Lecture réussie</option>
      <option value="invalid">Titre refusé</option>
      <option value="server">Base indisponible</option>
    </select>
    <button id="suivant">Étape suivante</button>
    <button id="reset">Recommencer</button>
    <ol id="trajet"></ol>
    <pre id="sortie" aria-live="polite"></pre>

    <script>
      const scenarios = {
        ok: [
          "Navigateur : GET /api/todos.php",
          "PHP : connexion PDO",
          "MySQL : SELECT id, title, done FROM todos",
          "PHP : réponse 200 application/json",
          "Navigateur : JSON analysé, puis DOM construit",
        ],
        invalid: [
          "Navigateur : POST avec un titre vide",
          "PHP : validation refusée avant SQL",
          "PHP : réponse 422 application/json",
          "Navigateur : message d’erreur ; saisie conservée",
        ],
        server: [
          "Navigateur : GET /api/todos.php",
          "PHP : connexion PDO impossible",
          "PHP : réponse 500 application/json",
          "Navigateur : message général et possibilité de réessayer",
        ],
      };
      let index = 0;
      const trajet = document.querySelector("#trajet");
      const sortie = document.querySelector("#sortie");
      function reset() {
        index = 0;
        trajet.replaceChildren();
        sortie.textContent = "";
      }
      document.querySelector("#scenario").addEventListener("change", reset);
      document.querySelector("#reset").addEventListener("click", reset);
      document.querySelector("#suivant").addEventListener("click", () => {
        const scenario = document.querySelector("#scenario").value;
        const etapes = scenarios[scenario];
        if (index >= etapes.length) return;
        const li = document.createElement("li");
        li.textContent = etapes[index++];
        trajet.append(li);
        if (index === etapes.length) {
          sortie.textContent =
            scenario === "ok"
              ? '[{"id":1,"title":"Préparer les photos","done":false}]'
              : '{"error":"Opération impossible"}';
        }
      });
    </script>
```

## Tableau de référence — notions et opérations

| Notion | Règle à retenir |
|---|---|
| <a id="notion-1"></a>Persistance | MySQL conserve les lignes entre les requêtes. |
| <a id="notion-2"></a>Table | Une table définit des colonnes et contient des lignes. |
| <a id="notion-3"></a>Ligne | Une ligne représente un enregistrement. |
| <a id="notion-4"></a>Identité | La clé primaire identifie une tâche indépendamment de sa position affichée. |
| <a id="notion-5"></a>Auto-incrément | AUTO_INCREMENT fournit un identifiant numérique généré. |
| <a id="notion-6"></a>Titre | VARCHAR(120) définit une chaîne de longueur maximale 120 dans ce schéma. |
| <a id="notion-7"></a>État initial | done a DEFAULT 0 dans le schéma. |
| <a id="notion-8"></a>NOT NULL | NOT NULL interdit NULL mais pas une chaîne vide. |
| <a id="notion-9"></a>Insertion | INSERT ajoute une ligne. |
| <a id="notion-10"></a>Lecture SQL | SELECT lit les données. |
| <a id="notion-11"></a>Tri | ORDER BY définit l'ordre du résultat. |
| <a id="notion-12"></a>Décroissant | ORDER BY id DESC trie les ids du plus grand au plus petit. |
| <a id="notion-13"></a>Sans tri | Sans ORDER BY, le TP ne garantit pas un ordre de résultat. |
| <a id="notion-14"></a>PDO | PDO permet au PHP de communiquer avec la base. |
| <a id="notion-15"></a>DSN | Le DSN indique notamment pilote, hôte, base et encodage. |
| <a id="notion-16"></a>Encodage | utf8mb4 est l'encodage configuré pour cette connexion MySQL. |
| <a id="notion-17"></a>Associatif | PDO::FETCH_ASSOC fournit les valeurs indexées par noms de colonnes. |
| <a id="notion-18"></a>Toutes les lignes | fetchAll récupère l'ensemble des lignes restantes du résultat. |
| <a id="notion-19"></a>Conversions | Le TP convertit id en entier et done en booléen pour le contrat JSON. |
| <a id="notion-20"></a>Configuration | Les paramètres de connexion restent côté serveur. |

## Travail à réaliser : passer des données fixes à MySQL

Créez la base `mmi_s2` et importez le schéma du squelette. Implémentez GET avec PDO, la sélection explicite des colonnes et le tri `id DESC`. Convertissez `id` en entier et `done` en booléen avant d’encoder la réponse. Vérifiez d’abord l’API seule, puis branchez le rendu Fetch de la séance précédente.

| Jeu d’essai | Réponse attendue |
|---|---|
| Trois tâches | 200, trois objets et ids décroissants |
| Table de test sans ligne | 200, `[]` |
| Base inaccessible | 500, objet d’erreur sans paramètres de connexion |

Le compte et la base doivent exister avant la connexion. Remettez schéma, API de lecture et relevé des types JSON. Une carte ajoutée seulement dans le navigateur ne prouve pas la lecture de MySQL.
