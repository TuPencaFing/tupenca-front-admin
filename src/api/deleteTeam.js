const API_URL = process.env.API_URL;

function deleteTeam(id) {

    return fetch(`https://tupenca-back-test.azurewebsites.net/api/equipos/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
   })
}

module.exports = deleteTeam;

