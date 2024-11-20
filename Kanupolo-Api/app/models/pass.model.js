module.exports = (sequelize, Sequelize) => {
    const Pass = sequelize.define("pass", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        birthdate: {
            type: Sequelize.DATE
        },
        passNumber: {
            type: Sequelize.STRING
        },
        approvalDate: {
            type: Sequelize.DATE
        },
        joinDate: {
            type: Sequelize.DATE
        }
    });

    Pass.associate = function(models) {
        Pass.hasOne(models.user, {
            foreignKey: 'passId',
            allowNull: true
        });
        Pass.belongsTo(models.verein, {
            foreignKey: 'vereinId'
        });
    };
  
    return Pass;
};