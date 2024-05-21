const express = require('express')
const router = express.Router()
const despesasController = require('../controller/DespesasController')

router.get('/ativos', despesasController.getDespesas)
router.get('/ativo/:id',despesasController.getDespesaById)
router.get('/ativosWallet/:id', despesasController.getDespesasByWalletId)
router.post('/ativo', despesasController.createDespesa)
router.put('/ativo/:id', despesasController.updateDespesa)
router.delete('/ativo/:id', despesasController.deleteDespesa)

module.exports = router