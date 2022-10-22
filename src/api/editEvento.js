const API_URL = process.env.API_URL;

function editEvento(id,data) {

    return fetch(`https://tupenca-back-test.azurewebsites.net/api/eventos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = editEvento;

