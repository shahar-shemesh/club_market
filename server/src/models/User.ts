import { Table, Column, Model, DataType, HasMany, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import ShoppingList from './ShoppingList';



@Table({ tableName: 'Users', timestamps: false })

class User extends Model {

  @Column({ type: DataType.STRING, allowNull: false })
  username!: string;


  @Column({ type: DataType.TEXT, allowNull: false })
  password!: string;


  @HasMany(() => ShoppingList)
  shoppingLists!: ShoppingList[];


  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (user.changed('password')) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  };

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  };

};

export default User;