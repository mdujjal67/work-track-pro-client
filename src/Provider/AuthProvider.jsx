import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const auth = getAuth(app);

// social auth provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()


    // create user function
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };


    // signIn user function
    const signIn = async (email, password) => {
        setLoading(true);
        try {
            // Check user status before signing in
            const statusRes = await axiosPublic.get(`/users/status/${email}`);
            if (statusRes.data.status === 'Fired') {
                Swal.fire('Error!', 'You have been fired from this company and cannot log in any more!', 'error');
                setLoading(false);
                return;
            }

            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            setLoading(false);
            if (error.message !== 'User has been fired') {
                Swal.fire('Error!', error.message, 'error');
            }
            throw error;
        }
    };


    // logout user function
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    };


    // update user function
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }


    // google sign-in
    const googleLogin = async () => {
        setLoading(true);
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, googleProvider);

            // Get the user's email from the Google sign-in result
            const email = result.user.email;

            // Check user status before finalizing the sign-in
            const statusRes = await axiosPublic.get(`/users/status/${email}`);

            if (statusRes.data.status === 'Fired') {
                Swal.fire('Error!', 'You have been fired from this company and cannot log in any more!', 'error');
                setLoading(false);
                await signOut(auth); // Sign out the user if they are fired
                throw new Error('User has been fired');
            }

            // User is either not found in the database (new user) or not fired
            setLoading(false);
            return result;
        }
        catch (error) {
            setLoading(false);
        }
    };


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => {
            return unSubscribe;
        }
    }, [axiosPublic]);



    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        googleLogin,
        updateUserProfile,
    }

    return (

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.object
};
export default AuthProvider;