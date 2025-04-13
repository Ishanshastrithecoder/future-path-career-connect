
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Briefcase, Filter, BookOpen, TrendingUp, 
  Star, Clock, MapPin, DollarSign, Building, GraduationCap
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';

// Sample jobs data
const jobListings = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    postedDate: "2 days ago",
    description: "We are looking for a skilled software engineer proficient in React, Node.js, and cloud technologies to join our growing team.",
    requirements: ["3+ years of experience", "Bachelor's in CS or equivalent", "React/Node.js proficiency", "AWS knowledge"],
    category: "Technology",
    isFeatured: true,
    education: "Bachelor's Degree",
    experience: "3-5 years",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateTech",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    postedDate: "3 days ago",
    description: "Lead product development from conception to launch, working closely with engineering, design, and marketing teams.",
    requirements: ["5+ years in product management", "MBA preferred", "Excellent communication skills", "Agile methodology experience"],
    category: "Product Management",
    isFeatured: false,
    education: "Master's Degree",
    experience: "5+ years",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Remote",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    postedDate: "1 week ago",
    description: "Create intuitive, engaging user experiences for web and mobile applications through thoughtful design and research.",
    requirements: ["Portfolio demonstrating UI/UX skills", "Experience with design tools", "User research experience", "Prototyping skills"],
    category: "Design",
    isFeatured: true,
    education: "Bachelor's Degree",
    experience: "2-4 years",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataWorks Inc.",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    postedDate: "5 days ago",
    description: "Apply statistical analysis, machine learning, and data visualization to extract insights from complex datasets.",
    requirements: ["Master's or PhD in Statistics/CS", "Python, R proficiency", "Machine learning experience", "SQL knowledge"],
    category: "Data Science",
    isFeatured: false,
    education: "Master's Degree",
    experience: "4-6 years",
  },
  {
    id: 5,
    title: "Marketing Manager",
    company: "BrandBoost",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$95,000 - $120,000",
    postedDate: "2 days ago",
    description: "Develop and implement marketing strategies to increase brand awareness and drive customer engagement.",
    requirements: ["5+ years marketing experience", "Campaign management", "Digital marketing proficiency", "Analytics experience"],
    category: "Marketing",
    isFeatured: true,
    education: "Bachelor's Degree",
    experience: "5-7 years",
  },
  {
    id: 6,
    title: "Financial Analyst",
    company: "Global Finance",
    location: "New York, NY",
    type: "Full-time",
    salary: "$85,000 - $110,000",
    postedDate: "1 week ago",
    description: "Analyze financial data, prepare reports, and support strategic decision-making through financial models and forecasts.",
    requirements: ["Finance/Accounting degree", "Financial modeling", "Excel proficiency", "Data analysis skills"],
    category: "Finance",
    isFeatured: false,
    education: "Bachelor's Degree",
    experience: "2-4 years",
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$125,000 - $155,000",
    postedDate: "3 days ago",
    description: "Build and maintain CI/CD pipelines, cloud infrastructure, and automated deployment systems.",
    requirements: ["Cloud platform experience", "CI/CD tools", "Containerization", "Infrastructure as code"],
    category: "Technology",
    isFeatured: true,
    education: "Bachelor's Degree",
    experience: "3-5 years",
  },
  {
    id: 8,
    title: "HR Specialist",
    company: "PeopleFirst Corp",
    location: "Remote",
    type: "Full-time",
    salary: "$70,000 - $90,000",
    postedDate: "4 days ago",
    description: "Support all aspects of human resources including recruitment, onboarding, benefits administration, and employee relations.",
    requirements: ["HR certification", "Recruitment experience", "HRIS knowledge", "Strong interpersonal skills"],
    category: "Human Resources",
    isFeatured: false,
    education: "Bachelor's Degree",
    experience: "2-5 years",
  }
];

