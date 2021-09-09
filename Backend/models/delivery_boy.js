const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('delivery_boy', {
    inc_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "username_UNIQUE"
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: true,
      unique: "email_UNIQUE"
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: "phone_UNIQUE"
    },
    fname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    curr_lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    curr_long: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    pickup_area: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pickup_location: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pickup_city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    pickup_pincode: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dest_lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dest_long: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dest_location: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dest_city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dest_state: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    dest_pincode: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    fcm_token: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    active_orders: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'delivery_boy',
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
        name: "username_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
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
      {
        name: "phone_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
    ]
  });
};
