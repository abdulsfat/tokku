'use client'

import {cn} from "@/lib/utils";
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";

export function MainNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname()
    const params = useParams()

    const routes = [
        {
        href: `/${params.storeId}/settings`,
        label: 'settings',
        active: pathname === `/${params.storeId}/settings`
        }
    ]

    return (
        <div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn("texs-sm font-medium transition-colors hover:text-primary",
                    route.active ? "text-black dark:text-white" : "text-muted-foreground",)}>
                    {route.label}
                </Link>
            ))}
        </div>
    )
}