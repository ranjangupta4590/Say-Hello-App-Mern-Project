const express=require('express');
const {accesschat}=require('../controllers/chatControllers');
const {protect}=require('../middleware/authMiddleware');

const router=express.Router();

router.route('/').post(protect,accesschat);
// router.route('/').post(protect,fetchchat);
// router.route('/group').post(protect,createGroupchat);
// router.route('/rename').post(protect,renameGroup);
// router.route('/groupremove').post(protect,removeFromGroup);
// router.route('/groupadd').post(protect, addToGroup);

module.exports =router;