const API_URL = process.env.API_URL;

function editPencaPC(id,data) {

    return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/pencas-compartidas/${id}`, {
    method: 'PUT',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   })
}

module.exports = editPencaPC;

