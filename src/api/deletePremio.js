const API_URL = process.env.API_URL;

function deletePremio(id) {

    return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/premios/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
   })
}

module.exports = deletePremio;

