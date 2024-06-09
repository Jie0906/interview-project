const request = require('supertest')
const express = require('express')
const TeacherController = require('../controllers/TeacherController')
const db = require('../models')
const { errorHandler, notFoundHandler } = require('../middleware/errorHandler')

jest.mock('../models')
const app = express()
app.use(express.json())
app.post('/api/teacher', TeacherController.createTeacher)
app.get('/api/teacher', TeacherController.listAllTeacher)
app.get('/api/teacher/:id', TeacherController.courseForTeacher)

app.use(notFoundHandler)
app.use(errorHandler)

describe('TeacherController', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createTeacher', () => {
    it('should create a teacher successfully', async () => {
      const mockReqBody = { name: 'Lee', email: 'lee123@gmail.com' }
      db.Teacher.findOne.mockResolvedValue(null)
      db.Teacher.create.mockResolvedValue(mockReqBody)

      const res = await request(app)
        .post('/api/teacher')
        .send(mockReqBody)

      expect(res.status).toBe(201)
      expect(res.body).toEqual({
        message:`Created Lee successfully!`
        })
    })

    it('should return 400 if fields are empty', async () => {
      const res = await request(app)
        .post('/api/teacher')
        .send({ name: '', email: '' })
      expect(res.status).toBe(400)
      expect(res.body.error.message).toBe('Field cannot be empty.');
    })

    it('should return 409 if teacher already exists', async () => {
      db.Teacher.findOne.mockResolvedValue({ name: 'Lee', email: 'lee123@gmail.com' })

      const res = await request(app)
        .post('/api/teacher')
        .send({ name: 'Lee', email: 'lee123@gmail.com' })

      expect(res.status).toBe(409)
      expect(res.body.error.message).toBe('Teacher had been created.')
    })
  })

  describe('listAllTeacher', () => {
    it('should list all teachers', async () => {
      const mockTeacherList = [
        { name: 'Lee', email: 'lee123@gmail.com' },
        { name: 'Chen', email: 'chen123@gmail.com' }
      ]
      db.Teacher.findAll.mockResolvedValue(mockTeacherList)

      const res = await request(app)
        .get('/api/teacher')

      expect(res.status).toBe(200)
      expect(res.body.data).toEqual(mockTeacherList)
      expect(db.Teacher.findAll).toHaveBeenCalledTimes(1)
    })
  })

  describe('courseForTeacher', () => {
    it('should return teacher with courses', async () => {
      const mockTeacherCourse = { name: 'Lee', email: 'lee123@gmail.com', Courses: [] }
      db.Teacher.findOne.mockResolvedValue(mockTeacherCourse)

      const res = await request(app)
        .get('/api/teacher/1')

      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockTeacherCourse)
      expect(db.Teacher.findOne).toHaveBeenCalledTimes(1)
    })

    it('should return 404 if teacher does not exist', async () => {
      db.Teacher.findOne.mockResolvedValue(null)

      const res = await request(app)
        .get('/api/teacher/1')

      expect(res.status).toBe(404)
      expect(res.body.error.message).toBe('Teacher did not exist.')
    })
  })
})
