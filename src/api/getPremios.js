const API_URL = process.env.API_URL;

function getPremios() {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/premios`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getPremios;