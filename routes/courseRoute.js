const router = require('express').Router()
const CourseController = require('../controllers/CourseController')

router.get('/', CourseController.courseList)
router.post('/', CourseController.createCourse)
router.put('/:id', CourseController.updateCourse)
router.delete('/:id', CourseController.deleteCourse)




module.exports = router