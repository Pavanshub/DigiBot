
export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 mb-4 justify-start">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <div className="w-4 h-4 text-primary-foreground">🤖</div>
      </div>
      
      <div className="bg-muted text-muted-foreground p-3 rounded-lg rounded-tl-none">
        <div className="flex gap-1 items-center">
          <span className="text-sm">DigiBot is typing</span>
          <div className="flex gap-1 ml-2">
            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
