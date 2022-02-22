const joi = require('joi')

const cid = joi.number().integer().min(1).required()
const name = joi.string().required()

exports.add_category_schema = {
  body: {
    name
  }
}

exports.get_category_schema = {
  params: {
    cid
  }
}

exports.update_category_schema = {
  body: {
    cid,
    name
  }
}