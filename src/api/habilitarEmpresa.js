const API_URL = process.env.API_URL;

function habilitarEmpresa(id) {
	return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/empresas/${id}/habilitar`, {
		method: "PATCH",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = habilitarEmpresa;