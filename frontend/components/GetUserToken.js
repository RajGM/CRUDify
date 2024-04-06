// Utility function to get current user's token
import { getAuth } from 'firebase/auth';


const getUserToken = async () => {
    const user = getAuth().currentUser;
    if (user) {
        return await user.getIdToken();
    }
    return null;
};

export default getUserToken;