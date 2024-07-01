const useRouter = require('./userRouter');
const routes =(app)=>{
    app.use('/user',useRouter)
    
}
module.exports = routes;