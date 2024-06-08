require('dotenv').config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
    timezone: '+08:00',
    logging: false,
})
const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize

db.Teacher = require("./TeacherModel")(sequelize, Sequelize)
db.Student = require("./StudentModel")(sequelize, Sequelize)
db.Course = require("./CourseModel")(sequelize, Sequelize)
db.TeacherStudent = require("./TeacherStudentModel")(sequelize, Sequelize)
db.StudentCourse = require("./StudentCourseModel")(sequelize, Sequelize)

db.Teacher.hasMany(db.Course, { foreignKey: 'teacherId' });
db.Course.belongsTo(db.Teacher, { foreignKey: 'teacherId' });

db.Teacher.belongsToMany(db.Student, { through: db.TeacherStudent, foreignKey: 'teacherId' });
db.Student.belongsToMany(db.Teacher, { through: db.TeacherStudent, foreignKey: 'studentId' });
db.Student.belongsToMany(db.Course, { through: db.StudentCourse, foreignKey: 'studentId' });
db.Course.belongsToMany(db.Student, { through: db.StudentCourse, foreignKey: 'courseId' });



module.exports = db;