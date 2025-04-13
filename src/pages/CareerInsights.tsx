
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
  Filter
} from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for salary insights
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

// Mock data for trending careers
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

// Mock data for industry reports
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

// Mock data for skill demand
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

const CareerInsights = () => {
  const [activeTab, setActiveTab] = useState("trends");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industries = ["Technology", "Healthcare", "Finance", "Manufacturing", "Education", "Retail", "Entertainment"];

  // Filter functions for data
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

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Career Insights</h1>
        <p className="text-gray-600 mb-6">
          Make informed career decisions with data-driven insights and industry trends
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
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
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid grid-cols-4 w-full">
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
          </TabsList>
          
          {/* Market Trends Tab */}
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
          
          {/* Salary Data Tab */}
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
          
          {/* Skills Analysis Tab */}
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
          
          {/* Industry Reports Tab */}
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
        </Tabs>
      </div>
    </div>
  );
};

export default CareerInsights;
