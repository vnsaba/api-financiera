import { CryptoService } from '../service/crypto.service';
import { Request, Response } from 'express';

export class CryptoController {
    constructor(private readonly cryptoService: CryptoService) {}

    async getMarketData(req: Request, res: Response) {
        try {

            const data = await this.cryptoService.getCryptoData();

            res.status(200).json({
                success: true,
                message: "Datos sincronizados y persistidos correctamente",
                count: data.length,
                data: data
            });

        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error al procesar la solicitud de criptomonedas",
                error: error.message
            });
        }
    }

}