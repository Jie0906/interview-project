//需求：建立新講師、授課教師列表、授課教師所開課程
const { where } = require('sequelize')
const db = require('../models')
const { Op } = require('@sequelize/core')
const Teacher = db.Teacher
const Course = db.Course

class TeacherController {
    createTeacher = async (req, res, next) => {
        try{
            const {name, email} = req.body
            if (!name || !email){
                const error = new Error('Field cannot be empty.')
                error.status = 400
                throw error
            }
            const checkTeacherExist = await Teacher.findOne({
                where: {
                    [Op.or]: [
                        { name: name },
                        { email: email },
                    ]
                }
            })
            if (checkTeacherExist){
                const error = new Error('Teacher had been created.')
                error.status = 409
                throw error
            }
            let infor = {
                name: name,
                email: email
            }
            await Teacher.create(infor)
            return res.status(201).json({
                message: `Created ${name} successfully!`
            })
        }
        catch (error) {
            next(error)
        }
    }

    listAllTeacher = async (req, res, next) => {
        try{
            const teacherList = await Teacher.findAll({raw: true})
            return res.status(200).json({data: teacherList})
        }
        catch (error) {
            next(error)
        }
    }

    courseForTeacher = async (req, res, next) => {
        try {
            const teacherCourse = await Teacher.findOne({
                include: [{model: Course}],
                attributes: ['name', 'email'],
                where: {id : req.params.id}
            })
            if (!teacherCourse) {
                const error = new Error('Teacher did not exist.')
                error.status = 404
                throw error
              }
            return res.status(200).json(teacherCourse)
        }
        catch (error) {
            next(error)
        }
    }
}
    


module.exports = new TeacherController()