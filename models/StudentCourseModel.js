module.exports = (sequelize, DataTypes) =>{
    const StudentCourse = sequelize.define('StudentCourse', {
    },{
        paranoid: true,
    });
    return StudentCourse
};