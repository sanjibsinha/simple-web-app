const params = new URLSearchParams(window.location.search);
const name = params.get('name');
const age = params.get('age');

document.body.innerHTML += `<p>Name: ${name}</p>`;
document.body.innerHTML += `<p>Age: ${age}</p>`;