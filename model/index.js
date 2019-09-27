let mongoose = require('mongoose')
mongoose.Promise = Promise
let ObjectId = mongoose.Schema.Types.ObjectId
/**连接数据库 */
mongoose.connect(require('../config').dbUrl, { useUnifiedTopology: true ,useNewUrlParser: true})
/**创建用户集合骨架模型，定义了用户集合中的 属性及类型*/
let UserSchma = new mongoose.Schema({
  username: String,
  password: String,
  avator: String
})
/** 编译成model是一个类，类可以调用增啥改查，或者生成实例 */
let User = mongoose.model('User', UserSchma)
exports.User = User
/** 发表问斩 */
let ArticleSchma = new mongoose.Schema({
  title: String,
  content: String,
  template: String,
  createAt: { type: Date, default: Date.now },
  user: { type: ObjectId, ref: "User" }
})
let Article = mongoose.model('Article', ArticleSchma)
exports.Article = Article