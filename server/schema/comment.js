const joi = require('joi')

const cmid = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const article_id = joi.number().integer().min(1)
const username = joi.string().alphanum().min(1).max(10)
const title = joi.string()
const pagenum = joi.number().integer().min(1).required()
const pagesize = joi.number().integer().min(1).required()

exports.add_comment_schema = {
  body: {
    content,
    article_id
  }
}

exports.list_comment_schema = {
  query: {
    pagenum,
    pagesize,
    article_id,
    username,
    title
  }
}

exports.delete_comment_schema = {
  params: {
    cmid
  }
}