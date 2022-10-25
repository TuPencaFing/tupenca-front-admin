const API_URL = process.env.API_URL;

function getEquipos() {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/equipos`, {
		method: "GET",
		headers: {
			"Content-type": "application/json"
		},
	});
}

module.exports = getEquipos;