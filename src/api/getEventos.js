const API_URL = process.env.API_URL;

function getEventos() {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/eventos`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getEventos;