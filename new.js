






//const User= require('./models/user')
//import login from './models/login';
//import schedule from './models/schedule';





//const secretKey= 'ABCD123456789';





//create the cadastro
/*

app.post('/Cadastro', async(req, res)=>{
  const {firstName,lastName,email}= req.body;
  //const passwordHash= await bcrypt.hash(password,10)
  try{
    const signup= await User.create({
      firstName,
      lastName,
      email,
      passwordHash

    });
    res.status(201).json({message:'User created sucessfully',signup})
  }catch(error){
    res.status(500).json({message:'Error creating user', error:error.message});
  }
})

//create the Login
/*
app.post('/login', async(req, res)=>{
  const {email,password} = req.body;
 
  //const salt= crypto.randomBytes(16).toString('hex');
  //const passwordHash= await bcrypt.hash(password +salt ,10)

  try{
    const Login = await login.create({
      email,
      password:passwordHash

    });
    //const token=Jwt.sign({userId:user.id},secretKey,{expiresIn:'1h'})
    res.status(201).json({message:'Login created sucessfully',Login,token})
  }catch(error){
    res.status(500).json({message:'Error creating login', error:error.message});
  }
  
})

*/


//create the schedule
/*

app.post('/schedule',async(req,res)=>{
  const {userId,
    createdAt,
    title,
    description,
    contact,
    email,
    adress,
    updateAt}=req.body;
  try {
    const Schedule= await schedule.create({userId,
      email,
      adress,
      contact,
      createdAt,
      title,
      updateAt,
      description
    });
    res.status(201).json(Schedule);

    
  } catch (error) {
    res.status(500).json({error:error.message});

  }
});

app.get('/schedule',async(req,res)=>{
  try {
    const Schedules= await schedule.findAll();
    res.json(schedules);

  } catch (error) {
    res.status(500).json({error:error.message});

  }
});

app.put('/schedule/:id',async(req,res)=>{
  const {id}= req.params;

  const{userId,
    createdAt,
    updateAt,
    title,
    address,
    contact,
    description}=req.body;
  try {
    const updateSchedule= await schedule.findByPk(id);

    if(updateSchedule){

      updateSchedule.userId= userId;
      updateSchedule.createdAt=createdAt;
      updateSchedule.title=title;
      updateSchedule.updateAt=updateAt;
      updateSchedule.description=description;
      updateSchedule.address=address;
      updateSchedule.contact=contact;

      await updateSchedule.save();
      res.status(200).json(updateSchedule);
      
      
    }else{
      res.status(404).json({message:'schedule not found'});
    }
    
  } catch (error) {
    res.status(500).json({error:error.message});

  }
});

app.delete('/schedule/:id',async(req,res)=>{
  const {id}= req.params;
  try{
    const Schedule= await schedule.findByPk(id);
    if(schedule){
      await schedule.destroy();
      res.status(2000).json({message:'schedule delted successfully'});
    }else{
      res.status(404).json({error:'Schedule not found'});
    } 
  } catch(error){
    res.status(500).json({error:'error deleting schedule'});
  }
})


 app.listen(port,()=>{
  console.log(`Example app listening on port ${port}`)
})
*/