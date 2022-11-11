const API_URL = process.env.API_URL;

function editCampeonato(id,data) {

    return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/campeonatos/${id}`, {
    method: 'PUT',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = editCampeonato;

