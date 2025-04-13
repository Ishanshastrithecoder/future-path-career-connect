
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Mail, MessageSquare, Star, Briefcase, Filter, Search } from 'lucide-react';

// Mock data for mentors
const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Senior Data Scientist",
    company: "TechCorp",
    experience: 12,
    rating: 4.9,
    reviews: 87,
    availability: "2-3 hours/week",
    specialties: ["Machine Learning", "AI Ethics", "Career Transitions"],
    education: "PhD in Computer Science",
    industry: "Technology",
    bio: "With over 12 years in data science, I help professionals transition into tech careers or advance their current positions. My mentoring focuses on practical skills and ethical considerations in AI development.",
    image: "https://randomuser.me/api/portraits/women/23.jpg"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    title: "Finance Director",
    company: "Global Banking Group",
    experience: 15,
    rating: 4.8,
    reviews: 64,
    availability: "Weekends",
    specialties: ["Investment Strategy", "Financial Analysis", "Career Growth"],
    education: "MBA in Finance",
    industry: "Finance",
    bio: "I help professionals navigate the complex world of finance and banking. Whether you're just starting your career or looking to take the next step into leadership, I can provide guidance based on my 15 years of experience.",
    image: "https://randomuser.me/api/portraits/men/42.jpg"
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    title: "Medical Director",
    company: "HealthFirst Hospital",
    experience: 18,
    rating: 4.9,
    reviews: 92,
    availability: "Evenings",
    specialties: ["Healthcare Management", "Medical Career Planning", "Work-Life Balance"],
    education: "MD, Healthcare Administration",
    industry: "Healthcare",
    bio: "As a medical professional with administrative experience, I mentor healthcare workers looking to advance their careers while maintaining wellbeing. I specialize in helping doctors and nurses transition into leadership roles.",
    image: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 4,
    name: "James Wilson",
    title: "Lead Mechanical Engineer",
    company: "Advanced Engineering Solutions",
    experience: 14,
    rating: 4.7,
    reviews: 56,
    availability: "Flexible",
    specialties: ["Mechanical Design", "Project Management", "Team Leadership"],
    education: "MSc in Mechanical Engineering",
    industry: "Engineering",
    bio: "I help engineering professionals build technical expertise and leadership skills. My mentoring approach emphasizes both technical excellence and the soft skills needed to advance in engineering careers.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 5,
    name: "Elena Petrova",
    title: "Chemical Process Engineer",
    company: "SynthTech Industries",
    experience: 11,
    rating: 4.8,
    reviews: 49,
    availability: "Weekly sessions",
    specialties: ["Chemical Process Optimization", "Sustainability", "Technical Leadership"],
    education: "PhD in Chemical Engineering",
    industry: "Engineering",
    bio: "Specializing in sustainable chemical processes, I mentor engineers looking to make an impact in environmentally conscious industries. I provide guidance on technical skills development and career advancement strategies.",
    image: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      mentor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      mentor.industry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = !selectedIndustry || mentor.industry === selectedIndustry;
    
    return matchesSearch && matchesIndustry;
  });

  const industries = [...new Set(mentors.map(mentor => mentor.industry))];

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Find a Mentor</h1>
        <p className="text-gray-600 mb-8">
          Connect with experienced professionals who can guide your career journey
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, expertise, or keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by Industry" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <Card 
                  key={mentor.id} 
                  className={`overflow-hidden cursor-pointer transition-all ${
                    selectedMentor === mentor.id ? 'ring-2 ring-careerblue-500' : ''
                  }`}
                  onClick={() => setSelectedMentor(mentor.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentor.image} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{mentor.name}</h3>
                            <p className="text-gray-600">{mentor.title} at {mentor.company}</p>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm ml-1">{mentor.rating} ({mentor.reviews} reviews)</span>
                            </div>
                          </div>
                          <Badge>{mentor.industry}</Badge>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {mentor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline">{specialty}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-700 line-clamp-3">{mentor.bio}</p>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-1" />
                        <span>{mentor.experience} years</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{mentor.availability}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardFooter className="bg-gray-50 border-t p-4 flex justify-between">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button size="sm" className="bg-careerblue-600 hover:bg-careerblue-700">
                      Request Mentorship
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center p-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No mentors found matching your criteria</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedIndustry('');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
          
          <div className="lg:block">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">How Mentorship Works</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-careerblue-100 text-careerblue-700 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Browse Mentors</h4>
                      <p className="text-sm text-gray-600">Explore profiles of experienced professionals in your field</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="bg-careerblue-100 text-careerblue-700 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Request a Connection</h4>
                      <p className="text-sm text-gray-600">Send a mentorship request with your goals</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="bg-careerblue-100 text-careerblue-700 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Schedule Sessions</h4>
                      <p className="text-sm text-gray-600">Plan regular meetings with your mentor</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="bg-careerblue-100 text-careerblue-700 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Grow Together</h4>
                      <p className="text-sm text-gray-600">Receive guidance and advance your career</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <Button className="w-full bg-careerblue-600 hover:bg-careerblue-700">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Support
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

export default Mentors;
