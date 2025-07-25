import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm here to help you with your real estate questions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickQuestions = [
    "Property search",
    "Home valuation", 
    "Schedule showing",
    "Market info"
  ];

  const botResponses = {
    "property search": "I'd be happy to help you search for properties! You can browse our current listings or tell me about your specific needs like location, price range, and property type.",
    "home valuation": "Great! We offer free home valuations. Our experts can provide you with a comprehensive market analysis. Would you like me to connect you with one of our agents?",
    "schedule showing": "Perfect! I can help you schedule a property showing. Which property are you interested in viewing? You can also contact us directly at (727) 555-0123.",
    "market info": "I can provide information about the St. Petersburg real estate market. Are you interested in a specific neighborhood or general market trends?",
    "default": "That's a great question! For detailed information, I'd recommend speaking with one of our expert agents. You can contact us at (727) 555-0123 or fill out our contact form."
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    trackEvent('chatbot_toggle', 'engagement', isOpen ? 'close' : 'open');
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = botResponses.default;
      
      for (const [key, value] of Object.entries(botResponses)) {
        if (key !== 'default' && lowerText.includes(key.replace(' ', ''))) {
          response = value;
          break;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      trackEvent('chatbot_interaction', 'engagement', 'message_sent');
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
    trackEvent('chatbot_quick_question', 'engagement', question);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <Card className="mb-4 w-80 sm:w-96 bg-white shadow-2xl border border-gray-200 animate-in slide-in-from-bottom-2">
          {/* Header */}
          <div className="bg-soft-blue text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold">Real Estate Assistant</h4>
                  <p className="text-xs text-gray-100">Online now</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleChat}
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-soft-blue rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div 
                  className={`max-w-xs p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-soft-blue text-white ml-8' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ml-3 flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex space-x-2 mb-3">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 text-sm focus:ring-2 focus:ring-soft-blue focus:border-soft-blue"
              />
              <Button 
                type="submit"
                size="sm"
                className="bg-soft-blue text-white hover:bg-ocean-blue px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            
            {/* Quick Questions */}
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}
      
      {/* Chat Toggle Button */}
      <Button
        onClick={toggleChat}
        className="w-16 h-16 bg-soft-blue text-white rounded-full shadow-lg hover:bg-ocean-blue transition-all duration-300 hover:scale-110 flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
