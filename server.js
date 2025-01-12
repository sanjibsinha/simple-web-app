const Memcached = require('memcached');
const memcached = new Memcached('localhost:11211');

// Set data in Memcached
memcached.set('user:1', { name: 'John', age: 30 }, 1000, (err) => {
  if (err) throw err;
});

// Get data from Memcached
memcached.get('user:1', (err, data) => {
  if (err) throw err;
  console.log(data); // Output: { name: 'John', age: 30 }
});