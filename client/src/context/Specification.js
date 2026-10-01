import {ShieldCheck, LockKeyhole, KeyRound, RefreshCw, ShieldAlert, LogOut} from "lucide-react"

const Specifications = [
  {
    "id": 1,
    "title": "Secure Authentication",
    "icon": ShieldCheck,
    "description": "Users are securely authenticated using JWT-based authentication and protected sessions.",
    "technology": "JWT",
    "status": "Active"
  },
  {
    "id": 2,
    "title": "Password Protection",
    "icon": LockKeyhole,
    "description": "User passwords are securely hashed before being stored in the database.",
    "technology": "bcrypt",
    "status": "Active"
  },
  {
    "id": 3,
    "title": "Access Token",
    "icon": KeyRound,
    "description": "Short-lived access tokens authorize requests to protected resources.",
    "technology": "JWT Access Token",
    "status": "15 minutes"
  },
  {
    "id": 4,
    "title": "Refresh Token",
    "icon": RefreshCw,
    "description": "Refresh tokens allow users to obtain new access tokens without logging in again.",
    "technology": "HttpOnly Cookie",
    "status": "7 days"
  },
  {
    "id": 5,
    "title": "Protected Routes",
    "icon": ShieldAlert,
    "description": "Private pages and API resources are accessible only to authenticated users.",
    "technology": "Auth Middleware",
    "status": "Active"
  },
  {
    "id": 6,
    "title": "Secure Logout",
    "icon": LogOut,
    "description": "Logout clears authentication state and securely ends the user's session.",
    "technology": "Session Management",
    "status": "Active"
  }
]

export default Specifications