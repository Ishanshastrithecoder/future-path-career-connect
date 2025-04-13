import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  TrendingUp, 
  BarChart3, 
  BookOpen, 
  Briefcase, 
  GraduationCap,
  FileSpreadsheet, 
  Award,
  Users, 
  Clock,
  MapPin, 
  Building, 
  ArrowRight,
  Filter,
  PieChart,
  LineChart,
  BarChart,
  DollarSign,
  BookMarked,
  Lightbulb,
  Calendar
} from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const salaryInsights = [
  { 
    role: "Software Engineer", 
    avgSalary: "$105,000", 
    range: "$85,000 - $130,000",
    trends: "+5% vs last year",
    topSkills: ["JavaScript", "React", "Node.js", "AWS"] 
  },
  { 
    role: "Data Analyst", 
    avgSalary: "$85,000", 
    range: "$65,000 - $110,000",
    trends: "+3% vs last year",
    topSkills: ["SQL", "Python", "Excel", "Tableau"] 
  },
  { 
    role: "Product Manager", 
    avgSalary: "$120,000", 
    range: "$95,000 - $150,000",
    trends: "+7% vs last year",
    topSkills: ["Strategy", "Roadmapping", "User Research", "Analytics"] 
  },
  { 
    role: "UX Designer", 
    avgSalary: "$95,000", 
    range: "$75,000 - $120,000",
    trends: "+4% vs last year",
    topSkills: ["Figma", "User Research", "Prototyping", "Information Architecture"] 
  }
];

const trendingCareers = [
  {
    title: "AI Specialist",
    growth: "+41%",
    description: "Develop and implement AI solutions for businesses, focusing on machine learning models and natural language processing.",
    requiredSkills: ["Python", "TensorFlow/PyTorch", "Machine Learning", "Deep Learning"],
    education: "BS/MS in Computer Science, Data Science, or related field",
    avgSalary: "$125,000"
  },
  {
    title: "Data Scientist",
    growth: "+33%",
    description: "Analyze complex data sets to identify trends and insights that drive business decisions.",
    requiredSkills: ["Python/R", "SQL", "Statistical Analysis", "Data Visualization"],
    education: "BS/MS in Statistics, Math, Computer Science, or related field",
    avgSalary: "$115,000"
  },
  {
    title: "Cybersecurity Analyst",
    growth: "+31%",
    description: "Protect organizations from digital threats and implement security measures.",
    requiredSkills: ["Network Security", "Threat Analysis", "Security Tools", "Risk Management"],
    education: "BS in Cybersecurity, Computer Science, or related field + certifications",
    avgSalary: "$105,000"
  },
  {
    title: "Healthcare Informatics Specialist",
    growth: "+29%",
    description: "Manage and analyze healthcare data systems to improve patient care and operational efficiency.",
    requiredSkills: ["Healthcare IT", "Data Management", "EHR Systems", "Analytics"],
    education: "BS/MS in Health Informatics, Health Sciences, or related field",
    avgSalary: "$98,000"
  }
];

const industryReports = [
  {
    industry: "Technology",
    title: "Tech Industry Outlook 2025",
    description: "This comprehensive report explores emerging technologies, market trends, and career opportunities in the tech sector over the next five years.",
    date: "March 2025",
    image: "https://randomuser.me/api/portraits/lego/1.jpg"
  },
  {
    industry: "Healthcare",
    title: "Digital Transformation in Healthcare",
    description: "An analysis of how digital technologies are reshaping healthcare delivery, administration, and career paths in the healthcare industry.",
    date: "February 2025",
    image: "https://randomuser.me/api/portraits/lego/2.jpg"
  },
  {
    industry: "Finance",
    title: "The Future of Financial Services",
    description: "Insights into fintech disruption, regulatory changes, and emerging roles in the finance and banking sectors.",
    date: "January 2025",
    image: "https://randomuser.me/api/portraits/lego/3.jpg"
  }
];

