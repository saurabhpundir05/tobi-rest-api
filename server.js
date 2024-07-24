const http=require('http');
const app=require('./app');
const port=process.env.PORT || 3000;
const server=http.createServer(app);    //app server mai host kr diya
//server.listen(3000,console.log('app is running'));
server.listen(port,()=>{
    console.log('app is running',+port);
})