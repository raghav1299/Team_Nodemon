const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('products', {
    inc_id: {
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
      type: DataTypes.STRING(2048),
      allowNull: true
    },
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ratings: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tags_string: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
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
      {
        name: "tags_idx",
        using: "BTREE",
        fields: [
          { name: "tags" },
        ]
      },
      {
        name: "tag_idx",
        using: "BTREE",
        fields: [
          { name: "tags_string" },
        ]
      },
    ]
  });
};
