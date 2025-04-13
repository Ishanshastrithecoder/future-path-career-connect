
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Send, User, Bot, FileText, Target, BarChart, BookOpen, GraduationCap, Briefcase, Code, Heart, DollarSign, Lightbulb, Gauge, Rocket } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  roadmap?: CareerRoadmap | null;
}

interface CareerRoadmap {
  title: string;
  description: string;
  stages: RoadmapStage[];
  skills: string[];
  education: string[];
  certifications: string[];
}

interface RoadmapStage {
  title: string;
  description: string;
  duration: string;
  tasks: string[];
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

const roadmaps: Record<string, CareerRoadmap> = {
  "software-engineering": {
    title: "Software Engineering Career Path",
    description: "A comprehensive roadmap to becoming a successful software engineer, from entry-level to senior positions.",
    stages: [
      {
        title: "Entry Level (0-2 years)",
        description: "Focus on building strong fundamentals and getting practical experience.",
        duration: "1-2 years",
        tasks: [
          "Master one programming language (e.g., JavaScript, Python)",
          "Learn data structures and algorithms",
          "Contribute to open-source projects",
          "Build a personal portfolio of projects",
          "Learn version control (Git)",
          "Apply for junior developer positions"
        ]
      },
      {
        title: "Mid-Level Engineer (2-5 years)",
        description: "Deepen technical expertise and develop specialized skills.",
        duration: "2-3 years",
        tasks: [
          "Specialize in a specific area (front-end, back-end, etc.)",
          "Learn system design principles",
          "Improve code quality and testing practices",
          "Mentor junior developers",
          "Take on more complex projects",
          "Learn CI/CD and DevOps basics"
        ]
      },
      {
        title: "Senior Engineer (5+ years)",
        description: "Lead projects and make architectural decisions.",
        duration: "3+ years",
        tasks: [
          "Lead development teams",
          "Design system architecture",
          "Make technology selections for projects",
          "Improve development processes",
          "Conduct code reviews",
          "Research and adopt new technologies"
        ]
      },
      {
        title: "Tech Lead / Architect",
        description: "Guide technical direction and mentor other engineers.",
        duration: "Ongoing",
        tasks: [
          "Make high-level architectural decisions",
          "Set technical standards",
          "Coordinate between teams",
          "Participate in strategic planning",
          "Balance technical debt vs. new features",
          "Research industry trends"
        ]
      }
    ],
    skills: [
      "Programming Languages (JavaScript, Python, etc.)",
      "Data Structures & Algorithms",
      "System Design",
      "Database Management",
      "Cloud Services",
      "DevOps & CI/CD",
      "Testing & Quality Assurance",
      "Problem Solving",
      "Communication"
    ],
    education: [
      "Bachelor's in Computer Science (recommended)",
      "Coding Bootcamps",
      "Online Courses & Certifications",
      "Self-learning Resources"
    ],
    certifications: [
      "AWS Certified Developer",
      "Microsoft Certified: Azure Developer",
      "Google Cloud Certified - Professional Developer",
      "Oracle Certified Professional, Java SE 11 Developer",
      "Certified Kubernetes Administrator (CKA)"
    ]
  },
  "finance": {
    title: "Finance Career Path",
    description: "A roadmap to build a successful career in finance, from analyst to executive positions.",
    stages: [
      {
        title: "Financial Analyst (0-3 years)",
        description: "Build analytical skills and financial modeling expertise.",
        duration: "2-3 years",
        tasks: [
          "Learn financial modeling and analysis",
          "Master Excel and financial software",
          "Develop understanding of financial statements",
          "Support senior team members with research",
          "Gain industry-specific knowledge",
          "Pursue relevant certifications"
        ]
      },
      {
        title: "Senior Financial Analyst (3-6 years)",
        description: "Lead financial analysis and begin managing projects.",
        duration: "2-3 years",
        tasks: [
          "Lead financial analysis projects",
          "Develop financial forecasting models",
          "Present findings to management",
          "Mentor junior analysts",
          "Build cross-functional relationships",
          "Deepen industry expertise"
        ]
      },
      {
        title: "Finance Manager (6-10 years)",
        description: "Oversee financial operations and strategic planning.",
        duration: "3-4 years",
        tasks: [
          "Manage departmental budgets",
          "Lead financial planning processes",
          "Develop financial strategies",
          "Ensure regulatory compliance",
          "Guide investment decisions",
          "Build relationships with stakeholders"
        ]
      },
      {
        title: "Director of Finance / CFO",
        description: "Set financial strategy and oversee all financial operations.",
        duration: "Ongoing",
        tasks: [
          "Set long-term financial strategy",
          "Lead financial transformations",
          "Manage investor relations",
          "Ensure financial compliance",
          "Advise on major business decisions",
          "Oversee risk management"
        ]
      }
    ],
    skills: [
      "Financial Analysis & Modeling",
      "Accounting Principles",
      "Risk Assessment",
      "Investment Management",
      "Budgeting & Forecasting",
      "Financial Regulations",
      "Advanced Excel & Financial Software",
      "Business Acumen",
      "Communication & Presentation"
    ],
    education: [
      "Bachelor's in Finance, Accounting, or Economics",
      "MBA with Finance Specialization",
      "CFA (Chartered Financial Analyst)",
      "Professional Development Courses"
    ],
    certifications: [
      "CFA (Chartered Financial Analyst)",
      "CPA (Certified Public Accountant)",
      "FRM (Financial Risk Manager)",
      "CFP (Certified Financial Planner)",
      "CAIA (Chartered Alternative Investment Analyst)"
    ]
  },
  "healthcare": {
    title: "Healthcare Career Path",
    description: "A comprehensive roadmap for building a career in healthcare, from entry-level to specialized roles.",
    stages: [
      {
        title: "Entry Level Healthcare (0-2 years)",
        description: "Build foundational knowledge and gain clinical experience.",
        duration: "1-2 years",
        tasks: [
          "Complete required education and certifications",
          "Gain hands-on clinical experience",
          "Develop patient care skills",
          "Learn medical terminology",
          "Understand healthcare regulations",
          "Build professional network"
        ]
      },
      {
        title: "Mid-Level Healthcare Professional (2-5 years)",
        description: "Specialize and take on more responsibility.",
        duration: "2-3 years",
        tasks: [
          "Select and pursue specialization",
          "Gain advanced certifications",
          "Take on more complex cases",
          "Develop mentorship skills",
          "Participate in research or improvement projects",
          "Build expertise in specific treatments/procedures"
        ]
      },
      {
        title: "Senior Healthcare Role (5-10 years)",
        description: "Lead teams and contribute to department success.",
        duration: "3-5 years",
        tasks: [
          "Take on leadership responsibilities",
          "Train and mentor junior staff",
          "Contribute to department protocols",
          "Participate in quality improvement",
          "Build interdisciplinary relationships",
          "Stay updated on industry advancements"
        ]
      },
      {
        title: "Healthcare Leadership / Specialist",
        description: "Lead departments or become recognized specialists.",
        duration: "Ongoing",
        tasks: [
          "Lead departmental initiatives",
          "Develop treatment protocols",
          "Participate in organizational strategy",
          "Present at conferences",
          "Publish research or findings",
          "Influence industry standards"
        ]
      }
    ],
    skills: [
      "Clinical Skills (specialty-specific)",
      "Patient Care",
      "Medical Terminology",
      "Healthcare Technology",
      "Documentation & Record-keeping",
      "Healthcare Regulations",
      "Communication & Empathy",
      "Crisis Management",
      "Teamwork"
    ],
    education: [
      "Associate's/Bachelor's in Healthcare Field",
      "Medical School (for physicians)",
      "Nursing School",
      "Specialized Training Programs",
      "Continuing Education"
    ],
    certifications: [
      "Registered Nurse (RN)",
      "Nurse Practitioner (NP)",
      "Medical Doctor (MD)",
      "Physician Assistant (PA)",
      "Certified Medical Assistant (CMA)",
      "Specialty Board Certifications"
    ]
  },
  "mechanical-engineering": {
    title: "Mechanical Engineering Career Path",
    description: "A roadmap to building a successful mechanical engineering career from entry-level to senior positions.",
    stages: [
      {
        title: "Junior Mechanical Engineer (0-3 years)",
        description: "Focus on building technical foundation and practical skills.",
        duration: "2-3 years",
        tasks: [
          "Learn CAD software thoroughly (SolidWorks, AutoCAD)",
          "Assist with design projects under supervision",
          "Learn manufacturing processes",
          "Understand material properties and selection",
          "Develop technical documentation skills",
          "Build problem-solving abilities"
        ]
      },
      {
        title: "Mechanical Engineer (3-7 years)",
        description: "Take on independent projects and develop specialized skills.",
        duration: "3-4 years",
        tasks: [
          "Lead small to medium design projects",
          "Develop specialization (thermal, mechanical, manufacturing)",
          "Perform complex analyses and simulations",
          "Collaborate with cross-functional teams",
          "Troubleshoot design issues",
          "Mentor junior engineers"
        ]
      },
      {
        title: "Senior Mechanical Engineer (7-12 years)",
        description: "Lead major projects and provide technical guidance.",
        duration: "4-5 years",
        tasks: [
          "Lead complex projects and engineering teams",
          "Drive innovation and product improvements",
          "Establish engineering standards",
          "Perform design reviews",
          "Interface with clients and stakeholders",
          "Optimize manufacturing processes"
        ]
      },
      {
        title: "Principal Engineer / Engineering Manager",
        description: "Shape technical strategy and lead engineering initiatives.",
        duration: "Ongoing",
        tasks: [
          "Set technical direction for department",
          "Make critical design decisions",
          "Develop engineering processes",
          "Lead product development strategy",
          "Mentor engineering teams",
          "Represent engineering in leadership discussions"
        ]
      }
    ],
    skills: [
      "CAD Software (SolidWorks, AutoCAD)",
      "FEA/CFD Simulation",
      "GD&T (Geometric Dimensioning & Tolerancing)",
      "Material Science",
      "Thermodynamics",
      "Manufacturing Processes",
      "Project Management",
      "Technical Communication",
      "Problem-Solving"
    ],
    education: [
      "Bachelor's in Mechanical Engineering",
      "Master's in Specialized Engineering Field",
      "MBA (for management track)",
      "Continuing Education Courses"
    ],
    certifications: [
      "PE (Professional Engineer)",
      "Certified SolidWorks Professional",
      "Certified Manufacturing Engineer (CMfgE)",
      "Six Sigma Certification",
      "PMP (Project Management Professional)"
    ]
  },
  "chemical-engineering": {
    title: "Chemical Engineering Career Path",
    description: "A roadmap for building a successful career in chemical engineering from entry-level to senior positions.",
    stages: [
      {
        title: "Process Engineer (0-3 years)",
        description: "Focus on understanding processes and basic engineering principles.",
        duration: "2-3 years",
        tasks: [
          "Learn process control fundamentals",
          "Assist with process design and improvement",
          "Develop understanding of safety protocols",
          "Build knowledge of equipment and unit operations",
          "Learn simulation software",
          "Understand quality management systems"
        ]
      },
      {
        title: "Senior Process Engineer (3-7 years)",
        description: "Lead process improvements and take on more complex projects.",
        duration: "3-4 years",
        tasks: [
          "Lead process optimization initiatives",
          "Develop process safety management systems",
          "Implement sustainability improvements",
          "Troubleshoot complex process issues",
          "Manage capital projects",
          "Train junior engineers"
        ]
      },
      {
        title: "Lead Engineer / Technical Specialist (7-12 years)",
        description: "Become a subject matter expert and lead technical initiatives.",
        duration: "4-5 years",
        tasks: [
          "Lead plant-wide improvement projects",
          "Develop new processes or products",
          "Establish engineering standards",
          "Lead technology transfer activities",
          "Interface with business stakeholders",
          "Drive innovation and R&D efforts"
        ]
      },
      {
        title: "Engineering Manager / Technical Director",
        description: "Lead engineering departments and shape technical strategy.",
        duration: "Ongoing",
        tasks: [
          "Set technical direction for organization",
          "Manage capital project portfolios",
          "Lead engineering teams",
          "Drive continuous improvement culture",
          "Interface with executive leadership",
          "Develop technology roadmaps"
        ]
      }
    ],
    skills: [
      "Process Design & Optimization",
      "Chemical Process Simulation",
      "Heat and Mass Transfer",
      "Fluid Dynamics",
      "Process Safety Management",
      "Environmental Regulations",
      "Six Sigma / Lean Manufacturing",
      "Project Management",
      "Leadership & Communication"
    ],
    education: [
      "Bachelor's in Chemical Engineering",
      "Master's in Chemical Engineering or Specialized Field",
      "PhD for Research Positions",
      "Continuing Education in Industry Specialties"
    ],
    certifications: [
      "PE (Professional Engineer)",
      "Certified Process Safety Professional",
      "Six Sigma Certification",
      "Project Management Professional (PMP)",
      "Certified Energy Manager"
    ]
  }
};

const generateResponse = (message: string): { text: string; roadmap: CareerRoadmap | null } => {
  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('resume')) {
    return {
      text: "I can help you improve your resume! Here are some tips:\n\n1. Tailor your resume for each job application\n2. Highlight quantifiable achievements\n3. Use action verbs\n4. Keep it concise and well-formatted\n5. Include relevant keywords\n\nWould you like me to review your current resume? Or you can use our Resume Builder to create a professional resume.",
      roadmap: null
    };
  }
  
