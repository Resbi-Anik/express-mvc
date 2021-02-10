const express = require("express");

const app = express();

const port = 3000;

app.use(express.json());

let courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  let courseResult = courses.find((obj) => obj.id === parseInt(req.params.id));

  if (!courseResult) {
    res.status(404).send("not found");
  } else {
    res.send(courseResult);
  }
});

app.post("/api/courses", (req, res) => {
  let postCourseResult = {
    id: 4,
    name: req.body.name,
  };
  courses.push(postCourseResult);

  if (postCourseResult) {
    res.send("success");
  }
});

app.put("/api/courses/:id", (req, res) => {
  let searchUpdateCourse = courses.find(
    (obj) => obj.id === parseInt(req.params.id)
  );
  searchUpdateCourse.name = req.body.name;
});

app.delete("/api/courses/:id", (req, res) => {
  let removeCourse = courses.filter(
    (obj) => obj.id !== parseInt(req.params.id)
  );
  courses = removeCourse;
});

app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});