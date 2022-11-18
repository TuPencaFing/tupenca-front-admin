const API_URL = process.env.API_URL;

function createEvento(data) {
	return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/eventos`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
        body: JSON.stringify(data)
	});
}

module.exports = createEvento;