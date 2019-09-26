let mongoose = require('mongoose')
/**连接数据库 */
mongoose.connect('mongodb://localhost/201908blog', { useNewUrlParser: true })
/**创建用户集合骨架模型，定义了用户集合中的 属性及类型*/
let UserSchma = new mongoose.Schema({
  username: String,
  password: String,
  avator: String
})
/** 编译成model是一个类，类可以调用增啥改查，或者生成实例 */
let User = mongoose.model('User', UserSchma)
exports.User = User