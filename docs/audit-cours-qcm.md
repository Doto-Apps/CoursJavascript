# Relecture des cours et QCM — 20 octobre 2026

## Préparation du mini-chat S1 — 25 novembre 2026

Dev 05 du 26 novembre comporte trois parties indépendantes du projet final : inscription à un atelier pour observer `$_POST` et `$_SERVER`, préférences de lecture pour `$_SESSION`, carnet de sorties pour les fichiers texte. Les quatre fichiers complets sont copiables, modifiables et téléchargeables. Les 90 premières minutes servent au cours et aux essais ; les 30 dernières à la lecture du guide Dev 06, sans réaliser le projet avec le groupe.

Dev 06 est un mini-chat à réaliser entièrement seul à la maison, guidé par étapes avec des fragments à adapter. Les fonctionnalités complètes et l’interface ne sont pas fournies. Le barème réserve 12 points au PHP, 5 à la beauté et à l’usage de l’interface, 3 aux améliorations choisies. La note sur 20 est multipliée par le nombre de réponses comprises aux trois questions, divisé par trois.

Le QCM d’entrée Dev 06 comporte 24 questions sur les tableaux PHP, les formulaires, les sessions et les fonctions de fichiers de Dev 05. Le registre, l’index, le README, le contrôle des exemples et la grille enseignant suivent cette séparation entre cours et projet.

## Questions centrées sur les acquis — 16 novembre 2026

Après une nouvelle précision de l’enseignant, les trois QCM PHP des séances restantes sont reconstruits autour des acquis : syntaxe de if/elseif/else et opérateurs ; tableaux, foreach et affichage ; formulaires, comparaison stricte et session. La question de justification du tarif est supprimée, ainsi que les questions sur le choix d’un scénario ou la méthode de travail. Les acquis de syntaxe sont évalués avec quatre fragments de code, pas avec une justification du TP.

Les autres banques ont été repassées en revue avec le même critère. Les questions d’organisation, de priorités ou de justification générale repérées sont remplacées par des connaissances concrètes du cours : balises, attributs, méthodes JavaScript, SQL, statuts, appels Retool. Les notions techniques déjà ciblées sont conservées. Les doublons repérés pendant cette passe sont remplacés par d’autres acquis du même support.

Validation : 39 banques, 502 questions et associations aux cours contrôlées ; compilation réussie. Les quatre propositions de chacune des cinq questions PHP portant strictement sur une écriture correcte ont été soumises au vérificateur de syntaxe PHP : une seule proposition valide pour chacune. Les autres choix de code peuvent être syntaxiquement valides mais ne réaliser qu’une autre opération ; la question précise alors l’opération demandée.

## Lisibilité des questions — 16 novembre 2026

Nouvelle passe sur les 39 banques, avec priorité aux questions destinées aux séances PHP restantes. Les énoncés, choix et explications ont été simplifiés : phrases directes, situations concrètes, mots déjà enseignés et une seule réponse correcte. La question « égalité avec une borne basse » devient « Quel opérateur signifie supérieur ou égal à ? ». Les questions sur OU et ET indiquent simplement si une condition suffit ou si les deux sont nécessaires. Les notions techniques restent présentes ; le vocabulaire inutilement abstrait est retiré, y compris dans les corrections.

Les anciens identifiants sont synchronisés. Les passages justificatifs des cours restent conservés et les contrôles d’association au cours passent. L’audit vérifie aussi l’absence de plusieurs formulations signalées comme peu claires dans le texte affiché aux étudiants. La compilation Astro réussit après ces modifications.

## Nouvelle progression PHP S1 — 16 novembre 2026

Les séances 1 à 3 restent inchangées pendant cette révision. La séance 4 traite l’algorithmie sur tableaux et le rendu HTML, sans classes ni objets PHP ; trois exercices autonomes terminent le support. La séance 5 réalise une connexion avec des comptes fictifs, mots de passe en clair et comparaison stricte, puis conserve uniquement identifiant et pseudo en session. Le mini-chat réutilise cette connexion et ajoute un historique commun en fichier texte : une ligne par message, pseudo et message séparés par une barre verticale. L’organisation du cours et de la remise a été remplacée par celle du 25 novembre décrite plus haut.

La consigne sur les exemples a été précisée le 25 novembre : les exercices Dev 04 restent sans code de départ, Dev 05 fournit des exemples complets sur d’autres sujets, et Dev 06 propose des fragments pour guider l’assemblage. L’ancien squelette public du mini-chat en session a été supprimé ; une correction complète enseignant reste dans `docs/corrections-s1/messagerie`.

