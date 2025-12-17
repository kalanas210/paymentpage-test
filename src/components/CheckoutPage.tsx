import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrderSummary } from "./OrderSummary"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  CreditCard,
  ChevronRight,
  ShoppingBag,
  Truck,
  CheckCircle2,
  ArrowLeft,
  Pill,
  Package,
  Store,
} from "lucide-react"

// Pharmacy branches for pickup
const branches = [
  { id: "col-01", name: "MediCare Colombo - Fort", address: "45 York Street, Colombo 01" },
  { id: "col-03", name: "MediCare Colombo - Kollupitiya", address: "123 Galle Road, Colombo 03" },
  { id: "col-05", name: "MediCare Colombo - Bambalapitiya", address: "78 Duplication Road, Colombo 05" },
  { id: "col-07", name: "MediCare Colombo - Wellawatte", address: "234 Galle Road, Colombo 06" },
  { id: "gam-01", name: "MediCare Gampaha", address: "56 Colombo Road, Gampaha" },
  { id: "kan-01", name: "MediCare Kandy", address: "12 Peradeniya Road, Kandy" },
  { id: "gal-01", name: "MediCare Galle", address: "89 Main Street, Galle" },
  { id: "neg-01", name: "MediCare Negombo", address: "34 Lewis Place, Negombo" },
]

// Sri Lankan districts
const districts = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Mullaitivu",
  "Vavuniya",
  "Trincomalee",
  "Batticaloa",
  "Ampara",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle",
]

// Sample cart items
const sampleCartItems = [
  {
    id: 1,
    name: "Panadol Extra 500mg - 24 Tablets",
    quantity: 2,
    price: 450,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Vitamin C 1000mg - 60 Capsules",
    quantity: 1,
    price: 1200,
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "First Aid Kit - Complete Set",
    quantity: 1,
    price: 2500,
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=100&h=100&fit=crop",
  },
]

interface CheckoutPageProps {
  onContinueToPayment: (orderSummary: {
    subtotal: number
    shipping: number
    discount: number
    total: number
  }) => void
}

