"use client";
import { Button } from "@/components/ui/button";
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Field,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Lock, Mail, User } from "lucide-react";
import { FormData } from "../account-creation-form";
interface PersonalInformationStepsProps {
    formData: FormData;
    handleInputChange: (name: string, value: string) => void;
    onNext: () => void;
}
export default function PersonalInformationSteps({
    formData,
    handleInputChange,
    onNext,
}: PersonalInformationStepsProps) {
    // const [showPassword, setShowPassword] = useState(false);
    // const isValid = formData.name && formData.email && formData.password;

    return (
        <div className="w-full space-y-4">
            <CardHeader className="text-lg">
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                    Enter your personal details to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FieldGroup className="gap-4">
                    <Field className="gap-1">
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                placeholder="John Doe"
                                className="pl-10 h-10"
                                required
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                    </Field>
                    <Field className="gap-1">
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                placeholder="m@example.com"
                                className="pl-10 h-10"
                                required
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                    </Field>
                    <Field className="gap-1">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                className="pl-10 h-10"
                                required
                                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                            />
                        </div>
                    </Field>
                    <div className="flex justify-end">
                        <Button
                            // disabled={!isValid}
                            className="w-auto"
                            onClick={onNext}
                        >
                            Next
                        </Button>
                    </div>
                </FieldGroup>
            </CardContent>
        </div>
    );
}
