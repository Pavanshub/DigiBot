
import { useState } from 'react';

import { Send } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t bg-background">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask me about WhatsApp, Paytm, Google Maps..."
        disabled={disabled}
        className="flex-1"
      />
      <Button
        type="submit" 
        size="icon" 
        disabled={!message.trim() || disabled}
        className="shrink-0"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};
