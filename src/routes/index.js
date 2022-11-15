const { Router} = require("express")
const router = Router()

router.get('/', (req, res) => {
    res.render('router.login.ejs');
})
router.get('/register', (req, res) => {
    res.render('router.register.ejs');
})

module.exports = router;