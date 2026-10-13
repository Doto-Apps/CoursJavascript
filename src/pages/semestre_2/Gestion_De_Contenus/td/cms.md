---
hidden: true
order: 2
layout: "layouts/Layout.astro"
title: "WordPress : composition et navigation"
---

## Composer une page de restaurant dans WordPress

Une page de restaurant doit rendre accessibles une offre, une localisation et un moyen de contact. Le [CMS](/semestre_2/Gestion_De_Contenus/cm/cms) stocke les contenus ; le thème définit le cadre et l’éditeur compose la page. Construire une page n’ajoute pas automatiquement une réservation fonctionnelle.

## Éditeur de blocs et constructeur de pages

L’éditeur natif assemble des blocs de titres, paragraphes, images et groupes. Elementor est une extension de composition : ses widgets et ses réglages appartiennent à cette extension. Choisissez une méthode par page pour éviter de chercher une mise en page dans le mauvais éditeur. Les options disponibles dépendent de la version et de l’offre installées.

| Zone | Contenu | Contrôle concret |
|---|---|---|
| Présentation | Nom, type de cuisine et phrase descriptive | Le visiteur identifie le restaurant |
| Carte | Plats, descriptions et prix textuels | Lecture possible sans image |
| Horaires | Jours et heures | Information disponible sans interaction cachée |
| Contact | Adresse et lien de contact réel | Destination du lien vérifiée |

## Page d’accueil et navigation

Créez une page « Accueil » et publiez-la. Dans les réglages de lecture, affectez-la à l’accueil statique. Ajoutez des titres hiérarchisés : le niveau du titre dépend du plan, pas de sa taille visuelle. Pour la navigation, utilisez le bloc Navigation d’un thème à blocs ou le menu prévu par un thème classique.

**Résultat attendu :** l’URL racine affiche l’accueil choisi et le lien « Carte » ouvre la bonne page. La simple publication d’une page ne garantit pas son ajout à la navigation.

## Images et extensions

Une photographie informative possède un texte alternatif adapté. Le texte de la carte doit rester éditable ; une photographie du menu seule est difficile à lire, rechercher et adapter. Réglez l’image à une taille cohérente et vérifiez le recadrage sur écran étroit.

Une extension de formulaire possède sa configuration propre : champs, validation, destinataire et transport du courriel. Un message de confirmation à l’écran ne prouve pas la réception d’un courriel. Vérifiez le parcours complet sur un environnement de test et expliquez ce qui est effectivement opérationnel. Installer un nombre imposé d’extensions n’améliore pas la page : retenez seulement celles qui répondent au besoin.

## Vérifier la page publiée

Ouvrez l’accueil sans connexion, réduisez la fenêtre, parcourez les liens au clavier et cliquez la destination de contact. Le résultat doit conserver les informations essentielles, un ordre logique et des liens fonctionnels. Un aperçu de l’éditeur peut différer de la page publique à cause du cache, du thème ou d’une mise à jour non publiée.