  if (messageLower.includes('finance') || messageLower.includes('banking') || messageLower.includes('investment')) {
    return {
      text: "Finance offers diverse career paths including:\n\n• Investment Banking\n• Financial Analysis\n• Wealth Management\n• Risk Assessment\n• Corporate Finance\n\nThese roles typically require analytical skills, attention to detail, and understanding of market trends. The finance sector is experiencing steady growth with increasing demand for professionals who can navigate complex regulations and leverage data analytics.\n\nWould you like to see a detailed career roadmap for Finance?",
      roadmap: roadmaps["finance"]
    };
  }

  if (messageLower.includes('health') || messageLower.includes('medical') || messageLower.includes('doctor') || messageLower.includes('nurse')) {
    return {
      text: "Healthcare careers are in high demand and include:\n\n• Medical Practitioners\n• Nursing\n• Healthcare Administration\n• Medical Research\n• Health Informatics\n\nThe healthcare industry is projected to grow significantly over the next decade due to an aging population and advances in medical technology. Roles increasingly require a combination of medical knowledge and technical skills.\n\nWould you like to see a detailed career roadmap for Healthcare?",
      roadmap: roadmaps["healthcare"]
    };
  }
  
  if (messageLower.includes('software') || messageLower.includes('programming') || messageLower.includes('developer')) {
    return {
      text: "In-demand software engineering skills include:\n\n• Cloud computing (AWS, Azure, GCP)\n• DevOps practices\n• Full-stack development\n• AI and machine learning\n• Cybersecurity\n• Mobile development\n\nThe field continues to evolve rapidly, with increasing emphasis on specialized knowledge alongside strong fundamentals in algorithms and data structures.\n\nI've prepared a detailed career roadmap for Software Engineering that you can review below.",
      roadmap: roadmaps["software-engineering"]
    };
  }