Les 39 banques ont été repassées en revue lors de cette révision. Les trois banques d’entrée des séances 4, 5 et 6 sont réécrites : notions de la séance 3, tableaux/algorithmie de la séance 4, puis formulaire/connexion/session de la séance 5. La banque Dev 06 a ensuite été enrichie le 25 novembre avec les fonctions de fichiers déplacées en Dev 05. Les calculs de tarifs, de boîtes CSS, de durée ou de valeur de stock repérés dans les autres banques ont été remplacés par les notions correspondantes. Les anciens identifiants de banques sont synchronisés. Le total de cette révision du 16 novembre était de 502 entrées dans 39 banques.

Validation : audit de contenu, compilation Astro et test fonctionnel `pnpm check:s1-php`. Ce test lance PHP sur un port local temporaire et utilise un historique jetable : accès refusé sans connexion, mauvais mot de passe, renouvellement de session, sessions distinctes, auteur issu du compte, écritures successives, caractères réservés et mauvais types refusés, affichage échappé, ligne mal formée ignorée, échec d’écriture et déconnexion sans perte d’historique. Il vérifie aussi l’absence de blocs de code dans les énoncés autonomes. La référence a été exécutée avec PHP 8.0.30, sans base SQL.

## Mise à jour du 16 novembre 2026

Les corrections locales ont été réappliquées sur `main` après récupération des deux commits GitHub, dont la modification du Dockerfile. Le premier cours « Présentation et évaluation de la SAE 105 » est conservé exactement dans sa version GitHub ; son titre est repris dans le registre et l’index S1.

À la demande de l’enseignant, les sept QCM du parcours S1 « Produire un site Web » et l’ancienne banque `s1-produire-site` sont supprimés. Les références des cours et du registre sont retirées ; ces identifiants ne sont plus chargés via le service distant. Les huit cours du parcours restent présents. Le site contient désormais 39 banques, soit 494 entrées de questions. Les chiffres et la couverture ci-dessous décrivent la relecture du 20 octobre, avant ce retrait.

Vérifications de cette mise à jour : audit du contenu et compilation réussis ; les huit pages du parcours répondent en HTTP 200 sans encart de QCM ; les huit anciennes adresses de quiz aboutissent à une réponse 404 ; un QCM d’Intégration reste accessible. Le contenu du premier cours a été comparé à `origin/main`, en tenant compte des fins de ligne Git sous Windows, et aucun conflit Git ne subsiste. Une sauvegarde des corrections précédentes est conservée dans le stash nommé `backup-corrections-cours-avant-synchronisation-main-2026-11-16`.

## Périmètre et méthode

Les 43 séances actives des semestres 1 et 2 ont été relues : notions expliquées, exemples, consignes, tableaux, livrables et critères de vérification. Les 38 séances situées après les limites indiquées, ou dans les autres parcours, ont reçu des compléments ciblés.

Les cinq cours S1 déjà parcourus sont strictement identiques à leur version initiale : Intégration 1 à 3 (`web`, `htmltd`, `csstd`) et Développement web 1 à 2 (`util_dev_tool`, `PHP_inter`). Les QCM ont tous été contrôlés, y compris ceux qui révisent ces supports.

Chaque QCM d’entrée porte sur la séance précédente. La relecture a donc associé chaque question à `sourceCourse`, puis vérifié l’énoncé, les quatre choix, l’unicité de la bonne réponse, l’explication et le passage justificatif. Une seconde passe a contrôlé ces associations après les corrections.

Les 47 banques locales ont été examinées : 41 banques canoniques contenant 509 questions, et six anciens identifiants désormais synchronisés, soit 590 entrées au total. Cela comprend les quatre banques du S3. Parmi les questions canoniques, 24 ont reçu une correction d’énoncé ou de choix ; les autres formulations correctes ont été conservées. Les références coupées ou sans rapport ont été remplacées par des lignes ou paragraphes complets du passage utile.

## Suppressions

Les 22 supports portant `hidden: true` ont été supprimés : neuf au S1, neuf au S2 et quatre au S3. Les liens de l’accueil, des index et du récapitulatif S4 ont été mis à jour. Les registres ne référencent aucun de ces anciens supports.

