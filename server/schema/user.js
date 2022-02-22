const joi = require('joi')

const pagenum = joi.number().integer().min(1).required()
const pagesize = joi.number().integer().min(1).required()
const state = joi.number().integer().valid(0, 1).required()
const role = joi.string().valid('normal', 'admin')
const uid = joi.number().integer().min(1)
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

exports.list_user_schema = {
  query: {
    pagenum,
    pagesize,
    role
  }
}

exports.detail_user_schema = {
  params: {
    uid
  }
}

exports.state_user_schema = {
  params: {
    uid
  },
  body: {
    state
  }
}

exports.role_user_schema = {
  params: {
    uid
  },
  body: {
    role
  }
}

exports.username_user_schema = {
  params: {
    uid
  },
  body: {
    username
  }
}

exports.password_user_schema = {
  body: {
    oldPassword: password,
    newPassword: joi.not(joi.ref('oldPassword')).concat(password)
  }
}