const express= require('express')
const router= express.Router()
const {contacts,getContacts,getContactByQuery,updateContact,deleteContact, getContactById}= require('../Controllers/contactController')

router.post('/contacts',contacts)

router.get('/contacts',getContacts)

router.get('/contacts/byquery',getContactByQuery)

// router.get('/contacts/byphone',getByphone)

router.get('/contacts/:id',getContactById)

router.put('/updatecontact/:id',updateContact)

router.delete('/deletecontact/:id',deleteContact)

module.exports=router;