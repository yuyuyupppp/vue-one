const express=require('express');
const router=express.Router();
const pool=require('../pool');
router.post('/cdhzl',(req,res)=>{
    var rr=req.body;
    var sql='insert into dhzl set ?';
    pool.query(sql,[rr],(err,results)=>{
        if(err) throw err;
        if(results){
             res.send("1");
        }   
    })
})
router.get('/sdhzl',(req,res)=>{
    var sql="select * from dhzl";
    pool.query(sql,[],(err,results)=>{
       // console.log(results);
        if(results.length>0){
            res.send(results);
        }
    })
})
router.delete('/ddhzl/:id',(req,res)=>{
    // console.log(req.params);
    var id=req.params.id;
    var sql='delete from dhzl where id=?';
    pool.query(sql,[id],(err,results)=>{
        if(err) throw err;
       // console.log(results);
        if(results.affectedRows>0){
            res.send('1');
        }
    })
})
router.get('/xdhzl/:id',(req,res)=>{
    var id=req.params.id;
    var sql='select * from dhzl where id=?';
    pool.query(sql,[id],(err,results)=>{
        if(err) throw err;
        if(results){
            res.send(results);
        }
    })
})
router.put('/udhzl',(req,res)=>{
    var re=req.body;
   var sql='update dhzl set category=?,sort=? where id=?';
   pool.query(sql,[re.category,re.sort,re.id],(err,results)=>{
       if(err) throw err;
       if(results.affectedRows>0){
           res.send('1');
       }
   })  
})


router.post('/cwzad',(req,res)=>{
    var r=req.body;
    var sql='insert into dh set ?';
    pool.query(sql,[r],(err,results)=>{
        if(err) throw err;
        if(results){
            res.send('1');
        }
    })
})

//搜索网页列表
router.get('/swzlb',(req,res)=>{
    var sql='select * from dh';
    pool.query(sql,[],(err,results)=>{
        if(err) throw err;
        if(results){
            res.send(results);
        }
    })
})
/////////////////
router.get('/sw/:dhzl_id',(req,res)=>{
    var dhzl_id=req.params.dhzl_id;
    var sql='select * from dh where dhzl_id=?';
    pool.query(sql,[dhzl_id],(err,results)=>{
        if(err) throw err;
        if(results){
            res.send(results);
        }
    })
})
/////////////////
//搜索网页列表分页
router.get('/swzlbp/:page',(req,res)=>{
    //获取页数
    var page=parseInt(req.params.page);
    //控制每页显示记录
    var pagesize=10;
    //获取offset
    var offset=(page-1)*pagesize;
    //总页数
    var pagecount=0;
    var sql='select count(id) as count from dh';
    pool.query(sql,[],(err,results)=>{
        if(err) throw err;
        pagecount=Math.ceil(results[0].count/pagesize);
    });
    sql=` select dh.id,dhzl.category,dh.title,dh.wz,dh.sort from dh left join dhzl on dh.dhzl_id=dhzl.id limit ${offset},${pagesize}`;
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
//网页列表删除
router.delete('/dwzlb/:id',(req,res)=>{
    var id=req.params.id;
    var sql="delete from dh where id=?";
    pool.query(sql,[id],(err,results)=>{
        if(err) throw err;
        if(results.affectedRows>0){
            res.send('1');
        }
    })
})
//修改网址列表单独搜索
router.get('/xwzlb/:id',(req,res)=>{
    var id=req.params.id;
    var sql='select * from dh where id=?';
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        //console.log(result);
        res.send(result);
    })
})
//更新dh
router.put('/mwzlb',(req,res)=>{
    var title=req.body.title;
    var sort=req.body.sort;
    var wz=req.body.wz;
    var dhzl_id=req.body.dhzl_id;
    var id=req.body.id;
    var sql=`update dh set title=?,sort=?,wz=?,dhzl_id=? where id=?`;
    pool.query(sql,[title,sort,wz,dhzl_id,id],(err,results)=>{
        console.log(results);
        if(err) throw err;
        if(results.affectedRows>0){
            res.send('1');
        }
    });

})
module.exports=router;