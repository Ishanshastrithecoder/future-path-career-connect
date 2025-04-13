
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Download, Plus, Trash2 } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  summary: z.string().min(20, { message: "Summary should be at least 20 characters." }),
  skills: z.string().min(3, { message: "Please add at least one skill." }),
});

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

const ResumeBuilder = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("professional");
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user ? `${user.firstName} ${user.lastName}` : "",
      email: user?.email || "",
      phone: "",
      summary: "",
      skills: user?.skills?.join(", ") || "",
    },
  });

  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu: EducationItem = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would send data to an API for PDF generation
    console.log("Resume data:", { 
      personal: values, 
      experiences, 
      education, 
      template: selectedTemplate 
    });
    
    toast({
      title: "Resume generated!",
      description: "Your resume has been successfully created.",
    });
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
        <p className="text-gray-600 mb-6">
          Create a professional resume tailored to your career goals
        </p>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="template">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Add your contact information and professional summary
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Summary</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Briefly describe your professional background and career goals" 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skills</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter your skills, separated by commas (e.g., JavaScript, Project Management, Data Analysis)" 
                              className="min-h-[80px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("template")}>Back</Button>
                <Button onClick={() => setActiveTab("experience")}>Next</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>
                  Add your relevant work experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Experience #{index + 1}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeExperience(exp.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Company</FormLabel>
                        <Input 
                          value={exp.company} 
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} 
                          placeholder="Company name"
                        />
                      </div>
                      <div>
                        <FormLabel>Position</FormLabel>
                        <Input 
                          value={exp.position} 
                          onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} 
                          placeholder="Job title"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Start Date</FormLabel>
                        <Input 
                          type="date" 
                          value={exp.startDate} 
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} 
                        />
                      </div>
                      <div>
                        <FormLabel>End Date</FormLabel>
                        <Input 
                          type="date" 
                          value={exp.endDate} 
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <FormLabel>Description</FormLabel>
                      <Textarea 
                        value={exp.description} 
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} 
                        placeholder="Describe your responsibilities and achievements"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={addExperience} 
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("personal")}>Back</Button>
                <Button onClick={() => setActiveTab("education")}>Next</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>
                  Add your educational background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Education #{index + 1}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeEducation(edu.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    
                    <div>
                      <FormLabel>Institution</FormLabel>
                      <Input 
                        value={edu.institution} 
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} 
                        placeholder="University or institution name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Degree</FormLabel>
                        <Input 
                          value={edu.degree} 
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} 
                          placeholder="Bachelor's, Master's, etc."
                        />
                      </div>
                      <div>
                        <FormLabel>Field of Study</FormLabel>
                        <Input 
                          value={edu.field} 
                          onChange={(e) => updateEducation(edu.id, 'field', e.target.value)} 
                          placeholder="Computer Science, Business, etc."
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Start Date</FormLabel>
                        <Input 
                          type="date" 
                          value={edu.startDate} 
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} 
                        />
                      </div>
                      <div>
                        <FormLabel>End Date</FormLabel>
                        <Input 
                          type="date" 
                          value={edu.endDate} 
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={addEducation} 
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("experience")}>Back</Button>
                <Button onClick={() => setActiveTab("template")}>Next</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="template" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose a Template</CardTitle>
                <CardDescription>
                  Select a template for your resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${selectedTemplate === 'professional' ? 'ring-2 ring-careerblue-500' : ''}`}
                    onClick={() => setSelectedTemplate('professional')}
                  >
                    <div className="aspect-[8.5/11] bg-gray-100 mb-3 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-center">Professional</h3>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${selectedTemplate === 'modern' ? 'ring-2 ring-careerblue-500' : ''}`}
                    onClick={() => setSelectedTemplate('modern')}
                  >
                    <div className="aspect-[8.5/11] bg-gray-100 mb-3 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-center">Modern</h3>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer ${selectedTemplate === 'creative' ? 'ring-2 ring-careerblue-500' : ''}`}
                    onClick={() => setSelectedTemplate('creative')}
                  >
                    <div className="aspect-[8.5/11] bg-gray-100 mb-3 flex items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-center">Creative</h3>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("education")}>Back</Button>
                <Button onClick={form.handleSubmit(onSubmit)} className="bg-careerblue-600 hover:bg-careerblue-700">
                  <Download className="mr-2 h-4 w-4" />
                  Generate Resume
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeBuilder;
