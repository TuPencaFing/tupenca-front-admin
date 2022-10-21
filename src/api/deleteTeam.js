const API_URL = process.env.API_URL;

function deleteTeam(id) {

    return fetch(`https://tupenca-back-test.azurewebsites.net/api/equipos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
   })
}

module.exports = deleteTeam;

