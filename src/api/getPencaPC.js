const API_URL = process.env.API_URL;

function getPencaPC(id) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/pencas-compartidas/${id}`, {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
	});
}

module.exports = getPencaPC;