const admin = require('../config/firebase');

exports.isAuthenticated = async (token) => {
  try {
    // Verify the ID token first
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken) {
      // Token is valid, and you have the decoded token which includes user information
      return { authenticated: true, uid: decodedToken.uid };
    }
  } catch (error) {
    // Handle error or simply return an authentication failure
    return { authenticated: false, error: error.message };
  }
};
