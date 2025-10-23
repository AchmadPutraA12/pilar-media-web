"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie, getCookie, deleteCookie } from "cookies-next"

interface User {
    email: string
    role?: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedToken = getCookie("token") as string | undefined
        const savedUser = getCookie("user") ? JSON.parse(getCookie("user") as string) : null

        if (savedToken) {
            setToken(savedToken)
            setUser(savedUser)
        }
        setLoading(false)
    }, [])

    const login = async (email: string, password: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Login failed")

        setCookie("token", data.token, { path: "/", maxAge: 60 * 60 * 24 })
        setCookie("user", JSON.stringify(data.user), { path: "/", maxAge: 60 * 60 * 24 })

        setToken(data.token)
        setUser(data.user)
        router.push("/dashboard")
    }

    const logout = () => {
        deleteCookie("token")
        deleteCookie("user")
        setToken(null)
        setUser(null)
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
    return ctx
}
