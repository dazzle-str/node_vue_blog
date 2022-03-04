const db = require("../db")

exports.add = (req, res) => {
  const commentInfo = {
    ...req.body,
    time: new Date(),
    user_id: req.user.uid
  }
  const sql = 'insert into comment set ?'
  db.query(sql, commentInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('发布评论失败')
    res.cc('发布评论成功', 0)
  })
}

exports.list = (req, res) => {
  console.log(req.query)
  const { pagenum, pagesize } = req.query
  let sql = 'select SQL_CALC_FOUND_ROWS c.cmid, c.content, c.time, u.username, a.title from comment c left join user u on c.user_id=u.uid left join article a on c.article_id=a.aid'
  if (req.query.article_id) {
    sql += ' where c.article_id=' + req.query.article_id
  }
  if (req.query.username) {
    sql += ' where u.username="' + req.query.username + '"'
  }
  if (req.query.title) {
    sql += ' where a.title="' + req.query.title + '"'
  }
  sql += ' order by c.time desc limit ?,?; select FOUND_ROWS() total;'
  db.query(sql, [(pagenum - 1) * pagesize, pagesize], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取评论列表成功',
      data: results
    })
  })
}

exports.delete = (req, res) => {
  const sql = 'delete from comment where cmid=?'
  db.query(sql, req.params.cmid, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除评论失败')
    res.cc('删除评论成功', 0)
  })
}