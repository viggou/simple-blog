async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export function fetchPosts() {
  return request('/api/posts')
}

export function fetchAllPosts() {
  return request('/api/posts?all=true')
}

export function fetchPost(slug) {
  return request(`/api/posts/${slug}`)
}

export function createPost(data) {
  return request('/api/posts', { method: 'POST', body: JSON.stringify(data) })
}

export function updatePost(id, data) {
  return request(`/api/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deletePost(id) {
  return request(`/api/posts/${id}`, { method: 'DELETE' })
}
