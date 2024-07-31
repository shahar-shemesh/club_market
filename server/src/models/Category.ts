import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Product from './Product';


@Table({ tableName: 'Categories', timestamps: false })

class Category extends Model {

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @HasMany(() => Product)
    products!: Product[];

};

export default Category;