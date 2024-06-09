![Express Version](https://img.shields.io/badge/Express-4.19.2-green.svg)
![Sequelize Version](https://img.shields.io/badge/Sequelize-%5E6.15.0-yellow.svg)

## Description

This course selection system is for 三宏科技 interview. 

## Data Structure
```plaintext
.
├── app.js
├── config
│   └── jest.config.js
├── controllers
│   ├── CourseController.js
│   ├── StudentController.js
│   └── TeacherController.js
├── middleware
│   └── errorHandler.js
├── models
│   ├── CourseModel.js
│   ├── StudentCourseModel.js
│   ├── StudentModel.js
│   ├── TeacherModel.js
│   ├── TeacherStudentModel.js
│   └── index.js
├── package-lock.json
├── package.json
├── routes
│   ├── courseRoute.js
│   └── teacherRoute.js
├── server.js
├── structure.txt
├── swagger.yml
├── tests
│   └── teacherController.test.js
└── utils
```
## Installing & Usage
### .env Settings
#### Sequelize Connection 
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_DB`

### Download the Project

```git clone https://github.com/Jie0906/interview-project.git```

### Install Dependencies

```npm install```


### Run on Localhost

```npm run dev```
