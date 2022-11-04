const API_URL = process.env.API_URL;

function getEmpresa(id) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/empresas/${id}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getEmpresa;