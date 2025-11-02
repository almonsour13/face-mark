export default function PageWrapper({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`p-4 md:p-6 flex flex-col gap-4 flex-1 ${className}`}>
            {children}
        </div>
    );
}
