import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import ShoppingList from './ShoppingList';
import Category from './Category';



@Table({ tableName: 'Products', timestamps: false })

class Product extends Model {

    @ForeignKey(() => ShoppingList)

    @Column({ type: DataType.INTEGER, allowNull: false })
    shoppingList_id!: number;

    @BelongsTo(() => ShoppingList)
    shoppingList!: ShoppingList;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER, allowNull: false })
    category_id!: number;


    @BelongsTo(() => Category)
    category!: Category;
    

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
    amount!: number;

};

export default Product;