const API_URL = process.env.API_URL;

function createPencasPC(data) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/pencas-compartidas`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
        body: JSON.stringify(data)
	});
}

module.exports = createPencasPC;