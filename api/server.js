const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

//Import routers/middleware:
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')
const { logger, errorHandler } = require('./global-middleware')

//JSON parsing:
server.use(express.json())

//Log every API request:
server.use(logger)

//Route to appropriate router based on endpoint:
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

//Handle errors:
server.use(errorHandler)

module.exports = server;