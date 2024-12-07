import { AUTH_COOKIE_NAME } from "../constants.js";
import jwt from "../lib/jwt.js";

export const authMiddleware = async (req, res, next) => {
    console.log('Auth middleware triggered');
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        req.isAuthenticated = true;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.clearCookie(AUTH_COOKIE_NAME);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        }
        return res.status(401).json({ message: 'Invalid token. Please log in again.' });
    }
    
};



export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

export const isGuest = (req, res, next) => {
    if (req.user) {
        return res.status(403).json({ message: 'Already authenticated' });
    }
    next();
};


export const hasRole = (requiredRole) => (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
