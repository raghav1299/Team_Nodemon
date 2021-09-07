const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop', {
    inc_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    fname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "email_UNIQUE"
    },
    password: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: "phone_UNIQUE"
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    long: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    shop_status: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    active_orders: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fcm_token: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'shop',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "inc_id" },
        ]
      },
      {
        name: "phone_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
