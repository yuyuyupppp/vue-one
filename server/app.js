const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const wzRouter=require('./router/wz');
const dyRouter=require('./router/dy');
const app=express();
app.listen(4000);
app.use(express.static('../xm/src/assets/images'));
app.use(bodyParser.urlencoded(
    {extended:false}
))
app.use(cors({
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://196.168.1.3:8080','http://127.0.0.1:8081']
}))
app.use('/wz',wzRouter);
app.use('/dy',dyRouter);
