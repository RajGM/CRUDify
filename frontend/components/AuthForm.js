// components/AuthForm.js
import { useState,useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../utils/firebase'; // Adjust the import path based on your file structure

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth(app);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                // Login logic
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log(userCredential);
                // Assuming your token is in userCredential.user.accessToken
                localStorage.setItem('token', userCredential.user.accessToken);
            } else {
                // Registration logic
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log(userCredential);
                // Firebase automatically logs the user in after registration
                localStorage.setItem('token', userCredential.user.accessToken);
            }
            // Redirect or update UI after successful login/registration
        } catch (error) {
            console.error(error.message);
            // Handle errors (e.g., display error messages)
        }
    };

    // Check for authentication state change rather than directly accessing localStorage
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                // User is logged in
                // You might want to fetch or set the token again or redirect the user
                console.log('User is logged in');
            } else {
                // User is logged out
                console.log('User is logged out');
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {isLogin ? 'Login' : 'Register'}
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
