import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    email?: string;

    @Column({ nullable: true })
    password?: string; // 암호는 선택적

    @Column()
    username?: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdDt?: Date = new Date();
}
