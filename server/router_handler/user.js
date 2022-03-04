const bcrypt = require('bcryptjs')
const db = require('../db/index.js')

exports.list = (req, res) => {
  const { pagenum, pagesize } = req.query
  let sql = 'select SQL_CALC_FOUND_ROWS uid, email, username, role, state from user'
  if (req.query.role) {
    sql += ' and role="' + req.query.role + '"'
  }
  sql += ' limit ?,?; select FOUND_ROWS() total;'
  db.query(sql, [(pagenum - 1) * pagesize, pagesize], (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取用户列表成功',
      data: results
    })
  })
}

exports.detail = (req, res) => {
  const sql = 'select uid, email, username from user where uid=?'
  db.query(sql, req.user.uid, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取用户详情失败')
    res.send({
      status: 0,
      message: '获取用户详情成功',
      data: results[0]
    })
  })
}

exports.state = (req, res) => {
  const sql = 'update user set state=? where uid=?'
  db.query(sql, [req.body.state, req.params.uid], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('更新用户状态失败')
    res.cc('更新用户状态成功', 0)
  })
}

exports.role = (req, res) => {
  const sql = 'update user set role=? where uid=?'
  db.query(sql, [req.body.role, req.params.uid], (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('分配角色失败')
    res.cc('分配角色成功', 0)
  })
}

exports.username = (req, res) => {
  const sql = 'select * from user where username=?'
  db.query(sql, req.body.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 1) return res.cc('昵称已被使用')
    const sql = 'update user set username=? where uid=?'
    if (req.params.uid) {
      uid = req.params.uid
    } else {
      uid = req.user.uid
    }
    db.query(sql, [req.body.username, uid], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('修改昵称失败')
      res.cc('修改昵称成功', 0)
    })
  })
}

exports.password = (req, res) => {
  const sql = 'select * from user where uid=?'
  db.query(sql, req.user.uid, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('用户不存在')
    const compareResult = bcrypt.compareSync(req.body.oldPassword, results[0].password)
    if (!compareResult) return res.cc('原密码错误')
    const sql = 'update user set password=? where uid=?'
    const newPassword = bcrypt.hashSync(req.body.newPassword, 10)
    db.query(sql, [newPassword, req.user.uid], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('修改密码失败')
      res.cc('修改密码成功', 0)
    })
  })
}
