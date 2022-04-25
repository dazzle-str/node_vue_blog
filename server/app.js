const express = require('express')
const app = express()
const cors = require('cors')
const joi = require('joi')
const expressJWT = require('express-jwt')
const config = require('./config.js')
const loginRouter = require('./router/login.js')
const categoryRouter = require('./router/category.js')
const articleRouter = require('./router/article.js')
const diaryRouter = require('./router/diary.js')
const commentRouter = require('./router/comment.js')
const userRouter = require('./router/user.js')
const recommendRouter = require('./router/recommend.js')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/uploads', express.static('./uploads'))

app.use((req, res, next) => {
	res.cc = (err, status = 1) => {
		res.send({
			status,
			message: err instanceof Error ? err.message : err
		})
	}
	next()
})

app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//, '/recommend/get', '/diary/list', '/article/list', /^\/article\/detail\//] }))

app.use('/api', loginRouter)
app.use('/category', categoryRouter)
app.use('/article', articleRouter)
app.use('/diary', diaryRouter)
app.use('/comment', commentRouter)
app.use('/user', userRouter)
app.use('/recommend', recommendRouter)

app.use((err, req, res, next) => {
	if (err instanceof joi.ValidationError) return res.cc(err)
	if (err.name === 'UnauthorizedError') return res.cc('身份认证失败', 2)
	res.cc(err)
})

app.listen(3000, function () {
	console.log('http://localhost:3000')
})