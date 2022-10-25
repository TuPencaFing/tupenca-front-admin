const API_URL = process.env.API_URL;

function createDeporte(data) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/deportes`, {
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
        body: JSON.stringify(data)
	});
}

module.exports = createDeporte;