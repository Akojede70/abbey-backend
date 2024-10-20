import express, { Router } from 'express'
import  {  getAllUsers, getUserById, unfollowUser, followUser} from '../controllers/user-controller'
import  unauthenticatedError   from "../middleware/unauthentication"

const router: Router = express.Router()

router.get('/users', unauthenticatedError, getAllUsers)
router.get('/users/:id', unauthenticatedError, getUserById)
router.post('/users/follow', unauthenticatedError, followUser)
router.delete('/users/unfollow', unauthenticatedError, unfollowUser)

export default router;


