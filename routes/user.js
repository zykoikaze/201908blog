let express = require('express')
const multer = require('multer') //上传图片

let { User } = require('../model/index.js')
let { checkNotLogin, checkLogin } = require('../utils.js')

/** 图片上传路径 */
const upload = multer({ dest: 'public/upload/' })

let router = express.Router()
router.get('/signup', function (req, res) {
  res.render('user/signup', {
    title: '用户注册'
  })
})
router.post('/signup', checkNotLogin, upload.single('avator'), function (req, res) {
  let user = req.body
  user.avator = `/upload/${req.file.filename}`
  User.create(user, function (err, document) {
    if (err) {
      req.flash('error', '注册失败')
      return res.redirect('back')
    }
    req.flash('success', '注册成功')
    res.redirect('/user/signin')
  })
})
router.get('/signin', checkNotLogin, function (req, res) {
  res.render('user/signin', {
    title: '用户登录'
  })
})
router.post('/signin', function (req, res) {
  let user = req.body
  User.findOne(user, function (err, doc) {
    if (err) {
      req.flash('error', '登录失败')
      return res.redirect('back')
    }
    if (doc) {
      req.flash('success', '登录成功')
      req.session.user = doc
      res.redirect('/')
    } else {
      req.flash('error', '用户名或密码错误')
      return res.redirect('back')
    }
  })

})
router.get('/signout', checkLogin, function (req, res) {
  req.session.user = null
  res.redirect('/')
})
module.exports = router