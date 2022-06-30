// Write your "projects" router here!
//Setup router:
const express = require('express')
const router = express.Router()

//Import projects model:
const Projects = require('./projects-model')

//import middleware
const { validateProjectId, validateProjectInput, validateProjectUpdate } = require('./projects-middleware')

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => res.json(projects))
    .catch(err => next({}))
})

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project)
})

router.post('/', validateProjectInput, (req, res, next) => {
  Projects.insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(err => next({}))
})  

router.put('/:id', validateProjectId, validateProjectInput, validateProjectUpdate, (req, res, next) => {
  const id  = req.params.id
  const changes = req.body
  Projects.update(id, changes)
    .then(newProject => res.json(newProject))
    .catch(err => next({}))
})

router.delete('/:id', validateProjectId, (req, res, next) => {
  const id = req.params.id
  Projects.remove(id)
    .then((numOfRecords) => res.end())
    .catch(err => next({}))
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
  const projectId = req.params.id
  Projects.getProjectActions(projectId)
    .then(actions => res.json(actions))
    .catch(err => next({}))
})

module.exports = router