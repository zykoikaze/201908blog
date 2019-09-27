const express = require('express')
const fs = require('fs')
const path = require('path')
const { Article } = require('../model')
let { checkNotLogin, checkLogin } = require('./middleware/index.js')
var md = require('markdown-it')('commonmark');

let router = express.Router()
router.get('/add', checkLogin, function (req, res) {
  res.render('article/add', {
    title: '发表文章',
    article: {}
  })
})

router.post('/add', checkLogin, function (req, res) {
  let article = req.body
  let htmlStr = md.render(req.body.content)
  article.template = htmlStr
  article.user = req.session.user._id

  Article.create(article, function (err, doc) {
    if (err) {
      req.flash('error', err)
      return res.redirect('back')
    }
    req.flash('success', '文章发表成功')
    res.redirect('/');
  })
})
/** 根据_id查询 */
router.get('/detail/:_id', function (req, res) {
  // Article.findById(req.params, )
  Article.findById(req.params).populate('user').exec(function (err, article) {
    if (err) {
      req.flash('error', err)
      return res.redirect('back')
    }
    res.render('article/article', {
      article
    })
  })
})
/** 删除文章 */
router.get('/delete/:_id', function (req, res) {
  Article.remove(req.params, function (err, doc) {
    if (err) {
      req.flash('err', err)
      return res.redirect('back')
    }
    req.flash('success', "文章删除成功")
    res.redirect('/')
  })
})
/** 更新文章 - 回显到add模板中*/
router.get('/update/:_id', function (req, res) {
  Article.findById(req.params, function (err, article) {
    if (err) {
      req.flash('error', err)
      return res.redirect('back')
    }
    res.render('article/add', {
      article
    })
  })
})
/** 更新数据库内容 */
router.post('/update/:_id', function (req, res) {
  let _id = req.params._id;
  let article = req.body
  article.template = md.render(article.content)
  Article.updateOne({ _id }, article, function (err, result) {
    if (err) {
      req.flash('error', err)
      return res.redirect('back')
    }
    req.flash('success', '文章更新成功')
    res.redirect('/article/detail/' + _id)
  })
})
module.exports = router