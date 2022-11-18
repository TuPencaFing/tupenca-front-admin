const API_URL = process.env.API_URL;

function getMetricas() {
	return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/administradores/metricas`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getMetricas;