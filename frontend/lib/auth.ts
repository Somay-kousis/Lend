// lib/auth.ts
export interface User {
  id: string
  name: string
  email: string
  rating: number
  reviews: number
  itemsShared: number
  itemsBorrowed: number
  location: string
  bio: string
  joinedDate: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  user?: User
  token?: string
}

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "demo@example.com": {
    password: "password123",
    user: {
      id: "1",
      name: "Alex Chen",
      email: "demo@example.com",
      rating: 4.8,
      reviews: 24,
      itemsShared: 4,
      itemsBorrowed: 12,
      location: "San Francisco, CA",
      bio: "Photography enthusiast and outdoor lover. Always happy to share!",
      joinedDate: "Jan 2024",
    },
  },
}

class AuthService {
  private readonly TOKEN_KEY = "borrow_auth_token"
  private readonly USER_KEY = "borrow_user"

  private delay(ms: number = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private generateToken(email: string): string {
    return btoa(`${email}:${Date.now()}`)
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    await this.delay()

    const userRecord = MOCK_USERS[email]

    if (!userRecord || userRecord.password !== password) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }

    const token = this.generateToken(email)
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token)
      localStorage.setItem(this.USER_KEY, JSON.stringify(userRecord.user))
    }

    return {
      success: true,
      user: userRecord.user,
      token,
    }
  }

  async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    await this.delay()

    if (MOCK_USERS[email]) {
      return {
        success: false,
        message: "Email already registered",
      }
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      rating: 0,
      reviews: 0,
      itemsShared: 0,
      itemsBorrowed: 0,
      location: "Not specified",
      bio: "New to BORROW",
      joinedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    }

    MOCK_USERS[email] = {
      password,
      user: newUser,
    }

    const token = this.generateToken(email)

    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token)
      localStorage.setItem(this.USER_KEY, JSON.stringify(newUser))
    }

    return {
      success: true,
      user: newUser,
      token,
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY)
      localStorage.removeItem(this.USER_KEY)
    }
  }

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    const userStr = localStorage.getItem(this.USER_KEY)
    if (!userStr) return null

    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.TOKEN_KEY)
  }
}

export const authService = new AuthService()