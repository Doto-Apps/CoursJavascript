const form = document.querySelector('#ajout');
const state = document.querySelector('#etat');
const list = document.querySelector('#liste');
const filter = document.querySelector('#filtre');
const submit = form.querySelector('button');
let tasks = [];

async function request(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? `Erreur HTTP ${response.status}`);
  return data;
}

function render() {
  const visible = tasks.filter(t => filter.value === 'all' || t.done === (filter.value === 'done'));
  const rows = visible.map(task => {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    label.append(checkbox, document.createTextNode(' ' + task.title));
    checkbox.addEventListener('change', () => mutate(task.id, 'PATCH', { done: checkbox.checked }, checkbox));
    const edit = document.createElement('button');
    edit.textContent = 'Renommer';
    edit.setAttribute('aria-label', `Renommer ${task.title}`);
    edit.addEventListener('click', () => {
      const title = prompt('Nouveau titre', task.title);
      if (title !== null) mutate(task.id, 'PATCH', { title }, edit);
    });
    const remove = document.createElement('button');
    remove.textContent = 'Supprimer';
    remove.setAttribute('aria-label', `Supprimer ${task.title}`);
    remove.addEventListener('click', () => {
      if (confirm(`Supprimer « ${task.title} » ?`)) mutate(task.id, 'DELETE', undefined, remove);
    });
    li.append(label, edit, remove);
    return li;
  });
  list.replaceChildren(...rows);
  state.textContent = visible.length ? `${visible.length} résultat(s), ${tasks.filter(t => !t.done).length} à faire` :
    tasks.length ? 'Aucun résultat pour ce filtre.' : 'Aucune tâche enregistrée.';
}

async function load() {
  tasks = await request('/api/todos.php');
  render();
}

async function mutate(id, method, body, control) {
  control.disabled = true;
  try {
    await request(`/api/todos.php?id=${id}`, {
      method, headers: { 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    await load();
    // Rendering replaces controls. Restore a meaningful keyboard position.
    document.querySelector('#title').focus();
  } catch (error) {
    if (control.type === 'checkbox') control.checked = tasks.find(t => t.id === id).done;
    state.textContent = error.message;
  } finally { control.disabled = false; }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submit.disabled) return;
  submit.disabled = true;
  try {
    await request('/api/todos.php', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: new FormData(form).get('title').trim() }),
    });
    form.reset();
    await load();
  } catch (error) { state.textContent = error.message; }
  finally { submit.disabled = false; }
});
filter.addEventListener('change', render);
document.querySelector('#relire').addEventListener('click', () => load().catch(error => state.textContent = error.message));
state.textContent = 'Chargement…';
load().catch(error => state.textContent = error.message);
