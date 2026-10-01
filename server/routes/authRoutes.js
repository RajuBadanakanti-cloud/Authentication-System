import express from 'express'
import {login, logout, signUp } from '../controllers/authController.js'

const routes = express.Router()
routes.route('/signup').post(signUp)
routes.route('/login').post(login)

routes.route('/logout').post(logout) // logout

export default routes