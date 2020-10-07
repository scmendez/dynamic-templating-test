//https://github.com/scmendez/dynamic-templating-test

require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const app = express();

let students = require("./exam-info.js");

hbs.registerPartials(__dirname + "/views/partials")

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

// 1: in the home,list all the students who took the exam (list all the students)

app.get("/", (req, res) => {
  res.render("full-list.hbs", {
    students
  })
})

// 2: in the '/results' list all the students who passed the test and their score.
// Also, students should be in descending order based on their score.

app.get('/results', (req, res) => {
  students = students.filter((student) => {
    return student.score > 8.0
  })

  students.sort((a, b) => {
    if (a.score > b.score) {
      return -1
    } else if (a.score < b.score) {
      return 1
    } else {
      return 0
    }
  })

  res.render("results.hbs", {
    students
  })
})

app.listen(process.env.PORT, () =>
  console.log(`App running on ${process.env.PORT}.`)
);