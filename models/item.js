module.exports = function(sequelize, DataTypes) {
    var Job = sequelize.define("Job", {
        date_applied: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }, 
        company: {
             type: DataTypes.STRING,
             allowNull: false,
             validate: {
                 notEmpty: true
             }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        id_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        posted_from: {
            type: DataTypes.STRING,
            allowNull: true
        },
        interest_level: {
            type: DataTypes.DECIMAL
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status_response: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    },
    //JOBS TO USERS ASSOCIATION - Each Job belongs to one User
        { 
            classMethods: {
                associate: function(models) {
                    Job.belongsTo(models.User, {
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        }
    );
    return Job;
};
