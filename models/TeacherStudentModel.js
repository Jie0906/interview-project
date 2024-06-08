module.exports = (sequelize, DataTypes) =>{
    const TeacherStudent = sequelize.define('TeacherStudent', {
    },{
        paranoid: true,
    });
    return TeacherStudent
};