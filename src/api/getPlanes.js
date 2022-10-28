const API_URL = process.env.API_URL;

function getPlanes() {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/planes`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getPlanes;