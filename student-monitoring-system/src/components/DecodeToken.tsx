import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    exp: number;
    iat: number;
    sub: string;
    role: string;
    // Add other token fields if needed
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode<DecodedToken>(token);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};
