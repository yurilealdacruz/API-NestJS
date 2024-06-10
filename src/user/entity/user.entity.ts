import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,

    })
    id: Number;

    @Column({
        length: 63,

    })
    name: string;

    @Column({
        length: 127,
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: "date",
        nullable: true
    })
    birthAt: string;

    @CreateDateColumn()
    createAt: string;

    @UpdateDateColumn()
    updateAt: string;

    @Column({
        enum: [1,2]
    })
    role: Number;

}