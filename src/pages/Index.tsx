import { ChatInterface } from "../components/ChatInterface";
import { ThemeProvider } from "../components/ThemeProvider";



const Index = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="digibot-ui-theme">
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <ChatInterface />
          
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>💡 Try asking: "How do I send a WhatsApp message?" or "How to pay with Paytm?"</p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
