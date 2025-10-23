"use client"

import { useRouter } from "next/navigation"
import { Menu, LogOut, User } from "lucide-react"
import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"
import { deleteCookie, getCookie } from "cookies-next"

interface NavbarProps {
    onMenuClick?: () => void
}

interface UserInfo {
    name?: string
    email?: string
}

export function Navbar({ onMenuClick }: NavbarProps) {
    const router = useRouter()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const [user, setUser] = useState<UserInfo>({})

    useEffect(() => {
        try {
            const cookieUser = getCookie("user")
            if (cookieUser) {
                const parsed = JSON.parse(cookieUser as string)
                setUser(parsed)
            }
        } catch (err) {
            console.error("Failed to parse user cookie:", err)
        }
    }, [])

    const handleLogout = () => {
        deleteCookie("token")
        deleteCookie("user")

        setIsDropdownOpen(false)
        router.push("/login")
    }

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-sm font-bold text-primary-foreground">D</span>
                        </div>
                        <span className="hidden sm:inline font-semibold text-foreground">Dashboard</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                        >
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                            </div>
                            <span className="hidden sm:inline">Profile</span>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
                                <div className="p-4 border-b border-border">
                                    <p className="text-sm font-semibold text-foreground">
                                        {user.name || "User Account"}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {user.email || "user@example.com"}
                                    </p>
                                </div>
                                <div className="p-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
