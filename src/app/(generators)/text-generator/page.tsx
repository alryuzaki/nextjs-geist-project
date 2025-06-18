'use client';

import { useState, useRef } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

export default function TextGenerator() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const newMessages = [...messages, { role: 'user' as const, content: prompt }];
      setMessages(newMessages);
      setPrompt('');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessages([
        ...newMessages,
        { role: 'assistant' as const, content: `Response to: "${prompt}"` },
      ]);
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }, 100);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4">
        {/* Chat Area */}
        <div className="flex-1 overflow-hidden rounded-lg border border-gray-200">
          <div ref={chatContainerRef} className="h-full overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' ? 'bg-black text-white' : 'bg-gray-100'
                }`}>
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="mt-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="flex flex-col">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Message Blackbox..."
                className="min-h-[100px] max-h-[200px] resize-none border-0 focus:ring-0 p-3 text-sm text-gray-800 placeholder:text-gray-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
              <div className="flex items-center justify-end p-3 border-t border-gray-200">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  loading={isGenerating}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