const skillsInDemand = [
  { skill: "Machine Learning", demand: 85, growth: "+15%" },
  { skill: "Cloud Computing", demand: 82, growth: "+12%" },
  { skill: "Data Analysis", demand: 78, growth: "+10%" },
  { skill: "Cybersecurity", demand: 76, growth: "+18%" },
  { skill: "UX Design", demand: 72, growth: "+8%" },
  { skill: "DevOps", demand: 70, growth: "+14%" },
  { skill: "Blockchain", demand: 65, growth: "+22%" },
  { skill: "Digital Marketing", demand: 68, growth: "+6%" },
  { skill: "Project Management", demand: 75, growth: "+4%" },
  { skill: "Full-stack Development", demand: 80, growth: "+11%" }
];

const jobMarketForecasts = [
  {
    sector: "Technology",
    growth: "+18%",
    timeframe: "Next 5 years",
    topJobs: ["AI Engineer", "Cloud Architect", "Cybersecurity Analyst"],
    challenges: "Rapid technological changes requiring continuous upskilling"
  },
  {
    sector: "Healthcare",
    growth: "+15%",
    timeframe: "Next 5 years",
    topJobs: ["Nurse Practitioner", "Health Informatics Specialist", "Occupational Therapist"],
    challenges: "Adapting to telehealth and digital record systems"
  },
  {
    sector: "Green Energy",
    growth: "+24%",
    timeframe: "Next 5 years",
    topJobs: ["Solar Engineer", "Sustainability Manager", "Green Building Designer"],
    challenges: "Evolving regulations and standards in renewable energy"
  },
  {
    sector: "E-Commerce",
    growth: "+12%",
    timeframe: "Next 5 years",
    topJobs: ["Digital Marketing Specialist", "Supply Chain Analyst", "UX/UI Designer"],
    challenges: "Keeping pace with rapidly changing consumer behaviors"
  }
];

const educationRecommendations = [
  {
    field: "Data Science",
    courses: [
      { name: "Data Science Specialization", provider: "Coursera", duration: "4 months", cost: "$49/month" },
      { name: "Machine Learning A-Z", provider: "Udemy", duration: "2 months", cost: "$94.99" },
      { name: "Applied Data Science with Python", provider: "edX", duration: "3 months", cost: "$297" }
    ]
  },
  {
    field: "Web Development",
    courses: [
      { name: "Full Stack Web Development", provider: "Udacity", duration: "4 months", cost: "$399/month" },
      { name: "The Complete Web Developer", provider: "Udemy", duration: "3 months", cost: "$89.99" },
      { name: "Web Development Bootcamp", provider: "Coursera", duration: "6 months", cost: "$39/month" }
    ]
  },
  {
    field: "Digital Marketing",
    courses: [
      { name: "Digital Marketing Nanodegree", provider: "Udacity", duration: "3 months", cost: "$399/month" },
      { name: "Digital Marketing Specialization", provider: "Coursera", duration: "6 months", cost: "$49/month" },
      { name: "Complete Digital Marketing Course", provider: "Udemy", duration: "2 months", cost: "$94.99" }
    ]
  }
];

