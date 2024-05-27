const express= require('express')
const  mongoose  = require('mongoose')
const dotenv=require('dotenv').config()
// const Contact=require('./Models/ContactModel')
const cors = require('cors');
const app=express()
const ContactRoutes=require('./Routes/ContactRoutes')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('MongoDB Database connected succesfully'),app.listen(PORT,()=>{console.log(`Server running on Port http://localhost:${PORT}`)})})
.catch((err)=>console.log(err.message))



app.use('/',ContactRoutes)

app.get('/',(req,res)=>{
    res.send('Hello I am Contacts API')
})














// app.get('/contacts',async(req,res)=>{
//     try {
//         const users= await Contact.find({})
//         res.status(201).json(users)
//     } catch (error) {
//         res.status(400).json({error:error.message})
//     }
// })

// app.post('/contacts',async(req,res)=>{
   
//     try {
//         const {name,email,phone}=req.body
//         if(!name || !email || !phone){
//             return res.status(400).json({message:'All fields are mandatory'})
//         }
//         const user=await Contact.create({name,email,phone})
//         res.status(201).json({message:'Contact created succesfully',user})
//     } catch (error) {
//         res.status(500).json({error:error.message})
//     }

    
    
// })

// app.get('/contacts/:id',async(req,res)=>{
//     const {id}=req.params
//      try {
//         const user= await Contact.findById(id)
//         if(!user){
//             return res.status(404).json({message:'404 Contact Not found'})
//         }

//         res.status(201).json(user)
//      } catch (error) {
//         res.status(400).json({error:error.message,message:"Contact Id Incorrect"})
//      }
// })

// app.put('/updatecontact/:id',async(req,res)=>{
//     const {id}=req.params
//      try {
//         const user=await Contact.findByIdAndUpdate(id,req.body)
//         if(!user){
//             return res.status(400).json({message:"Contact not found for updation"})
//         }

//         const updatedUser= await Contact.findById(id)

//         res.status(200).json(updatedUser)
//      } catch (error) {
//         res.status(400).json({error:error.message})
//      }
// })

// app.delete('/deletecontact/:id',async(req,res)=>{
//     const {id}=req.params
//     try {
//         const user= await Contact.findByIdAndDelete(id)
//         if(!user){
//             return res.status(400).json({message:'Contact id not found for deletion'})
//         }

//         res.status(201).json({message:'Contact Deleted Succesfully'})
//     } catch (error) {
//         res.status(400).json({error:error.message,message:'Contact Id Incorrect'})
//     }
// })
