const API_URL = process.env.API_URL;

function signup(data) {
	return fetch(`https://tupenca-back20221107193837.azurewebsites.net/api/administradores/register`, {
		method: "POST",
		headers: {
			"access-control-allow-origin": "*",
			"Content-type": "application/json"
		},
        body: JSON.stringify(data)
	});
}

module.exports = signup;