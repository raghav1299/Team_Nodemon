const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('delivery_boy_history', {
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
    pickup_address: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    drop_address: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    active_order: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pickup_lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    pickup_long: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dest_lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    dest_long: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'delivery_boy_history',
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
    ]
  });
};
