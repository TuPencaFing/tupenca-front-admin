const API_URL = process.env.API_URL;

function createCampeonato(data) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/campeonatos`, {
		method: "POST",
		headers: {
			"Content-type": "application/json"
		},
        body: JSON.stringify(data)
	});
}

module.exports = createCampeonato;