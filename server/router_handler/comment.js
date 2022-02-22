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
  const { article_id, pagenum, pagesize } = req.query
  const sql = 'select * from comment where article_id=? limit ?,?'
  db.query(sql, [article_id, (pagenum - 1) * pagesize, pagesize], (err, results) => {
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