// Sample career paths
const careerPaths = [
  {
    id: 1,
    title: "Software Development",
    stages: [
      { title: "Junior Developer", yearsExperience: "0-2", salary: "$60K-$85K" },
      { title: "Mid-level Developer", yearsExperience: "2-5", salary: "$85K-$120K" },
      { title: "Senior Developer", yearsExperience: "5-8", salary: "$120K-$160K" },
      { title: "Tech Lead", yearsExperience: "8-12", salary: "$150K-$200K" },
      { title: "Software Architect", yearsExperience: "12+", salary: "$180K-$250K" }
    ],
    keySkills: ["Programming Languages", "Algorithms", "Database Design", "System Architecture", "DevOps"],
    educationPaths: ["Computer Science Degree", "Coding Bootcamp", "Self-taught + Certifications"],
    industry: "Technology"
  },
  {
    id: 2,
    title: "Data Science",
    stages: [
      { title: "Data Analyst", yearsExperience: "0-2", salary: "$65K-$90K" },
      { title: "Junior Data Scientist", yearsExperience: "2-4", salary: "$90K-$120K" },
      { title: "Data Scientist", yearsExperience: "4-7", salary: "$120K-$150K" },
      { title: "Senior Data Scientist", yearsExperience: "7-10", salary: "$150K-$180K" },
      { title: "Lead Data Scientist", yearsExperience: "10+", salary: "$180K-$220K" }
    ],
    keySkills: ["Python/R", "Statistical Analysis", "Machine Learning", "Data Visualization", "Big Data Technologies"],
    educationPaths: ["Statistics/Mathematics Degree", "Computer Science", "Data Science Bootcamp", "MS/PhD"],
    industry: "Technology/Research"
  },
  {
    id: 3,
    title: "Marketing",
    stages: [
      { title: "Marketing Coordinator", yearsExperience: "0-2", salary: "$45K-$60K" },
      { title: "Marketing Specialist", yearsExperience: "2-5", salary: "$60K-$80K" },
      { title: "Marketing Manager", yearsExperience: "5-8", salary: "$80K-$110K" },
      { title: "Senior Marketing Manager", yearsExperience: "8-12", salary: "$110K-$140K" },
      { title: "Director of Marketing", yearsExperience: "12+", salary: "$140K-$200K" }
    ],
    keySkills: ["Digital Marketing", "Content Strategy", "Analytics", "Brand Management", "Campaign Planning"],
    educationPaths: ["Marketing Degree", "Business Administration", "Digital Marketing Certifications"],
    industry: "Various"
  },
  {
    id: 4,
    title: "Healthcare - Nursing",
    stages: [
      { title: "Registered Nurse", yearsExperience: "0-2", salary: "$60K-$75K" },
      { title: "Charge Nurse", yearsExperience: "2-5", salary: "$70K-$90K" },
      { title: "Nurse Manager", yearsExperience: "5-10", salary: "$85K-$110K" },
      { title: "Director of Nursing", yearsExperience: "10-15", salary: "$100K-$130K" },
      { title: "Chief Nursing Officer", yearsExperience: "15+", salary: "$130K-$200K" }
    ],
    keySkills: ["Patient Care", "Medical Knowledge", "Critical Thinking", "Leadership", "Communication"],
    educationPaths: ["BSN (Bachelor of Science in Nursing)", "MSN (Master of Science in Nursing)", "DNP (Doctor of Nursing Practice)"],
    industry: "Healthcare"
  }
];

