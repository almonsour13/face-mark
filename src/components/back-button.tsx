import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
   const router =  useRouter();
    return (
        <Button onClick={() => router.back()} variant="ghost" size="icon-sm">
            <ArrowLeft className="w-5 h-5" />
        </Button>
    )
}