  if (messageLower.includes('mechanical') || messageLower.includes('manufacturing')) {
    return {
      text: "Mechanical Engineering has a positive job outlook with opportunities in:\n\n• Automotive and aerospace industries\n• Renewable energy sector\n• Manufacturing automation\n• Robotics development\n• Product design\n\nEmployers particularly value experience with CAD software, simulation tools, and knowledge of sustainable design principles.\n\nI've prepared a detailed career roadmap for Mechanical Engineering that you can review below.",
      roadmap: roadmaps["mechanical-engineering"]
    };
  }

  if (messageLower.includes('chemical')) {
    return {
      text: "Chemical Engineering offers diverse opportunities in:\n\n• Petrochemical industry\n• Pharmaceutical manufacturing\n• Environmental remediation\n• Food processing\n• Materials science\n\nThe field has strong prospects, especially for engineers with expertise in process optimization, sustainability practices, and regulatory compliance.\n\nI've prepared a detailed career roadmap for Chemical Engineering that you can review below.",
      roadmap: roadmaps["chemical-engineering"]
    };
  }

  if (messageLower.includes('skill assessment') || messageLower.includes('test skill') || messageLower.includes('assess my skills')) {
    return {
      text: "Our Skill Assessment tool can help you identify your strengths and areas for improvement. The assessment covers technical skills, soft skills, and industry-specific knowledge. After completing the assessment, you'll receive personalized recommendations for skill development.\n\nWould you like to take a skill assessment now?",
      roadmap: null
    };
  }

