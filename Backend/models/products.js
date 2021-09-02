const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    inc_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    mrp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_address: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products',
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
