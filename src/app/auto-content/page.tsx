'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

const contentTypes = [
  { id: 'blog', name: 'Blog Post', cost: 15 },
  { id: 'social', name: 'Social Media', cost: 10 },
  { id: 'email', name: 'Email Campaign', cost: 12 },
  { id: 'story', name: 'Story/Article', cost: 20 },
];

const tones = [
  { id: 'professional', name: 'Professional' },
  { id: 'casual', name: 'Casual' },
  { id: 'humorous', name: 'Humorous' },
  { id: 'formal', name: 'Formal' },
  { id: 'inspirational', name: 'Inspirational' },
];

interface GeneratedContent {
  id: string;
  type: string;
  title: string;
  content: string;
  tone: string;
  timestamp: Date;
}

export default function AutoContent() {
  const { data: session } = useSession();
  const { goldBalance } = useSubscription();
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [selectedType, setSelectedType] = useState(contentTypes[0]);
  const [selectedTone, setSelectedTone] = useState(tones[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [contents, setContents] = useState<GeneratedContent[]>([]);

  const handleGenerate = async () => {
    if (!title.trim() || isGenerating) return;

    setIsGenerating(true);

    // Simulate content generation
    setTimeout(() => {
      const newContent: GeneratedContent = {
        id: Math.random().toString(36).substring(7),
        type: selectedType.id,
        title: title,
        content: `Generated content for "${title}" with keywords: ${keywords}. This is a ${selectedType.name.toLowerCase()} in a ${selectedTone.name.toLowerCase()} tone.`,
        tone: selectedTone.id,
        timestamp: new Date(),
      };
      setContents(prev => [newContent, ...prev]);
      setTitle('');
      setKeywords('');
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Auto Content Generator</h1>
              <p className="mt-1 text-sm text-gray-500">
                Generate engaging content for various platforms
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Balance: <span className="font-medium">{goldBalance} gold</span>
              </div>
              <div className="text-sm text-gray-600">
                Cost: <span className="font-medium">{selectedType.cost} gold/generation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Generate Content</h2>
              
              {/* Content Type Selection */}
              <div className="space-y-4 mb-6">
                <label className="text-sm font-medium text-gray-700">Content Type</label>
                <div className="grid grid-cols-2 gap-4">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type)}
                      className={`p-4 rounded-lg border text-sm transition-colors ${
                        selectedType.id === type.id
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{type.name}</div>
                      <div className="mt-1 text-xs opacity-80">{type.cost} gold</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone Selection */}
              <div className="space-y-4 mb-6">
                <label className="text-sm font-medium text-gray-700">Writing Tone</label>
                <Select
                  value={selectedTone.id}
                  onValueChange={(value) => 
                    setSelectedTone(tones.find(t => t.id === value) || tones[0])
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((tone) => (
                      <SelectItem key={tone.id} value={tone.id}>
                        {tone.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Title Input */}
              <div className="space-y-4 mb-6">
                <label className="text-sm font-medium text-gray-700">Title/Topic</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your content title or topic..."
                  className="w-full"
                />
              </div>

              {/* Keywords Input */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                  Keywords (Optional)
                </label>
                <Textarea
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Enter relevant keywords..."
                  className="min-h-[100px]"
                />
                <Button
                  onClick={handleGenerate}
                  disabled={!title.trim() || isGenerating}
                  className="w-full"
                  loading={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Content'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Generated Content Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Generated Content</h2>
              
              <div className="space-y-6">
                <AnimatePresence>
                  {contents.map((content) => (
                    <motion.div
                      key={content.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">{content.type}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{content.tone}</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(content.content);
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-600 whitespace-pre-wrap">{content.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {contents.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    No content generated yet. Start by entering a title above.
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
