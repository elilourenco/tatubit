const express= require('express');
const app =express();
const port = 3000;
const bodyParser= require('body-parser');
const Sequelize = require('sequelize');
const { default: axios } = require('axios');
const database= require('./src/database/index');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

const sequelize = new Sequelize('my-app-express', 'root', 'Scr_uu/pn42~kz@', {
  host:'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire:30000,
    idle: 10000
  },
});

//create table User
const User= sequelize.define("User",{
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey:true,
    type:Sequelize.INTEGER

  },
  name:Sequelize.STRING,
  email:{
    type: Sequelize.STRING,
    unique:true,
    validate:{
      isEmail: true,
      notEmpty: true, 
    }
  },
  password: {
    type: Sequelize.STRING,
    unique:true,
    notEmpty:true,
    
  },
},{tableName:"User"});

User.sync({force:true})

//create table login

const Login= sequelize.define("Login",{
  id:{
    allowNull:false,
    autoIncrement:true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    notEmpty: true,
  },
  email:{
    type: Sequelize.STRING,
    unique:true,
    isEmail: true,
    notEmpty: true,
  },
  password: {
    type: Sequelize.STRING,
    unique:true,
    notEmpty:true,
    
  }
},{tableName:"Login"});

Login.sync({force:true})


//create table schedules

const Schedule= sequelize.define("Schedule",{
  id:{
    allowNull: false,
    autoIncrement:true,
    primaryKey:true,
    type: Sequelize.INTEGER
  },
  userId:{
    type: Sequelize.INTEGER,
    model:Login,
    key:'id',
  },
  contact:Sequelize.STRING,
  email:{
  type: Sequelize.STRING,
  unique:true,
},
  date:{type:Sequelize.DATE, notEmpty:true},
  hours:{type:Sequelize.DATE, notEmpty:true},
  cep:{type:Sequelize.INTEGER,
    notEmpty:true,
  },
  address:Sequelize.STRING,
  title:Sequelize.STRING,
  description:Sequelize.STRING,
},{tableName:"Schedule"});

Schedule.sync({force:true});

User.Schedule=User.hasMany(Schedule);


// database autenticate



database.authenticate().then(()=>
console.log('database is connected')).catch(err =>console.log('Error'+ err))

//create de User

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

  await user.save();
  res.send('the table is posted').status(200);
  console.log(user);
  
})

app.get('/getallusers',async(req,res)=>{
  const allusers= await User.findAll()
  res.json(allusers)
})

//create de login

app.post('/login', async(req,res) =>{ 

  const email =req.body.email;
  const password=req.body.password;

  const login= Login.build({
    email,
    password,
  });

  await login.save()
  res.send('the login is created').status(200)
  console.log(login)
  
})

app.get('/getallsignin',async(req,res)=>{
  const allsignin= await Login.findAll()
  res.json(allsignin)
})


//create the schedules

app.post('/schedule', async(req,res) =>{ 

  const userId= req.body.userId;
  const email =req.body.email;
  const address=req.body.address;
  const cep= req.body.cep;
  const contact= req.body.contact;
  const date= req.body.date;
  const hours= req.body.hours;
  const title=req.body.title;
  const description=req.body.description;

  const showcep = async(res,req) =>{
    axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((result)=>{
    const shh=result.data.localidade;
    console.log(shh)
    
    }).catch(e => console.log(e))
  }
  showcep();

  const ssh= await showcep();

    const schedule= Schedule.build({
      userId,
      contact,
      email,
      cep,
      address,
      date,
      hours,
      title,
      description,
    });
  
    await schedule.save();
    res.send('the schedule is posted').status(200)
    console.log(schedule);
  
});

app.get('/getallsignup',async(req,res)=>{
  const allsignup= await Schedule.findAll()
  res.json(allsignup)
})

app.put('/schedule:id',async(res,req)=>{
  const email =req.body.email;
  const address=req.body.address;
  const contact= req.body.contact;
  const date= req.body.date;
  const hours= req.body.hours;
  const title=req.body.title;
  const description=req.body.description;

  Schedule.update(
  {
      email:email,
      address:address,
      contact:contact,
      date:date,
      hours:hours,
      title:title,
      description:description,
  },
  {
    where:{
      id:req.params.id,
    },
  })
  res.redirect('/schedule')
})

app.delete('/schedule:id',async(res,req)=>{
    
  Schedule.destroy(
    {
      email:email,
      address:address,
      contact:contact,
      data:data,
      hora:hora,
      title:title,
      description:description,

  },
  {
    where:{
      id:req.params.id,
    },
  })
  res.redirect('/schedule')
})

                                                                                                                                                                                                                                                                                                                                                                                                                            

app.listen(port, ()=> {
  console.log(` app listening on port ${port}`)
})