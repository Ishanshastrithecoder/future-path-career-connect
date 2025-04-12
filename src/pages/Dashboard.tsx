
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, PieChart, FileText, Calendar, Award, BookOpen, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data
const careerProgressData = [
  { name: 'Q1', completed: 65, planned: 80 },
  { name: 'Q2', completed: 75, planned: 85 },
  { name: 'Q3', completed: 90, planned: 90 },
  { name: 'Q4', completed: 95, planned: 100 },
];

const skillData = [
  { name: 'Technical', skill: 80 },
  { name: 'Communication', skill: 70 },
  { name: 'Leadership', skill: 55 },
  { name: 'Problem Solving', skill: 85 },
  { name: 'Teamwork', skill: 75 },
];

const upcomingEvents = [
  { id: 1, title: 'Mock Interview Practice', date: '2025-04-15', type: 'Interview Prep' },
  { id: 2, title: 'Industry Networking Event', date: '2025-04-20', type: 'Networking' },
  { id: 3, title: 'Software Engineering Workshop', date: '2025-04-28', type: 'Workshop' },
];

const recentAchievements = [
  { id: 1, title: 'Completed JavaScript Assessment', date: '2025-04-05', score: 92 },
  { id: 2, title: 'Resume Review', date: '2025-04-02', feedback: 'Strong technical skills highlighted' },
  { id: 3, title: 'Mock Interview', date: '2025-03-28', performance: 'Advanced' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.firstName || user?.username}! Here's your career progress.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            asChild
          >
            <Link to="/resume-builder">
              <FileText size={16} />
              Resume
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            asChild
          >
            <Link to="/chatbot">
              <BookOpen size={16} />
              Career Assistant
            </Link>
          </Button>
          <Button
            size="sm"
            className="bg-careerblue-600 hover:bg-careerblue-700 flex items-center gap-1"
            asChild
          >
            <Link to="/skill-assessment">
              <Target size={16} />
              Start Assessment
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full md:w-auto grid grid-cols-3 md:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Career Path Progress</CardTitle>
                <CardDescription>Your current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Software Engineering</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="pt-4 flex justify-between text-sm text-muted-foreground">
                    <div>Started: Jan 2025</div>
                    <div>Est. completion: Dec 2025</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Skills Assessment</CardTitle>
                <CardDescription>Your skill proficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skillData.slice(0, 3).map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{skill.name}</span>
                        <span className="font-medium">{skill.skill}%</span>
                      </div>
                      <Progress value={skill.skill} className="h-2" />
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full mt-2" asChild>
                    <Link to="/skill-assessment">View all skills</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>Schedule and reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 2).map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <div className="bg-muted rounded-md w-10 h-10 flex items-center justify-center text-center">
                        <div>
                          <div className="text-xs font-medium">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                          <div className="text-lg font-bold leading-none">
                            {new Date(event.date).getDate()}
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link to="/calendar">View calendar</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Career Progress</CardTitle>
                <CardDescription>Your quarterly achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={careerProgressData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#3B82F6" name="Completed" />
                      <Bar dataKey="planned" fill="#93C5FD" name="Planned" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
                <CardDescription>Your latest milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start gap-3">
                      <div className="bg-careerblue-100 text-careerblue-700 rounded-full p-1">
                        <Award size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {achievement.score && (
                            <Badge variant="secondary" className="text-xs">
                              Score: {achievement.score}%
                            </Badge>
                          )}
                          {achievement.feedback && (
                            <Badge variant="outline" className="text-xs">
                              {achievement.feedback}
                            </Badge>
                          )}
                          {achievement.performance && (
                            <Badge variant="secondary" className="text-xs">
                              {achievement.performance}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recommended Actions</CardTitle>
                <CardDescription>Steps to accelerate your career growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto flex flex-col items-start p-4 text-left" asChild>
                    <Link to="/skill-assessment">
                      <div className="bg-careerblue-100 text-careerblue-700 p-2 rounded-md mb-2">
                        <Target size={20} />
                      </div>
                      <div className="font-medium mb-1">Complete Technical Assessment</div>
                      <p className="text-sm text-muted-foreground">Evaluate your current technical skills and identify growth areas.</p>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col items-start p-4 text-left" asChild>
                    <Link to="/mentors">
                      <div className="bg-careerblue-100 text-careerblue-700 p-2 rounded-md mb-2">
                        <Award size={20} />
                      </div>
                      <div className="font-medium mb-1">Connect with a Mentor</div>
                      <p className="text-sm text-muted-foreground">Find a mentor in your field to guide your career path.</p>
                    </Link>
                  </Button>
                  <Button variant="outline" className="h-auto flex flex-col items-start p-4 text-left" asChild>
                    <Link to="/resume-builder">
                      <div className="bg-careerblue-100 text-careerblue-700 p-2 rounded-md mb-2">
                        <FileText size={20} />
                      </div>
                      <div className="font-medium mb-1">Update Your Resume</div>
                      <p className="text-sm text-muted-foreground">Refresh your resume with your latest skills and experiences.</p>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="animate-fade-in">
          <div className="space-y-6">
            {/* Progress tab content */}
            <Card>
              <CardHeader>
                <CardTitle>Progress details coming soon</CardTitle>
                <CardDescription>
                  This section will contain detailed progress tracking and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're still building this feature. Check back soon!
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="animate-fade-in">
          <div className="space-y-6">
            {/* Recommendations tab content */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized recommendations coming soon</CardTitle>
                <CardDescription>
                  This section will contain AI-generated career recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're still building this feature. Check back soon!
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
