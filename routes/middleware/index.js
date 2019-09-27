
/** 判断未登录 */
exports.checkNotLogin=function(req,res,next){
  if(req.session.user){
    res.redirect('/')
  }else{
    next()
  }
}
/** 判断登录 */
exports.checkLogin=function(req,res,next){
  if(req.session.user){
    next()
  }else{
    res.redirect('/user/signin')
  }
}