const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send(courses);
});
// ////////////////GET REQUEST//////////////////////////////
app.get("/apis/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course with the given ID not found");
  res.send(course);
});
// ////////////////////POST REQUEST////////////////////////////////////
app.post("/apis/courses/", (req, res) => {
  // const result = validateCourse(req.body);
  // object destruture
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
//  ///////////////////////////GET REQUEST////////////////////////////////////
app.put("/apis/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("course with given ID not found");

  // const schema = {
  //     name : Joi.string().min(3).required()
  // };
  // const result = schema.validate(req.body);
  // if(result.error){
  //     res.status(400).send(result.error.details[0].message);
  //     return;
  // }
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});
//  ////////////////////////////DELETE REQUEST///////////////////////////////////

app.delete("/apis/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(400).send("course with given ID not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});
// //////////////VALIDATION FUNCTION/////////////////
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
