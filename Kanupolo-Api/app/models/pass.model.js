module.exports = (sequelize, Sequelize) => {
    const Pass = sequelize.define("pass", {
        
    });

    Pass.associate = function(models) {
        Pass.hasOne(models.user, {
            foreignKey: 'passId',
        });
    };
  
    return Pass;
};