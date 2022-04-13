const joi = require('joi')

const did = joi.number().integer().min(1).required()
const content = joi.string().required()
const pagenum = joi.number().integer().min(1).required()
const pagesize = joi.number().integer().min(1).required()

exports.add_diary_schema = {
  body: {
    content
  }
}

exports.list_diary_schema = {
  query: {
    pagenum,
    pagesize
  }
}

exports.delete_diary_schema = {
  params: {
    did
  }
}
