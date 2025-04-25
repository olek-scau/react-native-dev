import { fetchPosts, fetchUsers } from '../src/fetch.js';

describe('API Fetcher', () => {
  test('fetches posts successfully', async () => {
    const posts = await fetchPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('title');
  });

  test('fetches users successfully', async () => {
    const users = await fetchUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });
});
