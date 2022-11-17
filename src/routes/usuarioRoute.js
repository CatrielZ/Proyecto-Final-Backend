const { Router } =require( 'express');
const router= Router();
const passport = require ('passport') 
const UsuarioMiddleware = require('./userMiddleware')
const UsuarioController = require('../controllers/usersController.js')
const upload = require ('../multer/loadFile.js')
const logger = require('../utils/logger.js')

const userMiddlewares= new UsuarioMiddleware()



class RouterUsuario{
  constructor(){
      this.controller= new UsuarioController()
  }

  start(){
    //INDEX
    router.get ('/home', userMiddlewares.authMiddleware, this.controller.getHome)
    //HOME ADMIN ..........en proceso xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    router.get('/chatadmin',userMiddlewares.authMiddleware,userMiddlewares.isAdminMiddleware, this.controller.getHomeAdmin)  ////
    ////////          LOGIN         ////////
    router.get('/', this.controller.getLogin)
    router.get('/info', this.controller.getUserInfo)
    router.post('/',passport.authenticate('login',
      {failureRedirect: '/fail-login',failureMessage: true}),
      this.controller.postLogin
    )
    router.get('/fail-login', this.controller.getFailLogin)
    ///////           SIGNUP            ///////////////////
    router.get('/signup',this.controller.getSignup)
    router.post('/signup',upload.single('image'),passport.authenticate('signup',
      { failureRedirect: '/fail-signup',failureMessage: true}),
      this.controller.postSignup
    )
    router.get('/fail-signup', this.controller.getFailSignup)
    ///////           LOGOUT           ///////////////////
    router.get('/logout', this.controller.getLogout )

    return router
  }
}

module.exports = RouterUsuario

