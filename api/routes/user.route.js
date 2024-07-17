import express from 'express';
import { deleteUser, getUser, getUsers, savePost, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const route = express.Router();

route.get('/',getUsers);
route.get('/:id',verifyToken,getUser);
route.put('/:id',verifyToken,updateUser);
route.delete('/:id',verifyToken,deleteUser);
route.post('/save',verifyToken,savePost);


export default route;