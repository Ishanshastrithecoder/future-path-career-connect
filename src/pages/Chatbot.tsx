
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Send, User, Bot } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const startingQuestions = [
  "What career paths match my skills?",
  "How can I improve my resume?",
  "Tell me about jobs in Finance",
  "Tell me about jobs in Healthcare",
  "What skills are in demand for Software Engineering?",
  "What's the job outlook for Mechanical Engineering?",
  "Tell me about jobs in Chemical Engineering"
];

const generateResponse = (message: string): string => {
  // This would be replaced with actual AI interaction in a real application
  if (message.toLowerCase().includes('resume')) {
    return "I can help you improve your resume! Here are some tips:\n\n1. Tailor your resume for each job application\n2. Highlight quantifiable achievements\n3. Use action verbs\n4. Keep it concise and well-formatted\n5. Include relevant keywords\n\nWould you like me to review your current resume?";
  }
  
  if (message.toLowerCase().includes('finance')) {
    return "Finance offers diverse career paths including:\n\n• Investment Banking\n• Financial Analysis\n• Wealth Management\n• Risk Assessment\n• Corporate Finance\n\nThese roles typically require analytical skills, attention to detail, and understanding of market trends. The finance sector is experiencing steady growth with increasing demand for professionals who can navigate complex regulations and leverage data analytics.";
  }

  if (message.toLowerCase().includes('health')) {
    return "Healthcare careers are in high demand and include:\n\n• Medical Practitioners\n• Nursing\n• Healthcare Administration\n• Medical Research\n• Health Informatics\n\nThe healthcare industry is projected to grow significantly over the next decade due to an aging population and advances in medical technology. Roles increasingly require a combination of medical knowledge and technical skills.";
  }
  
  if (message.toLowerCase().includes('software')) {
    return "In-demand software engineering skills include:\n\n• Cloud computing (AWS, Azure, GCP)\n• DevOps practices\n• Full-stack development\n• AI and machine learning\n• Cybersecurity\n• Mobile development\n\nThe field continues to evolve rapidly, with increasing emphasis on specialized knowledge alongside strong fundamentals in algorithms and data structures.";
  }

  if (message.toLowerCase().includes('mechanical')) {
    return "Mechanical Engineering has a positive job outlook with opportunities in:\n\n• Automotive and aerospace industries\n• Renewable energy sector\n• Manufacturing automation\n• Robotics development\n• Product design\n\nEmployers particularly value experience with CAD software, simulation tools, and knowledge of sustainable design principles.";
  }

  if (message.toLowerCase().includes('chemical')) {
    return "Chemical Engineering offers diverse opportunities in:\n\n• Petrochemical industry\n• Pharmaceutical manufacturing\n• Environmental remediation\n• Food processing\n• Materials science\n\nThe field has strong prospects, especially for engineers with expertise in process optimization, sustainability practices, and regulatory compliance.";
  }

  return "I'm your Career AI Assistant. I can help you explore career options based on your interests and skills, provide resume advice, and share industry insights. What specific career guidance are you looking for today?";
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Career Assistant. I can help you with career guidance, resume advice, industry insights, and skill assessments. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate API delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    // Wait a moment to simulate user typing
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Career Assistant</h1>
        <p className="text-gray-600 mb-6">
          Ask questions about career paths, job opportunities, or get personalized guidance
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="border rounded-lg overflow-hidden h-[600px] flex flex-col">
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Avatar className={message.sender === 'user' ? 'bg-careerblue-600' : 'bg-gray-200'}>
                        {message.sender === 'user' ? (
                          <>
                            <AvatarImage src={user?.profilePicture} />
                            <AvatarFallback className="bg-careerblue-600 text-white">
                              <User size={18} />
                            </AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback className="bg-gray-200 text-careerblue-600">
                            <Bot size={18} />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.sender === 'user'
                            ? 'bg-careerblue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.text}</div>
                        <div
                          className={`text-xs ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          } mt-1`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <Avatar className="bg-gray-200">
                        <AvatarFallback className="bg-gray-200 text-careerblue-600">
                          <Bot size={18} />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <div className="border-t p-3 bg-white">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your question..."
                    className="flex-1"
                  />
                  <Button onClick={handleSend} className="bg-careerblue-600 hover:bg-careerblue-700">
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-3">Suggested Questions</h3>
                <div className="space-y-2">
                  {startingQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2 px-3"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      <ArrowRight size={14} className="mr-2 text-careerblue-600 flex-shrink-0" />
                      <span className="truncate">{question}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">Career Tools</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Enhance your career journey with these tools
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    asChild
                  >
                    <Link to="/resume-builder">
                      <FileText size={16} className="mr-2 text-careerblue-600" />
                      Resume Builder
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    asChild
                  >
                    <Link to="/skill-assessment">
                      <Target size={16} className="mr-2 text-careerblue-600" />
                      Skill Assessment
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    asChild
                  >
                    <Link to="/career-explorer">
                      <BarChart size={16} className="mr-2 text-careerblue-600" />
                      Career Explorer
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Link } from 'react-router-dom';
export default Chatbot;
