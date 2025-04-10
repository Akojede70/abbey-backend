import 'dotenv/config'
import 'express-async-errors'
import authRouter from './routes/auth'
import signInUser from './routes/signin-user'
import userController from './routes/user-controller'

// extra security package
import helmet from 'helmet'
import cors from 'cors';
import rateLimiter from 'express-rate-limit'
import express, { Request, Response, NextFunction } from 'express'; 


const app = express()


import notFoundMiddleware from './middleware/not-found'
import errorHandler from './middleware/error-handler';



app.set ('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMS
    })
)

// const corsOptions = {
//   origin: [
//     'http://localhost:3000', // For local development
//     'https://abbey-backend-1.onrender.com', // Your backend URL
//     'https://abbey-screening.netlify.app', // Your deployed frontend URL
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
//   allowedHeaders: ['Content-Type', 'Authorization'], 
//   credentials: true,  // cookies and HTTP authentication information (like headers with credentials) to be sent along with requests from your front-end to your back-end server.
// };
app.use(express.json())
app.use(helmet())
// app.use(cors(corsOptions));

// error handler

// routes
app.use('/api/v1/auth', authRouter )
app.use('/api/v1/', signInUser )
app.use('/api/v1/', userController )

// error
app.use(errorHandler)

app.use(notFoundMiddleware)


const port = process.env.PORT || 4000;

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  




