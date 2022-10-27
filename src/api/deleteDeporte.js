const API_URL = process.env.API_URL;

function deleteDeporte(id) {

    return fetch(`https://tupenca-back-test.azurewebsites.net/api/deportes/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
   })
}

module.exports = deleteDeporte;
