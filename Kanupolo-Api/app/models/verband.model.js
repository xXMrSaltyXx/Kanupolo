module.exports = (sequelize, Sequelize) => {
    const Verband = sequelize.define("verband", {
        name: {
            type: Sequelize.STRING
        },
    });

    Verband.associate = function(models) {
        Verband.hasMany(models.verein, {
            foreignKey: 'verbandId',
        });
    };
  
    return Verband;
};