const CareerExplorer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("jobs");
  const [salaryRange, setSalaryRange] = useState([50, 200]); // $50K-$200K
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  const filteredJobs = jobListings.filter(job => {
    // Search filter
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Experience filter
    const matchesExperience = experienceFilter === "all" || 
                             (experienceFilter === "entry" && job.experience.includes("0-2")) ||
                             (experienceFilter === "mid" && (job.experience.includes("2-5") || job.experience.includes("3-5"))) ||
                             (experienceFilter === "senior" && (job.experience.includes("5+") || job.experience.includes("7+")));
    
    // Industry/category filter
    const matchesIndustry = industryFilter === "all" || job.category === industryFilter;
    
    // Salary filter is simplified for the mockup
    // In a real app, would parse the salary string and compare to range values
    
    return matchesSearch && matchesExperience && matchesIndustry;
  });

  const filteredPaths = careerPaths.filter(path => {
    return path.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           path.industry.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Career Explorer</h1>
            <p className="text-gray-600">
              Discover job opportunities and career paths to plan your professional journey
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, career paths, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="career">
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </div>
        </div>

        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
            <TabsTrigger value="jobs">
              <Briefcase className="h-4 w-4 mr-2" />
              Job Listings
            </TabsTrigger>
            <TabsTrigger value="paths">
              <TrendingUp className="h-4 w-4 mr-2" />
              Career Paths
            </TabsTrigger>
          </TabsList>
          
          {/* Job Listings Tab */}
          <TabsContent value="jobs">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters panel */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Filter className="h-5 w-5 mr-2" />
                      Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Experience Level Filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Experience Level</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="exp-all" 
                            name="experience" 
                            value="all" 
                            checked={experienceFilter === "all"}
                            onChange={() => setExperienceFilter("all")}
                            className="mr-2"
                          />
                          <label htmlFor="exp-all">All levels</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="exp-entry" 
                            name="experience" 
                            value="entry" 
                            checked={experienceFilter === "entry"}
                            onChange={() => setExperienceFilter("entry")}
                            className="mr-2"
                          />
                          <label htmlFor="exp-entry">Entry Level (0-2 years)</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="exp-mid" 
                            name="experience" 
                            value="mid"
                            checked={experienceFilter === "mid"}
                            onChange={() => setExperienceFilter("mid")}
                            className="mr-2"
                          />
                          <label htmlFor="exp-mid">Mid Level (2-5 years)</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="exp-senior" 
                            name="experience" 
                            value="senior"
                            checked={experienceFilter === "senior"}
                            onChange={() => setExperienceFilter("senior")}
                            className="mr-2"
                          />
                          <label htmlFor="exp-senior">Senior Level (5+ years)</label>
                        </div>
                      </div>
                    </div>

                    {/* Salary Range Filter */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="text-sm font-medium">Salary Range</h3>
                        <span className="text-sm text-gray-500">
                          ${salaryRange[0]}K - ${salaryRange[1]}K
                        </span>
                      </div>
                      <Slider 
                        defaultValue={[50, 200]}
                        min={30}
                        max={300}
                        step={5}
                        value={salaryRange}
                        onValueChange={(value) => setSalaryRange(value as [number, number])}
                        className="my-6"
                      />
                    </div>

                    {/* Industry Filter */}
                    <div>
                      <h3 className="text-sm font-medium mb-2">Industry</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="ind-all" 
                            name="industry" 
                            value="all"
                            checked={industryFilter === "all"}
                            onChange={() => setIndustryFilter("all")}
                            className="mr-2"
                          />
                          <label htmlFor="ind-all">All Industries</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="ind-tech" 
                            name="industry" 
                            value="Technology"
                            checked={industryFilter === "Technology"}
                            onChange={() => setIndustryFilter("Technology")}
                            className="mr-2"
                          />
                          <label htmlFor="ind-tech">Technology</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="ind-finance" 
                            name="industry" 
                            value="Finance"
                            checked={industryFilter === "Finance"}
                            onChange={() => setIndustryFilter("Finance")}
                            className="mr-2"
                          />
                          <label htmlFor="ind-finance">Finance</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="ind-marketing" 
                            name="industry" 
                            value="Marketing"
                            checked={industryFilter === "Marketing"}
                            onChange={() => setIndustryFilter("Marketing")}
                            className="mr-2"
                          />
                          <label htmlFor="ind-marketing">Marketing</label>
                        </div>
                        <div className="flex items-center">
                          <input 
                            type="radio" 
                            id="ind-design" 
                            name="industry" 
                            value="Design"
                            checked={industryFilter === "Design"}
                            onChange={() => setIndustryFilter("Design")}
                            className="mr-2"
                          />
                          <label htmlFor="ind-design">Design</label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-t">
                      <Button variant="outline" onClick={() => {
                        setExperienceFilter("all");
                        setIndustryFilter("all");
                        setSalaryRange([50, 200]);
                      }}>
                        Reset Filters
                      </Button>
                      <Button variant="career">Apply Filters</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Job Listings */}
              <div className="lg:col-span-3">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {filteredJobs.length} Job{filteredJobs.length !== 1 && 's'} Found
                  </h2>
                  <div className="text-sm text-gray-500">
                    Sort By: <span className="font-medium">Newest</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <Card key={job.id} className={job.isFeatured ? "border-careerblue-300 bg-careerblue-50/30" : ""}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-semibold">{job.title}</h3>
                                {job.isFeatured && (
                                  <Badge className="bg-amber-500">
                                    <Star className="h-3 w-3 mr-1 fill-white" />
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <div className="text-gray-700 mb-1">{job.company}</div>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {job.location}
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  {job.salary}
                                </div>
                                <div className="flex items-center">
                                  <Briefcase className="h-4 w-4 mr-1" />
                                  {job.type}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {job.postedDate}
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className="bg-white">
                              {job.category}
                            </Badge>
                          </div>

                          <div className="mb-4">
                            <p className="text-gray-700">{job.description}</p>
                          </div>

                          <div className="mb-4">
                            <div className="font-medium text-sm mb-2">Requirements:</div>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                              {job.requirements.map((req, idx) => (
                                <li key={idx}>{req}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            <Button variant="career">Apply Now</Button>
                            <Button variant="outline">Save Job</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No job listings found</h3>
                      <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
                      <Button
                        variant="career"
                        onClick={() => {
                          setSearchQuery("");
                          setExperienceFilter("all");
                          setIndustryFilter("all");
                          setSalaryRange([50, 200]);
                        }}
                      >
                        Reset All Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Career Paths Tab */}
          <TabsContent value="paths">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredPaths.length > 0 ? (
                filteredPaths.map((path) => (
                  <Card key={path.id} className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{path.title}</CardTitle>
                        <Badge variant="outline">{path.industry}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium flex items-center mb-2">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Career Progression
                        </h3>
                        <div className="space-y-2">
                          {path.stages.map((stage, idx) => (
                            <div key={idx} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                              <span className="font-medium">{stage.title}</span>
                              <div className="text-gray-500 flex items-center space-x-2">
                                <span>{stage.yearsExperience} yrs</span>
                                <span>|</span>
                                <span>{stage.salary}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium flex items-center mb-2">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Key Skills
                        </h3>
                        <div className="flex flex-wrap gap-1">
                          {path.keySkills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-gray-100">{skill}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium flex items-center mb-2">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          Education Paths
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {path.educationPaths.map((edu, idx) => (
                            <li key={idx}>{edu}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/career-path/${path.id}`} className="w-full">
                        <Button variant="career" className="w-full">
                          Explore This Career Path
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No career paths found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search criteria</p>
                  <Button variant="career" onClick={() => setSearchQuery("")}>
                    Reset Search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareerExplorer;
