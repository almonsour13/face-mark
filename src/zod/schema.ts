import * as z from "zod";

export const signUpSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be less than 100 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
});
export type SignUpFormData = z.infer<typeof signUpSchema>;
export const signInSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
});
export type SignInFormData = z.infer<typeof signInSchema>;

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(1, "Password is required")
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"], // 👈 marks the specific field with the error
        message: "Passwords do not match",
    });
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;