const { Router} = require("express")
const router = Router()

router.get('/', (req, res) => {
    res.render('router.login.ejs');
})

module.exports = router;