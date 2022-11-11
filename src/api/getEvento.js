const API_URL = process.env.API_URL;

function getEvento(id) {
	return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/eventos/${id}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getEvento;