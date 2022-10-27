const API_URL = process.env.API_URL;

function editTeam(id,data) {

    return fetch(`https://tupenca-back-test.azurewebsites.net/api/equipos/${id}`, {
    method: 'PUT',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = editTeam;

