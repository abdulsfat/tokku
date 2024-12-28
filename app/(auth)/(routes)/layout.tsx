import {ReactNode} from "react";

export default function AuthLayout({children}: {
    children: ReactNode;
}) {
    return (
        <div className="justify-center flex items-center h-full">
            {children}
        </div>
    )
}