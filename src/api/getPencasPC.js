const API_URL = process.env.API_URL;

function getPencasPC() {
	return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/pencas-compartidas`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getPencasPC;