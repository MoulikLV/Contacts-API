const express = require('express');
const Contact=require('../Models/ContactModel')

const contacts= async(req,res)=>{

   
    try {
        const {name,email,phone}=req.body
        if(!name || !email || !phone){
            return res.status(400).json({message:'All fields are mandatory name,email,phone'})
        }
        const user=await Contact.create({name,email,phone})
        res.status(201).json({message:'Contact created succesfully',user})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getContacts=async(req,res)=>{
    try {
        const users= await Contact.find({})
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getContactById=async(req,res)=>{
    const {id}=req.params;
    try {
                const user= await Contact.findById(id)
                if(!user){
                    return res.status(404).json({message:'404 Contact Not found'})
                }
        
                res.status(201).json(user)
             } catch (error) {
                res.status(400).json({error:error.message,message:"Contact Id Incorrect"})
             }
}


const getContactByQuery = async (req, res) => {
        const { name, email,phone } = req.query;
        
        
        try {
            let user; 
            if (name && email && phone) {
                user = await Contact.findOne({ $or: [{ name }, { email } ,{phone}] });
            } else if (name) {
                user = await Contact.findOne({ name });
            } else if (email) { 
                user = await Contact.findOne({ email });  
            } else if(phone){
                user= await Contact.findOne({phone})
            }
            
            else {
                return res.status(400).json({ message: 'No email or name found in contacts' });
            }
               

          
    
            if (!user) {
                return res.status(404).json({ message: 'Contact Not found' });
            }
    
            res.status(200).json(user);
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    
// const getByphone=async(req,res)=>{
//     const {phone}= req.query;
//     console.log(phone)
//     try {
//         const user= await Contact.findOne({phone})
//         res.status(200).json(user)
//     } catch (error) {
        
//     }
// }

const updateContact=async(req,res)=>{
    const {id}=req.params
    console.log(id)
     try {
        const user=await Contact.findByIdAndUpdate(id,req.body)
        if(!user){
            return res.status(400).json({message:"Contact not found for updation"})
        }

        const updatedUser= await Contact.findById(id)

        res.status(200).json(updatedUser)
     } catch (error) {
        res.status(400).json({error:error.message})
     }
}

const deleteContact=async(req,res)=>{
    const {id}=req.params
    try {
        const user= await Contact.findByIdAndDelete(id)
        if(!user){
            return res.status(400).json({message:'Contact id not found for deletion'})
        }

        res.status(201).json({message:'Contact Deleted Succesfully'})
    } catch (error) {
        res.status(400).json({error:error.message,message:'Contact Id Incorrect'})
    }
}

module.exports={contacts,getContacts,getContactById,getContactByQuery,updateContact,deleteContact}