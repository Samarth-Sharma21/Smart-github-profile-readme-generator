'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('3'); // Default to neutral
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error('Please provide some feedback');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would send this to your server
      // For now, we'll just simulate a successful submission
      console.log('Feedback submitted:', { rating, feedback });
      
      // Track the feedback submission in analytics
      if (window.readmeGeneratorAnalytics) {
        window.readmeGeneratorAnalytics.trackEvent('Feedback', 'Submit', `Rating: ${rating}`);
      }
      
      // Store in localStorage for now
      const storedFeedback = JSON.parse(localStorage.getItem('user_feedback') || '[]');
      storedFeedback.push({
        rating,
        feedback,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('user_feedback', JSON.stringify(storedFeedback));
      
      // Show success message
      toast.success('Thank you for your feedback!');
      
      // Reset form and close dialog
      setFeedback('');
      setRating('3');
      setOpen(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="fixed bottom-4 right-4 z-50">
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            Help us improve the README Generator by sharing your thoughts.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="rating">How would you rate your experience?</Label>
            <RadioGroup
              id="rating"
              value={rating}
              onValueChange={setRating}
              className="flex justify-between"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="r1" />
                <Label htmlFor="r1">Poor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="r2" />
                <Label htmlFor="r2">Fair</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="r3" />
                <Label htmlFor="r3">Good</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="r4" />
                <Label htmlFor="r4">Great</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="r5" />
                <Label htmlFor="r5">Excellent</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Your feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you liked or how we can improve..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}