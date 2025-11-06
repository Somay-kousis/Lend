// lib/requests.ts
export interface BorrowRequest {
  id: string
  itemId: string
  itemName: string
  requesterId: string
  requesterName: string
  requesterEmail: string
  ownerId: string
  ownerName: string
  ownerEmail: string
  status: "pending" | "approved" | "rejected" | "completed"
  rating: number
  createdAt: string
  approvedAt?: string
  completedAt?: string
}

export interface RequestsResponse {
  success: boolean
  message?: string
  request?: BorrowRequest
  requests?: BorrowRequest[]
}

class RequestsService {
  private readonly REQUESTS_KEY = "borrow_requests"

  private delay(ms: number = 300) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private getRequests(): BorrowRequest[] {
    if (typeof window === 'undefined') return []
    
    const requestsStr = localStorage.getItem(this.REQUESTS_KEY)
    if (!requestsStr) return []

    try {
      return JSON.parse(requestsStr)
    } catch {
      return []
    }
  }

  private saveRequests(requests: BorrowRequest[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.REQUESTS_KEY, JSON.stringify(requests))
    }
  }

  // Get all requests
  async getAllRequests(): Promise<RequestsResponse> {
    await this.delay()

    const requests = this.getRequests()

    return {
      success: true,
      requests,
    }
  }

  // Get requests by owner ID (items I own)
  async getRequestsByOwnerId(ownerId: string): Promise<RequestsResponse> {
    await this.delay()

    const requests = this.getRequests()
    const ownerRequests = requests.filter(req => req.ownerId === ownerId)

    return {
      success: true,
      requests: ownerRequests,
    }
  }

  // Get requests by requester ID (items I requested)
  async getRequestsByRequesterId(requesterId: string): Promise<RequestsResponse> {
    await this.delay()

    const requests = this.getRequests()
    const requesterRequests = requests.filter(req => req.requesterId === requesterId)

    return {
      success: true,
      requests: requesterRequests,
    }
  }

  // Get request by ID
  async getRequestById(requestId: string): Promise<RequestsResponse> {
    await this.delay()

    const requests = this.getRequests()
    const request = requests.find(r => r.id === requestId)

    if (!request) {
      return {
        success: false,
        message: "Request not found",
      }
    }

    return {
      success: true,
      request,
    }
  }

  // Create new request
  async createRequest(
    requestData: Omit<BorrowRequest, "id" | "status" | "createdAt">
  ): Promise<RequestsResponse> {
    await this.delay()

    const requests = this.getRequests()

    // Check if user already has a pending request for this item
    const existingRequest = requests.find(
      r => r.itemId === requestData.itemId && 
           r.requesterId === requestData.requesterId && 
           r.status === "pending"
    )

    if (existingRequest) {
      return {
        success: false,
        message: "You already have a pending request for this item",
      }
    }

    const newRequest: BorrowRequest = {
      ...requestData,
      id: Date.now().toString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    requests.push(newRequest)
    this.saveRequests(requests)

    return {
      success: true,
      request: newRequest,
      message: "Request created successfully",
    }
  }

  // Approve request
  async approveRequest(requestId: string): Promise<RequestsResponse> {
    await this.delay()

    const requests = this.getRequests()
    const request = requests.find(r => r.id === requestId)

    if (!request) {
      return {
        success: false,
        message: "Request not found",
      }
    }

    if (request.status !== "pending") {
      return {
        success: false,
        message: "Request is not pending",
      }
    }

    request.status = "approved"
    request.approvedAt = new Date().toISOString()
    this.saveRequests(requests)

    return {
      success: true,
      request,
      message: "Request approved",
    }
  }

  // Reject request
  async rejectRequest(requestId: string): Promise<RequestsResponse> {
    await this.delay()

    const requests = this.getRequests()
    const requestIndex = requests.findIndex(r => r.id === requestId)

    if (requestIndex === -1) {
      return {
        success: false,
        message: "Request not found",
      }
    }

    requests.splice(requestIndex, 1)
    this.saveRequests(requests)

    return {
      success: true,
      message: "Request rejected",
    }
  }

  // Complete request
  async completeRequest(requestId: string): Promise<RequestsResponse> {
    await this.delay()

    const requests = this.getRequests()
    const request = requests.find(r => r.id === requestId)

    if (!request) {
      return {
        success: false,
        message: "Request not found",
      }
    }

    request.status = "completed"
    request.completedAt = new Date().toISOString()
    this.saveRequests(requests)

    return {
      success: true,
      request,
      message: "Request completed",
    }
  }

  // Delete request
  async deleteRequest(requestId: string): Promise<RequestsResponse> {
    await this.delay()

    const requests = this.getRequests()
    const filteredRequests = requests.filter(r => r.id !== requestId)

    if (requests.length === filteredRequests.length) {
      return {
        success: false,
        message: "Request not found",
      }
    }

    this.saveRequests(filteredRequests)

    return {
      success: true,
      message: "Request deleted",
    }
  }

  // Get pending requests count for owner
  async getPendingRequestsCount(ownerId: string): Promise<number> {
    const requests = this.getRequests()
    return requests.filter(r => r.ownerId === ownerId && r.status === "pending").length
  }
}

export const requestsService = new RequestsService()