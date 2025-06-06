
interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIService {
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
    console.log('OpenAI API Key set:', key ? 'Yes' : 'No');
  }

  async generateResponse(message: string): Promise<string> {
    if (!this.apiKey) {
      console.log('No OpenAI API key available');
      throw new Error('OpenAI API key not set');
    }

    console.log('Making API call to OpenAI with message:', message);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'system',
            content: 'You are DigiBot, a friendly digital literacy assistant. Help users learn how to use WhatsApp, Paytm, Google Maps, and other digital tools. Provide step-by-step guidance with emojis. Keep responses concise and helpful.'
          }, {
            role: 'user',
            content: message
          }],
          temperature: 0.7,
          max_tokens: 1024
        })
      });

      console.log('OpenAI API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API Error:', response.status, errorText);
        throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
      }

      const data: OpenAIResponse = await response.json();
      console.log('OpenAI API Response data:', data);
      
      const result = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      console.log('Generated response:', result);
      
      return result;
    } catch (error) {
      console.error('Error in OpenAI generateResponse:', error);
      throw error;
    }
  }
}

export const openaiService = new OpenAIService();
