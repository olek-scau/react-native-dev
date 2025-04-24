import { fetchPosts, fetchUsers } from './fetch.js';

async function main() {
  try {
    console.log('Fetching Posts:');
    const posts = await fetchPosts();
    posts.slice(0, 5).forEach(post => {
      console.log(`- ${post.title}`);
    });

    console.log('\nFetching Users:');
    const users = await fetchUsers();
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
