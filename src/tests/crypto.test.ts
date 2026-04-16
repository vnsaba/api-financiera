import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app';
import { CryptoService } from '../service/crypto.service';

jest.mock('../service/crypto.service');
describe('GET /api/cryptos', () => {
    it('debería retornar 401 si no hay token', async () => {
        const res = await request(app).get('/api/cryptos');
        expect(res.statusCode).toEqual(401);
        expect(res.body.success).toBe(false);
    });

    it('debería retornar 200 y datos si el token es válido', async () => {
        const mockData = [
            { id: 1, coin_name: 'Bitcoin', symbol: 'BTC', price_usd: 50000, image_url: 'https://example.com/bitcoin.png', created_at: new Date(), updated_at: new Date() },
            { id: 2, coin_name: 'Ethereum', symbol: 'ETH', price_usd: 3000, image_url: 'https://example.com/ethereum.png', created_at: new Date(), updated_at: new Date() }
        ];
        const expectedData = mockData.map((crypto) => ({
            ...crypto,
            created_at: crypto.created_at.toISOString(),
            updated_at: crypto.updated_at.toISOString()
        }));
        jest.spyOn(CryptoService.prototype, 'getCryptoData').mockResolvedValue(mockData);
        const secret = process.env.JWT_SECRET || 'tu_clave_secreta_de_emergencia';
        const fakeToken = jwt.sign({ id: 1, email: 'test@mail.com' }, secret);

        const res = await request(app)
            .get('/api/cryptos')
            .set('Authorization', `Bearer ${fakeToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.data).toEqual(expectedData);
        expect(res.body.count).toBe(2);
    });

});