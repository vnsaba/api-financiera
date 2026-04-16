import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No autorizado' });
    }

    try {
        const secret = process.env.JWT_SECRET || 'tu_clave_secreta_de_emergencia';
        
        const decoded = jwt.verify(token, secret);

        (req as any).user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token inválido' });
    }
};