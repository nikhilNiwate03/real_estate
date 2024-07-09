import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const route = express.Router();

route.get('/',getUsers);
route.get('/:id',verifyToken,getUser);
route.put('/:id',verifyToken,updateUser);
route.delete('/:id',verifyToken,deleteUser);

export default route;