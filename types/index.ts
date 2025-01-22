export type FormattedCustomersTable = {
    id: string
    name: string
    email: string
    image_url: string
    total_invoices: number
    total_pending: string
    total_paid: string
  }
  export type CustomerField = {
    id: string
    name: string
  }
  export type InvoiceForm = {
    id: string
    customer_id: string
    amount: number
    status: 'pending' | 'paid'
  }

  export type EbusForm = {
    id: string
    license: string
    route: string
    total_passengers: number
    current_passengers: number
    discrepancy: number
    status: string
    dateRegistered: Date
  }