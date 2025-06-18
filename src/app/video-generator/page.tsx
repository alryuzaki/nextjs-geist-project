'use client';

import { useState, useRef } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const models = [
  { id: 'minimax', name: 'Minimax', description: 'Advanced video generation' },
  { id: 'kling', name: 'Kling AI', description: 'Creative video synthesis' },
];

const aspectRatios = [
  { id: '16:9', name: 'Landscape (16:9)', width: 1920, height: 1080 },
  { id: '9:16', name: 'Portrait (9:16)', width: 1080, height: 1920 },
  { id: '1:1', name: 'Square (1:1)', width: 1080, height: 1080 },
  { id: '4:3', name: 'Standard (4:3)', width: 1440, height: 1080 },
];

const styles = [
  { id: 'cinematic', name: 'Cinematic' },
  { id: 'animation', name: 'Animation' },
  { id: 'documentary', name: 'Documentary' },
  { id: 'vlog', name: 'Vlog Style' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'music-video', name: 'Music Video' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'social-media', name: 'Social Media' },
];

const durations = [
  { id: '15s', name: '15 seconds', value: 15 },
  { id: '30s', name: '30 seconds', value: 30 },
  { id: '60s', name: '1 minute', value: 60 },
  { id: '120s', name: '2 minutes', value: 120 },
];

export default function VideoGenerator() {
  const { goldBalance, plan, queuePosition } = useSubscription();
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('minimax');
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [selectedDuration, setSelectedDuration] = useState('30s');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [referenceVideo, setReferenceVideo] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoHistory, setVideoHistory] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      // Use a placeholder video
      const newVideo = 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      setGeneratedVideo(newVideo);
      setVideoHistory(prev => [newVideo, ...prev]);
    } catch (error) {
      console.error('Error generating video:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Video Generator</h1>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <p className="text-sm text-gray-600">Gold Balance</p>
            <p className="text-2xl font-bold">{goldBalance}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-gray-600">Current Plan</p>
            <p className="text-2xl font-bold">{plan}</p>
          </Card>
          {queuePosition && (
            <Card className="p-4">
              <p className="text-sm text-gray-600">Queue Position</p>
              <p className="text-2xl font-bold">{queuePosition}</p>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generator Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-8">
              <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
                <Select value={selectedRatio} onValueChange={setSelectedRatio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ratio) => (
                      <SelectItem key={ratio.id} value={ratio.id}>
                        {ratio.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Style</label>
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((style) => (
                      <SelectItem key={style.id} value={style.id}>
                        {style.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.id} value={duration.id}>
                        {duration.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Reference Video/Image (Optional)</label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload File
                </Button>
                {referenceVideo && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setReferenceVideo(null)}
                  >
                    Remove
                  </Button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="video/*,image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setReferenceVideo(url);
                    }
                  }}
                />
              </div>
              {referenceVideo && (
                <div className="mt-4">
                  {referenceVideo.startsWith('blob:') ? (
                    <video
                      src={referenceVideo}
                      controls
                      className="max-w-xs rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={referenceVideo}
                      alt="Reference"
                      className="max-w-xs rounded-lg"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Enter Prompt</label>
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the video you want to generate..."
                className="w-full"
              />
            </div>

                <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating || !prompt}
                  className="w-full"
                >
                  {isGenerating ? 'Generating...' : 'Generate Video'}
                </Button>
              </div>
            </Card>

            {/* Generated Video */}
            {generatedVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Generated Video</h3>
                  <video
                    controls
                    className="w-full rounded-lg"
                    src={generatedVideo}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" onClick={() => window.open(generatedVideo, '_blank')}>
                      Download
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Video History */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Generation History</h3>
              <div className="space-y-4">
                {videoHistory.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="p-4">
                      <video
                        controls
                        className="w-full rounded-lg mb-2"
                        src={video}
                      >
                        Your browser does not support the video tag.
                      </video>
                      <p className="text-sm text-gray-600">Generated {index + 1}</p>
                    </Card>
                  </motion.div>
                ))}
                {videoHistory.length === 0 && (
                  <p className="text-gray-500 text-center">No videos generated yet</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
