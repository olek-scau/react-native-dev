import fetch from 'node-fetch';

export async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error('Network error');
  return await response.json();
}

export async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Network error');
  return await response.json();
}
