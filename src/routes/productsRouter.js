const { Router} = require ("express");
const productsController = require("../controllers/productController")
const {adminAuth} = require ("../middlewares/index")

const router = Router();


router.get("/", productsController.getAll);
router.get("/:id", productsController.getById);
router.get("/categoria/:category", productsController.getByCategory);

router.post("/", adminAuth, productsController.add);

router.put("/:id", adminAuth, productsController.updateById);

router.delete("/:id", adminAuth, productsController.deleteById);

module.exports = router;