La page d’accueil `src/pages/index.md` conserve son marqueur de masquage dans la barre latérale : c’est la page d’entrée du site, pas un cours.

## Corrections principales

- Consignes concrètes de réalisation, livrables et résultats attendus ajoutés aux séances à reprendre.
- Distinction entre titre du document, titre visible, classe partagée et id unique explicitée dans la consolidation HTML/CSS.
- Questions « pourquoi » corrigées quand les choix répondaient à une autre demande ; seuil de remise et quantités entières précisés.
- Marges Tailwind sur quatre côtés distinguées de la marge supérieure ; contexte des questions sur la cascade et les colonnes précisé.
- Critères chiffrés de contraste accompagnés de leur référence W3C.
- États de mouvement réduit corrigés, y compris au survol et au focus.
- Menu disponible sans JavaScript ; bouton et état ARIA synchronisés après initialisation.
- Commandes Swiper masquées sans initialisation ; version, fichiers et licence à fournir précisés.
- Renommage ajouté au prototype final Todo ; suppression avec confirmation et annulation intégrées à la page ; focus conservé après reconstruction du DOM.
- Lecture du titre PHP contrôlée avant `trim`, limites de longueur et distinctions entre erreurs détaillées.
- Champ `technologies` uniformisé ; limites du formulaire portfolio alignées avec le dictionnaire et le code de référence : description 5000, technologies 200.
- Simulation du portfolio corrigée pour utiliser `projects`, ses champs et son adresse d’API.
- Dictionnaire, dates réelles, protocoles autorisés, états de liste et jeux d’essai complétés.

## Couverture séance par séance

La colonne QCM indique la banque proposée **à l’entrée** de la séance ; son cours source est la séance précédente. Un tiret correspond à un diagnostic initial.

| Séance | Support | QCM d’entrée | Résultat de la relecture |
|---|---|---|---|
| S1 INT-01 | Le Web | — | Cours préservé ; questions de révision contrôlées |
| S1 INT-02 | HTML sémantique | s1-int-01 | Cours préservé ; questions de révision contrôlées |
| S1 INT-03 | CSS et Flexbox | s1-int-02 | Cours préservé ; questions de révision contrôlées |
| S1 INT-04 | Consolidation HTML/CSS | s1-int-03 | Id unique, diagnostic, références de correction |
| S1 INT-05 | Grid | s1-int-04 | Exercice, calcul des pistes et placement |
| S1 INT-06 | Structure Gamer / Creator | s1-int-05 | Travail et grille de remise explicites |
| S1 INT-07 | Styles Gamer / Creator | s1-int-06 | Rôles de Flexbox/Grid et critères du TP |
| S1 INT-08 | Responsive et accessibilité | s1-int-07 | Parcours de finalisation et tests à remettre |
| S1 DEV-01 | Outils locaux | — | Cours préservé ; questions de révision contrôlées |
| S1 DEV-02 | Algorithmique PHP | s1-dev-01 | Cours préservé ; questions de révision contrôlées |
| S1 DEV-03 | Tarif | s1-dev-02 | Travail autonome, bornes et mauvais types |
| S1 DEV-04 | Profils | s1-dev-03 | Parcours indexé, moyenne et collection vide |
| S1 DEV-05 | Formulaires, sessions et fichiers | s1-dev-04 | Tableaux, algorithmie et affichage de Dev 04 |
| S1 DEV-06 | Présentation et correction du mini-chat | s1-dev-05 | Formulaires, sessions et fonctions de fichiers de Dev 05 |
| S1 SITE-01 | Cadrage | — | Brief, parcours, priorités et jalons à produire |
| S1 SITE-02 | Maquette | s1-site-01 | Relevé d’intégration, ressources et états |
| S1 SITE-03 | Structure | s1-site-02 | Première version et contrôles sans CSS |
| S1 SITE-04 | Disposition | s1-site-03 | Mesures et justification des outils CSS |
| S1 SITE-05 | Composants | s1-site-04 | Variante, valeurs communes, médias et focus |
| S1 SITE-06 | Responsive | s1-site-05 | Seuils et matrice de contrôle |
| S1 SITE-07 | Accessibilité | s1-site-06 | Contrastes mesurables et audit à remettre |
| S1 SITE-08 | Finalisation | s1-site-07 | Remise installable et démonstration |
| S2 INT-01 | Tailwind | — | Compilation, diagnostic et fichiers à fournir |
| S2 INT-02 | Composants Tailwind | s2-int-01 | Grille et tests aux seuils par défaut |
| S2 INT-03 | Mouvement | s2-int-02 | Keyframes, repli, mouvement réduit et tests |
| S2 INT-04 | Media queries | s2-int-03 | Seuils inclus, zoom, contenus longs |
| S2 INT-05 | Menu | s2-int-04 | Repli sans script, ARIA et clavier |
| S2 INT-06 | Swiper | s2-int-05 | Installation versionnée et commandes de repli |
| S2 INT-07 | Événements | s2-int-06 | Liste, compteur, sécurité du texte et focus |
| S2 DEV-01 | HTTP/JSON | — | Environnement et contrat complet Todo |
| S2 DEV-02 | Fetch/PHP | s2-dev-01 | Validation du contrat et états de lecture |
| S2 DEV-03 | Lecture PDO | s2-dev-02 | Installation et tests de lecture persistante |
| S2 DEV-04 | Ajout | s2-dev-03 | Types, longueurs, double envoi et confirmation |
| S2 DEV-05 | Modification | s2-dev-04 | Ciblage, absence, valeur inchangée et suppression |
| S2 DEV-06 | Erreurs | s2-dev-05 | Matrice réseau/HTTP/JSON/base et réessai |
| S2 DEV-07 | Intégration Todo | s2-dev-06 | Prototype complet et parcours de livraison |
| S2 SITE-01 | Cadrage portfolio | — | Dictionnaire complet et limites cohérentes |
| S2 SITE-02 | Base/API | s2-site-01 | Simulation adaptée au portfolio et tests SQL |
| S2 SITE-03 | Affichage | s2-site-02 | Champs utiles, dates, médias absents et états |
| S2 SITE-04 | Filtres | s2-site-03 | Noms de champs et jeu d’essai combiné |
| S2 SITE-05 | Gestion | s2-site-04 | Limites, date réelle et id d’édition absent |
| S2 SITE-06 | Qualité | s2-site-05 | Tests croisés, contrastes et régression |
| S2 SITE-07 | Livraison | s2-site-06 | Installation, démonstration et preuves finales |

