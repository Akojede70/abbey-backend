"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("express-async-errors");
const auth_1 = __importDefault(require("./routes/auth"));
const signin_user_1 = __importDefault(require("./routes/signin-user"));
const user_controller_1 = __importDefault(require("./routes/user-controller"));
const database_1 = require("./db/database");
// extra security package
// import helmet from 'helmet'
// import cors from 'cors';
// import rateLimiter from 'express-rate-limit'
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
(0, database_1.connectDB)();
// app.set ('trust proxy', 1);
// app.use(
//     rateLimiter({
//         windowMs: 15 * 60 * 1000, // 15 minutes
//         max: 100, // limit each IP to 100 requests per windowMS
//     })
// )
// security
app.use(express_1.default.json());
// app.use(helmet())
// app.use(cors())
// routes
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/', signin_user_1.default);
app.use('/api/v1/', user_controller_1.default);
app.use(error_handler_1.default); 
// error handler
app.use(not_found_1.default);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
