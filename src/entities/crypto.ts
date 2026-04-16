import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('crypto')
export class Crypto {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    coin_name: string;

    @Column({ type: "varchar", length: 10 })
    symbol: string;

    @Column({ type: "decimal", precision: 18, scale: 8 })
    price_usd: number;

    @Column({ type: "varchar", nullable: true })
    image_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

