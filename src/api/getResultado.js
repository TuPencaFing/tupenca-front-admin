const API_URL = process.env.API_URL;

function getResultado(id) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/resultados/evento/${id}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getResultado;