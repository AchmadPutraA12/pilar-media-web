"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BarChart3, Settings, Users, FileText, ChevronRight, X } from "lucide-react"
import { cn } from "@/core/lib/utils"

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
}

const menuItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Job Order",
        href: "/job-order",
        icon: BarChart3,
    },
]

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
    const pathname = usePathname()

    return (
        <>
            {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={onClose} />}

            <aside
                className={cn(
                    "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar transition-transform duration-300 ease-in-out md:relative md:top-0 md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 md:hidden">
                        <span className="font-semibold text-sidebar-foreground">Menu</span>
                        <button onClick={onClose} className="rounded-md p-1 hover:bg-sidebar-accent transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="flex-1 space-y-1 px-3 py-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-5 w-5" />
                                        <span>{item.label}</span>
                                    </div>
                                    {isActive && <ChevronRight className="h-4 w-4" />}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </aside>
        </>
    )
}
