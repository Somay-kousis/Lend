import { apiRequest } from './api'

// Types
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

class AuthService {
  private readonly TOKEN_KEY = "borrow_auth_token"
  private readonly USER_KEY = "borrow_user"

  // Mock user database
  private mockUsers = [
    {
      id: "1",
      name: "Demo User",
      email: "demo@example.com",
      password: "password123",
      rating: 4.8,
      reviews: 24,
      itemsShared: 4,
      itemsBorrowed: 12,
      location: "San Francisco, CA",
      bio: "Photography enthusiast and outdoor lover. Always happy to share!",
      joinedDate: "Jan 2024"
    }
  ]

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Find user
      const user = this.mockUsers.find(u => u.email === email && u.password === password)
      
      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password'
        }
      }

      // Create user object without password
      const { password: _, ...userWithoutPassword } = user
      const token = 'mock_token_' + Date.now()

      // Save token and user to localStorage
      localStorage.setItem(this.TOKEN_KEY, token)
      localStorage.setItem(this.USER_KEY, JSON.stringify(userWithoutPassword))

      return {
        success: true,
        user: userWithoutPassword,
        token: token,
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
      }
    }
  }

  async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Check if user already exists
      const existingUser = this.mockUsers.find(u => u.email === email)
      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists'
        }
      }

      // Create new user
      const newUser = {
        id: String(this.mockUsers.length + 1),
        name,
        email,
        password,
        rating: 0,
        reviews: 0,
        itemsShared: 0,
        itemsBorrowed: 0,
        location: "San Francisco, CA",
        bio: "",
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }

      this.mockUsers.push(newUser)

      const { password: _, ...userWithoutPassword } = newUser
      const token = 'mock_token_' + Date.now()

      // Save token and user to localStorage
      localStorage.setItem(this.TOKEN_KEY, token)
      localStorage.setItem(this.USER_KEY, JSON.stringify(userWithoutPassword))

      return {
        success: true,
        user: userWithoutPassword,
        token: token,
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Signup failed',
      }
    }
  }

  logout(): void {
    // Clear localStorage
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
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