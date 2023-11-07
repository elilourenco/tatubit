const express= require('express');
const app =express()
const port = 3000;
const bodyParser= require('body-parser')
const crypto= require('node:crypto')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



app.use(express.json());

const Sequelize = require('sequelize');




const sequelize = new Sequelize('my-app-express', 'root', 'Scr_uu/pn42~kz@', {
  host:'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const User= sequelize.define("User",{
  name:Sequelize.STRING,
  email:Sequelize.STRING,
  password:Sequelize.STRING,
},
{tableName:"User"}
);

 User.sync({force:true})



// database autenticate
const database= require('./src/database/index')

database.authenticate().then(()=>
console.log('database is connected')).catch(err =>console.log('Error'+ err))



app.get('/hello', (req, res)=>{
  res.send('hello the new app')
})


app.post('/cadastro', async(req,res) =>{ 

  const name=req.body.name;
  const email =req.body.email;
  const password=req.body.password;

  const user= User.build({
    name,
    email,
    password,
  });
  await user.save()
  res.send('the table is posted').status(200)
  console.log(user)
  
})

app.get('/getallusers',async(req,res)=>{
  const allusers= await User.findAll()
  res.json(allusers)
})
                                                                                                                                                                                                                                                                                                                                                                                                                            

app.listen(port, ()=> {
  console.log(` app listening on port ${port}`)
})