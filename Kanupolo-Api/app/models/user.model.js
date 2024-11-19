module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        email: {
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
            foreignKey: 'passId'
        });
    };
  
    return User;
  };