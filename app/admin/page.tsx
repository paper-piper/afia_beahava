'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Check, X, Eye, EyeOff, Copy } from 'lucide-react'

interface Order {
  id: number
  name: string
  phone: string
  cake_type: string
  message: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

function AdminPageContent() {
  const searchParams = useSearchParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')
  const [copied, setCopied] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)
  const [confirmOrderId, setConfirmOrderId] = useState<number | null>(null)

  // Check if auto-login token is provided in URL
  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      const decodedPassword = Buffer.from(token, 'base64').toString('utf-8')
      if (decodedPassword === ADMIN_PASSWORD) {
        setIsAuthenticated(true)
      }
    }
  }, [searchParams])

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
      // Refresh every 30 seconds
      const interval = setInterval(fetchOrders, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('סיסמה שגויה')
    }
  }

  const getAdminLink = () => {
    const token = Buffer.from(ADMIN_PASSWORD).toString('base64')
    return `${window.location.origin}/admin?token=${token}`
  }

  const copyAdminLink = () => {
    const link = getAdminLink()
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      
      if (data.code === 'TABLE_NOT_FOUND') {
        setOrders([])
      } else if (response.ok) {
        setOrders(data.orders || [])
      } else {
        setOrders([])
      }
    } catch (error) {
      console.error('[v0] Error fetching orders:', error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const confirmOrder = async (orderId: number) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'confirmed' }),
      })

      if (!response.ok) throw new Error('Failed to confirm order')
      
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: 'confirmed' } : order
      ))
      setConfirmOrderId(null)
    } catch (error) {
      console.error('Error confirming order:', error)
      alert('שגיאה באישור ההזמנה')
    }
  }

  const deleteOrder = async (orderId: number) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete order')
      
      setOrders(orders.filter(order => order.id !== orderId))
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('שגיאה במחיקת ההזמנה')
    }
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'ממתין'
      case 'confirmed': return 'אושר'
      case 'completed': return 'הושלם'
      case 'cancelled': return 'בוטל'
      default: return status
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {!isAuthenticated ? (
        <div className="flex-1 py-8 flex items-center justify-center">
          <div className="w-full max-w-md mx-auto px-4">
            <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-foreground text-center mb-2">
                דשבורד מנהלים
              </h1>
              <p className="text-muted-foreground text-center mb-6">
                אנא הזינו את הסיסמה כדי לגשת לניהול ההזמנות
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="הזינו את הסיסמה"
                    className="w-full px-4 py-3 pr-10 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  כניסה
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 py-8">
          <div className="container mx-auto px-4">
            {/* Admin Link Section */}
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-foreground font-medium mb-3">
                קישור עם כניסה אוטומטית:
              </p>
              <div className="flex gap-2">
                <code className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm font-mono text-foreground break-all">
                  {getAdminLink()}
                </code>
                <Button
                  onClick={copyAdminLink}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'הועתק' : 'העתק'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                ש��חו קישור זה כדי להעניק גישה ישירה למנהלים אחרים
              </p>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                ניהול הזמנות
              </h1>
              <p className="text-muted-foreground">
                {orders.length} הזמנות בסך הכל
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground border border-border hover:border-primary'
                  }`}
                >
                  {status === 'all' ? 'הכל' : getStatusLabel(status)}
                </button>
              ))}
            </div>

            {/* Orders Table */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">טוען...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground">אין הזמנות</p>
              </div>
            ) : (
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">תאריך</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">שם</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">טלפון</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">סוג עוגה</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">הודעה</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">סטטוס</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                          <td className="px-4 py-3 text-sm text-foreground">
                            {new Date(order.created_at).toLocaleDateString('he-IL')}
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground font-medium">{order.name}</td>
                          <td className="px-4 py-3 text-sm">
                            <a 
                              href={`tel:${order.phone}`}
                              className="text-primary hover:underline"
                            >
                              {order.phone}
                            </a>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">{order.cake_type}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
                            {order.message}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusLabel(order.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              {order.status !== 'confirmed' ? (
                                <>
                                  <button
                                    onClick={() => setConfirmOrderId(order.id)}
                                    className="p-1.5 hover:bg-green-100 rounded transition-colors text-green-600"
                                    title="אשר הזמנה"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(order.id)}
                                    className="p-1.5 hover:bg-red-100 rounded transition-colors text-red-600"
                                    title="מחק הזמנה"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              ) : (
                                <span className="text-xs text-green-600 font-medium">הזמנה אושרה</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirm Order Modal */}
      {confirmOrderId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-sm w-full shadow-xl border border-border">
            <h3 className="text-lg font-bold text-foreground mb-2">
              אישור הזמנה
            </h3>
            <p className="text-muted-foreground mb-6">
              האם לאשר את ההזמנה? לאחר האישור לא ניתן יהיה למחוק אותה.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmOrderId(null)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
              >
                ביטול
              </button>
              <button
                onClick={() => confirmOrder(confirmOrderId)}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                אשר
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl p-6 max-w-sm w-full shadow-xl border border-border">
            <h3 className="text-lg font-bold text-foreground mb-2">
              מחיקת הזמנה
            </h3>
            <p className="text-muted-foreground mb-6">
              האם אתה בטוח שברצונך למחוק את ההזמנה? פעולה זו לא ניתנת לביטול.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
              >
                ביטול
              </button>
              <button
                onClick={() => deleteOrder(deleteConfirm)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                מחק
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">טוען...</p>
        </div>
      </main>
    }>
      <AdminPageContent />
    </Suspense>
  )
}
