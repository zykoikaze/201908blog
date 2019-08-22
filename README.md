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