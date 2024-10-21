import express, { Router } from 'express'
import  {  getUserConnections,} from '../controllers/signin-user-controller'
import  unauthenticatedError   from "../middleware/unauthentication"

const router: Router = express.Router()

router.get('/users/:userId/connection', unauthenticatedError, getUserConnections)

export default router;


