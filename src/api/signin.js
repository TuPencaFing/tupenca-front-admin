const API_URL = process.env.API_URL;

function signin(email, password) {
  return fetch(`https://tupenca-back-test.azurewebsites.net/User/login`, {
    credentials: 'include',
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      "access-control-allow-origin": "*",
      "Content-type": "application/json; charset=UTF-8"
    }
  });
}

module.exports = signin;