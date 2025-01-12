## 1. Installing Node.js on Ubuntu

### Using the Official Installer

Run the following commands to install Node.js:

```bash
curl -sL https://deb.nodesource.com/setup_19.x | sudo -E bash -
sudo apt-get install -y nodejs
```

This will install Node.js version 19.x. You can replace `19.x` with your desired version.

### Verify Installation

Once Node.js is installed, check the versions of Node.js and npm by running:

```bash
node -v
npm -v
```

This will display the installed versions of Node.js and npm.

---

## 2. Setting up a Local Development Environment

### Create a Project Directory

Start by creating a project directory:

```bash
mkdir my-web-app
cd my-web-app
```

### Initialize npm

Run the following command to initialize npm:

```bash
npm init -y
```

This will generate a `package.json` file that will manage your project's dependencies.

---

## 3. Creating a Simple Web App with Multiple Pages

### Project Structure

Your project directory should look like this:

```
my-web-app/
  ├── package.json
  ├── index.html
  ├── page1.html
  ├── page2.html
  └── server.js
```

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Home Page</title>
</head>
<body>
  <h1>Welcome to the Home Page</h1>
  <a href="page1.html">Go to Page 1</a>
  <a href="page2.html">Go to Page 2</a>
</body>
</html>
```

### page1.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page 1</title>
</head>
<body>
  <h1>This is Page 1</h1>
  <a href="index.html">Go to Home</a>
</body>
</html>
```

### page2.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page 2</title>
</head>
<body>
  <h1>This is Page 2</h1>
  <a href="index.html">Go to Home</a>
</body>
</html>
```

### server.js

```javascript
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  let path = './';

  switch (req.url) {
    case '/':
      path += 'index.html';
      break;
    case '/page1.html':
      path += 'page1.html';
      break;
    case '/page2.html':
      path += 'page2.html';
      break;
    default:
      res.writeHead(404);
      res.end('File Not Found');
      return;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File Not Found');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Run the Server

Start your server with:

```bash
node server.js
```

Then, open a web browser and go to [http://localhost:3000](http://localhost:3000).

---

## 4. Passing Data Between Pages

### Using URL Parameters

In `index.html`, add the following link to pass data via URL parameters:

```html
<a href="page1.html?name=John&age=30">Go to Page 1 with Data</a>
```

In `page1.html`, retrieve and display the URL parameters:

```javascript
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
const age = params.get('age');

document.body.innerHTML += `<p>Name: ${name}</p>`;
document.body.innerHTML += `<p>Age: ${age}</p>`;
```

### Using Local Storage

To store data in the browser’s local storage, modify `index.html`:

```javascript
localStorage.setItem('user', JSON.stringify({ name: 'John', age: 30 }));
```

Then, in `page1.html`, retrieve the data from local storage:

```javascript
const user = JSON.parse(localStorage.getItem('user'));
// Use the user data
```

### Using Session Storage

Session storage works similarly to local storage but with the key difference that data is cleared when the browser tab is closed.

---

## 5. Basic Database Operations with Memcached

### Install Memcached

Install Memcached on your system:

```bash
sudo apt-get install memcached
```

### Install Node.js Client for Memcached

Install the `memcached` Node.js client:

```bash
npm install memcached
```

### Example in server.js

Here's an example of how to use Memcached in your `server.js`:

```javascript
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
```

**Note:** This is a simplified example. In production, consider using a proper database like PostgreSQL, MySQL, or MongoDB, and an ORM like Sequelize or Mongoose to manage data.

---

This guide provides a basic setup for creating a simple web app with Node.js. You can expand upon this by learning about additional topics such as routing, advanced database interactions, and front-end frameworks.
