"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || "Login gagal, periksa kembali email dan password.")
                setIsLoading(false)
                return
            }

            setCookie("token", data.token, { path: "/", maxAge: 60 * 60 * 24 })
            setCookie("user", JSON.stringify(data.user), { path: "/", maxAge: 60 * 60 * 24 })

            router.push("/dashboard")
        } catch (err) {
            console.error("Login error:", err)
            setError("Terjadi kesalahan. Coba lagi nanti.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
            <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10" />
            <div className="absolute top-0 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:opacity-10" />
            <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:opacity-10" />

            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md mx-auto">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-lg">
                            <div className="w-7 h-7 bg-white rounded-lg transform -rotate-45" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                            Welcome Back
                        </h1>
                        <p className="text-base text-muted-foreground">Sign in to your account to continue</p>
                    </div>

                    <Card className="p-8 border border-white/20 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 dark:border-slate-800/50">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {error && (
                                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2.5">
                                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-11 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-sm font-semibold text-foreground">
                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-11 h-12 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Signing in...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Sign In
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-white dark:bg-slate-900 text-muted-foreground font-medium">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium bg-transparent"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium bg-transparent"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </Button>
                        </div>
                    </Card>

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        Don't have an account?{" "}
                        <a
                            href="#"
                            className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
