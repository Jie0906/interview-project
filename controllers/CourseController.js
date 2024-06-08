//需求：課程列表需有講師基本資訊、建立新課程、更新課程內容、刪除課程
const { where } = require('sequelize')
const db = require('../models') 
const Course = db.Course
const Teacher = db.Teacher

class CourseController  {

    courseList = async (req, res, next ) => {
        try {
          const data = await Course.findAll({
            include: [{
              model: Teacher,
              attributes: ['name', 'email'] 
            }],
            attributes: ['title', 'tag', 'content', 'startTime', 'endTime']
          })
            return res.status(200).json(data)
        }
        catch (error) {
            next(error)
        }
    }
    createCourse = async (req, res, next) => {
        try{
            const { title, tag, content, startTime, endTime, teacherId} = req.body
            if (!title || !tag || !content || !startTime || !endTime || !teacherId){
                const error = new Error('Field cannot be empty.')
                error.status = 400
                throw error
            }
            const checkTeacherExist = await Teacher.findOne({
                where:{
                    id : teacherId
                }
            })
            if (!checkTeacherExist){
                const error = new Error('Teacher did not Exist, please check again.')
                error.status = 404
                throw error
            }
            let infor = {
                title,
                tag,
                content,
                startTime,
                endTime,
                teacherId
            }
            await Course.create(infor)
            return res.status(201).json({
                message : `Added new course ${title} successfully!`
            })
        }
        catch (error) {
            next(error)
        }
    }

    updateCourse = async (req, res, next) => {
        try{
            const { title, tag, content, startTime, endTime, teacherId} = req.body
            const checkCourseExist = await Course.findOne({
                where: { id: req.params.id }
            })
            if (!checkCourseExist){
                const error = new Error('Course did not exist.')
                error.status = 404
                throw error
            }
            const checkTeacherExist = await Teacher.findOne({
                where:{
                    id : teacherId
                }
            })
            if (!checkTeacherExist){
                const error = new Error('Teacher did not Exist, please check again.')
                error.status = 404
                throw error
            }
            let infor = {
                title,
                tag,
                content,
                startTime,
                endTime,
                teacherId
            }
            await Course.update(infor, {where: {id : req.params.id}})
            return res.status(200).json({
                message: "Updated sucessfully!"
            })
        }
        catch (error) {
            next(error)
        }
    }

    deleteCourse = async (req, res, next) => {
        try{
            const checkCourseExist = await Course.findOne({
                where: { id: req.params.id }
            })
            if (!checkCourseExist){
                const error = new Error('Course did not exist.')
                error.status = 404
                throw error
            }
            await Course.destroy({ where: { id: req.params.id } })
            return res.status(204).json({
                message: `Deleted ${checkCourseExist.title} Sucessfully!`
            })
        }   
        catch (error) {
            next(error)
        }
    }
}

module.exports = new CourseController()