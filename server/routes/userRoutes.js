import express from 'express'
import {getAllUsers, deleteUser} from "../controllers/userController.js"
import { protect } from "../middleware/protect.js"

const routes = express.Router()
routes.route('/all').get(protect, getAllUsers)
routes.route('/:id').delete(deleteUser)

export default routes