const CareerInsights = () => {
  const [activeTab, setActiveTab] = useState("trends");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [salaryRange, setSalaryRange] = useState([50000, 150000]);
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);
  const { toast } = useToast();

  const industries = ["Technology", "Healthcare", "Finance", "Manufacturing", "Education", "Retail", "Entertainment"];
  const experienceLevels = ["Entry Level", "Mid-Level", "Senior", "Management", "Executive"];
  const locations = ["Remote", "United States", "Europe", "Asia", "Australia", "Africa", "South America"];

  const filteredSalaryInsights = salaryInsights.filter(item => 
    item.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.topSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredTrendingCareers = trendingCareers.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.requiredSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredIndustryReports = industryReports.filter(item => 
    (selectedIndustry === 'all' || item.industry === selectedIndustry) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubscribe = () => {
    toast({
      title: "Subscription successful!",
      description: "You'll receive weekly career insights in your inbox.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your career insights preferences have been updated.",
    });
  };

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Career Insights</h1>
        <p className="text-gray-600 mb-6">
          Make informed career decisions with data-driven insights and industry trends
        </p>
        
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for roles, skills, or industries"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Advanced Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="experience-level">Experience Level</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="experience-level">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level.toLowerCase().replace(' ', '-')}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase().replace(' ', '-')}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Salary Range: ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}</Label>
                <Slider 
                  defaultValue={salaryRange} 
                  max={250000} 
                  min={0} 
                  step={10000}
                  onValueChange={setSalaryRange}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="remote-only" 
                  checked={showRemoteOnly}
                  onCheckedChange={setShowRemoteOnly}
                />
                <Label htmlFor="remote-only">Remote opportunities only</Label>
              </div>
              
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end">
                <Button 
                  size="responsive" 
                  variant="career"
                  onClick={handleSavePreferences}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Market Trends</span>
              <span className="sm:hidden">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="salary" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Salary Data</span>
              <span className="sm:hidden">Salary</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Skills Analysis</span>
              <span className="sm:hidden">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              <span className="hidden sm:inline">Industry Reports</span>
              <span className="sm:hidden">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="forecasts" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Job Forecasts</span>
              <span className="sm:hidden">Forecasts</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <BookMarked className="h-4 w-4" />
              <span className="hidden sm:inline">Education</span>
              <span className="sm:hidden">Education</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Fastest Growing Careers</h2>
              <p className="text-gray-600 mb-6">
                Based on job market data and growth projections over the next five years
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTrendingCareers.map((career, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{career.title}</CardTitle>
                          <p className="text-sm text-gray-500">Growth Rate: <span className="text-green-600 font-medium">{career.growth}</span></p>
                        </div>
                        <Badge variant="outline" className="bg-careerblue-50 text-careerblue-700 border-careerblue-200">
                          {career.avgSalary}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 mb-4">{career.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Award className="h-5 w-5 text-careerblue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-sm">Required Skills</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {career.requiredSkills.map((skill, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2">
                          <GraduationCap className="h-5 w-5 text-careerblue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-sm">Education</p>
                            <p className="text-xs text-gray-600">{career.education}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-end">
                      <Button size="responsive" variant="career">
                        Explore Career Path
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {filteredTrendingCareers.length === 0 && (
                  <div className="col-span-2 text-center p-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No career trends match your search criteria</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedIndustry('all');
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="salary">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Salary Insights</h2>
              <p className="text-gray-600 mb-6">
                Updated compensation data based on industry surveys and job postings
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSalaryInsights.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>{item.role}</span>
                        <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                          {item.trends}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-4 border-b">
                        <div>
                          <p className="text-sm text-gray-500">Average Salary</p>
                          <p className="text-2xl font-bold text-careerblue-700">{item.avgSalary}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Typical Range</p>
                          <p className="text-lg font-medium">{item.range}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Top Skills in Demand</p>
                        <div className="flex flex-wrap gap-2">
                          {item.topSkills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="bg-careerblue-50 border-careerblue-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button size="responsive" variant="career" className="w-full">
                        See Detailed Report
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {filteredSalaryInsights.length === 0 && (
                  <div className="col-span-2 text-center p-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No salary data matches your search criteria</p>
                    <Button 
                      variant="link" 
                      onClick={() => setSearchQuery('')}
                    >
                      Clear search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="skills">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Skills in Demand</h2>
              <p className="text-gray-600 mb-6">
                Trending skills with highest employer demand across industries
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillsInDemand
                  .filter(item => item.skill.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((skill, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-lg">{skill.skill}</h3>
                          <Badge className="bg-careerblue-100 text-careerblue-800 border-careerblue-200">
                            {skill.growth}
                          </Badge>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div 
                            className="bg-careerblue-600 h-2.5 rounded-full" 
                            style={{ width: `${skill.demand}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Demand Score: <span className="font-medium">{skill.demand}/100</span>
                        </p>
                        
                        <Button 
                          variant="outline" 
                          size="responsive"
                          className="mt-4 w-full"
                        >
                          Find Training Resources
                        </Button>
                      </CardContent>
                    </Card>
                ))}
                
                {skillsInDemand.filter(item => item.skill.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <div className="col-span-3 text-center p-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No skills match your search criteria</p>
                    <Button 
                      variant="link" 
                      onClick={() => setSearchQuery('')}
                    >
                      Clear search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Industry Reports</h2>
              <p className="text-gray-600 mb-6">
                Access comprehensive reports on industry trends, forecasts, and career opportunities
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredIndustryReports.map((report, index) => (
                  <Card key={index} className="overflow-hidden flex flex-col">
                    <div className="h-40 bg-gray-100 relative">
                      <img 
                        src={report.image}
                        alt={report.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 right-3">
                        {report.industry}
                      </Badge>
                    </div>
                    <CardContent className="p-6 flex-1">
                      <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                      <p className="text-xs text-gray-500 flex items-center mt-auto">
                        <Clock className="h-3 w-3 mr-1" />
                        Published: {report.date}
                      </p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button size="responsive" variant="career" className="w-full">
                        Download Report
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {filteredIndustryReports.length === 0 && (
                  <div className="col-span-3 text-center p-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No reports match your search criteria</p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedIndustry('all');
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="forecasts">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Job Market Forecasts</h2>
              <p className="text-gray-600 mb-6">
                Long-term predictions for industry growth and employment opportunities
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobMarketForecasts
                  .filter(item => 
                    item.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.topJobs.some(job => job.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((forecast, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{forecast.sector}</CardTitle>
                          <Badge className="bg-green-100 text-green-800">
                            {forecast.growth}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{forecast.timeframe}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="font-medium">Top Emerging Roles</p>
                          <div className="grid grid-cols-1 gap-2">
                            {forecast.topJobs.map((job, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-careerblue-600" />
                                <span>{job}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <p className="font-medium mb-2">Key Challenges</p>
                          <p className="text-sm text-gray-600">{forecast.challenges}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button size="responsive" variant="career" className="w-full">
                          Get Detailed Forecast
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                }
                
                {jobMarketForecasts.filter(item => 
                  item.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.topJobs.some(job => job.toLowerCase().includes(searchQuery.toLowerCase()))
                ).length === 0 && (
                  <div className="col-span-2 text-center p-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No forecast data matches your search criteria</p>
                    <Button 
                      variant="link" 
                      onClick={() => setSearchQuery('')}
                    >
                      Clear search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="education">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Education & Training Resources</h2>
              <p className="text-gray-600 mb-6">
                Find recommended courses and certifications to advance your career
              </p>
              
              <div className="space-y-8">
                {educationRecommendations
                  .filter(item => 
                    item.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.courses.some(course => course.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map((edu, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-careerblue-600" />
                        <h3 className="text-xl font-semibold">{edu.field}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {edu.courses.map((course, idx) => (
                          <Card key={idx} className="h-full">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{course.name}</CardTitle>
                              <p className="text-sm text-gray-500">{course.provider}</p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex justify-between">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm">{course.cost}</span>
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button size="responsive" variant="career" className="w-full">
                                View Course
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))
                }
                
                {educationRecommendations.filter(item => 
                  item.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.courses.some(course => course.name.toLowerCase().includes(searchQuery.toLowerCase()))
                ).length === 0 && (
                  <div className="text-center p-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No education resources match your search criteria</p>
                    <Button 
                      variant="link" 
                      onClick={() => setSearchQuery('')}
                    >
                      Clear search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-12">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Stay Updated with Career Trends</h3>
                <p className="text-gray-600">Subscribe to our newsletter for weekly insights on job market trends, in-demand skills, and career development tips.</p>
              </div>
              <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                <Input placeholder="Enter your email address" className="w-full" />
                <Button size="responsive" variant="career" onClick={handleSubscribe}>
                  Subscribe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerInsights;
