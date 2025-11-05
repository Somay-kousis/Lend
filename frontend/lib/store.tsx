"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type ItemCondition = "Like New" | "Excellent" | "Good" | "Fair"
export type RequestStatus = "pending" | "approved" | "rejected"
export type LoanStatus = "active" | "returned" | "overdue"

export interface Item {
  id: number
  name: string
  owner: string
  category: string
  condition: ItemCondition
  description: string
  availability: "Available" | "Borrowed"
  rating: number
  location: string
  requests: number
  borrowed: number
}

export interface BorrowRequest {
  id: number
  item: Item
  requester: string
  requesterId: number
  status: RequestStatus
  startDate: string
  endDate: string
  rating: number
  createdAt: Date
}

export interface Loan {
  id: number
  item: Item
  borrower: string
  lender: string
  startDate: string
  endDate: string
  status: LoanStatus
  rating?: number
  comment?: string
}

export interface User {
  id: number
  name: string
  email: string
  rating: number
  reviews: number
  itemsShared: number
  itemsBorrowed: number
}

export interface Rating {
  id: number
  from: string
  to: string
  loan: Loan
  rating: number
  comment: string
  createdAt: Date
}

interface StoreContextType {
  items: Item[]
  requests: BorrowRequest[]
  loans: Loan[]
  currentUser: User | null
  ratings: Rating[]
  addItem: (item: Item) => void
  createRequest: (request: BorrowRequest) => void
  approveRequest: (requestId: number) => void
  rejectRequest: (requestId: number) => void
  addRating: (rating: Rating) => void
  updateLoanStatus: (loanId: number, status: LoanStatus) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Vintage Film Camera",
      owner: "Alex Chen",
      rating: 4.8,
      category: "Photography",
      condition: "Excellent",
      description: "Beautiful vintage film camera, works perfectly",
      availability: "Available",
      location: "San Francisco",
      requests: 12,
      borrowed: 8,
    },
    {
      id: 2,
      name: "Premium Camping Tent",
      owner: "Maya Rodriguez",
      rating: 4.9,
      category: "Outdoor",
      condition: "Like New",
      description: "4-person tent, never used",
      availability: "Available",
      location: "Oakland",
      requests: 8,
      borrowed: 3,
    },
    {
      id: 3,
      name: "4K Projector System",
      owner: "Jordan Park",
      rating: 5.0,
      category: "Tech",
      condition: "Like New",
      description: "Full 4K projector with accessories",
      availability: "Borrowed",
      location: "San Jose",
      requests: 15,
      borrowed: 5,
    },
  ])

  const [requests, setRequests] = useState<BorrowRequest[]>([
    {
      id: 1,
      item: items[0],
      requester: "Sarah Mitchell",
      requesterId: 4,
      status: "pending",
      startDate: "Dec 5",
      endDate: "Dec 12",
      rating: 4.8,
      createdAt: new Date(),
    },
  ])

  const [loans, setLoans] = useState<Loan[]>([
    {
      id: 1,
      item: items[2],
      borrower: "James Park",
      lender: "Jordan Park",
      startDate: "Dec 1",
      endDate: "Dec 8",
      status: "active",
    },
  ])

  const [currentUser] = useState<User>({
    id: 1,
    name: "Alex Chen",
    email: "alex@example.com",
    rating: 4.8,
    reviews: 24,
    itemsShared: 4,
    itemsBorrowed: 12,
  })

  const [ratings, setRatings] = useState<Rating[]>([
    {
      id: 1,
      from: "Sarah Mitchell",
      to: "Alex Chen",
      loan: loans[0],
      rating: 5,
      comment: "Amazing item, very well maintained!",
      createdAt: new Date(),
    },
  ])

  const addItem = (item: Item) => {
    setItems([...items, { ...item, id: Math.max(...items.map((i) => i.id)) + 1 }])
  }

  const createRequest = (request: BorrowRequest) => {
    setRequests([...requests, request])
  }

  const approveRequest = (requestId: number) => {
    setRequests(requests.map((r) => (r.id === requestId ? { ...r, status: "approved" } : r)))
    const request = requests.find((r) => r.id === requestId)
    if (request) {
      setLoans([
        ...loans,
        {
          id: Math.max(...loans.map((l) => l.id), 0) + 1,
          item: request.item,
          borrower: request.requester,
          lender: request.item.owner,
          startDate: request.startDate,
          endDate: request.endDate,
          status: "active",
        },
      ])
    }
  }

  const rejectRequest = (requestId: number) => {
    setRequests(requests.filter((r) => r.id !== requestId))
  }

  const addRating = (rating: Rating) => {
    setRatings([...ratings, rating])
  }

  const updateLoanStatus = (loanId: number, status: LoanStatus) => {
    setLoans(loans.map((l) => (l.id === loanId ? { ...l, status } : l)))
  }

  return (
    <StoreContext.Provider
      value={{
        items,
        requests,
        loans,
        currentUser,
        ratings,
        addItem,
        createRequest,
        approveRequest,
        rejectRequest,
        addRating,
        updateLoanStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within StoreProvider")
  }
  return context
}
