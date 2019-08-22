let express=require('express')
let app=express()
let indexRouter = require('./routes/index')
let userRouter=require('./routes/user')
let articleRouter=require('./routes/article')
let path=require('path')
//配置静态资源路径
app.use(express.static(path.resolve('public')))

//配置模板引擎
app.set('view engine','html')
app.set('views',path.resolve('views'))
app.engine('html',require('ejs').__express)

//引入路由
app.use('/',indexRouter)
app.use('/user',userRouter)
app.use('/article',articleRouter)
app.listen(3000,function(){
  console.log('http://localhost:3000')
})