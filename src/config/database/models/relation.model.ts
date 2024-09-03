import { AfterCreate, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "./user.model";

@Table
export class Relation extends Model<Relation> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'username'
    },
  })
  user: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'username'
    },
  })
  related: string;

  @AfterCreate
  static async populateRelation(relation: Relation) {
    const user = await User.findOne({ where: { username: relation.user } });
    const related = await User.findOne({ where: { username: relation.related } });

    if (user && related) {
      await user.$add('relations', related);
      await related.$add('relations', user);
    }
  }
}