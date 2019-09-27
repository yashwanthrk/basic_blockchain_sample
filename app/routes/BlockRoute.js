const BlockController = require('../controllers/BlockController');


const router = require('express').Router();


router.get('/', BlockController.storeBlocks);
router.get('/getTransaction', BlockController.getAllTransaction);
router.get('/getTransactionForAddress', BlockController.getTransactionForAddress)


module.exports = router;