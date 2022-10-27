const API_URL = process.env.API_URL;

function editDeporte(id,data) {

    return fetch(`https://tupenca-back-test.azurewebsites.net/api/deportes/${id}`, {
    method: 'PUT',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = editDeporte;
