
// add middlewares here related to projects
const Projects = require('./projects-model')

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project
        next()
      } else {
        res.status(404).json({ message: "Project not found"})
      }
    })
    .catch(err => next({}))
}

function validateProjectInput(req, res, next) {
  const { name, description } = req.body
  if (!name || !description) {
    res.status(400).json({ message: "Name and description field are both required, please include!" })
  } else {
    next()
  }
}

function validateProjectUpdate(req, res, next) {
  const { completed } = req.body
  if (completed === undefined ) {
    res.status(400).json({ message: "Completed status is required!"})
  } else {
    next()
  }
}

module.exports = { validateProjectId, validateProjectInput, validateProjectUpdate }