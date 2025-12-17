import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Check, X } from "lucide-react"

interface CartItem {
  id: number
  name: string
  quantity: number
  price: number
  image: string
}

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  shipping: number
  discount?: number
}

// Valid promo codes
const PROMO_CODES: Record<string, number> = {
  "test": 500,
}

export function OrderSummary({ items, subtotal, shipping, discount: initialDiscount = 0 }: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoError, setPromoError] = useState("")
  const [promoSuccess, setPromoSuccess] = useState("")

  const totalDiscount = initialDiscount + promoDiscount
  const total = subtotal + shipping - totalDiscount

  const handleApplyPromo = () => {
    const code = promoCode.trim().toLowerCase()
    
    if (!code) {
      setPromoError("Please enter a promo code")
      setPromoSuccess("")
      return
    }

    if (appliedPromo) {
      setPromoError("A promo code is already applied")
      setPromoSuccess("")
      return
    }

    if (PROMO_CODES[code]) {
      setPromoDiscount(PROMO_CODES[code])
      setAppliedPromo(code)
      setPromoSuccess(`Promo code applied! You saved Rs. ${PROMO_CODES[code].toLocaleString()}`)
      setPromoError("")
      setPromoCode("")
    } else {
      setPromoError("Invalid promo code")
      setPromoSuccess("")
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoDiscount(0)
    setPromoSuccess("")
    setPromoError("")
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 px-5 py-4">
        <div className="flex items-center gap-2 text-white">
          <ShoppingCart className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Order Summary</h2>
        </div>
      </div>

      {/* Items */}
      <div className="p-5 max-h-64 overflow-y-auto scrollbar-hide">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border border-slate-200"
                />
                <span className="absolute -top-2 -right-2 bg-pharmacy-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-slate-800 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-sm font-semibold text-slate-800">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Totals */}
      <div className="p-5 space-y-3 bg-slate-50">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-medium text-slate-800">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Shipping</span>
          <span className="font-medium text-slate-800">
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `Rs. ${shipping.toLocaleString()}`
            )}
          </span>
        </div>
        {totalDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Discount</span>
            <span className="font-medium text-green-600">- Rs. {totalDiscount.toLocaleString()}</span>
          </div>
        )}
        <Separator />
        <div className="flex justify-between items-center pt-1">
          <span className="text-base font-semibold text-slate-800">Total</span>
          <span className="text-xl font-bold text-pharmacy-700">
            Rs. {total.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-slate-500 text-right">
          (Inclusive of all taxes)
        </p>
      </div>

      {/* Promo Code */}
      <div className="p-5 border-t border-slate-200">
        {appliedPromo ? (
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Code "{appliedPromo.toUpperCase()}" applied
                </p>
                <p className="text-xs text-green-600">
                  You save Rs. {promoDiscount.toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleRemovePromo}
              className="p-1 hover:bg-green-100 rounded transition-colors"
            >
              <X className="w-4 h-4 text-green-600" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value)
                  setPromoError("")
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                placeholder="Promo code"
                className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pharmacy-500 focus:border-transparent"
              />
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-pharmacy-100 text-pharmacy-700 text-sm font-medium rounded-md hover:bg-pharmacy-200 transition-colors"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <X className="w-3 h-3" />
                {promoError}
              </p>
            )}
            {promoSuccess && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <Check className="w-3 h-3" />
                {promoSuccess}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Security Badge */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-md border border-green-200">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="text-xs font-medium text-green-700">
            Secure Checkout - SSL Encrypted
          </span>
        </div>
      </div>
    </div>
  )
}
