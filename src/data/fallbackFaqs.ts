import type { FaqItem } from "../types/chat";


export const fallbackFaqs: FaqItem[] = [
  {
    question: "How do I send a message on WhatsApp?",
    answer: "📱 To send a message on WhatsApp:\n\n1. Open WhatsApp on your phone\n2. Tap on the chat with the person you want to message\n3. Type your message in the text box at the bottom\n4. Tap the send button (arrow icon) or press Enter\n\n💡 Tip: You can also send voice messages by holding the microphone icon!",
    keywords: ["whatsapp", "message", "send", "chat", "text"]
  },
  {
    question: "How do I make a payment using Paytm?",
    answer: "💳 To make a payment with Paytm:\n\n1. Open the Paytm app\n2. Tap 'Scan & Pay' or 'Send Money'\n3. Enter the recipient's phone number or scan their QR code\n4. Enter the amount you want to send\n5. Add a note (optional)\n6. Tap 'Proceed' and enter your PIN\n7. Confirm the payment\n\n🔒 Always verify the recipient details before confirming!",
    keywords: ["paytm", "payment", "money", "send", "pay", "transaction"]
  },
  {
    question: "How do I search for directions on Google Maps?",
    answer: "🗺️ To get directions on Google Maps:\n\n1. Open Google Maps app\n2. Tap the search bar at the top\n3. Type your destination address or place name\n4. Tap on the correct location from the suggestions\n5. Tap the 'Directions' button\n6. Choose your mode of transport (car, walking, public transit)\n7. Tap 'Start' to begin navigation\n\n📍 Tip: You can also tap and hold on the map to set a destination!",
    keywords: ["google maps", "directions", "navigation", "location", "map", "route"]
  },
  {
    question: "How do I video call someone on WhatsApp?",
    answer: "📹 To make a video call on WhatsApp:\n\n1. Open WhatsApp\n2. Go to the chat with the person you want to call\n3. Tap the video camera icon at the top right\n4. Wait for them to answer\n\n👥 For group video calls:\n1. Open a group chat\n2. Tap the video camera icon\n3. Select up to 7 people to call\n4. Tap 'Call'",
    keywords: ["whatsapp", "video call", "call", "video", "camera"]
  },
  {
    question: "How do I check my Paytm balance?",
    answer: "💰 To check your Paytm wallet balance:\n\n1. Open the Paytm app\n2. Log in with your mobile number and password\n3. Your wallet balance will be displayed on the home screen\n4. You can also tap on 'My Paytm' to see detailed balance\n\n📊 You can also check transaction history by tapping on 'Passbook' or 'Transaction History'",
    keywords: ["paytm", "balance", "wallet", "money", "check", "amount"]
  }
];

export const findBestMatch = (query: string): FaqItem | null => {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(' ');
  
  let bestMatch: FaqItem | null = null;
  let maxScore = 0;
  
  for (const faq of fallbackFaqs) {
    let score = 0;
    
    // Check how many keywords match
    for (const keyword of faq.keywords) {
      if (queryLower.includes(keyword)) {
        score += 2;
      }
    }
    
    // Check for partial matches in individual words
    for (const word of words) {
      if (word.length > 2) {
        for (const keyword of faq.keywords) {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 1;
          }
        }
      }
    }
    
    if (score > maxScore && score > 0) {
      maxScore = score;
      bestMatch = faq;
    }
  }
  
  return bestMatch;
};
