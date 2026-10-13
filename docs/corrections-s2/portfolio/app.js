const form = document.querySelector('#gestion');
const state = document.querySelector('#etat');
const search = document.querySelector('#recherche');
const technology = document.querySelector('#technologie');
const submit = document.querySelector('#enregistrer');
let projects = [];
let editing = false;

async function request(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? `Erreur HTTP ${response.status}`);
  return data;
}

function externalUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

function render() {
  const text = search.value.trim().toLocaleLowerCase('fr');
  const results = projects.filter(p => p.title.toLocaleLowerCase('fr').includes(text) &&
    (!technology.value || p.technologies.split(',').map(t => t.trim()).includes(technology.value)));
  const cards = results.map(project => {
    const article = document.createElement('article');
    const h2 = document.createElement('h2'); h2.textContent = project.title;
    const description = document.createElement('p'); description.textContent = project.description;
    const meta = document.createElement('p');
    meta.textContent = `${project.start_date} — ${project.end_date ?? 'en cours'} · ${project.technologies}`;
    article.append(h2, description, meta);
    const localImage = /^\/images\/[a-zA-Z0-9_-]+\.(png|jpe?g|webp|svg)$/.test(project.image_url);
    const imageUrl = localImage ? project.image_url : externalUrl(project.image_url);
    if (imageUrl) {
      const image = document.createElement('img'); image.src = imageUrl; image.alt = '';
      image.loading = 'lazy'; article.prepend(image);
    }
    for (const [key, title] of [['project_url', 'Voir'], ['code_url', 'Code de']]) {
      const url = externalUrl(project[key]);
      if (url) { const link = document.createElement('a'); link.href = url; link.textContent = `${title} ${project.title}`; article.append(link); }
    }
    const edit = document.createElement('button'); edit.textContent = 'Éditer';
    edit.setAttribute('aria-label', `Éditer ${project.title}`);
    edit.addEventListener('click', () => {
      if (editing) return;
      for (const control of form.elements) {
        if (control.name) control.value = project[control.name] ?? '';
      }
      document.querySelector('#title').focus();
    });
    const remove = document.createElement('button'); remove.textContent = 'Supprimer';
    remove.setAttribute('aria-label', `Supprimer ${project.title}`);
    remove.addEventListener('click', async () => {
      if (!confirm(`Supprimer « ${project.title} » ?`)) return;
      remove.disabled = true;
      try {
        await request(`/api/projects.php?id=${project.id}`, { method: 'DELETE' });
        if (form.elements.namedItem('id').value === String(project.id)) form.reset();
        await load(); search.focus();
      } catch (error) { state.textContent = error.message; }
      finally { remove.disabled = false; }
    });
    article.append(edit, remove); return article;
  });
  document.querySelector('#projets').replaceChildren(...cards);
  state.textContent = results.length ? `${results.length} projet(s)` : projects.length ? 'Aucun résultat pour ces filtres.' : 'Aucun projet enregistré.';
}

async function load() {
  projects = await request('/api/projects.php');
  const old = technology.value;
  const values = [...new Set(projects.flatMap(p => p.technologies.split(',').map(t => t.trim())).filter(Boolean))].sort();
  const all = new Option('Toutes', '');
  technology.replaceChildren(all, ...values.map(v => new Option(v, v)));
  technology.value = values.includes(old) ? old : '';
  render();
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (editing) return;
  editing = true; submit.disabled = true;
  document.querySelector('#annuler').disabled = true;
  const data = new FormData(form), id = data.get('id');
  const payload = Object.fromEntries([...data].filter(([key]) => key !== 'id').map(([key,value]) => [key, value.trim()]));
  payload.end_date ||= null;
  try {
    await request('/api/projects.php' + (id ? `?id=${id}` : ''), {
      method: id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    form.reset(); await load();
  } catch (error) { state.textContent = error.message; }
  finally { editing = false; submit.disabled = false; document.querySelector('#annuler').disabled = false; }
});
document.querySelector('#annuler').addEventListener('click', () => form.reset());
document.querySelector('#reset').addEventListener('click', () => { search.value = ''; technology.value = ''; render(); });
document.querySelector('#relire').addEventListener('click', () => load().catch(error => state.textContent = error.message));
search.addEventListener('input', render); technology.addEventListener('change', render);
state.textContent = 'Chargement…'; load().catch(error => state.textContent = error.message);
