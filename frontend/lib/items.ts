// lib/items.ts
export interface Item {
  id: string
  name: string
  description: string
  category: string
  condition: string
  status: "available" | "borrowed"
  ownerId: string
  ownerEmail: string
  ownerName: string
  ownerRating: number
  ownerRatingCount: number
  location: string
  image: string
  createdAt: string
  borrowedBy?: string
  borrowedAt?: string
  returnBy?: string
}

export interface ItemsResponse {
  success: boolean
  message?: string
  item?: Item
  items?: Item[]
}

class ItemsService {
  private readonly ITEMS_KEY = "borrow_items"

  private delay(ms: number = 300) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private getItems(): Item[] {
    if (typeof window === 'undefined') return []
    
    const itemsStr = localStorage.getItem(this.ITEMS_KEY)
    if (!itemsStr) return this.getDefaultItems()

    try {
      return JSON.parse(itemsStr)
    } catch {
      return this.getDefaultItems()
    }
  }

  private saveItems(items: Item[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.ITEMS_KEY, JSON.stringify(items))
    }
  }

  private getDefaultItems(): Item[] {
    const defaultItems = [
      {
        id: "1",
        name: "Vintage Film Camera",
        description: "Beautiful vintage camera in excellent condition. Perfect for film photography enthusiasts.",
        category: "Photography",
        condition: "Excellent",
        status: "available" as const,
        ownerId: "1",
        ownerEmail: "alex@example.com",
        ownerName: "Alex Chen",
        ownerRating: 4.8,
        ownerRatingCount: 12,
        location: "San Francisco",
        image: "bg-primary/10",
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "Premium Camping Tent",
        description: "4-person camping tent with waterproof material. Great for weekend camping trips.",
        category: "Outdoor",
        condition: "Like New",
        status: "borrowed" as const,
        ownerId: "2",
        ownerEmail: "maya@example.com",
        ownerName: "Maya Rodriguez",
        ownerRating: 4.9,
        ownerRatingCount: 8,
        location: "Oakland",
        image: "bg-accent/10",
        createdAt: new Date().toISOString(),
        borrowedBy: "user-123",
        borrowedAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "4K Projector System",
        description: "High-quality 4K projector perfect for movie nights or presentations.",
        category: "Tech",
        condition: "Excellent",
        status: "available" as const,
        ownerId: "3",
        ownerEmail: "jordan@example.com",
        ownerName: "Jordan Park",
        ownerRating: 5.0,
        ownerRatingCount: 15,
        location: "San Jose",
        image: "bg-secondary/10",
        createdAt: new Date().toISOString(),
      },
      {
        id: "4",
        name: "Professional Microphone",
        description: "Studio-quality microphone for podcasting, streaming, or recording.",
        category: "Audio",
        condition: "Good",
        status: "available" as const,
        ownerId: "1",
        ownerEmail: "alex@example.com",
        ownerName: "Alex Chen",
        ownerRating: 4.7,
        ownerRatingCount: 5,
        location: "San Francisco",
        image: "bg-primary/10",
        createdAt: new Date().toISOString(),
      },
      {
        id: "5",
        name: "Full DJ Equipment",
        description: "Complete DJ setup including turntables, mixer, and speakers.",
        category: "Music",
        condition: "Excellent",
        status: "borrowed" as const,
        ownerId: "4",
        ownerEmail: "casey@example.com",
        ownerName: "Casey Smith",
        ownerRating: 4.6,
        ownerRatingCount: 10,
        location: "Berkeley",
        image: "bg-accent/10",
        createdAt: new Date().toISOString(),
      },
      {
        id: "6",
        name: "Drone Pro Max",
        description: "Professional-grade drone with 4K camera and long battery life.",
        category: "Tech",
        condition: "Like New",
        status: "available" as const,
        ownerId: "5",
        ownerEmail: "riley@example.com",
        ownerName: "Riley Johnson",
        ownerRating: 5.0,
        ownerRatingCount: 20,
        location: "Palo Alto",
        image: "bg-secondary/10",
        createdAt: new Date().toISOString(),
      },
    ]

    this.saveItems(defaultItems)
    return defaultItems
  }

  // Get all items
  async getAllItems(): Promise<ItemsResponse> {
    await this.delay()

    const items = this.getItems()

    return {
      success: true,
      items,
    }
  }

  // Get items by user ID
  async getItemsByUserId(userId: string): Promise<ItemsResponse> {
    await this.delay()

    const items = this.getItems()
    const userItems = items.filter(item => item.ownerId === userId)

    return {
      success: true,
      items: userItems,
    }
  }

  // Get item by ID
  async getItemById(itemId: string): Promise<ItemsResponse> {
    await this.delay()

    const items = this.getItems()
    const item = items.find(i => i.id === itemId)

    if (!item) {
      return {
        success: false,
        message: "Item not found",
      }
    }

    return {
      success: true,
      item,
    }
  }

  // Create new item
  async createItem(
    itemData: Omit<Item, "id" | "createdAt" | "status" | "ownerRating" | "ownerRatingCount">
  ): Promise<ItemsResponse> {
    await this.delay()

    const items = this.getItems()

    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(),
      status: "available",
      ownerRating: 0,
      ownerRatingCount: 0,
      createdAt: new Date().toISOString(),
    }

    items.push(newItem)
    this.saveItems(items)

    return {
      success: true,
      item: newItem,
      message: "Item created successfully",
    }
  }

  // Update item
  async updateItem(itemId: string, updates: Partial<Item>): Promise<ItemsResponse> {
    await this.delay()

    const items = this.getItems()
    const itemIndex = items.findIndex(i => i.id === itemId)

    if (itemIndex === -1) {
      return {
        success: false,
        message: "Item not found",
      }
    }

    items[itemIndex] = { ...items[itemIndex], ...updates }
    this.saveItems(items)

    return {
      success: true,
      item: items[itemIndex],
      message: "Item updated successfully",
    }
  }

  // Delete item
  async deleteItem(itemId: string): Promise<ItemsResponse> {
    await this.delay()

    const items = this.getItems()
    const filteredItems = items.filter(i => i.id !== itemId)

    if (items.length === filteredItems.length) {
      return {
        success: false,
        message: "Item not found",
      }
    }

    this.saveItems(filteredItems)

    return {
      success: true,
      message: "Item deleted successfully",
    }
  }

  // Toggle item status
  async toggleItemStatus(itemId: string): Promise<ItemsResponse> {
    await this.delay()

    const items = this.getItems()
    const item = items.find(i => i.id === itemId)

    if (!item) {
      return {
        success: false,
        message: "Item not found",
      }
    }

    item.status = item.status === "available" ? "borrowed" : "available"
    this.saveItems(items)

    return {
      success: true,
      item,
      message: "Item status updated",
    }
  }

  // Search items
  async searchItems(query: string, category?: string): Promise<ItemsResponse> {
    await this.delay()

    const items = this.getItems()
    let filteredItems = items

    if (query) {
      const lowerQuery = query.toLowerCase()
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
      )
    }

    if (category && category !== "all") {
      filteredItems = filteredItems.filter(item => item.category === category)
    }

    return {
      success: true,
      items: filteredItems,
    }
  }
}

export const itemsService = new ItemsService()