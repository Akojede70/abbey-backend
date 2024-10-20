import 'dotenv/config'
import 'express-async-errors'
import authRouter from './routes/auth'
import signInUser from './routes/signin-user'
import userController from './routes/user-controller'


// extra security package
// import helmet from 'helmet'
// import cors from 'cors';
// import rateLimiter from 'express-rate-limit'
import express, { Request, Response, NextFunction } from 'express'; 


const app = express()

import notFoundMiddleware from './middleware/not-found'
import errorHandler from './middleware/error-handler';


// app.set ('trust proxy', 1);
// app.use(
//     rateLimiter({
//         windowMs: 15 * 60 * 1000, // 15 minutes
//         max: 100, // limit each IP to 100 requests per windowMS
//     })
// )

// security
app.use(express.json())
// app.use(helmet())
// app.use(cors())


// routes
app.use('/api/v1/auth', authRouter )
app.use('/api/v1/', signInUser )
app.use('/api/v1/', userController )
app.use(errorHandler)
// error handler
app.use(notFoundMiddleware)


const port = process.env.PORT || 5000;



    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  




