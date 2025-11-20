import { ScanFace } from "lucide-react"

export default function AppLogo({className}: {className?: string}) {
    return <ScanFace className={`h-6 w-6 text-primary ${className}`} />
}