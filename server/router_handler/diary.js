const db = require('../db/index.js')

exports.add = (req, res) => {
  const diaryInfo = {
    ...req.body,
    pub_date: new Date(),
    user_id: req.user.uid
  }
  const sql = 'insert into diary set ?'
  db.query(sql, diaryInfo, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('添加日记失败')
    res.cc('添加日记成功', 0)
  })
}

exports.list = (req, res) => {
  const { pagenum, pagesize } = req.query
  const sql = 'select SQL_CALC_FOUND_ROWS d.did, d.content, d.pub_date, u.username from diary d left join user u on d.user_id=u.uid where d.is_delete=0 limit ?,?; select FOUND_ROWS() total'
  db.query(sql, [(pagenum - 1) * pagesize, pagesize], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取日记列表成功',
      data: results
    })
  })
}

exports.delete = (req, res) => {
  const sql = 'update diary set is_delete=1 where did=?'
  db.query(sql, req.params.did, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除日记失败')
    res.cc('删除日记成功', 0)
  })
}
