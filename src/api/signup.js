const API_URL = process.env.API_URL;

function signup(data) {
	return fetch(`https://tupenca-back-test.azurewebsites.net/User/register`, {
		mode: 'cors',
		credentials: 'include',
		method: "POST",
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-type": "application/json"
		},
        body: JSON.stringify(data)
	});
}

module.exports = signup;