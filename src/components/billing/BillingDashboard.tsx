'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Download,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Receipt,
  Settings,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Star,
  Crown,
  Zap
} from 'lucide-react'

interface BillingDashboardProps {
  restaurant: any
}

interface Invoice {
  id: string
  number: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  plan: string
  period: string
  downloadUrl?: string
}

interface PaymentMethod {
  id: string
  type: 'card' | 'sepa' | 'paypal'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

const BillingDashboard = ({ restaurant }: BillingDashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'payment-methods' | 'plan'>('overview')
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock data
  useEffect(() => {
    const mockInvoices: Invoice[] = [
      {
        id: '1',
        number: 'INV-2024-001',
        date: '2024-01-15',
        amount: 49.00,
        status: 'paid',
        plan: 'Professional',
        period: 'Januar 2024'
      },
      {
        id: '2',
        number: 'INV-2023-089',
        date: '2023-12-15',
        amount: 49.00,
        status: 'paid',
        plan: 'Professional',
        period: 'Dezember 2023'
      },
      {
        id: '3',
        number: 'INV-2023-078',
        date: '2023-11-15',
        amount: 29.00,
        status: 'paid',
        plan: 'Starter',
        period: 'November 2023'
      }
    ]

    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: '1',
        type: 'card',
        brand: 'visa',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true
      },
      {
        id: '2',
        type: 'sepa',
        last4: '1234',
        isDefault: false
      }
    ]

    setInvoices(mockInvoices)
    setPaymentMethods(mockPaymentMethods)
  }, [])

  const currentPlan = {
    name: 'Professional',
    price: 49,
    billingCycle: 'monthly',
    nextBilling: '2024-02-15',
    status: 'active'
  }

  const tabs = [
    { id: 'overview', name: 'Übersicht', icon: Receipt },
    { id: 'invoices', name: 'Rechnungen', icon: Download },
    { id: 'payment-methods', name: 'Zahlungsmethoden', icon: CreditCard },
    { id: 'plan', name: 'Plan verwalten', icon: Settings }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-700 bg-green-100'
      case 'pending': return 'text-yellow-700 bg-yellow-100'
      case 'overdue': return 'text-red-700 bg-red-100'
      default: return 'text-neutral-700 bg-neutral-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'overdue': return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method.type) {
      case 'card':
        return <CreditCard className="w-5 h-5" />
      case 'sepa':
        return <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">S</div>
      case 'paypal':
        return <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
      default:
        return <CreditCard className="w-5 h-5" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-neutral-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Current Plan Card */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-semibold text-neutral-900">
                Aktueller Plan
              </h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${ 
                currentPlan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {currentPlan.status === 'active' ? <CheckCircle className="w-4 h-4 mr-1" /> : <AlertTriangle className="w-4 h-4 mr-1" />}
                {currentPlan.status === 'active' ? 'Aktiv' : 'Inaktiv'}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-display font-semibold text-neutral-900 mb-1">
                  {currentPlan.name}
                </h4>
                <p className="text-neutral-600 text-sm">
                  Ihr aktueller Plan
                </p>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-neutral-900 mb-1">
                  €{currentPlan.price}
                </div>
                <p className="text-neutral-600 text-sm">
                  pro Monat
                </p>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-lg font-semibold text-neutral-900 mb-1">
                  {formatDate(currentPlan.nextBilling)}
                </div>
                <p className="text-neutral-600 text-sm">
                  Nächste Abrechnung
                </p>
              </div>

              <div className="text-center lg:text-left">
                <button className="btn-outline w-full lg:w-auto">
                  <Settings className="w-4 h-4 mr-2" />
                  Plan ändern
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900 mb-1">
                {invoices.length}
              </div>
              <p className="text-neutral-600 text-sm">
                Rechnungen gesamt
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900 mb-1">
                €{invoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}
              </div>
              <p className="text-neutral-600 text-sm">
                Gezahlt insgesamt
              </p>
            </div>

            <div className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-2xl font-bold text-neutral-900 mb-1">
                {Math.floor((Date.now() - new Date('2023-08-15').getTime()) / (1000 * 60 * 60 * 24 * 30))}
              </div>
              <p className="text-neutral-600 text-sm">
                Monate als Kunde
              </p>
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-semibold text-neutral-900">
                Letzte Rechnungen
              </h3>
              <button
                onClick={() => setActiveTab('invoices')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Alle anzeigen →
              </button>
            </div>

            <div className="space-y-4">
              {invoices.slice(0, 3).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <Receipt className="w-5 h-5 text-neutral-600" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900">
                        {invoice.number}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {invoice.plan} • {invoice.period}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium text-neutral-900">
                        €{invoice.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {formatDate(invoice.date)}
                      </div>
                    </div>
                    
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="ml-1 capitalize">{invoice.status === 'paid' ? 'Bezahlt' : invoice.status}</span>
                    </div>

                    <button className="btn-outline btn-sm">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-semibold text-neutral-900">
              Alle Rechnungen
            </h3>
            <div className="flex items-center gap-3">
              <select className="input">
                <option>Alle Jahre</option>
                <option>2024</option>
                <option>2023</option>
              </select>
              <button className="btn-outline">
                <Download className="w-4 h-4 mr-2" />
                Alle exportieren
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 font-medium text-neutral-600">Rechnung</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-600">Datum</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-600">Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-neutral-600">Zeitraum</th>
                  <th className="text-right py-3 px-4 font-medium text-neutral-600">Betrag</th>
                  <th className="text-center py-3 px-4 font-medium text-neutral-600">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-neutral-600">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-neutral-100 hover:bg-neutral-50"
                  >
                    <td className="py-3 px-4">
                      <div className="font-medium text-neutral-900">
                        {invoice.number}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-600">
                      {formatDate(invoice.date)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {invoice.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-600">
                      {invoice.period}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-neutral-900">
                      €{invoice.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        <span className="ml-1 capitalize">
                          {invoice.status === 'paid' ? 'Bezahlt' : invoice.status}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button className="btn-outline btn-sm">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'payment-methods' && (
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-semibold text-neutral-900">
                Zahlungsmethoden
              </h3>
              <button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Hinzufügen
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    method.isDefault
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getPaymentMethodIcon(method)}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-neutral-900">
                            {method.type === 'card' && method.brand && (
                              <span className="capitalize">{method.brand}</span>
                            )}
                            {method.type === 'sepa' && 'SEPA Lastschrift'}
                            {method.type === 'paypal' && 'PayPal'}
                          </span>
                          {method.isDefault && (
                            <span className="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full font-medium">
                              Standard
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {method.type === 'card' && `•••• •••• •••• ${method.last4}`}
                          {method.type === 'sepa' && `DE•• •••• •••• ${method.last4}`}
                          {method.type === 'paypal' && 'PayPal Konto verknüpft'}
                        </div>
                        {method.type === 'card' && method.expiryMonth && method.expiryYear && (
                          <div className="text-xs text-neutral-500">
                            Gültig bis {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <button className="btn-outline btn-sm">
                          Standard setzen
                        </button>
                      )}
                      <button className="btn-outline btn-sm">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="btn-outline btn-sm text-red-600 hover:bg-red-50 hover:border-red-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">
                  Sichere Zahlungsabwicklung
                </h4>
                <p className="text-sm text-blue-800">
                  Alle Zahlungsdaten werden verschlüsselt über Stripe verarbeitet. Wir speichern keine Kreditkartendaten auf unseren Servern.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plan Management Tab */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          {/* Current Plan Overview */}
          <div className="card">
            <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
              Plan Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-4">Aktueller Plan</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Plan:</span>
                    <span className="font-medium">{currentPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Preis:</span>
                    <span className="font-medium">€{currentPlan.price}/Monat</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Abrechnung:</span>
                    <span className="font-medium capitalize">{currentPlan.billingCycle === 'monthly' ? 'Monatlich' : 'Jährlich'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Nächste Zahlung:</span>
                    <span className="font-medium">{formatDate(currentPlan.nextBilling)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900 mb-4">Nutzung</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-neutral-600">Restaurants</span>
                      <span>1 / 3</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-neutral-600">Menu Items</span>
                      <span>47 / ∞</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-display font-semibold text-neutral-900 mb-2">
                  Upgrade auf Enterprise
                </h4>
                <p className="text-neutral-600 text-sm mb-4">
                  Für größere Restaurant-Ketten mit erweiterten Features
                </p>
                <button className="btn-primary w-full">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgraden
                </button>
              </div>
            </div>

            <div className="card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-display font-semibold text-neutral-900 mb-2">
                  Jährlich wechseln
                </h4>
                <p className="text-neutral-600 text-sm mb-4">
                  Sparen Sie 2 Monate mit jährlicher Abrechnung
                </p>
                <button className="btn-outline w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Zu jährlich wechseln
                </button>
              </div>
            </div>
          </div>

          {/* Cancel Subscription */}
          <div className="card border-red-200 bg-red-50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 mb-2">
                  Abonnement kündigen
                </h4>
                <p className="text-red-800 text-sm mb-4">
                  Ihr Abonnement läuft bis zum {formatDate(currentPlan.nextBilling)} weiter. 
                  Nach der Kündigung verlieren Sie den Zugang zu allen Premium-Features.
                </p>
                <button className="btn-outline border-red-300 text-red-700 hover:bg-red-100">
                  Abonnement kündigen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BillingDashboard