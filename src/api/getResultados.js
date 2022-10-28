const API_URL = process.env.API_URL;

function getResultados() {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/resultados`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getResultados;