const router = require('express').Router()
const TeacherController = require('../controllers/TeacherController')

router.get('/', TeacherController.listAllTeacher)
router.get('/:id', TeacherController.courseForTeacher)
router.post('/', TeacherController.createTeacher)

module.exports = router