const API_URL = process.env.API_URL;

function deletePencaEmpresa(id) {

    return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/pencas-empresas/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      'Content-Type': 'application/json'
    },
   })
}

module.exports = deletePencaEmpresa;