## Vérifications effectuées

- `pnpm audit:content` : schéma des questions, choix distincts, correction, explication, existence des cours et ancres, présence des extraits dans la section annoncée, affectation des QCM, titres des registres, navigation, liens internes et synchronisation des anciens identifiants. Couverture : 83 pages, 49 séances S1/S2/S3, 47 banques et 590 questions.
- `pnpm build` : compilation Astro.
- Navigateur Chrome : rendu HTTP 200 des 43 séances S1/S2, démarrage des 47 banques, tentative complète de dix questions avec explications, liens de correction et résultat final.
- Exécution au chargement des 49 démonstrations HTML/JavaScript S1/S2 sans erreur JavaScript.
- Essais d’interaction : menu avec Échap et retour du focus ; mouvement réduit au survol et au focus ; navigation Swiper ; renommage Todo, confirmation/annulation de suppression et focus ; édition du portfolio ; repli du menu et du carrousel sans JavaScript.
- Syntaxe des 33 extraits PHP, des 18 extraits JavaScript et des quatre blocs JSON S1/S2 contrôlée.
- Les cinq cours préservés ont été comparés octet par octet à leur version initiale.

Les contrôles de syntaxe PHP ont utilisé le PHP 8.0.30 disponible sur le poste. Ils ne constituent pas un essai du CRUD contre MySQL : les applications S2 demandent PHP 8.1+, `pdo_mysql`, `mbstring` et une base configurée. Leurs contrats et leurs limites ont été comparés aux squelettes et corrections fournis ; aucun essai sur une base utilisateur n’a été effectué.

Le contrôle automatique confirme les associations et la structure. La cohérence des énoncés et le caractère suffisant des explications ont été examinés pendant la relecture ; ils ne sont pas déduits de la seule présence d’un extrait.

## Références techniques vérifiées

- [Manuel PHP : htmlspecialchars](https://www.php.net/manual/fr/function.htmlspecialchars.php)
- [Manuel PHP : DateTimeImmutable::createFromFormat](https://www.php.net/manual/fr/datetimeimmutable.createfromformat.php)
- [MDN : utiliser Fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)
- [Tailwind CSS 3 : installation](https://v3.tailwindcss.com/docs/installation)
- [W3C : contraste du texte](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WAI : navigation repliable](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
