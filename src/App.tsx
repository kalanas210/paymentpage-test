import { useState } from "react"
import { CheckoutPage } from "@/components/CheckoutPage"
import { PaymentPage } from "@/components/PaymentPage"

type Page = "checkout" | "payment"

function App() { // basic checkout page without payhere intergration
  const [currentPage, setCurrentPage] = useState<Page>("checkout")
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 4600,
    shipping: 0,
    discount: 0,
    total: 4600,
  })

  const handleContinueToPayment = (summary: typeof orderSummary) => {
    setOrderSummary(summary)
    setCurrentPage("payment")
    window.scrollTo(0, 0)
  }

  const handleBackToCheckout = () => { // handle checkout
    setCurrentPage("checkout")
    window.scrollTo(0, 0)
  }

  if (currentPage === "payment") {
    return (
      <PaymentPage
        onBack={handleBackToCheckout}
        orderSummary={orderSummary}
      />
    )
  }

  return (
    <CheckoutPage
      onContinueToPayment={handleContinueToPayment}
    />
  )
}

export default App
