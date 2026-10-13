# Portfolio — projet PHP/MySQL local

Prérequis : PHP 8.1+ avec pdo_mysql et mbstring, MySQL/MariaDB démarré (par exemple XAMPP), navigateur.

1. Créez une base vide `mmi_s2` dans phpMyAdmin ou avec votre client SQL.
2. Importez `schema.sql` dans cette base. Le script ne supprime aucune base ni table.
3. Configurez PHP par variables d'environnement si les valeurs locales par défaut ne conviennent pas :

```powershell
$env:S2_DB_DSN = 'mysql:host=127.0.0.1;dbname=mmi_s2;charset=utf8mb4'
$env:S2_DB_USER = 'root'
$env:S2_DB_PASSWORD = ''
C:\xampp\php\php.exe -S localhost:8080 -t .
```

macOS/Linux, depuis ce dossier :

```sh
S2_DB_DSN='mysql:host=127.0.0.1;dbname=mmi_s2;charset=utf8mb4' S2_DB_USER=root S2_DB_PASSWORD='' php -S localhost:8080 -t .
```

Adaptez port, compte et mot de passe à votre installation ; ne publiez pas de mot de passe réel.
Ouvrez **http://localhost:8080** et **http://localhost:8080/api/projects.php**.
Le port 4321 appartient au site de cours Astro ; lancez votre application PHP séparément sur 8080.
Une ouverture `file://` ou le serveur Astro seul n'exécute pas PHP. Toutes les requêtes du projet utilisent la même origine.

## Version enseignant

Cette correction complète met en œuvre les étapes du TP. Les opérations CRUD fonctionnent après import du schéma et configuration de la base. Les squelettes élèves sont séparés dans public/exemples/s2.
Utilisez ce dossier comme racine du serveur PHP. Rejouez les tests puis adaptez le thème et les données avec votre groupe.

## Contrat

GET → tableau JSON 200 ; POST → objet créé 201 ; PATCH avec ?id=N → objet modifié 200 ; DELETE avec ?id=N → confirmation 200.
JSON mal formé 400 ; valeur invalide 422 ; id absent 404 ; méthode non prévue 405 ; panne serveur 500.
title, description, start_date obligatoires ; end_date null ou date valide non antérieure ; technologies chaîne ; liens HTTP(S), images HTTP(S) ou chemin /images/ connu.

## Vérifications à rendre

Cas normal, liste vide, apostrophe, texte ressemblant à du HTML, valeur invalide, id absent, panne et rechargement.
Notez entrée, statut, résultat attendu, résultat observé et effet en base.
Cette gestion pédagogique vise un usage local. Une publication avec écritures nécessite authentification et autorisations côté serveur.
