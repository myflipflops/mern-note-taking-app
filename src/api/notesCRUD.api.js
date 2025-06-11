const API_URL = `${import.meta.env.VITE_API_URL}`;

// Helper: fetch with auth
async function authFetch(url, options = {}, token) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const message = data.message || `Request failed: ${res.statusText}`;
    throw new Error(message);
  }
  return res.status === 204 ? null : res.json();
}


export async function getTagsAPI(token) {
  return await authFetch(`${API_URL}/notes/tags`, {}, token);
}

export async function getNotesAPI(token, currentView) {
  const { type, tag, searchQuery } = currentView;
  const params = new URLSearchParams();
  
  params.set('archived', type === 'archived' ? 'true' : 'false');
  
  if (type === 'tag' && tag) {
    params.set('tag', tag);
  }
  
  if (type === 'search' && searchQuery) {
    params.set('search', searchQuery);
  }
  
  return await authFetch(`${API_URL}/notes?${params.toString()}`, {}, token);
}


export async function createNoteAPI(token, note) {
  const { title, content, tags, archived } = note;
  return await authFetch(`${API_URL}/notes`, {
    method: 'POST',
    body: JSON.stringify({ title, content, tags, archived }),
  }, token);
}

// Update an existing note (PATCH for partial updates)
export async function updateNoteAPI(token, note) {
  const { id, title, content, tags, archived } = note;
  return await authFetch(`${API_URL}/notes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, content, tags, archived }),
  }, token);
}

// Toggle archive status (shortcut function)
export async function toggleNoteStatusAPI(token, note) {
  const updated = { ...note, archived: !note.archived };
  return await updateNoteAPI(token, updated);
}

export async function deleteNoteAPI(token, noteId) {
  return await authFetch(`${API_URL}/notes/${noteId}`, {
    method: 'DELETE',
  }, token);
}