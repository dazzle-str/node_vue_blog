const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db/index.js')
const config = require('../config.js')

exports.register = (req, res) => {
	let { email, username, password } = req.body
	const sql = 'select * from user where email=? or username=?'
	db.query(sql, [email, username], (err, results) => {
		if (err) return res.cc(err)
		if (results.length === 2) return res.cc('邮箱和昵称已被使用')
		if (results.length === 1 && results[0].email === email && results[0].username === username) return res.cc('邮箱和昵称已被使用')
		if (results.length === 1 && results[0].email === email) return res.cc('邮箱已被使用')
		if (results.length === 1 && results[0].username === username) return res.cc('昵称已被使用')
		password = bcrypt.hashSync(password, 10)
		const sql = 'insert into user set ?'
		db.query(sql, { email, username, password }, (err, results) => {
			if (err) return res.cc(err)
			if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试')
			res.cc('注册成功', 0)
		})
	})
}

exports.login = (req, res) => {
	const { username, password } = req.body
	const sql = 'select * from user where username=? and state=0'
	db.query(sql, username, (err, results) => {
		if (err) return res.cc(err)
		if (results.length !== 1) return res.cc('用户不存在')
		const compareResult = bcrypt.compareSync(password, results[0].password)
		if (!compareResult) return res.cc('密码错误')
		const user = { ...results[0], password: '' }
		const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
		res.send({
			status: 0,
			message: '登录成功',
			token: 'Bearer ' + tokenStr,
			role: results[0].role
		})
	})
}

exports.reset = (req, res) => {
	let { email, username, newPassword } = req.body
	const sql = 'select * from user where email=? and username=?'
	db.query(sql, [email, username], (err, results) => {
		if (err) return res.cc(err)
		if (!results.length) return res.cc('邮箱与用户名不匹配')
		newPassword = bcrypt.hashSync(newPassword, 10)
		const sql = 'update user set password=? where email=? and username=?'
		db.query(sql, [newPassword, email, username], (err, results) => {
			if (err) return res.cc(err)
			if (results.affectedRows !== 1) return res.cc('修改密码失败')
			res.cc('修改密码成功', 0)
		})
	})
}