const joi = require('joi')

const aid = joi.number().integer().min(1).required()
const title = joi.string().required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿')
const cate_id = joi.number().integer().min(1)
const pagenum = joi.number().integer().min(1).required()
const pagesize = joi.number().integer().min(1).required()

exports.add_article_schema = {
  body: {
    title,
    content,
    state,
    cate_id
  }
}

exports.list_article_schema = {
  query: {
    pagenum,
    pagesize,
    cate_id,
    state
  }
}

exports.get_article_schema = {
  params: {
    aid
  }
}

exports.update_article_schema = {
  body: {
    aid,
    title,
    content,
    state,
    cate_id
  }
}