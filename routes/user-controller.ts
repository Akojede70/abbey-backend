import express, { Router } from 'express'
import  {  getAllUsers, getUserById, unfollowUser, followUser} from '../controllers/user-controller'

const router: Router = express.Router()

router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.post('/users/follow', followUser)
router.delete('/users/unfollow', unfollowUser)

export default router;


