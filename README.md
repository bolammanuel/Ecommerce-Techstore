# TechStore - Premium Electronics

TechStore is a modern, high-end electronics e-commerce platform designed for a seamless and premium shopping experience. Built with performance and user experience in mind, it features a clean, professional aesthetic and advanced AI integrations.

## AI Features

TechStore leverages the power of Google's **Gemini 3 Flash** model to provide an intelligent and interactive shopping experience.

### AI Chat Assistant
Our professional AI assistant is more than just a chatbot. It's a shopping concierge that can:
- **Product Discovery**: Help you find the perfect laptop, audio gear, or smart home device based on your needs.
- **Add to Cart**: Simply ask the assistant to "add the MacBook Pro to my cart," and it will handle it for you instantly.
- **Order Tracking**: Provide real-time updates on your shipment if you have an Order ID.
- **Support**: Answer questions about shipping, returns, and VAT with precision.

### Smart Search & Suggestions
- **AI-Driven Search**: Uses Gemini to understand the intent behind your search queries, providing more accurate results than traditional keyword matching.
- **Dynamic Suggestions**: Offers real-time, AI-generated search suggestions as you type.

## AI Model Used
This application is powered by **Gemini 3 Flash** (`gemini-3-flash-preview`). This model was selected for its:
- **Speed**: Low-latency responses for a smooth chat experience.
- **Reasoning**: Advanced understanding of product catalogs and user intent.
- **Function Calling**: Seamless integration with the store's "Add to Cart" functionality.

## Tech Stack
- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS (Modern Utility-First)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Payment**: Paystack Integration
- **State Management**: React Hooks (useState, useMemo, useEffect) with LocalStorage persistence.

## Key Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Shopping Cart**: Real-time calculations with VAT (7.5%) and persistent storage.
- **Wishlist**: Save your favorite items for later.
- **Order Tracking**: A dedicated module to track your order status from "Placed" to "Delivered".
- **Secure Checkout**: Integrated with Paystack for safe and reliable transactions.
- **Product Reviews**: Customer feedback system with rating summaries.

## Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment variables**: Create a `.env` file with:
   - `VITE_GEMINI_API_KEY`: Your Google Gemini API Key.
   - `VITE_PAYSTACK_PUBLIC_KEY`: Your Paystack Public Key.
4. **Run the app**: `npm run dev`
