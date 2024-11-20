module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    User.associate = function(models) {
        User.belongsTo(models.role , {
            foreignKey: "roleId"
        });
        User.belongsTo(models.pass, {
            foreignKey: 'passId',
            allowNull: true
        });
    };
  
    return User;
  };