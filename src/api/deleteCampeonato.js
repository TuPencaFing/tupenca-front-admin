const API_URL = process.env.API_URL;

function deleteCampeonato(data) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/api/campeonatos/`+data, {
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`,
			"Content-type": "application/json"
		},
       
	});
}

module.exports = deleteCampeonato;