const express = require('express')
const router = express.Router()
const despesasController = require('../controller/DespesasController')

router.get('/despesas', despesasController.getDespesas)
router.get('/despesa/:id',despesasController.getDespesaById)
router.get('/despesasWallet/:id', despesasController.getDespesasByWalletId)
router.post('/despesa', despesasController.createDespesa)
router.put('/despesa/:id', despesasController.updateDespesa)
router.delete('/despesa/:id', despesasController.deleteDespesa)

module.exports = router