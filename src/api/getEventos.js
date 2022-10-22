const API_URL = process.env.API_URL;

function getCampeonatos() {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/eventos`, {
		method: "GET",
		headers: {
			"Content-type": "application/json"
		},
	});
}

module.exports = getCampeonatos;