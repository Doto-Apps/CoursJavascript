const etat = document.querySelector('#etat');
etat.textContent = 'Complétez la lecture de l’API, puis le rendu.';

async function demander(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? `Erreur HTTP ${response.status}`);
  return data;
}

// À réaliser dans l'ordre :
// 1. Charger le tableau JSON et annoncer les états chargement / vide / erreur.
// 2. Construire le DOM avec createElement et textContent.
// 3. Écouter submit, envoyer un POST JSON et conserver la saisie en cas d'erreur.
// 4. Ajouter PATCH par id ; vérifier la persistance après rechargement.
// 5. Filtres locaux, suppression confirmée et matrice de tests.
// Aucun stockage de mot de passe ou de correction QCM côté navigateur.
