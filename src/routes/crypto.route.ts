import { Router } from 'express';
import { CryptoController } from '../controller/crypto.controller';
import { CryptoService } from '../service/crypto.service';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const cryptoService = new CryptoService();
const cryptoController = new CryptoController(cryptoService);

router.get('/cryptos', authMiddleware, (req, res) => cryptoController.getMarketData(req, res));
export default router;