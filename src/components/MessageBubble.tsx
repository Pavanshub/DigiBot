

import { Bot, User } from 'lucide-react';
import type { Message } from '../types/chat';
import { Avatar, AvatarFallback } from './ui/avatar';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex gap-3 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[70%] ${isBot ? 'order-2' : 'order-1'}`}>
        <div
          className={`p-3 rounded-lg shadow-sm ${
            isBot
              ? 'bg-muted text-muted-foreground rounded-tl-none'
              : 'bg-primary text-primary-foreground rounded-tr-none'
          }`}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1 px-1">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
      
      {!isBot && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
