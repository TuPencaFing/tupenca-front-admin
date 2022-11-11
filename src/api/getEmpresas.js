const API_URL = process.env.API_URL;

function getEmpresas() {
	return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/empresas`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getEmpresas;