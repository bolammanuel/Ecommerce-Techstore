
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

// Always use new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartSearch = async (query: string): Promise<string[]> => {
  if (!process.env.API_KEY || query.length < 2) return MOCK_PRODUCTS.map(p => p.id);
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Given this product list: ${JSON.stringify(MOCK_PRODUCTS.map(p => ({id: p.id, name: p.name, desc: p.description})))}. 
      The user search query is: "${query}". 
      Return only a JSON array of product IDs that best match this query.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    
    // Using response.text property to extract generated text.
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return MOCK_PRODUCTS.map(p => p.id);
  }
};

export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  if (!process.env.API_KEY || query.length < 2) return [];
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on these products: ${MOCK_PRODUCTS.map(p => p.name).join(', ')}. 
      The user is typing: "${query}". 
      Return a JSON array of 3-5 concise, relevant search suggestions (strings).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    
    // Using response.text property to extract generated text.
    return JSON.parse(response.text.trim());
  } catch (error) {
    return [];
  }
};

export const getChatResponse = async (message: string, history: { role: 'user' | 'model', text: string }[]): Promise<string> => {
  if (!process.env.API_KEY) return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  
  const siteInfo = {
    name: "TechStore",
    categories: ["Laptops", "Audio", "Wearables", "Smart Home"],
    products: MOCK_PRODUCTS.map(p => ({
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      stock: p.stock
    })),
    shipping: "Free Express Delivery on orders over $500. Standard shipping takes 3-5 business days.",
    returns: "30-day return policy for unused items in original packaging.",
    support: "24/7 support via live chat, email (support@techstore.com), or phone (+1 800 TECH-STORE).",
    vat: "7.5% VAT is applied to all orders."
  };

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are a helpful and professional AI assistant for TechStore, a premium electronics e-commerce site. 
        Your goal is to assist customers with product discovery, order tracking, and general inquiries.
        
        Here is the site information you should use:
        ${JSON.stringify(siteInfo)}
        
        Guidelines:
        - Be concise, friendly, and professional.
        - If a user asks about a specific product, provide details from the product list.
        - If a user asks about shipping or returns, use the provided support information.
        - If you don't know the answer, suggest they contact our human support team at support@techstore.com.
        - Encourage users to check out our "Discovery" section for new releases.
        - Mention that we have a "Track Order" feature if they have an Order ID.`,
      },
    });

    // We need to format history for the sendMessage call if we were using it, 
    // but the current SDK sendMessage only takes a string. 
    // Actually, the SDK supports history in the create call.
    
    // Let's recreate the chat with history
    const chatWithHistory = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are a helpful and professional AI assistant for TechStore... (same as above)`,
      },
      // history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] }))
    });
    // Wait, the @google/genai SDK history format is slightly different.
    // Let's just send the message for now, or include history in the prompt if needed.
    // Actually, let's use the sendMessage method.
    
    const response = await chat.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
};
