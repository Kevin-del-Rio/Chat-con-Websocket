import express from "express";

const router = express.Router()


router.get('/', (req, res)=>{
    res.render('index', {})
});
router.get('/message', (req, res)=>{
    res.render('message')
});

export default router;