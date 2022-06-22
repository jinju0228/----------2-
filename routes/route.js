var express = require('express')
var expressLayouts = require('express-ejs-layouts');
var router = express.Router()

const {check, validationResult} = require('express-validator');

const db = require('../db');

router.use(expressLayouts)

router.get('/',(req, res) =>{
   res.render('main')

});

router.get('/introduction',(req, res) =>{
    res.render('introduction')
});
router.get('/get',(req, res) =>{
    res.render('get')
});


router.get('/notice',(req, res) =>{
    db.getAllNotice((rows) => {
        res.render('notice',{rows:rows})
    })

});
 router.get('/notice_contents',(req, res) =>{
    let id = req.query.noticeNumber;
        db.detailNoticeById(id,(row) => {
            if (typeof id == 'undefined' || row.length <= 0) {
                res.status(404).json({error:'undefined notice'});
            } else {
                res.render('notice_contents',{row:row[0]});
            }
    })
});
// router.get('/notice_contents',(req, res) =>{
//     let id = req.query.noticeNumber;
//     db.detailNoticeById(id,(row) => {
//         if (typeof id == 'undefined' || row.length <= 0) {
//             res.status(404).json({error:'undefined notice'});
//         } else {
//             res.render('notice_contents',{row:row[0]});
//         }
//     })
// });











router.get('/newNotice',(req,res)=>{
    res.render('newNotice')
})



router.post('/newNotice', 
    [check('noticeTitle').isLength({min:1, max:150})],
    function(req, res, next) {
        let errs = validationResult(req);
        console.log(errs);
        if (errs['errors'].length>0) {
            res.render('newNotice', {errs:errs['errors']});
        } else{
            let param = JSON.parse(JSON.stringify(req.body));
            let writter = param['noticeWritter'];
            let password =param['noticePassword'];
            let title = param['noticeTitle'];
            let content = param['noticeContent'];
            db.insertNotice(writter,password,title,content,() => {
                res.redirect('/notice');
            });
        }
            });




router.get('/updateNotice',(req, res) =>{
    let id = req.query.noticeNumber;
    db.getNoticeById(id,(row) => {
        if (typeof id == 'undefined' || row.length <= 0) {
            res.status(404).json({error:'undefined notice'});
        } else {
            res.render('updateNotice',{row:row[0]});
        }
    })
});
router.post('/updateNotice',
    [check('noticeTitle').isLength({min:1, max:150})],
    (req,res) => {
        let errs = validationResult(req);
        let param = JSON.parse(JSON.stringify(req.body));
        let id = param['noticeNumber'];
        let title = param['noticeTitle'];
        let content = param['noticeContent'];
        if(errs['errors'].length > 0) {
            db.getNoticeById(id, (row) => {
                res.render('updateNotice', {row:row[0], errs:errs['errors']})
            })
        } else {
            db.updateNoticeById(id, title, content, () => {
                res.redirect('/notice');
            })
        }
    });

router.get('/deleteNotice',(req,res) =>{
    let id = req.query.noticeNumber;
    db.deleteNoticeById(id,()=>{
        res.redirect('/notice');
    });
});


router.get('/login',(req, res) =>{
    res.render('login')
});
router.get('/join',(req, res) =>{
    res.render('join')
});
router.get('/m_menu',(req, res) =>{
    res.render('m_menu')
});








module.exports = router
