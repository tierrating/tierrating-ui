"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"
import {extractJwtData} from "@/components/jwt-decoder";

interface AuthContextType {
    token: string | null
    user: string | null
    isLoading: boolean
    isAuthenticated: boolean
    isExpired: boolean
    login: (token: string, user: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isExpired, setIsExpired] = useState(false)
    const router = useRouter()

    // Load token from localStorage on initial render
    useEffect(() => {
        const checkAuth= () => {
            const storedToken = localStorage.getItem("authToken")
            if (storedToken) {
                const decodedJwt = extractJwtData(storedToken);
                if (decodedJwt) {
                    setToken(storedToken)
                    setUser(decodedJwt.username)
                    setIsExpired(decodedJwt.isExpired)
                    if (!isExpired) setIsAuthenticated(true)
                }
            }
            setIsLoading(false);
        }
        checkAuth()
    }, [])

    const login = (newToken: string, username: string) => {
        localStorage.setItem("authToken", newToken)
        localStorage.setItem("username", username)
        setToken(newToken)
        setUser(username)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("authToken")
        localStorage.removeItem("username")
        setToken(null)
        setUser(null)
        setIsAuthenticated(false)
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}