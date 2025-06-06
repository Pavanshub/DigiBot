
# DigiBot - Digital Literacy Assistant 🤖

DigiBot is a friendly AI-powered chatbot designed to help users learn digital literacy skills. It provides step-by-step guidance for popular digital tools like WhatsApp, Paytm, Google Maps, and more.

## ✨ Features

- **AI-Powered Responses**: Uses OpenAI's GPT-3.5-turbo model for intelligent, contextual responses
- **Fallback FAQ System**: Built-in frequently asked questions for when AI is unavailable
- **Text-to-Speech**: Web Speech API integration with auto-speech toggle
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Local Storage**: Saves API key and preferences locally
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pavanshub/DigiBot.git
   cd digibot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:8080`

### Getting an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the API key (starts with `sk-...`)
5. Enter it in the DigiBot interface when prompted

> **Note**: Your API key is stored locally in your browser and is never sent to our servers.

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui base components
│   ├── ChatInterface.tsx    # Main chat interface
│   ├── MessageBubble.tsx    # Individual message display
│   ├── ChatInput.tsx        # Message input component
│   ├── ApiKeyInput.tsx      # API key input form
│   ├── ThemeToggle.tsx      # Dark/light mode toggle
│   ├── ThemeProvider.tsx    # Theme context provider
│   └── TypingIndicator.tsx  # Typing animation
├── services/            # API services
│   └── openaiService.ts     # OpenAI API integration
├── hooks/               # Custom React hooks
│   └── useSpeech.ts         # Text-to-speech functionality
├── data/                # Static data
│   └── fallbackFaqs.ts      # Fallback FAQ responses
├── types/               # TypeScript type definitions
│   └── chat.ts              # Chat-related types
├── pages/               # Route pages
│   ├── Index.tsx            # Main page
│   └── NotFound.tsx         # 404 page
└── lib/                 # Utility functions
    └── utils.ts             # General utilities
```

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Lucide React** - Icon library
- **OpenAI API** - AI-powered responses
- **Web Speech API** - Text-to-speech functionality

## 🎯 Key Components

### ChatInterface
The main component that handles the chat logic, API key management, and message flow.

### OpenAI Service
Handles communication with the OpenAI API:
- API key management
- Request formatting
- Error handling
- Response parsing

### Fallback FAQ System
Provides pre-written responses for common questions when AI is unavailable:
- WhatsApp usage
- Paytm payments
- Google Maps navigation
- Basic digital literacy topics

### Speech Integration
Text-to-speech functionality using the Web Speech API:
- Auto-speech toggle
- Manual speech controls
- Text cleaning for better pronunciation

## 🎨 UI Features

### Theme Support
- Light and dark modes
- System preference detection
- Persistent theme selection

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly controls

### Accessibility
- Keyboard navigation
- Screen reader support
- High contrast mode compatibility

## 🔧 Configuration

### Environment Variables
This project doesn't use environment variables. API keys are managed through the UI for security and flexibility.

### Customization
You can customize DigiBot by:

1. **Adding more FAQs**: Edit `src/data/fallbackFaqs.ts`
2. **Modifying the AI prompt**: Update the system message in `src/services/openaiService.ts`
3. **Changing themes**: Modify Tailwind configuration
4. **Adding new features**: Extend the component structure

## 📱 Usage Examples

### Basic Questions
- "How do I send a WhatsApp message?"
- "How to make a payment using Paytm?"
- "How do I get directions on Google Maps?"

### Advanced Queries
- "Show me step-by-step how to make a video call"
- "What's the difference between UPI and wallet payments?"
- "How do I share my location on Google Maps?"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

**API Key Not Working**
- Ensure your OpenAI API key is valid and has credits
- Check the browser console for error messages
- Verify the API key format (should start with `sk-`)

**Speech Not Working**
- Ensure your browser supports the Web Speech API
- Check microphone permissions
- Try a different browser (Chrome/Edge recommended)

**Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Update to latest Node.js version
- Check for TypeScript errors: `npm run type-check`

### Development Tips

- Use the browser developer tools to monitor API calls
- Check the console for detailed logging information
- Test on different devices and browsers
- Use the fallback FAQ mode for testing without API costs

## 🎉 Deployment

This project can be deployed on various platforms:

- **Vercel**: `npm run build` and deploy the `dist` folder
- **Netlify**: Connect your Git repository for automatic deployments
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 📞 Support

For support and questions:
- Check the troubleshooting section above
- Review the console logs for error details
- Create an issue in the repository
- Contact the development team

---

Made with ❤️ for digital literacy education
