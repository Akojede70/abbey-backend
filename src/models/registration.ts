import { Model, DataTypes, Optional } from 'sequelize';
import db from "../db/database";
import bcrypt from 'bcrypt';

interface UserRegistrationAttributes {
  id: number;
  lastName: string;
  firstName: string; 
  email: string;
  bio: string;
  password: string;
}


interface UserRegistrationCreationAttributes extends Optional<UserRegistrationAttributes, 'id'> {}
class UserRegistration extends Model<UserRegistrationAttributes, UserRegistrationCreationAttributes> implements UserRegistrationAttributes {
  public id!: number;
  public lastName!: string;
  public firstName!: string;
  public email!: string;
  public bio!: string;
  public password!: string;

} 


UserRegistration.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Please provide your last name' },
      len: {
        args: [1, 20],
        msg: 'Last name must be less than or equal to 20 characters',
      },
      isAlpha: {
        msg: 'Please provide a valid last name with letters only',
      },
    },
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Please provide your first name' },
      len: {
        args: [1, 20],
        msg: 'First name must be less than or equal to 20 characters',
      },
      isAlpha: {
        msg: 'Please provide a valid first name with letters only',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: 'Please provide an email' },
      isEmail: { msg: 'Please provide a valid email address' },
    },
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Please provide a bio' },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Please provide a password' },
      len: {
        args: [8, 20],
        msg: 'Password must be at least 8 characters long',
      },
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        msg: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    },
  },
}, {
  sequelize: db,
  tableName: 'registrations',
  timestamps: true,
});

UserRegistration.beforeCreate(async (user: UserRegistration) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});


export default UserRegistration;
