const express=require('express');
const {accesschat,fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup}=require('../controllers/chatControllers');
const {protect}=require('../middleware/authMiddleware');

const router=express.Router();

router.route('/').post(protect,accesschat);
router.route('/').post(protect,fetchChats);
// router.route('/group').post(protect,createGroupchat);
// router.route('/rename').post(protect,renameGroup);
// router.route('/groupremove').post(protect,removeFromGroup);
// router.route('/groupadd').post(protect, addToGroup);

module.exports =router;