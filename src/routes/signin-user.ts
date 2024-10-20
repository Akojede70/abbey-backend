import express, { Router } from 'express'
import  {  getUserConnections,} from '../controllers/signin-user-controller'

const router: Router = express.Router()

router.get('/users/:id/connection', getUserConnections)

export default router;


