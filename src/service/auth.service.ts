
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User'
import AppDataSource from '../config/data.source';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);
    private readonly JWT_SECRET: string;

    constructor() {
        if (! process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET no está definido en las variables de entorno");
        }
        this.JWT_SECRET =  process.env.JWT_SECRET;
    }

    async register(email: string, password: string): Promise<User> {
        const existeUser = await this.userRepository.findOne({ where: { email: email } });
        if (existeUser) {
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUser = this.userRepository.create({ email: email, password: hashedPassword });
        return await this.userRepository.save(nuevoUser);
    }

    async login(email: string, password: string): Promise<string> {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const contraseñasIguales = await bcrypt.compare(password, user.password);
        if (!contraseñasIguales) {
            throw new Error('Contraseña incorrecta');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, this.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

}