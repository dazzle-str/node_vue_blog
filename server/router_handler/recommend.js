const db = require('../db/index.js')

exports.get = (req, res) => {
  const sql = 'select * from recommend'
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取推荐列表成功',
      data: results
    })
  })
}

exports.set = (req, res) => {
  const sql = 'update recommend set article_id=? where rid=?'
  db.query(sql, [req.body.article_id, req.body.rid], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新推荐失败')
    res.cc('更新推荐成功', 0)
  })
}
