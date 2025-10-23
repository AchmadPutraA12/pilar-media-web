"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-background">
                <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <div className="flex">
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                    <main className="flex-1 overflow-auto">
                        <div className="p-4 md:p-8">{children}</div>
                    </main>
                </div>
            </div>
        </ThemeProvider>
    )
}
