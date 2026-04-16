import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';

export class AuthController {

    constructor(private readonly authService: AuthService) { }

    async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const nuevoUsuario = await this.authService.register(email, password);

            return res.status(201).json({
                success: true,
                message: "Usuario registrado con éxito",
                data: { id: nuevoUsuario.id, email: nuevoUsuario.email }
            });

        } catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message || "Error al registrar el usuario"
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.status(200).json({ success: true, result });
        } catch (error: any) {
            res.status(401).json({ success: false, error: error.message });
        }
    }

}