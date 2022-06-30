// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

function validateActionId(req, res, next) {
  Actions.get(req.params.id)
    .then(action => {
      if (action) {
        req.action = action
        next()
      } else {
        res.status(404).json({ message: "Action not found" })
      }
    })
}

function validateActionInput(req, res, next) {
  const { description, notes, project_id } = req.body
  if (!description || !notes || !project_id) {
    res.status(400).json({message: "Description, Notes, and Project_Id are all required for posts :)"})
  } else {
    next()
  }
}

function validateProjectId(req, res, next) {
  const { project_id } = req.body
  Projects.get(project_id)
    .then(project => {
      if (!project) {
        res.status(400).json({message: "The project ID you included could not be found in the database"})
      } else {
        next()
      }
    })
}

function validateActionUpdate(req, res, next) {
  const { completed } = req.body
  if (completed === undefined) {
    res.status(400).json({message: "Completed status is required for updates"})
  } else {
    next()
  }
}


module.exports = { validateActionId, validateActionInput, validateProjectId, validateActionUpdate }