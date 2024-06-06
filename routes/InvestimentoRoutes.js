const express = require('express')
const router = express.Router()
const investimentosController = require('../controller/InvestimentosController')

router.get('/investimentos', investimentosController.getInvestimentos)
router.get('/investimento/:id', investimentosController.getInvestimentoById)
router.get('/walletInvestimentos/:id', investimentosController.getInvestimentoByWalletId)
router.post('/investimento', investimentosController.createInvestimento)
router.put('/investimento/:id', investimentosController.updateInvestimento)
router.delete('/investimento/:id', investimentosController.deleteInvestimento)

module.exports = router