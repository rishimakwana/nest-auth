import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: "User" })
export class User extends Model<User> {
    @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true, })
    id: bigint;

    @Column({ type: DataType.STRING, })
    fullName: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false, })
    email: string;

    @Column({ type: DataType.STRING, })
    password: string;

    @Column({ type: DataType.DATE, })
    createdAt?: Date;

    @Column({ type: DataType.DATE, })
    updatedAt?: Date;

}
