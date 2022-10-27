const API_URL = process.env.API_URL;

function getDeporte(id) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/deportes/${id}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getDeporte;