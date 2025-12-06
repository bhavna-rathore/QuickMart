// backend/src/middleware/auth.middleware.js
import { verifyToken } from "../utils/jwtUtils.js";
import users from "../data/users.js";

export const requiresAuth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"];
        if (!authHeader) return res.status(401).json({ errors: ["Missing authorization header"] });

        // Accept "Bearer <token>" or just the token string
        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
        const decoded = verifyToken(token);
        if (!decoded) return res.status(401).json({ errors: ["Invalid token"] });

        // find user by id or email in payload (we sign with { userId, email })
        const user = users.find((u) => u._id === decoded.userId || u.email === decoded.email);
        if (!user) return res.status(401).json({ errors: ["User not found"] });

        // attach user (object reference into in-memory users array)
        req.user = user;
        req.tokenPayload = decoded;
        next();
    } catch (err) {
        return res.status(500).json({ errors: ["Auth middleware error"] });
    }
};
