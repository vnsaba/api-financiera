import AppDataSource from '../config/data.source';
import { CryptoResponse } from '../interfaces/crypto.interface';
import { Crypto } from '../entities/crypto';

export class CryptoService {

    private cryptoRepository = AppDataSource.getRepository(Crypto);
    private readonly apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

    async getCryptoData(): Promise<Crypto[]> {
        try {

            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error(`Error al obtener datos de la API: ${response.statusText}`);
            }

            const data: CryptoResponse[] = await response.json();

            const transformedData = data.slice(0, 10).map(item => {
                return {
                    coin_name: item.name,
                    symbol: item.symbol.toUpperCase(),
                    price_usd: item.current_price,
                    image_url: item.image,
                };
            });

            return await this.cryptoRepository.save(transformedData);

        } catch (error) {
            console.error("Error sincronizando criptos:", error);
            throw error;
        }
    }

}