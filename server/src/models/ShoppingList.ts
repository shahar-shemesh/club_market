import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import User from './User';
import Product from './Product';


@Table({ tableName: 'ShoppingLists', timestamps: false })


class ShoppingList extends Model {

  @ForeignKey(() => User)


  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id!: number;


  @BelongsTo(() => User)
  user!: User;


  @Column({ type: DataType.STRING, allowNull: false, defaultValue: () => (new Date().toLocaleString()) })
  date?: string;


  @HasMany(() => Product)
  products!: Product[];

};


export default ShoppingList;