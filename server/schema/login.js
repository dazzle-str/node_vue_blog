const joi = require('joi')

const email = joi.string().email().required()
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

exports.register_schema = {
	body: {
		email,
		username,
		password
	}
}

exports.login_schema = {
	body: {
		username,
		password
	}
}

exports.reset_schema = {
	body: {
		email,
		username,
		newPassword: password
	}
}