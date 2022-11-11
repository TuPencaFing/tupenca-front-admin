const API_URL = process.env.API_URL;

function getDeportes() {
	return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/deportes`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getDeportes;