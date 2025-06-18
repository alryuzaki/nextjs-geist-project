'use client';

import { useState, useRef } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

const models = [
  { id: 'midjourney', name: 'Midjourney', description: 'High-quality artistic images' },
  { id: 'gencraft', name: 'Gencraft', description: 'Versatile image generation' },
];

const aspectRatios = [
  { id: '1:1', name: 'Square (1:1)', width: 1024, height: 1024 },
  { id: '16:9', name: 'Landscape (16:9)', width: 1920, height: 1080 },
  { id: '9:16', name: 'Portrait (9:16)', width: 1080, height: 1920 },
  { id: '4:3', name: 'Standard (4:3)', width: 1024, height: 768 },
];

const styles = [
  { id: 'realistic', name: 'Realistic' },
  { id: 'anime', name: 'Anime' },
  { id: 'digital-art', name: 'Digital Art' },
  { id: 'oil-painting', name: 'Oil Painting' },
  { id: 'watercolor', name: 'Watercolor' },
  { id: 'sketch', name: 'Sketch' },
  { id: '3d-render', name: '3D Render' },
  { id: 'pixel-art', name: 'Pixel Art' },
];

export default function ImageGenerator() {
  const { goldBalance, plan, queuePosition } = useSubscription();
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState('midjourney');
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    try {
      // Get selected aspect ratio dimensions
      const ratio = aspectRatios.find(r => r.id === selectedRatio);
      
      // Simulate API call with all parameters
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add placeholder images with correct aspect ratio
      const width = ratio?.width || 400;
      const height = ratio?.height || 400;
      
      setGeneratedImages([
        `https://picsum.photos/${width}/${height}?random=1`,
        `https://picsum.photos/${width}/${height}?random=2`,
        `https://picsum.photos/${width}/${height}?random=3`,
        `https://picsum.photos/${width}/${height}?random=4`,
      ]);
    } catch (error) {
      console.error('Error generating images:', error);
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
        <h1 className="text-4xl font-bold mb-8">Image Generator</h1>
        
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

        {/* Generator Form */}
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

            <div className="mb-4">
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

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Reference Image (Optional)</label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Image
                </Button>
                {referenceImage && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setReferenceImage(null)}
                  >
                    Remove
                  </Button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {referenceImage && (
                <div className="mt-4">
                  <img
                    src={referenceImage}
                    alt="Reference"
                    className="max-w-xs rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Enter Prompt</label>
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="w-full"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt}
              className="w-full"
            >
              {isGenerating ? 'Generating...' : 'Generate Images'}
            </Button>
          </div>
        </Card>

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Generated Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {generatedImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={`Generated image ${index + 1}`}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
