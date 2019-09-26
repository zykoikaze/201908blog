const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const articleRouter = require('./routes/article')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
//配置静态资源路径
app.use(express.static(path.resolve('public')))

//解析form表单请求体，并转成对象赋给req.body
app.use(bodyParser.urlencoded({ extended: true }))

//配置模板引擎
app.set('view engine', 'html')
app.set('views', path.resolve('views'))
app.engine('html', require('ejs').__express)

/** 配置session参数  调用后，会在req多一个req.session对象，可以保存session到服务器*/
app.use(session({
  secret: 'blog', //用来加密cookie
  resave: true, //每次客户端请求服务器都会保存session
  saveUninitialized: true, //保存未初始化的session
  cookie: {
    maxAge: 3600 * 1000
  }
}))

/** flash一闪而过，保存成功/失败的提示消息，依赖session，必须放到session下面 */
app.use(flash())

/** 注册全局的组件 */
app.use(function (req, res, next) {
  /** req.locals对象和render函数传递参数功能相同。
   * render函数中的参数会合并到res.locals上，供模板中使用 */
  res.locals.user = req.session.user || '';
  /** req.flash('success') => req.session.success
   * 区别:
   *  flash提供了读取一次就立刻清空数据
   */
  res.locals.success = req.flash('success').toString() || '';
  res.locals.error = req.flash('error').toString() || '';

  next()
})

//引入路由
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/article', articleRouter)
/** 监听端口 */
app.listen(3000, function () {
  console.log('http://localhost:3000')
})