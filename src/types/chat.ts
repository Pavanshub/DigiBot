export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface FaqItem {
  question: string;
  answer: string;
  keywords: string[];
}
