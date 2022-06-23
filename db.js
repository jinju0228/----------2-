
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'us-cdbr-east-05.cleardb.net',
  user     : 'b6b9a9c526d46f',
  password : '1bf1aaf1',
  port : '3306',
  database : 'heroku_e7eaa8c667b2543',
  dateStrings:'datetime'
});
 

function getAllNotice(callback) {
    connection.query('SELECT noticeNumber,noticeTitle,noticeWritter,noticeCreateDate FROM noticeList ORDER BY noticeNumber DESC',
    (err, rows, fields) =>{
        if(err) throw err;
        callback(rows);
    })
}

 function insertNotice(noticeWritter,noticePassword,noticeTitle,noticeContent,callback){
     connection.query(`INSERT INTO noticelist(noticeWritter,noticePassword,noticeTitle,noticeContent,noticeCreateDate) VALUES
     ('${noticeWritter}','${noticePassword}','${noticeTitle}','${noticeContent}',NOW())`,(err,result) =>{
         if(err) throw err;
         callback();
     })
 }

 function getNoticeById(noticeNumber, callback){
     connection.query(`SELECT * FROM noticelist WHERE noticeNumber = '${noticeNumber}'`,
     (err, row, fields)=>{
         if(err) throw err;
         callback(row); 
     })
 }

 function updateNoticeById(noticeNumber,noticeTitle, noticeContent, callback){
     connection.query(`UPDATE noticelist SET noticeTitle = '${noticeTitle}', noticeContent ='${noticeContent}' WHERE
      noticeNumber = ${noticeNumber}`,(err, result) =>{
         if(err) throw err;
         callback();
      })
 }

 function deleteNoticeById(noticeNumber, callback){
     connection.query(`DELETE FROM noticelist WHERE noticeNumber = ${noticeNumber}`,
     (err, result) =>{
         if(err) throw err;
         callback();
     });
 }
  function detailNoticeById(noticeNumber,callback){
     connection.query(`SELECT * FROM noticelist WHERE noticeNumber = ${noticeNumber}`,(err, row, fields) =>{
         if(err) throw err;
         callback(row);
     })
 }



// function detailNoticeById(noticeNumber, callback){
//     connection.query(`SELECT * FROM noticelist WHERE noticeNumber = '${noticeNumber}'`,
//     (err, row, fields)=>{
//         if(err) throw err;
//         callback(row); 
//     })noticeTitle,noticeWritter,noticeCreateDate,noticeContent, noticeNumber FROM noticelist

// }






module.exports = {
     getAllNotice,
     insertNotice, 
     getNoticeById,
     updateNoticeById,
     deleteNoticeById,
     detailNoticeById
};
