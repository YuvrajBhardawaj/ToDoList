import express from 'express'
import User from './config.js';
import { addDoc, deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { SignIn, SignUp } from './auth.js';
import jwt, { decode } from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

app.use(express.json());
app.use(cookieParser());
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await SignUp(email, password);
        if (result.success) {
            res.status(result.status).send("User added");
            //await setDoc(doc(User, result.cred), { email });
        } else {
            res.status(result.status).send(result.message);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/api/login',async(req,res)=>{
    const {email, password} = req.body
    const result = await SignIn(email, password)
    if(result.success){
        const token = jwt.sign({uid:result.uid},'my_secret_key',{expiresIn:'1h'})
        res.cookie('jwt', token, {httpOnly:true}) //httpOnly prevents user to edit cookie
        res.send(result)
    }else
    res.send(result)
})

app.get('/api/to_do_list',async(req,res)=>{
    const token = req.cookies.jwt //req.cookies.cookie_name
    try {
        if(token){
            const decoded = await jwt.verify(token,"my_secret_key")        
            const userDocRef = doc(User, decoded.uid); // Get the document reference for the user with the specified UID
            const userDoc = await getDoc(userDocRef); // Retrieve the document
            if (userDoc.exists()) {
                console.log(userDoc.data())
                res.send({success:true,data:userDoc.data()}); // Send the data of the user document
            } 
            else {
                res.send({success:false,message:'User not found'}); // Send a 404 response if the user document does not exist
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({success:false,message:'Internal Server Error'}); // Send a 500 response for any errors
    }
})
app.post('/api/to_do_list',async(req,res)=>{
    const {list}=req.body
    const token = req.cookies.jwt //req.cookies.cookie_name
    try {
        if(token){
            const decoded = await jwt.verify(token,"my_secret_key")       
            const userDocRef = doc(User, decoded.uid); // Get the document reference for the user with the specified UID
            const userDoc = await getDoc(userDocRef); // Retrieve the document
            const id = uuidv4()
            if (userDoc.exists()) {
                const userData = userDoc.data()
                const updatedData = {...userData,[id]:list}
                await updateDoc(userDocRef, updatedData);
                res.send({success:true,data:userDoc.data()}); // Send the data of the user document
            } 
            else {
                console.log("I am inside else")
                await setDoc(doc(User, decoded.uid), { [id] : list})
                res.send({success:false,message:'User not found'}); // Send a 404 response if the user document does not exist
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({success:false,message:'Internal Server Error'}); // Send a 500 response for any errors
    }
})
app.delete('/api/to_do_list/:id',async(req,res)=>{
    const id=req.params.id
    const token = req.cookies.jwt
    console.log(id)
    try {
        if(token){
            const decoded = await jwt.verify(token,"my_secret_key")       
            const userDocRef = doc(User, decoded.uid)
            const userDoc = await getDoc(userDocRef)
            if(userDoc.exists()){
                const userData = userDoc.data()
                delete userData[id]
                await setDoc(userDocRef, userData)
                res.send(userData)
            }
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
})
app.listen(3000,()=>{
    console.log("Server running at 3000")
})
