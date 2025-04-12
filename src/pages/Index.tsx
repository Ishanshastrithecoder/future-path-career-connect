
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, BarChart, GraduationCap, FileText, Award, Users, BriefcaseIcon } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Developer",
    text: "FuturePathAI helped me transition from a junior developer to a senior role by identifying the exact skills I needed to develop. The personalized guidance was game-changing.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Manager",
    text: "The career comparison tools allowed me to make an informed decision about my career pivot. I was able to compare salaries and growth prospects across different industries.",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Healthcare Professional",
    text: "The mentor matching feature connected me with an experienced professional in my field who guided me through the certification process. Invaluable resource!",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg"
  }
];

// Mock career stats
const careerStats = [
  { country: "US", avgSalary: "$105,000", growth: 22, openings: 165000 },
  { country: "UK", avgSalary: "£65,000", growth: 18, openings: 42000 },
  { country: "Germany", avgSalary: "€72,000", growth: 20, openings: 58000 },
  { country: "India", avgSalary: "₹1,500,000", growth: 27, openings: 220000 },
];

const Index = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate('/career-explorer', { state: { search: searchInput } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-careerblue-700 to-careerblue-900 text-white py-16 md:py-24">
        <div className="container-inner">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6 animate-fade-in">
              <Badge className="bg-careerblue-600 hover:bg-careerblue-600 text-white px-3 py-1">
                Powered by AI
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Navigate Your <span className="text-blue-200">Future Career Path</span> With Confidence
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Personalized career guidance with AI insights, salary comparisons, and expert mentorship
              </p>
              <form onSubmit={handleSearch} className="flex gap-3 max-w-lg">
                <Input 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for a career or skill..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-100"
                />
                <Button type="submit" size="lg" className="bg-white text-careerblue-700 hover:bg-blue-100">
                  Explore
                </Button>
              </form>
              <div className="pt-4 flex gap-3 items-center text-blue-100 text-sm">
                <span>Popular:</span>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white hover:text-careerblue-700" onClick={() => setSearchInput('Software Engineering')}>
                    Software Engineering
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white hover:text-careerblue-700" onClick={() => setSearchInput('Finance')}>
                    Finance
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white hover:text-careerblue-700" onClick={() => setSearchInput('Healthcare')}>
                    Healthcare
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:w-2/5 relative animate-fade-in flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-careerblue-600 p-2 rounded-full">
                    <MessageSquare size={18} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Career AI Assistant</h3>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 mb-3">
                  I can help you discover career paths based on your skills, interests, and educational background.
                </div>
                <div className="bg-careerblue-600 rounded-lg p-3 text-sm text-white text-right">
                  I'm interested in a career in data science. What skills do I need?
                </div>
                <div className="mt-4">
                  <Button onClick={() => navigate('/chatbot')} className="w-full bg-careerblue-600 hover:bg-careerblue-700">
                    Start a Conversation
                  </Button>
                </div>
              </div>
              <div className="hidden md:block absolute -z-10 inset-0 translate-x-8 translate-y-8 bg-blue-300/30 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-inner">
          <div className="text-center mb-12">
            <Badge className="bg-careerblue-100 text-careerblue-800 mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">All-in-one career guidance platform</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to make informed career decisions, build your skills, and connect with opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-gray-200 rounded-lg overflow-hidden card-hover">
              <CardContent className="p-6 space-y-4">
                <div className="bg-careerblue-100 text-careerblue-700 p-3 rounded-md w-fit">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-xl font-semibold">AI Career Assistant</h3>
                <p className="text-gray-600">
                  Get personalized career guidance and answers to your most pressing career questions
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/chatbot">Try Now</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 rounded-lg overflow-hidden card-hover">
              <CardContent className="p-6 space-y-4">
                <div className="bg-careerblue-100 text-careerblue-700 p-3 rounded-md w-fit">
                  <BarChart size={24} />
                </div>
                <h3 className="text-xl font-semibold">Career Explorer</h3>
                <p className="text-gray-600">
                  Compare careers across countries, salaries, and growth metrics to make informed decisions
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/career-explorer">Explore Careers</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 rounded-lg overflow-hidden card-hover">
              <CardContent className="p-6 space-y-4">
                <div className="bg-careerblue-100 text-careerblue-700 p-3 rounded-md w-fit">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-semibold">Resume Builder</h3>
                <p className="text-gray-600">
                  Create professional resumes tailored to your target roles with AI guidance
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/resume-builder">Build Resume</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 rounded-lg overflow-hidden card-hover">
              <CardContent className="p-6 space-y-4">
                <div className="bg-careerblue-100 text-careerblue-700 p-3 rounded-md w-fit">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-semibold">Interview Preparation</h3>
                <p className="text-gray-600">
                  Practice with AI-powered mock interviews and get feedback on your responses
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/interviews">Practice Now</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 rounded-lg overflow-hidden card-hover">
              <CardContent className="p-6 space-y-4">
                <div className="bg-careerblue-100 text-careerblue-700 p-3 rounded-md w-fit">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-semibold">Skill Assessment</h3>
                <p className="text-gray-600">
                  Evaluate your skills and get recommendations for improvement
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/skill-assessment">Test Skills</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 rounded-lg overflow-hidden card-hover">
              <CardContent className="p-6 space-y-4">
                <div className="bg-careerblue-100 text-careerblue-700 p-3 rounded-md w-fit">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold">Mentorship</h3>
                <p className="text-gray-600">
                  Connect with experienced professionals in your target field for guidance
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/mentors">Find Mentors</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Career Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-inner">
          <div className="text-center mb-12">
            <Badge className="bg-careerblue-100 text-careerblue-800 mb-4">Career Explorer</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Global Career Insights</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Compare career opportunities across countries and make data-driven decisions
            </p>
          </div>

          <Tabs defaultValue="engineering" className="space-y-8">
            <TabsList className="w-full max-w-md mx-auto">
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="tech">Technology</TabsTrigger>
            </TabsList>

            <TabsContent value="engineering" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {careerStats.map((stat, index) => (
                  <Card key={index} className="border border-gray-200 card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-semibold">{stat.country}</h3>
                        <Badge variant="secondary">{stat.growth}% Growth</Badge>
                      </div>
                      <div className="mt-4">
                        <div className="text-3xl font-bold text-careerblue-700">{stat.avgSalary}</div>
                        <div className="text-sm text-gray-500 mt-1">Average Salary</div>
                      </div>
                      <div className="mt-4">
                        <div className="text-xl font-semibold">{stat.openings.toLocaleString()}</div>
                        <div className="text-sm text-gray-500 mt-1">Annual Job Openings</div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Button variant="ghost" size="sm" className="w-full" asChild>
                          <Link to="/career-explorer">View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="healthcare" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border border-gray-200 card-hover">
                  <CardContent className="p-6">
                    <p className="text-center text-gray-500">Healthcare data coming soon</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="finance" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border border-gray-200 card-hover">
                  <CardContent className="p-6">
                    <p className="text-center text-gray-500">Finance data coming soon</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="tech" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border border-gray-200 card-hover">
                  <CardContent className="p-6">
                    <p className="text-center text-gray-500">Technology data coming soon</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-10 text-center">
            <Button className="bg-careerblue-600 hover:bg-careerblue-700" asChild>
              <Link to="/career-explorer">Explore All Industries</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container-inner">
          <div className="text-center mb-12">
            <Badge className="bg-careerblue-100 text-careerblue-800 mb-4">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Success Stories</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              See how FuturePathAI has helped professionals navigate their career journeys
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border border-gray-200 rounded-lg card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-careerblue-700 text-white">
        <div className="container-inner">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Advance Your Career?</h2>
            <p className="text-lg text-blue-100 mb-8">
              Join thousands of professionals using FuturePathAI to make smarter career decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-careerblue-700 hover:bg-blue-100" asChild>
                <Link to="/register">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-careerblue-600" asChild>
                <Link to="/chatbot">Try AI Assistant</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              No credit card required. Start with our free plan and upgrade anytime.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
