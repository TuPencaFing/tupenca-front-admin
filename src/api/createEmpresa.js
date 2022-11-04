const API_URL = process.env.API_URL;

function createEmpresa(data) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/empresas`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
        body: JSON.stringify(data)
	});
}

module.exports = createEmpresa;