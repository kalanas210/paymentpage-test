import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
  Pill,
  Phone,
  CreditCard,
  Banknote,
  ShieldCheck,
  Lock,
  Truck,
  Building,
  Copy,
  Check,
  X,
  MessageCircle,
} from "lucide-react"

interface PaymentPageProps {
  onBack: () => void
  orderSummary: {
    subtotal: number
    shipping: number
    discount: number
    total: number
  }
}

// Bank details
const bankDetails = {
  bankName: "Bank of Ceylon",
  accountName: "MediCare Pharmacy (Pvt) Ltd",
  accountNumber: "85674523120",
  branch: "Colombo Main Branch",
  swiftCode: "BABORLMCXXX",
}

export function PaymentPage({ onBack, orderSummary }: PaymentPageProps) {
  const [selectedPayment, setSelectedPayment] = useState<"payhere" | "stripe" | "cod" | "bank" | null>(null)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [showBankTransferModal, setShowBankTransferModal] = useState(false)

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      alert("Please select a payment method")
      return
    }
    
    if (selectedPayment === "bank") {
      setShowBankTransferModal(true)
      return
    }
    
    // Here you would integrate with actual payment gateways
    alert(`Order placed successfully with ${selectedPayment.toUpperCase()}!`)
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi MediCare Pharmacy! 👋\n\n` +
      `I've made a bank transfer payment for my order.\n\n` +
      `💰 Order Total: Rs. ${orderSummary.total.toLocaleString()}\n` +
      `🏦 Transferred to: ${bankDetails.accountNumber}\n\n` +
      `Please find my payment slip attached.\n\n` +
      `Thank you! 🙏`
    )
    window.open(`https://wa.me/94779898765?text=${message}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Bank Transfer Modal */}
      {showBankTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Order Confirmed!</h3>
                    <p className="text-pharmacy-100 text-sm">One more step to complete</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBankTransferModal(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">
                  Complete Your Bank Transfer
                </h4>
                <p className="text-sm text-slate-600">
                  Please send your payment slip via WhatsApp for verification
                </p>
              </div>

              {/* Order Amount */}
              <div className="bg-pharmacy-50 rounded-lg p-4 mb-6 border border-pharmacy-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-pharmacy-700">Amount to Transfer:</span>
                  <span className="text-xl font-bold text-pharmacy-700">
                    Rs. {orderSummary.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pharmacy-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-pharmacy-700">1</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Transfer <strong>Rs. {orderSummary.total.toLocaleString()}</strong> to our bank account
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pharmacy-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-pharmacy-700">2</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Take a screenshot or photo of your payment slip
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pharmacy-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-pharmacy-700">3</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Click the button below to send via WhatsApp
                  </p>
                </div>
              </div>

              {/* WhatsApp Button */}
              <Button
                onClick={openWhatsApp}
                className="w-full h-12 bg-green-500 hover:bg-green-600 text-white font-semibold text-base shadow-lg shadow-green-500/30 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Slip via WhatsApp
              </Button>

              <p className="text-xs text-slate-500 text-center mt-4">
                Our team will verify your payment and process your order within 30 minutes
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pharmacy-500 to-pharmacy-700 rounded-xl flex items-center justify-center shadow-md">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-pharmacy-600 to-pharmacy-800 bg-clip-text text-transparent">
                  MediCare
                </span>
                <span className="text-xs text-slate-500 block -mt-1">Pharmacy</span>
              </div>
            </div>

            {/* Phone Number */}
            <a href="tel:+94779898765" className="flex items-center gap-2 text-pharmacy-600 hover:text-pharmacy-700 transition-colors">
              <Phone className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">+94 77 98 98765</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-pharmacy-600 hover:text-pharmacy-700 mb-6 text-sm font-medium transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to information
        </button>

        {/* Checkout Progress */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pharmacy-600 text-white flex items-center justify-center text-sm font-medium">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-pharmacy-700">Cart</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pharmacy-600 text-white flex items-center justify-center text-sm font-medium">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-pharmacy-700">Information</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pharmacy-600 text-white flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="text-sm font-medium text-pharmacy-700">Payment</span>
            </div>
          </div>

          {/* Secure Checkout Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium text-green-700">Secure Payment</span>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Payment Methods */}
            <Card className="mb-6 border-0 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Payment Method</h2>
                    <p className="text-pharmacy-100 text-sm">Choose how you'd like to pay</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* PayHere Option */}
                  <div
                    onClick={() => setSelectedPayment("payhere")}
                    className={`relative flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPayment === "payhere"
                        ? "border-pharmacy-500 bg-pharmacy-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === "payhere"
                          ? "border-pharmacy-600"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedPayment === "payhere" && (
                        <div className="w-3 h-3 rounded-full bg-pharmacy-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">PayHere</span>
                      </div>
                      <div>
                        <p className={`font-medium ${
                          selectedPayment === "payhere" ? "text-pharmacy-700" : "text-slate-700"
                        }`}>
                          PayHere
                        </p>
                        <p className="text-sm text-slate-500">
                          Pay with Visa, MasterCard, or local bank cards
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
                    </div>
                    {selectedPayment === "payhere" && (
                      <CheckCircle2 className="w-5 h-5 text-pharmacy-600" />
                    )}
                  </div>

                  {/* Stripe Option */}
                  <div
                    onClick={() => setSelectedPayment("stripe")}
                    className={`relative flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPayment === "stripe"
                        ? "border-pharmacy-500 bg-pharmacy-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === "stripe"
                          ? "border-pharmacy-600"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedPayment === "stripe" && (
                        <div className="w-3 h-3 rounded-full bg-pharmacy-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Stripe</span>
                      </div>
                      <div>
                        <p className={`font-medium ${
                          selectedPayment === "stripe" ? "text-pharmacy-700" : "text-slate-700"
                        }`}>
                          Credit / Debit Card (Stripe)
                        </p>
                        <p className="text-sm text-slate-500">
                          Secure payment with international cards
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
                    </div>
                    {selectedPayment === "stripe" && (
                      <CheckCircle2 className="w-5 h-5 text-pharmacy-600" />
                    )}
                  </div>

                  {/* Bank Transfer Option */}
                  <div
                    onClick={() => setSelectedPayment("bank")}
                    className={`relative flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPayment === "bank"
                        ? "border-pharmacy-500 bg-pharmacy-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === "bank"
                          ? "border-pharmacy-600"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedPayment === "bank" && (
                        <div className="w-3 h-3 rounded-full bg-pharmacy-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className={`font-medium ${
                          selectedPayment === "bank" ? "text-pharmacy-700" : "text-slate-700"
                        }`}>
                          Bank Transfer
                        </p>
                        <p className="text-sm text-slate-500">
                          Direct bank transfer to our account
                        </p>
                      </div>
                    </div>
                    {selectedPayment === "bank" && (
                      <CheckCircle2 className="w-5 h-5 text-pharmacy-600" />
                    )}
                  </div>

                  {/* COD Option */}
                  <div
                    onClick={() => setSelectedPayment("cod")}
                    className={`relative flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPayment === "cod"
                        ? "border-pharmacy-500 bg-pharmacy-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedPayment === "cod"
                          ? "border-pharmacy-600"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedPayment === "cod" && (
                        <div className="w-3 h-3 rounded-full bg-pharmacy-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-16 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <Banknote className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className={`font-medium ${
                          selectedPayment === "cod" ? "text-pharmacy-700" : "text-slate-700"
                        }`}>
                          Cash on Delivery (COD)
                        </p>
                        <p className="text-sm text-slate-500">
                          Pay when you receive your order
                        </p>
                      </div>
                    </div>
                    {selectedPayment === "cod" && (
                      <CheckCircle2 className="w-5 h-5 text-pharmacy-600" />
                    )}
                  </div>
                </div>

                {/* Card Details for Stripe */}
                {selectedPayment === "stripe" && (
                  <div className="mt-6 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-600" />
                      Enter Card Details
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName" className="text-slate-700 font-medium">
                          Cardholder Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber" className="text-slate-700 font-medium">
                          Card Number <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                            className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500 pr-20"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/50px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 object-contain opacity-50" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/50px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4 object-contain opacity-50" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry" className="text-slate-700 font-medium">
                            Expiry Date <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
                            maxLength={5}
                            className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv" className="text-slate-700 font-medium">
                            CVV <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 4))}
                            maxLength={4}
                            type="password"
                            className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Details */}
                {selectedPayment === "bank" && (
                  <div className="mt-6 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <Building className="w-4 h-4 text-pharmacy-600" />
                      Bank Account Details
                    </h3>
                    <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                      {/* Bank Name */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">Bank Name</p>
                          <p className="text-sm font-medium text-slate-800">{bankDetails.bankName}</p>
                        </div>
                      </div>
                      
                      {/* Account Name */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">Account Name</p>
                          <p className="text-sm font-medium text-slate-800">{bankDetails.accountName}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(bankDetails.accountName, "accountName")}
                          className="p-2 hover:bg-slate-200 rounded-md transition-colors"
                        >
                          {copiedField === "accountName" ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                      </div>

                      {/* Account Number */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">Account Number</p>
                          <p className="text-sm font-bold text-pharmacy-700 font-mono">{bankDetails.accountNumber}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(bankDetails.accountNumber, "accountNumber")}
                          className="p-2 hover:bg-slate-200 rounded-md transition-colors"
                        >
                          {copiedField === "accountNumber" ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                      </div>

                      {/* Branch */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">Branch</p>
                          <p className="text-sm font-medium text-slate-800">{bankDetails.branch}</p>
                        </div>
                      </div>

                      {/* SWIFT Code */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">SWIFT Code</p>
                          <p className="text-sm font-medium text-slate-800 font-mono">{bankDetails.swiftCode}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(bankDetails.swiftCode, "swiftCode")}
                          className="p-2 hover:bg-slate-200 rounded-md transition-colors"
                        >
                          {copiedField === "swiftCode" ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          Send Payment Slip via WhatsApp
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          After making the transfer, click "Place Order" to get instructions on sending your payment slip via WhatsApp for verification.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PayHere Redirect Notice */}
                {selectedPayment === "payhere" && (
                  <div className="mt-6 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Secure PayHere Payment
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          You will be redirected to PayHere's secure payment gateway to complete your transaction. Supports all major Sri Lankan banks and cards.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* COD Notice */}
                {selectedPayment === "cod" && (
                  <div className="mt-6 pt-6 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <Truck className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">
                          Cash on Delivery
                        </p>
                        <p className="text-xs text-amber-600 mt-1">
                          Please have the exact amount ready. Our delivery partner will collect the payment when delivering your order. COD fee may apply.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Place Order Button - Mobile */}
            <div className="lg:hidden mb-6">
              <Button
                onClick={handlePlaceOrder}
                disabled={!selectedPayment}
                className="w-full h-12 bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 hover:from-pharmacy-700 hover:to-pharmacy-800 text-white font-semibold text-base shadow-lg shadow-pharmacy-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedPayment === "cod" ? "Place Order" : selectedPayment === "bank" ? "Place Order" : "Pay Now"}
                <span className="ml-2">Rs. {orderSummary.total.toLocaleString()}</span>
              </Button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-24">
              {/* Order Summary Card */}
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 px-5 py-4">
                  <h2 className="text-lg font-semibold text-white">Order Summary</h2>
                </div>
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium text-slate-800">Rs. {orderSummary.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Shipping</span>
                      <span className="font-medium text-slate-800">
                        {orderSummary.shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `Rs. ${orderSummary.shipping.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    {orderSummary.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Discount</span>
                        <span className="font-medium text-green-600">- Rs. {orderSummary.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-base font-semibold text-slate-800">Total</span>
                      <span className="text-xl font-bold text-pharmacy-700">
                        Rs. {orderSummary.total.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 text-right">
                      (Inclusive of all taxes)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Place Order Button - Desktop */}
              <div className="hidden lg:block mt-6">
                <Button
                  onClick={handlePlaceOrder}
                  disabled={!selectedPayment}
                  className="w-full h-12 bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 hover:from-pharmacy-700 hover:to-pharmacy-800 text-white font-semibold text-base shadow-lg shadow-pharmacy-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedPayment === "cod" ? "Place Order" : selectedPayment === "bank" ? "Place Order" : "Pay Now"}
                  <span className="ml-2">Rs. {orderSummary.total.toLocaleString()}</span>
                </Button>
              </div>

              {/* Security Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">100% Secure</p>
                    <p className="text-xs text-slate-500">Your data is protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                  <Lock className="w-5 h-5 text-pharmacy-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">SSL Encrypted</p>
                    <p className="text-xs text-slate-500">256-bit encryption</p>
                  </div>
                </div>
              </div>

              {/* Accepted Cards */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500 mb-3 text-center">We Accept</p>
                <div className="flex items-center justify-center gap-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/80px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/80px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/American_Express_logo_%282018%29.svg/80px-American_Express_logo_%282018%29.svg.png" alt="Amex" className="h-6 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-pharmacy-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-pharmacy-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-pharmacy-600 transition-colors">Refund Policy</a>
            </div>
            <p className="text-sm text-slate-500">
              © 2024 MediCare Pharmacy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
