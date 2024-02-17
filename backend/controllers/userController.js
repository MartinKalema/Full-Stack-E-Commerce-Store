import User from '../models/userModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createUser = asyncHandler(async (req, res) =>{
    res.send("hello");
})

export { createUser } ;