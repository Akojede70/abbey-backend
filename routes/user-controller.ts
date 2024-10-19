import express, { Router } from 'express'
import  {  getAllUsers, getUserById,} from '../controllers/user-controller'

const router: Router = express.Router()

router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)

export default router;


