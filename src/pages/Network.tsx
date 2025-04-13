
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Search, Users, UserPlus, MessageCircle, Bell, Briefcase, BookOpen, MapPin, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';

// Mock data for connections
const connections = [
  {
    id: 1,
    name: "Emma Johnson",
    title: "Product Manager",
    company: "TechGrowth Inc.",
    industry: "Technology",
    mutualConnections: 12,
    profilePicture: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    name: "David Chen",
    title: "Software Engineer",
    company: "CodeWorks",
    industry: "Technology",
    mutualConnections: 8,
    profilePicture: "https://randomuser.me/api/portraits/men/72.jpg"
  },
  {
    id: 3,
    name: "Sarah Miller",
    title: "Marketing Director",
    company: "Brand Elevate",
    industry: "Marketing",
    mutualConnections: 5,
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

// Mock data for suggested connections
const suggestedConnections = [
  {
    id: 4,
    name: "Rahul Patel",
    title: "Finance Analyst",
    company: "Global Financial",
    industry: "Finance",
    mutualConnections: 3,
    profilePicture: "https://randomuser.me/api/portraits/men/55.jpg"
  },
  {
    id: 5,
    name: "Jennifer Williams",
    title: "UX Designer",
    company: "Creative Solutions",
    industry: "Design",
    mutualConnections: 2,
    profilePicture: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 6,
    name: "Michael Brown",
    title: "Healthcare Administrator",
    company: "MedLife Systems",
    industry: "Healthcare",
    mutualConnections: 1,
    profilePicture: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

// Mock data for posts
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
    comments: 8,
    liked: false,
    image: null
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
    comments: 12,
    liked: false,
    image: null
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
    comments: 32,
    liked: true,
    image: null
  }
];

const Network = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [activeTab, setActiveTab] = useState("feed");
  const [postContent, setPostContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

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
      comments: 0,
      liked: false,
      image: null
    };
    
    setPosts([newPost, ...posts]);
    setPostContent("");
    
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
          {/* Left sidebar - Profile summary */}
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
                
                <Button variant="outline" className="w-full mt-4">
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
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
              </TabsList>
              
              {/* Feed tab */}
              <TabsContent value="feed" className="space-y-6">
                {/* Create post card */}
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
                        <div className="flex justify-end">
                          <Button 
                            onClick={handleCreatePost}
                            disabled={!postContent.trim()}
                            className="bg-careerblue-600 hover:bg-careerblue-700"
                          >
                            Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
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
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Connections tab */}
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
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <Users className="h-3 w-3 mr-1" />
                                  <span>{connection.mutualConnections} mutual connections</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Message
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

              {/* Discover tab */}
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
                                  <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <Users className="h-3 w-3 mr-1" />
                                    <span>{connection.mutualConnections} mutual connections</span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4">
                                <Button 
                                  className="w-full bg-careerblue-600 hover:bg-careerblue-700"
                                  size="sm"
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
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
