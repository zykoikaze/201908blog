# 初始化项目 
```
npm init
```
# 安装项目依赖的模块
```
npm install --save body-parser cookie-parser debug ejs express morgan serve-favicon express-session connect-mongo mongoose connect-flash multer async
```
# 初始化git
```
git init
git add README.md
git commit -m "	初始化项目和依赖的模块"
git remote add origin https://github.com/zykoikaze/201908blog.git
git push -u origin master
```
# 跑通路由
```
let express=require('express')
let app=express()
let indexRouter = require('./routes/index')
app.use('/',indexRouter)
app.listen(3000)
```
# 配置模板引擎ejs
```
app.set('view engine','html')
app.set('views',path.resolve('views'))
app.engine('html',require('ejs').__express)
```
# 实现会话功能并控制菜单的显示
```
const session = require('express-session')
app.use(session({
  secret: 'blog', //用来加密cookie
  resave: true, //每次客户端请求服务器都会保存session
  saveUninitialized: true, //保存未初始化的session
  cookie: {
    maxAge: 3600 * 1000
  }
}))
//会增加req.session属性，保存sesson数据在服务器
```
# 成功和失败时的消息提示
```
const flash = require('connect-flash')
app.use(flash())

//保存成功/失败的提示消息，依赖session，必须放到session下面
// 原理：req.flash('success') => req.session.success
//  区别：flash提供了读取一次就立刻清空数据
```
# 实现上传头像并在导航右上角展现
```
const multer = require('multer')
const upload = multer({ dest: 'public/upload/' })
```