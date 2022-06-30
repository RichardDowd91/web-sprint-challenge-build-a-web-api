// Write your "actions" router here!
//Setup router:
const express = require('express')
const router = express.Router()

//Import actions model:
const Actions = require('./actions-model')
const { validateActionId, validateActionInput, validateProjectId, validateActionUpdate } = require('./actions-middlware')

router.get('/', async (req, res, next) => {
  const actions = await Actions.get()
  try {
    res.json(actions)
  } catch (error) {
    next({})
  }
})

router.get('/:id', validateActionId, async (req, res, next) => {
  const { id } = req.params
  const action = await Actions.get(id)

  try {
    res.json(action)
  } catch (error) {
    next({})
  }
})

router.post('/', validateActionInput, validateProjectId, async (req, res, next) => {
  const { notes, description, project_id } = req.body
  const newActionReq = { description, notes, project_id }

  const newActionRec = await Actions.insert(newActionReq)
  try {
    res.json(newActionRec)
  } catch (error) {
    next({})
  }
})

router.put('/:id', validateActionId, validateActionInput, validateActionUpdate, async (req, res, next) => {
  const actionId = req.params.id
  const { notes, description, project_id, completed } = req.body
  const newActionReq = { notes, description, project_id, completed }
  
  const newActionRec = await Actions.update(actionId, newActionReq)
  try {
    res.json(newActionRec)
  } catch (error) {
    next({})
  }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
  const id = req.params.id

  await Actions.remove(id)
  try {
    res.end()
  } catch (error) {
    next({})
  }
})

module.exports = router