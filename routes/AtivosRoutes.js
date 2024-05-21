const express = require('express')
const router = express.Router()
const ativosController = require('../controller/AtivosController')

router.get('/ativos', ativosController.getAtivos)
router.get('/ativo/:id', ativosController.getAtivoById)
router.get('/ativosWallet/:id', ativosController.getAtivosByWalletId)
router.post('/ativo', ativosController.createAtivo)
router.put('/ativo/:id', ativosController.updateAtivo)
router.delete('/ativo/:id', ativosController.deleteAtivo)

module.exports = router