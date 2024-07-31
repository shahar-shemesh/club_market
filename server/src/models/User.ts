import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import ShoppingList from './ShoppingList';



@Table({ tableName: 'Users', timestamps: false })

class User extends Model {

  @Column({ type: DataType.STRING, allowNull: false })
  username!: string;


  @Column({ type: DataType.TEXT, allowNull: false })
  password!: string;


  @HasMany(() => ShoppingList)
  shoppingLists!: ShoppingList[];

};

export default User;