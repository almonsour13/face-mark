interface HeaderTitleProps {
    className?: string;
    children: React.ReactNode
}
export default function HeaderTitle({ className, children }: HeaderTitleProps) {
    return (
        <h1 className={`text-base font-semibold ${className}`}>{children}</h1>
    )

}