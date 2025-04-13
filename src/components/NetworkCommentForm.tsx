
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NetworkCommentFormProps {
  postId: number;
  onCommentSubmit: (postId: number, comment: string) => void;
  placeholder?: string;
}

const NetworkCommentForm = ({ postId, onCommentSubmit, placeholder = "Write a comment..." }: NetworkCommentFormProps) => {
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleSubmit = () => {
    if (comment.trim() === '') return;
    
    onCommentSubmit(postId, comment);
    setComment('');
    
    toast({
      title: "Comment posted",
      description: "Your comment has been successfully posted."
    });
  };
  
  return (
    <div className="flex gap-2 mt-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.profilePicture} />
        <AvatarFallback className="bg-careerblue-600 text-white text-xs">
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 flex gap-2">
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          className="text-sm min-h-[50px] resize-none flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <Button 
          size="sm" 
          variant="career" 
          className="self-end"
          onClick={handleSubmit}
          disabled={comment.trim() === ''}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NetworkCommentForm;
