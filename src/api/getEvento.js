const API_URL = process.env.API_URL;

function getEvento(id) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/eventos/${id}`, {
		method: "GET",
		headers: {
			"Content-type": "application/json"
		},
	});
}

module.exports = getEvento;