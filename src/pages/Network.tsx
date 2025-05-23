import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Search, Users, UserPlus, MessageCircle, Bell, Briefcase, BookOpen, MapPin, ThumbsUp, MessageSquare, Share2, GraduationCap, Building } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import NetworkCommentForm from '@/components/NetworkCommentForm';

const connections = [
  {
    id: 1,
    name: "Emma Johnson",
    title: "Product Manager",
    company: "TechGrowth Inc.",
    industry: "Technology",
    location: "San Francisco, CA",
    education: "MBA, Stanford University",
    mutualConnections: 12,
    profilePicture: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    name: "David Chen",
    title: "Software Engineer",
    company: "CodeWorks",
    industry: "Technology",
    location: "Seattle, WA",
    education: "BS Computer Science, University of Washington",
    mutualConnections: 8,
    profilePicture: "https://randomuser.me/api/portraits/men/72.jpg"
  },
  {
    id: 3,
    name: "Sarah Miller",
    title: "Marketing Director",
    company: "Brand Elevate",
    industry: "Marketing",
    location: "Chicago, IL",
    education: "BA Marketing, Northwestern University",
    mutualConnections: 5,
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const suggestedConnections = [
  {
    id: 4,
    name: "Rahul Patel",
    title: "Finance Analyst",
    company: "Global Financial",
    industry: "Finance",
    location: "New York, NY",
    education: "MS Finance, NYU",
    mutualConnections: 3,
    profilePicture: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    id: 5,
    name: "Jennifer Williams",
    title: "UX Designer",
    company: "Creative Solutions",
    industry: "Design",
    location: "Austin, TX",
    education: "BFA Design, RISD",
    mutualConnections: 2,
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 6,
    name: "Michael Brown",
    title: "Healthcare Administrator",
    company: "MedLife Systems",
    industry: "Healthcare",
    location: "Boston, MA",
    education: "MHA, Boston University",
    mutualConnections: 1,
    profilePicture: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

const initialPosts = [
  {
    id: 1,
    author: {
      name: "Lisa Moore",
      title: "Senior Developer",
      company: "Tech Innovations",
      profilePicture: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    content: "Excited to share that my article on career transitions to tech has been published! Check it out and let me know your thoughts.",
    timestamp: "2 hours ago",
    likes: 42,
    comments: [
      {
        id: 1,
        author: {
          name: "James Wilson",
          title: "Project Manager",
          profilePicture: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        text: "Great article, Lisa! Your insights on transitioning from non-tech backgrounds are especially valuable.",
        timestamp: "1 hour ago"
      },
      {
        id: 2,
        author: {
          name: "Sarah Miller",
          title: "UX Designer",
          profilePicture: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        text: "Thanks for sharing! I've been considering a career switch myself, and this gives me hope.",
        timestamp: "45 minutes ago"
      }
    ],
    commentsExpanded: false,
    liked: false,
    image: null,
    tags: ["Career Development", "Tech Industry"]
  },
  {
    id: 2,
    author: {
      name: "James Wilson",
      title: "Project Manager",
      company: "BuildRight Solutions",
      profilePicture: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    content: "Just completed my certification in Advanced Project Management. Always learning, always growing!",
    timestamp: "5 hours ago",
    likes: 87,
    comments: [
      {
        id: 1,
        author: {
          name: "Emma Johnson",
          title: "Product Manager",
          profilePicture: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        text: "Congratulations! Which certification did you go for?",
        timestamp: "4 hours ago"
      }
    ],
    commentsExpanded: false,
    liked: false,
    image: null,
    tags: ["Project Management", "Professional Development"]
  },
  {
    id: 3,
    author: {
      name: "TechCorp",
      title: "Company",
      company: "",
      profilePicture: "https://randomuser.me/api/portraits/lego/1.jpg"
    },
    content: "We're hiring! Looking for talented software engineers to join our growing team. Remote positions available.",
    timestamp: "1 day ago",
    likes: 124,
    comments: [],
    commentsExpanded: false,
    liked: true,
    image: null,
    tags: ["Job Opportunity", "Remote Work", "Software Engineering"]
  }
];

const careerInsights = [
  {
    id: 1,
    title: "Software Engineering Career Growth",
    description: "Explore the latest trends in software engineering career paths, compensation, and skill demands.",
    type: "Industry Report",
    image: "https://randomuser.me/api/portraits/lego/2.jpg"
  },
  {
    id: 2,
    title: "Data Science vs. Machine Learning Engineer",
    description: "A comprehensive comparison of these two high-demand career paths and how to position yourself for success.",
    type: "Career Comparison",
    image: "https://randomuser.me/api/portraits/lego/3.jpg"
  },
  {
    id: 3,
    title: "The Future of Remote Work",
    description: "How companies and professionals are adapting to remote and hybrid work models in 2025 and beyond.",
    type: "Workplace Trends",
    image: "https://randomuser.me/api/portraits/lego/4.jpg"
  }
];

const Network = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [activeTab, setActiveTab] = useState("feed");
  const [postContent, setPostContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const [postTags, setPostTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});

  const handleCreatePost = () => {
    if (!postContent.trim()) return;
    
    const newPost = {
      id: Date.now(),
      author: {
        name: user ? `${user.firstName} ${user.lastName}` : "Anonymous User",
        title: user?.occupation || "Professional",
        company: "",
        profilePicture: user?.profilePicture || "https://randomuser.me/api/portraits/lego/1.jpg"
      },
      content: postContent,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      commentsExpanded: false,
      liked: false,
      image: null,
      tags: postTags
    };
    
    setPosts([newPost, ...posts]);
    setPostContent("");
    setPostTags([]);
    
    toast({
      title: "Post created!",
      description: "Your post has been published to your network."
    });
  };

  const handleLikePost = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleConnect = (id: number) => {
    toast({
      title: "Connection request sent!",
      description: "They'll be notified of your request."
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !postTags.includes(tagInput.trim())) {
      setPostTags([...postTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPostTags(postTags.filter(tag => tag !== tagToRemove));
  };

  const toggleComments = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsExpanded: !post.commentsExpanded
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: number, commentText: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          author: {
            name: user ? `${user.firstName} ${user.lastName}` : "Anonymous User",
            title: user?.occupation || "Professional",
            profilePicture: user?.profilePicture || "https://randomuser.me/api/portraits/lego/1.jpg"
          },
          text: commentText,
          timestamp: "Just now"
        };
        
        return {
          ...post,
          comments: [...post.comments, newComment],
          commentsExpanded: true
        };
      }
      return post;
    }));
  };

  const filteredConnections = connections.filter(conn => 
    conn.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    conn.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    conn.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggestions = suggestedConnections.filter(conn => 
    conn.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    conn.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    conn.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Professional Network</h1>
        <p className="text-gray-600 mb-6">
          Connect with other professionals, share updates, and discover opportunities
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <div className="bg-gradient-to-r from-careerblue-600 to-careerblue-800 h-24 rounded-t-lg"></div>
              <div className="px-6 pb-6 -mt-12">
                <Avatar className="h-24 w-24 border-4 border-white">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback className="bg-careerblue-600 text-white text-xl">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="font-bold text-xl mt-4">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600">{user?.occupation || "Professional"}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Profile views</span>
                    <span className="font-medium">124</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Post impressions</span>
                    <span className="font-medium">1,872</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Search appearances</span>
                    <span className="font-medium">43</span>
                  </div>
                </div>
                
                <Button variant="outline" size="responsive" className="w-full mt-4">
                  View Profile
                </Button>
              </div>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Network</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-600 mr-2" />
                    <span>Connections</span>
                  </div>
                  <Badge>{connections.length}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-gray-600 mr-2" />
                    <span>Invitations</span>
                  </div>
                  <Badge>2</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-gray-600 mr-2" />
                    <span>Messages</span>
                  </div>
                  <Badge>5</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-600 mr-2" />
                    <span>Job Matches</span>
                  </div>
                  <Badge>12</Badge>
                </div>
                
                <div className="pt-4 space-y-2">
                  <Link to="/career-insights" className="block">
                    <Button size="responsive" variant="career" className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Career Insights
                    </Button>
                  </Link>
                  
                  <Link to="/career-explorer" className="block">
                    <Button size="responsive" variant="outline" className="w-full">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Explore Jobs
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback className="bg-careerblue-600 text-white">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea 
                          placeholder="Share an update or insight..." 
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                          className="resize-none mb-3"
                          rows={3}
                        />
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {postTags.map((tag) => (
                            <Badge key={tag} className="px-2 py-1">
                              {tag}
                              <button 
                                className="ml-2 text-xs"
                                onClick={() => handleRemoveTag(tag)}
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 mb-3">
                          <div className="flex-1 flex gap-2">
                            <Input
                              placeholder="Add a topic tag..."
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddTag();
                                }
                              }}
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={handleAddTag}
                              size="sm"
                            >
                              Add
                            </Button>
                          </div>
                          <Button 
                            onClick={handleCreatePost}
                            disabled={!postContent.trim()}
                            className="bg-careerblue-600 hover:bg-careerblue-700"
                            size="responsive"
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={post.author.profilePicture} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <h3 className="font-semibold">{post.author.name}</h3>
                            {post.author.title && (
                              <span className="text-gray-500">• {post.author.title}</span>
                            )}
                          </div>
                          {post.author.company && (
                            <p className="text-xs text-gray-500">{post.author.company}</p>
                          )}
                          <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt="Post attachment" 
                            className="mt-3 rounded-lg w-full object-cover max-h-96" 
                          />
                        )}
                      </div>

                      <div className="flex justify-between mt-4 pt-3 border-t">
                        <Button 
                          variant={post.liked ? "default" : "ghost"}
                          size="sm"
                          className={post.liked ? "bg-careerblue-100 text-careerblue-800 hover:bg-careerblue-200" : ""}
                          onClick={() => handleLikePost(post.id)}
                        >
                          <ThumbsUp className={`h-4 w-4 mr-1 ${post.liked ? "fill-careerblue-800" : ""}`} />
                          {post.likes}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleComments(post.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments.length}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>

                      {post.commentsExpanded && (
                        <div className="mt-4 pt-3 border-t">
                          {post.comments.length > 0 ? (
                            <div className="space-y-3 mb-3">
                              {post.comments.map((comment) => (
                                <div key={comment.id} className="flex items-start gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={comment.author.profilePicture} />
                                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 bg-gray-50 rounded-lg p-2">
                                    <div className="flex justify-between">
                                      <div>
                                        <span className="font-medium text-sm">{comment.author.name}</span>
                                        {comment.author.title && (
                                          <span className="text-xs text-gray-500"> • {comment.author.title}</span>
                                        )}
                                      </div>
                                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-sm mt-1">{comment.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm mb-3">No comments yet. Be the first to comment!</p>
                          )}
                          
                          <NetworkCommentForm 
                            postId={post.id} 
                            onCommentSubmit={handleAddComment}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="connections" className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search connections..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Your Connections ({connections.length})</h3>
                      
                      {filteredConnections.length > 0 ? (
                        filteredConnections.map((connection) => (
                          <div key={connection.id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={connection.profilePicture} />
                                <AvatarFallback>{connection.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{connection.name}</h4>
                                <p className="text-sm text-gray-600">{connection.title} at {connection.company}</p>
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-gray-500 mt-1">
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    <span>{connection.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <GraduationCap className="h-3 w-3 mr-1" />
                                    <span>{connection.education}</span>
                                  </div>
                                </div>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <Users className="h-3 w-3 mr-1" />
                                  <span>{connection.mutualConnections} mutual connections</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="responsive">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Message</span>
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-4">No connections match your search</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discover" className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search for new connections..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>

                    <h3 className="font-medium mb-4">People you may know</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((connection) => (
                          <Card key={connection.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={connection.profilePicture} />
                                  <AvatarFallback>{connection.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h4 className="font-medium">{connection.name}</h4>
                                  <p className="text-sm text-gray-600">{connection.title} at {connection.company}</p>
                                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                                    <div className="flex items-center">
                                      <Building className="h-3 w-3 mr-1" />
                                      <span>{connection.industry}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      <span>{connection.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Users className="h-3 w-3 mr-1" />
                                      <span>{connection.mutualConnections} mutual</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4">
                                <Button 
                                  className="w-full bg-careerblue-600 hover:bg-careerblue-700"
                                  size="responsive"
                                  onClick={() => handleConnect(connection.id)}
                                >
                                  <UserPlus className="h-4 w-4 mr-1" />
                                  Connect
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-4 col-span-2">No suggestions match your search</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="insights" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Career Insights & Resources</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {careerInsights.map((insight) => (
                        <Card key={insight.id} className="overflow-hidden">
                          <div className="h-40 bg-gray-100">
                            <img 
                              src={insight.image}
                              alt={insight.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <Badge className="mb-2">{insight.type}</Badge>
                            <h4 className="font-medium mb-2">{insight.title}</h4>
                            <p className="text-sm text-gray-600">{insight.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="flex justify-center">
                      <Link to="/career-insights">
                        <Button size="lg" variant="career">
                          Explore All Career Insights
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
