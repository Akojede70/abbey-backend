

import { Model, DataTypes, Optional } from 'sequelize';
import db from "../db/database";
import UserRegistration from './registration';


interface FollowAttributes {
  id: number; 
  followerId: number; 
  followingId: number; 
}


interface FollowCreationAttributes extends Optional<FollowAttributes, 'id'> {}


interface FollowInstance extends Model<FollowAttributes, FollowCreationAttributes>, FollowAttributes {
  FollowerUser?: UserRegistration; 
  FollowingUser?: UserRegistration; 
}

class Follow extends Model<FollowAttributes, FollowCreationAttributes> implements FollowInstance {
  public id!: number; 
  public followerId!: number; 
  public followingId!: number; 
  public FollowerUser?: UserRegistration; 
  public FollowingUser?: UserRegistration; 
}

// Initialize the Follow model
Follow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserRegistration,
        key: 'id',
      },
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserRegistration,
        key: 'id',
      },
    },
  },
  {
    sequelize: db,
    modelName: 'Follow',
  }
);

// Set up associations
Follow.belongsTo(UserRegistration, { foreignKey: 'followerId', as: 'FollowerUser' });
Follow.belongsTo(UserRegistration, { foreignKey: 'followingId', as: 'FollowingUser' });

export default Follow;
