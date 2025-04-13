
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from '@/components/ui/use-toast';
import {
  Search,
  Send,
  User,
  Bot,
  X,
  ChevronRight,
  ChevronDown,
  Award,
  Users
} from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you with your career today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages update
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = { text: input, sender: "user" };
      setMessages([...messages, newMessage]);
      setInput("");

      // Simulate bot response (replace with actual AI logic)
      setTimeout(() => {
        const botResponse = {
          text: generateBotResponse(input),
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 500);
    }
  };

  const generateBotResponse = (userMessage: string) => {
    // Basic keyword-based responses
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("resume")) {
      return "I can help you create a professional resume. What kind of job are you targeting?";
    } else if (lowerCaseMessage.includes("career path")) {
      return "I can provide insights into various career paths. What field are you interested in?";
    } else if (lowerCaseMessage.includes("skills")) {
      return "I can analyze the skills you have and suggest potential career matches.";
    } else {
      return "I'm here to help with career advice, resume building, and job searching. How can I assist you further?";
    }
  };

  const clearChat = () => {
    setMessages([{ text: "Hello! How can I assist you with your career today?", sender: "bot" }]);
    toast({
      title: "Chat cleared",
      description: "Your conversation has been reset."
    });
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <div className="bg-careerblue-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="text-careerblue-600 h-6 w-6" />
              <h2 className="text-lg font-semibold text-careerblue-800">
                Career Assistant
              </h2>
            </div>
            <Button variant="ghost" size="icon" onClick={clearChat}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <CardContent className="p-4">
            <ScrollArea className="h-96 pr-4">
              <div className="space-y-3 mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`${message.sender === "user"
                        ? "bg-careerblue-100 text-careerblue-800"
                        : "bg-gray-100 text-gray-800"
                        } rounded-xl px-4 py-2 max-w-[80%] break-words`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Textarea
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 min-h-[80px] sm:min-h-[50px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button variant="career" onClick={sendMessage} className="self-end">
                <Send className="h-5 w-5 mr-2" />
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