  if (messageLower.includes('mentor') || messageLower.includes('guidance') || messageLower.includes('coach')) {
    return {
      text: "Our Mentor platform connects you with experienced professionals who can provide personalized career guidance. Mentors can help with:\n\n• Career path planning\n• Skill development recommendations\n• Industry insights and trends\n• Professional networking strategies\n• Interview preparation\n\nWould you like to explore our mentor network and find someone in your field?",
      roadmap: null
    };
  }

  if (messageLower.includes('network') || messageLower.includes('connect') || messageLower.includes('professional connections')) {
    return {
      text: "Building a strong professional network is essential for career growth. Our Network platform allows you to:\n\n• Connect with professionals in your field\n• Join industry-specific groups and discussions\n• Share your expertise and achievements\n• Discover job opportunities\n• Learn from industry leaders\n\nWould you like to explore our network features and start building connections?",
      roadmap: null
    };
  }

  return {
    text: "I'm your Career AI Assistant. I can help you explore career options based on your interests and skills, provide resume advice, and share industry insights. I can also show you detailed career roadmaps for various fields including Software Engineering, Finance, Healthcare, Mechanical Engineering, and Chemical Engineering.\n\nWhat specific career guidance are you looking for today?",
    roadmap: null
  };
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Career Assistant. I can help you with career guidance, resume advice, industry insights, skill assessments, and detailed career roadmaps. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeRoadmap, setActiveRoadmap] = useState<CareerRoadmap | null>(null);
  const [activeRoadmapTab, setActiveRoadmapTab] = useState("overview");

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

    setTimeout(() => {
      const response = generateResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        roadmap: response.roadmap
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      
      if (response.roadmap) {
        setActiveRoadmap(response.roadmap);
        setActiveRoadmapTab("overview");
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const RoadmapView = ({ roadmap }: { roadmap: CareerRoadmap }) => {
    return (
      <Card className="mt-4 border-careerblue-200">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-careerblue-800 mb-2">{roadmap.title}</h3>
          <p className="text-gray-700 mb-4">{roadmap.description}</p>
          
          <Tabs value={activeRoadmapTab} onValueChange={setActiveRoadmapTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stages">Career Stages</TabsTrigger>
              <TabsTrigger value="skills">Required Skills</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Rocket className="h-5 w-5 text-careerblue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Career Path Overview</h4>
                    <p className="text-sm text-gray-600">{roadmap.description}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Gauge className="h-5 w-5 text-careerblue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Progression Timeline</h4>
                    <div className="text-sm text-gray-600">
                      {roadmap.stages.map((stage, idx) => (
                        <div key={idx} className="flex items-center gap-2 mt-1">
                          <span className="bg-careerblue-100 text-careerblue-800 text-xs px-2 py-0.5 rounded-full">
                            {stage.duration}
                          </span>
                          <span>{stage.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-careerblue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Key Skills</h4>
                    <p className="text-sm text-gray-600">
                      {roadmap.skills.slice(0, 5).join(", ")}
                      {roadmap.skills.length > 5 ? ", and more..." : ""}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="stages" className="pt-4">
              <div className="space-y-6">
                {roadmap.stages.map((stage, idx) => (
                  <div key={idx} className="border-l-2 border-careerblue-300 pl-4 pb-2">
                    <h4 className="font-semibold text-careerblue-800">{stage.title}</h4>
                    <p className="text-xs text-careerblue-600 font-medium mb-2">{stage.duration}</p>
                    <p className="text-sm text-gray-700 mb-3">{stage.description}</p>
                    <div className="space-y-2">
                      {stage.tasks.map((task, taskIdx) => (
                        <div key={taskIdx} className="flex items-start gap-2">
                          <div className="h-4 w-4 rounded-full bg-careerblue-100 border border-careerblue-300 flex-shrink-0 mt-0.5"></div>
                          <p className="text-sm text-gray-600">{task}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="skills" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-careerblue-800 mb-3">Technical Skills</h4>
                  <ul className="space-y-2">
                    {roadmap.skills.slice(0, Math.ceil(roadmap.skills.length / 2)).map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-careerblue-100 border border-careerblue-300 flex-shrink-0 mt-0.5"></div>
                        <span className="text-sm">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-careerblue-800 mb-3">Additional Skills</h4>
                  <ul className="space-y-2">
                    {roadmap.skills.slice(Math.ceil(roadmap.skills.length / 2)).map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-careerblue-100 border border-careerblue-300 flex-shrink-0 mt-0.5"></div>
                        <span className="text-sm">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-careerblue-800 flex items-center gap-2 mb-3">
                    <GraduationCap className="h-5 w-5" />
                    Education Paths
                  </h4>
                  <ul className="space-y-2">
                    {roadmap.education.map((edu, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-careerblue-100 border border-careerblue-300 flex-shrink-0 mt-0.5"></div>
                        <span className="text-sm">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-careerblue-800 flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5" />
                    Recommended Certifications
                  </h4>
                  <ul className="space-y-2">
                    {roadmap.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="h-4 w-4 rounded-full bg-careerblue-100 border border-careerblue-300 flex-shrink-0 mt-0.5"></div>
                        <span className="text-sm">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  // Career category buttons
  const careerCategories = [
    { name: "Technology", icon: <Code className="h-4 w-4" /> },
    { name: "Finance", icon: <DollarSign className="h-4 w-4" /> },
    { name: "Healthcare", icon: <Heart className="h-4 w-4" /> },
    { name: "Engineering", icon: <Briefcase className="h-4 w-4" /> },
    { name: "Education", icon: <BookOpen className="h-4 w-4" /> },
  ];

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Career Assistant</h1>
        <p className="text-gray-600 mb-6">
          Ask questions about career paths, job opportunities, or get personalized guidance
        </p>
        
        {/* Career Category Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {careerCategories.map((category, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => handleQuickQuestion(`Tell me about careers in ${category.name}`)}
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>
        
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
                        
                        {message.roadmap && (
                          <RoadmapView roadmap={message.roadmap} />
                        )}
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
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    asChild
                  >
                    <Link to="/mentors">
                      <Users size={16} className="mr-2 text-careerblue-600" />
                      Find Mentors
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                    asChild
                  >
                    <Link to="/network">
                      <Briefcase size={16} className="mr-2 text-careerblue-600" />
                      Career Network
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

export default Chatbot;
