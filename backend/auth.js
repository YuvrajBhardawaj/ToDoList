import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
const auth = getAuth()
export async function SignUp(email, password){
    try{
        const userCred = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userCred.user.uid)
        return {success:true,status:200,cred:userCred.user.uid}
    }
    catch (err) {
        if (err.code === 'auth/email-already-in-use') {
            return {success:false,status:409,message:"User exists"};
        } else {
            return {success:false,status:500, message:"Enter Valid Credentials"}
        }
    }
}

export async function SignIn(email, password) {
    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, status: 200, uid: userCred.user.uid, message: 'Sign-in successful' };
    } catch (err) {
        let status = 500; 
        let message = 'Internal Server Error';
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            status = 401; // Unauthorized
            message = 'Invalid email or password';
        }
        return { success: false, status, message };
    }
}