# Référence enseignant — connexion puis mini-chat

Cette correction n’est pas distribuée dans les énoncés. Les étudiants écrivent leur programme ; le TP final se termine en 90 minutes pendant la séance, sans remise différée.

Depuis ce dossier, avec PHP 8.0 ou plus :

```powershell
C:\xampp\php\php.exe -S localhost:8080 -t public
```

Ou `php -S localhost:8080 -t public` si PHP est dans le PATH. Ouvrir `http://localhost:8080/connexion.php`. Le dossier `stockage` doit exister et être accessible en écriture par PHP ; il reste hors de la racine publique. Aucun serveur SQL ni extension mbstring n’est requis.

Comptes fictifs : `lea` / `atelier` et `sam` / `campus`. Le mot de passe est en clair dans le tableau serveur et comparé directement avec `===`, comme demandé pour réutiliser les bases du S1. Seuls identifiant et pseudo sont mémorisés dans `$_SESSION['utilisateur']`.

La séance 5 utilise connexion, accueil et déconnexion. La séance 6 réutilise ces pages et ajoute le chat. Son historique est un fichier texte, une ligne par message, pseudo et texte séparés par `|`. Le pseudo reçu dans une requête est ignoré. Les caractères réservés sont contrôlés avant nettoyage. Les textes sont échappés à l’affichage.

Les écritures utilisent ajout et verrou exclusif. La lecture simple n’acquiert pas de verrou partagé ; on vérifie chaque ligne pour ce petit atelier. Une évolution concurrente peut encadrer la lecture par un verrou partagé comme évoqué dans le cours.

Pour les tests automatisés, `MMI_CHAT_STORAGE` peut désigner un fichier d’essai dans un dossier temporaire existant. Aucun historique réel n’est nécessaire. Tester accès direct refusé, mauvais identifiants, compte reconnu, deux sessions, faux pseudo reçu, caractères réservés, liste vide, ligne mal formée, erreur d’écriture et persistance après rechargement/déconnexion.
