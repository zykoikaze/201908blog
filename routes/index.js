let express = require('express')
let router = express.Router()
const { Article } = require('../model')
router.get('/', function (req, res) {
  /** populate把一个字段转成对象 */
  let keyword = req.query.keyword
  let pageNum = isNaN(req.query.pageNum) ? 1 : parseInt(req.query.pageNum)
  let pageSize = isNaN(req.query.pageSize) ? 5 : parseInt(req.query.pageSize)
  let query = {}
  if (keyword) {
    query['$or'] = [{
      title: new RegExp(keyword)
    }, {
      content: new RegExp(keyword)
    }]
  }
  Article.count(query, function (err, count) {
    if (err) {
      req.flash('error', err)
      return res.end('')
    }
    Article.find(query)
      .sort({ createAt: -1 }) //按照createAt排序
      .skip((pageNum - 1) * pageSize) //跳过的文档条数
      .limit(pageSize) //限制每页展现条数
      .populate('user')
      .exec(function (err, articles) {
        if (err) {
          req.flash('error', err)
          return res.end('')
        }
        res.render('index', {
          keyword,
          pageNum,
          pageSize,
          totalSize:Math.ceil(count/pageSize),
          articles
        })
      })
  })


})
module.exports = router