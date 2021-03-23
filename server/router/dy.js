const express=require('express');
const router=express.Router();
const pool=require('../pool');
const md5=require('md5');
const multer=require('multer');
const uuid=require('uuid');
const fs=require('fs');

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        var path='../qt/src/assets/img';
        if(!fs.existsSync(path)){
            fs.mkdirSync(path,(err)=>{
                if(err) throw err;
            })
        }
        cb(null,path);
    },
    filename:function(req,file,cb){
        var origin=file.originalname;
        var extension=origin.substr(origin.lastIndexOf('.')+1);
        extension=extension.toLocaleLowerCase();
        var main=uuid.v1();
        filename=main+'.'+extension;
        cb(null,filename);
    }
});
upload=multer({storage:storage});
router.post('/cmovie',upload.array('jjpg'),(req,res)=>{
   var title=req.body.title;
   var pingfen=req.body.pingfen;
   var jieshao=req.body.jieshao;
   var mag=req.body.mag;
   var jjpg=req.files[0].filename;
   console.log(title,pingfen,jieshao,mag,jjpg);
   var sql='insert into dytj(title,jjpg,pingfen,jieshao,mag)values(?,?,?,?,?)';
   pool.query(sql,[title,jjpg,pingfen,jieshao,mag],(err,results)=>{
       if(err) throw err;
       if(results){
           res.send('1');
       }
   })
})
// router.get('/lmovie',(req,res)=>{
//     var sql='select id,title,jjpg,pingfen,mag,jieshao from dytj';
//     pool.query(sql,[],(err,results)=>{
//         if(err) throw err;
//         if(results.length>0){
//             res.send(results);
//         }
//     })
// })
/////////////电影分页
router.get('/lmovie/:page',(req,res)=>{
    var page=parseInt(req.params.page);
    var pagesize=5;
    var offset=(page-1)*pagesize;
    var pagecount=0;
    var sql='select count(id) as count from dytj';
    pool.query(sql,[],(err,results)=>{
        if(err) throw err;
        pagecount=Math.ceil(results[0].count/pagesize);
    })
    var sql=`select * from dytj limit ${offset},${pagesize}`;
    pool.query(sql,[],(err,results)=>{
        if(err) throw err;
        if(results.length>0){
            res.send({
                message:'yes',
                code:1,
                results:results,
                pagecount:pagecount
            });
        }
    })
})
////////搜索电影单个
router.get('/xmovie/:id',(req,res)=>{
    var sql='select * from dytj where id=?';
    pool.query(sql,[req.params.id],(err,results)=>{
        if(err) throw err;
        //console.log(results);
        if(results.length>0){
            res.send(results);
        }
    })
})
///////////
router.delete('/dlmovie/:id',(req,res)=>{
    var id=req.params.id;
    var sql="delete from dytj where id=?";
    pool.query(sql,[id],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows>0){
            res.send('1');
        }
    })

})
//////笔记
router.post('/biji',(req,res)=>{
    //console.log(req.body);
    var sql='insert into xxbj set ?';
    pool.query(sql,[req.body],(err,results)=>{
        if(err) throw err;
        if(results){
            res.send('1');
        }
    })
})
router.get('/bjlb',(req,res)=>{
   var sql='select * from xxbj';
   pool.query(sql,[],(err,results)=>{
       if(err) throw err;
       if(results){
           res.send(results);
       }
   })
})
/////前台搜索笔记
///
router.get('/bjlb/:page',(req,res)=>{
    //获取页数
    var page=parseInt(req.params.page);
    //控制每页显示记录
    var pagesize=5;
    //获取offset
    var offset=(page-1)*pagesize;
    //总页数
    var pagecount=0;
    var sql='select count(id) as count from xxbj';
    pool.query(sql,[],(err,results)=>{
        if(err) throw err;
        pagecount=Math.ceil(results[0].count/pagesize);
    })
    var sql=`select * from xxbj limit ${offset},${pagesize}`;
    pool.query(sql,[],(err,results)=>{
        if(err) throw err;
       res.send({
           message:'查询成功',
           code:1,
           results:results,
           pagecount:pagecount
       })
    })
 })
 ///
/////前台搜索笔记
router.delete('/dbjlb/:id',(req,res)=>{
    var id=req.params.id;
    var sql="delete from xxbj where id=?";
    pool.query(sql,[id],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows>0){
            res.send('1');
        }
    })
})
///////////////笔记
router.post('/register',(req,res)=>{
    console.log(req.body);
    var username=req.body.username;
    var password=md5(req.body.password);
    var sql='select count(id) as count from user where username=?';
    console.log(sql);
    pool.query(sql,[username],(err,results)=>{
        if(err) throw err;
        console.log(results);
        if(results[0].count==1){
            res.send('0');
        }else{
            var sql='insert into user(username,password)values(?,?)';
            pool.query(sql,[username,password],(err,results)=>{
                if(err) throw err;
                res.send("1");
            })
        }
    })
})
router.post('/login',(req,res)=>{
    var username=req.body.username;
    var password=md5(req.body.password);
    var sql="select id,username from user where username=? and password=?";
    pool.query(sql,[username,password],(err,results)=>{
        if(err) throw err;
        if(results.length==0){
            res.send({code:0});
        }else{
            res.send({code:1,id:results[0].id,username:results[0].username});
        }
    })
})
//前台注册登录
router.post('/reg',(req,res)=>{
    console.log(req.body);
    var username=req.body.username;
    var password=md5(req.body.password);
    var sql='select count(id) as count from us where username=?';
    console.log(sql);
    pool.query(sql,[username],(err,results)=>{
        if(err) throw err;
        console.log(results);
        if(results[0].count==1){
            res.send('0');
        }else{
            var sql='insert into us(username,password)values(?,?)';
            pool.query(sql,[username,password],(err,results)=>{
                if(err) throw err;
                res.send("1");
            })
        }
    })
})
router.post('/log',(req,res)=>{
    var username=req.body.username;
    var password=md5(req.body.password);
    var sql="select id,username from us where username=? and password=?";
    pool.query(sql,[username,password],(err,results)=>{
        if(err) throw err;
        if(results.length==0){
            res.send({code:0});
        }else{
            res.send({code:1,id:results[0].id,username:results[0].username});
        }
    })
})
module.exports=router;