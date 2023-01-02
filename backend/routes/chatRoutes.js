const express=require('express');
const {accessChat,fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup}=require('../controllers/chatControllers');
const {protect}=require('../middleware/authMiddleware');

const router=express.Router();

router.route('/').post(protect,accessChat);
router.route('/').post(protect,fetchChats);
router.route('/group').post(protect,createGroupChat);
// router.route('/rename').post(protect,renameGroup);
// router.route('/groupremove').post(protect,removeFromGroup);
// router.route('/groupadd').post(protect, addToGroup);

module.exports =router;