export function CheckoutPage({ onContinueToPayment }: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    district: "",
    postalCode: "",
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingApartment: "",
    billingCity: "",
    billingDistrict: "",
    billingPostalCode: "",
  })

  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [deliveryOption, setDeliveryOption] = useState<"delivery" | "pickup">("delivery")
  const [selectedBranch, setSelectedBranch] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const subtotal = sampleCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
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
        {/* Back to cart link */}
        <button className="flex items-center gap-2 text-pharmacy-600 hover:text-pharmacy-700 mb-6 text-sm font-medium transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to cart
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
              <div className="w-8 h-8 rounded-full bg-pharmacy-600 text-white flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="text-sm font-medium text-pharmacy-700">Information</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-slate-500">Payment</span>
            </div>
          </div>

          {/* Secure Checkout Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-xs font-medium text-green-700">Secure Checkout</span>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Contact Information */}
            <Card className="mb-6 border-0 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Contact Information</h2>
                    <p className="text-pharmacy-100 text-sm">We'll use this to send you order updates</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-700 font-medium">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-10 h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-700 font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-10 h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700 font-medium">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700 font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="077 123 4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="mb-6 border-0 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Shipping Address</h2>
                    <p className="text-pharmacy-100 text-sm">Where should we deliver your order?</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-slate-700 font-medium">
                      Street Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="address"
                        name="address"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="pl-10 h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apartment" className="text-slate-700 font-medium">
                      Apartment, Suite, etc. (optional)
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="apartment"
                        name="apartment"
                        placeholder="Apt 4B"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        className="pl-10 h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-slate-700 font-medium">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Colombo"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district" className="text-slate-700 font-medium">
                        District <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.district}
                        onValueChange={(value) => handleSelectChange("district", value)}
                      >
                        <SelectTrigger className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500">
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-slate-700 font-medium">
                        Postal Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        placeholder="00100"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card className="mb-6 border-0 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Billing Address</h2>
                    <p className="text-pharmacy-100 text-sm">Address for payment verification</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-5">
                  <Checkbox
                    id="sameAsShipping"
                    checked={sameAsShipping}
                    onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                    className="border-pharmacy-400 data-[state=checked]:bg-pharmacy-600 data-[state=checked]:border-pharmacy-600"
                  />
                  <Label
                    htmlFor="sameAsShipping"
                    className="text-sm font-medium text-slate-700 cursor-pointer"
                  >
                    Same as shipping address
                  </Label>
                </div>

                {!sameAsShipping && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="billingFirstName" className="text-slate-700 font-medium">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="billingFirstName"
                          name="billingFirstName"
                          placeholder="John"
                          value={formData.billingFirstName}
                          onChange={handleInputChange}
                          className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingLastName" className="text-slate-700 font-medium">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="billingLastName"
                          name="billingLastName"
                          placeholder="Doe"
                          value={formData.billingLastName}
                          onChange={handleInputChange}
                          className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress" className="text-slate-700 font-medium">
                        Street Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="billingAddress"
                        name="billingAddress"
                        placeholder="123 Main Street"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingApartment" className="text-slate-700 font-medium">
                        Apartment, Suite, etc. (optional)
                      </Label>
                      <Input
                        id="billingApartment"
                        name="billingApartment"
                        placeholder="Apt 4B"
                        value={formData.billingApartment}
                        onChange={handleInputChange}
                        className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="billingCity" className="text-slate-700 font-medium">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="billingCity"
                          name="billingCity"
                          placeholder="Colombo"
                          value={formData.billingCity}
                          onChange={handleInputChange}
                          className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingDistrict" className="text-slate-700 font-medium">
                          District <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.billingDistrict}
                          onValueChange={(value) =>
                            handleSelectChange("billingDistrict", value)
                          }
                        >
                          <SelectTrigger className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500">
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            {districts.map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingPostalCode" className="text-slate-700 font-medium">
                          Postal Code <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="billingPostalCode"
                          name="billingPostalCode"
                          placeholder="00100"
                          value={formData.billingPostalCode}
                          onChange={handleInputChange}
                          className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Option */}
            <Card className="mb-6 border-0 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Delivery Option</h2>
                    <p className="text-pharmacy-100 text-sm">How would you like to receive your order?</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Delivery Option */}
                  <div
                    onClick={() => setDeliveryOption("delivery")}
                    className={`relative flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      deliveryOption === "delivery"
                        ? "border-pharmacy-500 bg-pharmacy-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        deliveryOption === "delivery"
                          ? "border-pharmacy-600"
                          : "border-slate-300"
                      }`}
                    >
                      {deliveryOption === "delivery" && (
                        <div className="w-3 h-3 rounded-full bg-pharmacy-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        deliveryOption === "delivery" ? "bg-pharmacy-100" : "bg-slate-100"
                      }`}>
                        <Truck className={`w-5 h-5 ${
                          deliveryOption === "delivery" ? "text-pharmacy-600" : "text-slate-500"
                        }`} />
                      </div>
                      <div>
                        <p className={`font-medium ${
                          deliveryOption === "delivery" ? "text-pharmacy-700" : "text-slate-700"
                        }`}>
                          Home Delivery
                        </p>
                        <p className="text-sm text-slate-500">
                          Deliver to your shipping address
                        </p>
                      </div>
                    </div>
                    {deliveryOption === "delivery" && (
                      <CheckCircle2 className="w-5 h-5 text-pharmacy-600" />
                    )}
                  </div>

                  {/* Pickup Option */}
                  <div
                    onClick={() => setDeliveryOption("pickup")}
                    className={`relative flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      deliveryOption === "pickup"
                        ? "border-pharmacy-500 bg-pharmacy-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        deliveryOption === "pickup"
                          ? "border-pharmacy-600"
                          : "border-slate-300"
                      }`}
                    >
                      {deliveryOption === "pickup" && (
                        <div className="w-3 h-3 rounded-full bg-pharmacy-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        deliveryOption === "pickup" ? "bg-pharmacy-100" : "bg-slate-100"
                      }`}>
                        <Store className={`w-5 h-5 ${
                          deliveryOption === "pickup" ? "text-pharmacy-600" : "text-slate-500"
                        }`} />
                      </div>
                      <div>
                        <p className={`font-medium ${
                          deliveryOption === "pickup" ? "text-pharmacy-700" : "text-slate-700"
                        }`}>
                          Store Pickup
                        </p>
                        <p className="text-sm text-slate-500">
                          Pick up from a nearby branch
                        </p>
                      </div>
                    </div>
                    {deliveryOption === "pickup" && (
                      <CheckCircle2 className="w-5 h-5 text-pharmacy-600" />
                    )}
                  </div>

                  {/* Branch Selection - Only show when pickup is selected */}
                  {deliveryOption === "pickup" && (
                    <div className="mt-4 pt-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
                      <Label htmlFor="branch" className="text-slate-700 font-medium mb-2 block">
                        Select Pickup Branch <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={selectedBranch}
                        onValueChange={setSelectedBranch}
                      >
                        <SelectTrigger className="h-11 border-slate-300 focus:border-pharmacy-500 focus:ring-pharmacy-500">
                          <SelectValue placeholder="Choose a branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch.id} value={branch.id}>
                              <div className="flex flex-col">
                                <span className="font-medium">{branch.name}</span>
                                <span className="text-xs text-slate-500">{branch.address}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedBranch && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-start gap-2">
                            <Store className="w-4 h-4 text-green-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-green-800">
                                {branches.find(b => b.id === selectedBranch)?.name}
                              </p>
                              <p className="text-xs text-green-600">
                                {branches.find(b => b.id === selectedBranch)?.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Continue Button - Mobile */}
            <div className="lg:hidden mb-6">
              <Button 
                onClick={() => onContinueToPayment({
                  subtotal,
                  shipping: 0,
                  discount: 0,
                  total: subtotal,
                })}
                className="w-full h-12 bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 hover:from-pharmacy-700 hover:to-pharmacy-800 text-white font-semibold text-base shadow-lg shadow-pharmacy-500/30 transition-all duration-300"
              >
                Continue to Payment
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-24">
              <OrderSummary
                items={sampleCartItems}
                subtotal={subtotal}
                shipping={0}
                discount={0}
              />

              {/* Continue Button - Desktop */}
              <div className="hidden lg:block mt-6">
                <Button 
                  onClick={() => onContinueToPayment({
                    subtotal,
                    shipping: 0,
                    discount: 0,
                    total: subtotal,
                  })}
                  className="w-full h-12 bg-gradient-to-r from-pharmacy-600 to-pharmacy-700 hover:from-pharmacy-700 hover:to-pharmacy-800 text-white font-semibold text-base shadow-lg shadow-pharmacy-500/30 transition-all duration-300"
                >
                  Continue to Payment
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                  <Truck className="w-5 h-5 text-pharmacy-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">Free Delivery</p>
                    <p className="text-xs text-slate-500">On orders over Rs. 5,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                  <ShoppingBag className="w-5 h-5 text-pharmacy-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">Easy Returns</p>
                    <p className="text-xs text-slate-500">30-day return policy</p>
                  </div>
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

