const API_URL = process.env.API_URL;

function signin(email, password) {
  return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/administradores/login`, {
    method: "POST",
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });
}

module.exports = signin;