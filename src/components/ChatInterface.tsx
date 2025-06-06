import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { ApiKeyInput } from './ApiKeyInput';
import { ThemeToggle } from './ThemeToggle';
import { Message } from '@/types/chat';
import { findBestMatch } from '@/data/fallbackFaqs';
import { openaiService } from '@/services/openaiService';
import { useSpeech } from '@/hooks/useSpeech';

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Hi! I'm DigiBot, your digital literacy assistant! I can help you learn how to use WhatsApp, Paytm, Google Maps, and other digital tools. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { speak, stop, isSpeaking, isSupported } = useSpeech();

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleApiKeySet = (apiKey: string) => {
    console.log('Setting OpenAI API key in ChatInterface');
    openaiService.setApiKey(apiKey);
    setHasApiKey(true);
    localStorage.setItem('digibot-openai-key', apiKey);
    localStorage.setItem('digibot-has-api-key', 'true');
  };

  useEffect(() => {
    const savedApiKey = localStorage.getItem('digibot-openai-key');
    const hasKey = localStorage.getItem('digibot-has-api-key');
    
    if (savedApiKey && hasKey) {
      console.log('Loading saved OpenAI API key');
      openaiService.setApiKey(savedApiKey);
      setHasApiKey(true);
    }
  }, []);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    console.log('Generating bot response for:', userMessage);
    
    // Try OpenAI first if API key is available
    if (hasApiKey) {
      try {
        console.log('Attempting OpenAI API call...');
        const response = await openaiService.generateResponse(userMessage);
        console.log('OpenAI API success:', response);
        return response;
      } catch (error) {
        console.error('OpenAI API error, falling back to FAQs:', error);
        // Fall back to local FAQs
      }
    } else {
      console.log('No API key, using FAQs');
    }

    // Use fallback FAQs
    const faqMatch = findBestMatch(userMessage);
    
    if (faqMatch) {
      console.log('Found FAQ match:', faqMatch.question);
      return faqMatch.answer;
    }

    return "🤔 I understand you're asking about digital tools, but I don't have a specific answer for that question. Here are some topics I can help you with:\n\n📱 WhatsApp: Sending messages, making calls, sharing files\n💳 Paytm: Making payments, checking balance, QR codes\n🗺️ Google Maps: Getting directions, finding places\n\nPlease ask me something more specific about these apps, and I'll be happy to help! 😊";
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(async () => {
      try {
        const botResponse = await generateBotResponse(content);
        
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Auto-speak if enabled
        if (autoSpeak && isSupported) {
          setTimeout(() => speak(botResponse), 500);
        }
      } catch (error) {
        console.error('Error generating response:', error);
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "😅 Sorry, I'm having trouble right now. Please try asking me about WhatsApp, Paytm, or Google Maps!",
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 1000 + Math.random() * 1000);
  };

  if (!hasApiKey) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            DigiBot
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Your friendly digital literacy assistant. Learn how to use WhatsApp, Paytm, Google Maps, and other essential digital tools with step-by-step guidance.
          </p>
        </div>
        
        <ApiKeyInput onApiKeySet={handleApiKeySet} />
        
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setHasApiKey(true)}
            className="mt-4"
          >
            Continue without AI (Use FAQs only)
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            You can still use DigiBot with our built-in FAQ responses
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col shadow-lg">
      <div className="p-4 border-b bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-xl">🤖</span>
              DigiBot - Digital Literacy Assistant
            </h2>
            <p className="text-sm opacity-90 mt-1">Learn WhatsApp, Paytm, Google Maps & more!</p>
          </div>
          <div className="flex items-center gap-2">
            {isSupported && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (isSpeaking) {
                    stop();
                  } else {
                    setAutoSpeak(!autoSpeak);
                  }
                }}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                title={autoSpeak ? "Disable auto-speech" : "Enable auto-speech"}
              >
                {autoSpeak || isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </ScrollArea>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </Card>
  );
};
