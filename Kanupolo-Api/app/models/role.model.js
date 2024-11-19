module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        name: {
            type: Sequelize.STRING
        }
    });

    Role.associate = function(models) {
        Role.hasMany(models.user, {
            foreignKey: "roleId"
        });
    };
  
    return Role;
  };