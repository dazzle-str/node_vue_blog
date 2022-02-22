const db = require('../db/index.js')

exports.list = (req, res) => {
  const sql = 'select cid, name from category where is_delete=0'
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)
    res.send({
      status: 0,
      message: '获取分类列表成功',
      data: results
    })
  })
}

exports.add = (req, res) => {
  const sql = 'select * from category where name=?'
  db.query(sql, req.body.name, (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 1) return res.cc('分类名称已被使用')
    const sql = 'insert into category set ?'
    db.query(sql, req.body, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('新增分类失败')
      res.cc('新增分类成功', 0)
    })
  })
}

exports.delete = (req, res) => {
  const sql = 'update category set is_delete=1 where cid=?'
  db.query(sql, req.params.cid, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('删除分类失败')
    res.cc('删除分类成功', 0)
  })
}

exports.activate = (req, res) => {
  const sql = 'update category set is_delete=0 where cid=?'
  db.query(sql, req.params.cid, (err, results) => {
    if (err) return res.cc(err)
    if (results.affectedRows !== 1) return res.cc('激活分类失败')
    res.cc('激活分类成功', 0)
  })
}

exports.detail = (req, res) => {
  const sql = 'select * from category where cid=?'
  db.query(sql, req.params.cid, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取分类详情失败')
    res.send({
      status: 0,
      message: '获取分类详情成功',
      data: results[0]
    })
  })
}

exports.update = (req, res) => {
  const sql = 'select * from category where cid<>? and name=?'
  db.query(sql, [req.body.cid, req.body.name], (err, results) => {
    if (err) return res.cc(err)
    if (results.length === 1) return res.cc('分类名称已被使用')
    const sql = 'update category set ? where cid=?'
    db.query(sql, [req.body, req.body.cid], (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('更新分类失败')
      res.cc('更新分类成功', 0)
    })
  })
}