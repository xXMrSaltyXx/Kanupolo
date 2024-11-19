module.exports = (sequelize, Sequelize) => {
    const Verein = sequelize.define("verein", {
        name: {
            type: Sequelize.STRING
        },
        vereinCode: {
            type: Sequelize.STRING
        }
    });

    Verein.associate = function(models) {
        Verein.hasMany(models.pass, {
            foreignKey: 'vereinId',
        });
        Verein.belongsTo(models.verband, {
            foreignKey: 'verbandId'
        });
    };
  
    return Verein;
};