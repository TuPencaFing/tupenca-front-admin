const API_URL = process.env.API_URL;

function createPlan(data) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/planes`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
        body: JSON.stringify(data)
	});
}

module.exports = createPlan;