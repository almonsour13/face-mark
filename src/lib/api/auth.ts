import { JWT } from "next-auth/jwt";
import { fetchApi } from ".";
interface SignUpData {
    name: string;
    email: string;
    password: string;
}
interface SignInData {
    email: string;
    password: string;
}
interface GoogleSignData {
    email: string;
    name?: string | null;
    image?: string | null;
    provider: string;
    providerAccountId: string;
}

export const resetPassowrd = async (data: {
    email: string;
    password: string;
}) => {
    const response = await fetchApi("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response;
};
export const verifyResetCode = async (data: {
    email: string;
    code: string;
}) => {
    const response = await fetchApi("/api/auth/verify-reset-code", {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response;
};
export const forgotPassword = async (email: string) => {
    const response = await fetchApi("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
    return response;
};
export const resendVerificationEmail = async (email: string) => {
    const response = await fetchApi("/api/auth/resend-verification-code", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
    return response;
};
export const verify = async (data: { email: string; code: string }) => {
    const response = await fetchApi("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response;
};
export const resendVerificationCode = async (email: string) => {
    const response = await fetchApi("/api/auth/resend-verification-code", {
        method: "POST",
        body: JSON.stringify({ email }),
    });
    return response;
};
export const verifyEmailToken = async (token: string) => {
    const response = await fetchApi("/api/auth/verify-token", {
        method: "POST",
        body: JSON.stringify({ token }),
    });
    return response;
};
export const refreshAccessToken = async (token: JWT) => {
    const response = await fetchApi("/api/auth/refresh-token", {
        method: "POST",
        body: JSON.stringify({ token }),
    });
    console.log("response:", response);
    return {
        ...token,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken ?? token.refreshToken,
    };
}
export const googleSignIn = async (data: GoogleSignData) => {
    console.log(data);
    const response = await fetchApi("/api/auth/google", {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response;
};
export const signInUser = async (data: SignInData) => {
    const response = await fetchApi("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(data),
    });
    return response;
};
export const signUpUser = async (data: SignUpData) => {
    const response = await fetchApi("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
    });

    return response;
};
