const express = require('express')
const router = express.Router()
const walletController = require('../controller/WalletController')

router.get('/wallets', walletController.getWallets)
router.get('/wallet/:id', walletController.getWalletById)
router.get('/walletUser/:id', walletController.getWalletByIdUser)
router.post('/wallet', walletController.createWallet)
router.put('/wallet/:id', walletController.updateWallet)
router.delete('/wallet/:id', walletController.deleteWallet)

module.exports = router