const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop_active_orders', {
    inc_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    product_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    image_address: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    quantity: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    active_order: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'shop_active_orders',
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
        name: "inc_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "inc_id" },
        ]
      },
    ]
  });
};
