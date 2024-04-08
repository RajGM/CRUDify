const admin = require('firebase-admin');

exports.checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split('Bearer ')[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        req.user = { email: decodedToken.email, uid: decodedToken.uid };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
