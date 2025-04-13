
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  TrendingUp, ChevronLeft, BookOpen, GraduationCap, Building,
  DollarSign, Clock, Award, Users, MessageCircle, FileText, 
  Briefcase, BookMarked, Clock8
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Sample career path data (expanded from the CareerExplorer)
const careerPathsData = {
  "1": {
    id: 1,
    title: "Software Development",
    description: "Software development is a dynamic and evolving field that offers multiple advancement paths. From entry-level programming to architectural leadership roles, this career track rewards continuous learning and technical expertise.",
    stages: [
      { 
        title: "Junior Developer", 
        yearsExperience: "0-2", 
        salary: "$60K-$85K",
        description: "Entry-level position focused on implementing features under supervision, fixing bugs, and learning development processes.",
        skills: ["Basic programming", "Version control", "Testing", "Code review participation"]
      },
      { 
        title: "Mid-level Developer", 
        yearsExperience: "2-5", 
        salary: "$85K-$120K",
        description: "Takes ownership of features and components, mentors junior developers, and participates in architectural discussions.",
        skills: ["System design", "Code optimization", "Debugging complex issues", "Technical documentation"]
      },
      { 
        title: "Senior Developer", 
        yearsExperience: "5-8", 
        salary: "$120K-$160K",
        description: "Creates architectural designs, leads development of complex features, and influences technical decisions.",
        skills: ["Architecture patterns", "Performance optimization", "Technical leadership", "Cross-team collaboration"]
      },
      { 
        title: "Tech Lead", 
        yearsExperience: "8-12", 
        salary: "$150K-$200K",
        description: "Sets technical direction for team or product area, mentors senior developers, and balances technical debt with new development.",
        skills: ["Team leadership", "Project planning", "Technical strategy", "Stakeholder management"]
      },
      { 
        title: "Software Architect", 
        yearsExperience: "12+", 
        salary: "$180K-$250K",
        description: "Designs system architecture across multiple products, establishes technical standards, and guides organization-wide technical decisions.",
        skills: ["Enterprise architecture", "Technical governance", "Cross-functional leadership", "Technology roadmapping"]
      }
    ],
    keySkills: [
      "Programming Languages (Java, Python, JavaScript, etc.)",
      "Data Structures & Algorithms",
      "Database Design & SQL",
      "System Architecture",
      "API Design",
      "Testing Methodologies",
      "DevOps Practices",
      "Cloud Services"
    ],
    educationPaths: [
      { 
        title: "Computer Science Degree", 
        description: "Traditional 4-year degree with comprehensive theoretical foundation and practical programming experience.",
        duration: "4 years",
        institutions: ["University of Washington", "Stanford", "MIT", "Georgia Tech", "UC Berkeley"]
      },
      { 
        title: "Coding Bootcamp", 
        description: "Intensive, focused training on practical development skills to prepare for entry-level positions.",
        duration: "3-6 months",
        institutions: ["Hack Reactor", "App Academy", "Flatiron School", "General Assembly"]
      },
      { 
        title: "Self-taught + Certifications", 
        description: "Self-directed learning through online resources combined with industry certifications.",
        duration: "Varies",
        institutions: ["freeCodeCamp", "Coursera", "Udemy", "AWS/Google/Microsoft Certifications"]
      }
    ],
    industry: "Technology",
    relatedJobs: [1, 7], // References to job IDs from job listings
    certifications: [
      "AWS Certified Developer",
      "Google Cloud Professional Developer",
      "Microsoft Certified: Azure Developer Associate",
      "Oracle Certified Professional: Java SE Developer",
      "Certified Kubernetes Application Developer (CKAD)"
    ],
    mentors: [
      {
        name: "David Miller",
        role: "Senior Software Architect",
        company: "TechCorp Inc.",
        yearsExperience: 15,
        profilePic: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Sarah Johnson",
        role: "Engineering Manager",
        company: "CodeWorks",
        yearsExperience: 12,
        profilePic: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    ]
  },
  "2": {
    id: 2,
    title: "Data Science",
    description: "Data science combines statistical analysis, programming, and domain knowledge to extract insights from data. This career path offers opportunities in various industries, from tech to finance, healthcare, and more.",
    stages: [
      { 
        title: "Data Analyst", 
        yearsExperience: "0-2", 
        salary: "$65K-$90K",
        description: "Focuses on data cleaning, basic analysis, and creating visualizations to communicate findings.",
        skills: ["SQL", "Data visualization", "Basic statistics", "Reporting"]
      },
      { 
        title: "Junior Data Scientist", 
        yearsExperience: "2-4", 
        salary: "$90K-$120K",
        description: "Applies statistical methods and basic machine learning models to solve business problems with data.",
        skills: ["Statistical modeling", "Python/R programming", "Basic ML algorithms", "Data preprocessing"]
      },
      { 
        title: "Data Scientist", 
        yearsExperience: "4-7", 
        salary: "$120K-$150K",
        description: "Develops advanced models, works with large datasets, and translates business problems into data solutions.",
        skills: ["Advanced ML algorithms", "Feature engineering", "Model deployment", "Business acumen"]
      },
      { 
        title: "Senior Data Scientist", 
        yearsExperience: "7-10", 
        salary: "$150K-$180K",
        description: "Leads data science initiatives, mentors junior team members, and influences data strategy.",
        skills: ["Deep learning", "NLP", "Experimental design", "Technical leadership"]
      },
      { 
        title: "Lead Data Scientist", 
        yearsExperience: "10+", 
        salary: "$180K-$220K",
        description: "Sets data science strategy, leads teams, and works with executives to drive business impact through data.",
        skills: ["Team leadership", "Research direction", "Strategic thinking", "Executive communication"]
      }
    ],
    keySkills: [
      "Python/R Programming",
      "Statistical Analysis",
      "Machine Learning",
      "Data Visualization",
      "SQL & Database Knowledge",
      "Big Data Technologies",
      "Domain Expertise",
      "Communication"
    ],
    educationPaths: [
      { 
        title: "Statistics/Mathematics Degree", 
        description: "Strong foundation in statistical theory and mathematical concepts essential for data science.",
        duration: "4 years",
        institutions: ["Stanford", "UCLA", "University of Michigan", "Carnegie Mellon"]
      },
      { 
        title: "Computer Science with Data Science Focus", 
        description: "CS degree with specialized coursework in data analysis, machine learning, and statistics.",
        duration: "4 years",
        institutions: ["UC Berkeley", "MIT", "Georgia Tech", "University of Washington"]
      },
      { 
        title: "Master's/PhD in Data Science", 
        description: "Advanced degree programs specifically focused on data science theory and practice.",
        duration: "2-5 years",
        institutions: ["MIT", "Stanford", "NYU", "Berkeley"]
      }
    ],
    industry: "Technology/Research",
    relatedJobs: [4],
    certifications: [
      "IBM Data Science Professional Certificate",
      "Microsoft Certified: Azure Data Scientist Associate",
      "Google Cloud Professional Data Engineer",
      "Cloudera Certified Professional: Data Scientist",
      "TensorFlow Developer Certificate"
    ],
    mentors: [
      {
        name: "Michael Chen",
        role: "Principal Data Scientist",
        company: "DataWorks Inc.",
        yearsExperience: 10,
        profilePic: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        name: "Jennifer Smith",
        role: "Director of Analytics",
        company: "TechGrowth",
        yearsExperience: 14,
        profilePic: "https://randomuser.me/api/portraits/women/68.jpg"
      }
    ]
  }
};

// Sample job listings (abbreviated from CareerExplorer)
const jobListings = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    description: "We are looking for a skilled software engineer proficient in React, Node.js, and cloud technologies to join our growing team.",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataWorks Inc.",
    location: "Boston, MA",
    salary: "$140,000 - $180,000",
    description: "Apply statistical analysis, machine learning, and data visualization to extract insights from complex datasets.",
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    salary: "$125,000 - $155,000",
    description: "Build and maintain CI/CD pipelines, cloud infrastructure, and automated deployment systems.",
  }
];

const CareerPathDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // If no ID or invalid ID, show error
  if (!id || !careerPathsData[id as keyof typeof careerPathsData]) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Career Path Not Found</h1>
        <p className="mb-6">The career path you're looking for doesn't exist or has been removed.</p>
        <Link to="/career-explorer">
          <Button variant="career">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Career Explorer
          </Button>
        </Link>
      </div>
    );
  }
  
  const careerPath = careerPathsData[id as keyof typeof careerPathsData];
  const relatedJobData = careerPath.relatedJobs.map(jobId => 
    jobListings.find(job => job.id === jobId)
  ).filter(Boolean);
  
  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link to="/career-explorer" className="text-careerblue-600 hover:text-careerblue-800 flex items-center text-sm mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Career Explorer
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{careerPath.title}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <Building className="h-4 w-4 mr-1" />
                <span>Industry: {careerPath.industry}</span>
              </div>
              <Badge variant="outline" className="bg-careerblue-50 text-careerblue-800 border-careerblue-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                Career Path
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">
                Save Path
              </Button>
              <Button variant="career">
                Find Mentors
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progression">Career Stages</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Career Path Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 text-gray-700">{careerPath.description}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Key Skills</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {careerPath.keySkills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-50">{skill}</Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-3">Career Progression</h3>
                    <div className="relative">
                      <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gray-200"></div>
                      <div className="space-y-6">
                        {careerPath.stages.map((stage, idx) => (
                          <div key={idx} className="relative flex">
                            <div className="flex-shrink-0 w-16">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-careerblue-100 text-careerblue-600 border border-careerblue-200 z-10 relative">
                                {idx + 1}
                              </div>
                            </div>
                            <div className="flex-grow pb-2">
                              <div className="flex justify-between items-start">
                                <h4 className="text-md font-semibold">{stage.title}</h4>
                                <div className="text-sm text-gray-500">
                                  {stage.yearsExperience} years • {stage.salary}
                                </div>
                              </div>
                              <p className="text-gray-600 mt-1 text-sm">{stage.description}</p>
                              <div className="mt-2">
                                <span className="text-xs font-medium text-gray-500">KEY SKILLS:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {stage.skills.map((skill, skillIdx) => (
                                    <Badge key={skillIdx} variant="secondary" className="text-xs bg-gray-100">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Sidebar content */}
              <div className="space-y-6">
                {/* Related Jobs */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Related Job Openings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedJobData.length > 0 ? (
                      relatedJobData.map((job: any) => (
                        <div key={job.id} className="border-b pb-3 last:border-0 last:pb-0">
                          <h4 className="font-medium">{job.title}</h4>
                          <div className="text-sm text-gray-600">{job.company}</div>
                          <div className="text-sm text-gray-500">{job.location}</div>
                          <div className="mt-2">
                            <Link to={`/career-explorer?job=${job.id}`}>
                              <Button variant="outline" size="sm" className="w-full">
                                View Job
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-500">No related jobs found</div>
                    )}
                    
                    <div className="pt-2">
                      <Link to="/career-explorer">
                        <Button variant="career" size="responsive" className="w-full">
                          View All Jobs
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Connect with Mentors */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Connect with Mentors</CardTitle>
                    <CardDescription>
                      Professionals in this career path
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {careerPath.mentors.map((mentor, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={mentor.profilePic} alt={mentor.name} />
                          <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{mentor.name}</div>
                          <div className="text-sm text-gray-600">{mentor.role}</div>
                          <div className="text-sm text-gray-500">{mentor.company}</div>
                        </div>
                      </div>
                    ))}
                    
                    <Link to="/mentors">
                      <Button variant="career" size="responsive" className="w-full mt-2">
                        <Users className="h-4 w-4 mr-1" />
                        Find More Mentors
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Career Progression Tab */}
          <TabsContent value="progression">
            <Card>
              <CardHeader>
                <CardTitle>Career Stages & Advancement</CardTitle>
                <CardDescription>
                  Detailed progression path and skills required at each stage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {careerPath.stages.map((stage, idx) => (
                  <Card key={idx}>
                    <CardHeader className="bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <Badge variant="secondary" className="mb-1">Stage {idx + 1}</Badge>
                          <CardTitle className="text-xl">{stage.title}</CardTitle>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{stage.yearsExperience} years experience</div>
                          <div className="text-lg font-bold text-careerblue-700">{stage.salary}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Role Description</h4>
                        <p className="text-gray-700">{stage.description}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Key Responsibilities</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Technical implementation and problem-solving</li>
                          <li>Collaboration with team members and stakeholders</li>
                          <li>Quality assurance and testing</li>
                          <li>Documentation and knowledge sharing</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Required Skills</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {stage.skills.map((skill, skillIdx) => (
                            <div key={skillIdx} className="flex items-center bg-gray-50 p-2 rounded">
                              <Award className="h-4 w-4 text-careerblue-600 mr-2" />
                              <span>{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Education Tab */}
          <TabsContent value="education">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careerPath.educationPaths.map((edu, idx) => (
                <Card key={idx} className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{edu.title}</CardTitle>
                      <Badge variant="outline">
                        <Clock8 className="h-3 w-3 mr-1" />
                        {edu.duration}
                      </Badge>
                    </div>
                    <CardDescription>{edu.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Notable Institutions</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {edu.institutions.map((inst, instIdx) => (
                          <li key={instIdx}>{inst}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="responsive" className="w-full">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Explore Programs
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-careerblue-600" />
                    Professional Certifications
                  </CardTitle>
                  <CardDescription>
                    Industry-recognized certifications to enhance your credentials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {careerPath.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center bg-gray-50 p-3 rounded-md">
                        <div className="h-8 w-8 rounded-full bg-careerblue-100 flex items-center justify-center text-careerblue-700 mr-3">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="font-medium">{cert}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Recommended Books</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium">Clean Code</h4>
                          <p className="text-sm text-gray-600">By Robert C. Martin</p>
                          <p className="text-sm text-gray-500 mt-1">A handbook of agile software craftsmanship</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium">Design Patterns</h4>
                          <p className="text-sm text-gray-600">By Erich Gamma et al</p>
                          <p className="text-sm text-gray-500 mt-1">Elements of Reusable Object-Oriented Software</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium">The Pragmatic Programmer</h4>
                          <p className="text-sm text-gray-600">By Andrew Hunt & David Thomas</p>
                          <p className="text-sm text-gray-500 mt-1">From Journeyman to Master</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium">Cracking the Coding Interview</h4>
                          <p className="text-sm text-gray-600">By Gayle Laakmann McDowell</p>
                          <p className="text-sm text-gray-500 mt-1">189 Programming Questions and Solutions</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Online Courses</h3>
                      <div className="space-y-3">
                        <div className="border-b pb-3">
                          <div className="flex justify-between">
                            <h4 className="font-medium">CS50: Introduction to Computer Science</h4>
                            <Badge>Free</Badge>
                          </div>
                          <p className="text-sm text-gray-600">Harvard University (via edX)</p>
                          <p className="text-sm text-gray-500 mt-1">Comprehensive introduction to computer science and programming</p>
                        </div>
                        <div className="border-b pb-3">
                          <div className="flex justify-between">
                            <h4 className="font-medium">The Complete Web Developer Course</h4>
                            <Badge variant="outline">Paid</Badge>
                          </div>
                          <p className="text-sm text-gray-600">Udemy</p>
                          <p className="text-sm text-gray-500 mt-1">Learn web development from scratch to advanced concepts</p>
                        </div>
                        <div className="pb-3">
                          <div className="flex justify-between">
                            <h4 className="font-medium">Software Engineering: Introduction</h4>
                            <Badge>Free</Badge>
                          </div>
                          <p className="text-sm text-gray-600">MIT OpenCourseWare</p>
                          <p className="text-sm text-gray-500 mt-1">Principles of software development and engineering</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Professional Organizations & Communities</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium">IEEE Computer Society</h4>
                          <p className="text-sm text-gray-500 mt-1">Professional organization for computer science and engineering</p>
                          <Button variant="outline" size="sm" className="mt-2">Visit Website</Button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium">Stack Overflow</h4>
                          <p className="text-sm text-gray-500 mt-1">Community for developers to learn and share knowledge</p>
                          <Button variant="outline" size="sm" className="mt-2">Visit Website</Button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium">GitHub</h4>
                          <p className="text-sm text-gray-500 mt-1">Platform for code hosting, collaboration and version control</p>
                          <Button variant="outline" size="sm" className="mt-2">Visit Website</Button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="font-medium">Dev.to</h4>
                          <p className="text-sm text-gray-500 mt-1">Community of software developers sharing ideas and helping each other</p>
                          <Button variant="outline" size="sm" className="mt-2">Visit Website</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Industry News & Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-medium">The Rise of Remote Development Teams</h4>
                      <p className="text-sm text-gray-500">2 days ago • TechCrunch</p>
                    </div>
                    <div className="border-b pb-3">
                      <h4 className="font-medium">AI Integration in Modern Software Development</h4>
                      <p className="text-sm text-gray-500">1 week ago • InfoWorld</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Cybersecurity: The Developer's Responsibility</h4>
                      <p className="text-sm text-gray-500">2 weeks ago • Wired</p>
                    </div>
                    
                    <Button variant="outline" size="responsive" className="w-full">
                      View All Articles
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Networking Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium">Developer Conference 2025</h4>
                      <p className="text-sm text-gray-600">June 15-17, 2025 • San Francisco, CA</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Code Summit</h4>
                      <p className="text-sm text-gray-600">August 5-7, 2025 • New York, NY</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Tech Meetup: Software Engineering</h4>
                      <p className="text-sm text-gray-600">Monthly • Virtual Event</p>
                    </div>
                    
                    <Button variant="career" size="responsive" className="w-full">
                      Find Events Near You
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6 px-6 pb-6 text-center">
                    <BookMarked className="h-12 w-12 mx-auto text-careerblue-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Need personalized guidance?</h3>
                    <p className="text-gray-600 mb-4">
                      Connect with a career advisor for customized advice tailored to your goals
                    </p>
                    <Button variant="career" size="responsive" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Book a Consultation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareerPathDetail;
