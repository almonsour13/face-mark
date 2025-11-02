export default function HeaderTitle({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <h1 className={`text-md ${className}`}>{children}</h1>;
}
