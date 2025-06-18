'use client';

import { useSession } from 'next-auth/react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

const tools = [
  {
    title: 'Text Generator',
    description: 'Create high-quality text content using ChatGPT, LLaMA, and DeepSeek models',
    icon: '📝',
    cost: 10,
    href: '/text-generator',
    features: ['Multiple AI models', 'Real-time generation', 'Context awareness'],
  },
  {
    title: 'Image Generator',
    description: 'Generate stunning images with Midjourney and Gencraft AI models',
    icon: '🎨',
    cost: 20,
    href: '/image-generator',
    features: ['High resolution', 'Style customization', 'Batch generation'],
  },
  {
    title: 'Video Generator',
    description: 'Create engaging videos using Minimax and Kling AI technology',
    icon: '🎥',
    cost: 50,
    href: '/video-generator',
    features: ['Multiple formats', 'Custom duration', 'Audio integration'],
  },
  {
    title: 'Auto Content',
    description: 'Automatically generate engaging stories and content for various purposes',
    icon: '📚',
    cost: 15,
    href: '/auto-content',
    features: ['Story generation', 'Blog writing', 'Social media content'],
  },
];

export default function Home() {
  const { data: session } = useSession();
  const { plan, goldBalance } = useSubscription();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="relative">
              <div className="absolute -inset-x-20 -top-20 -bottom-20 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-20 transform rotate-45"></div>
              </div>
              <h1 className="relative text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 sm:text-6xl">
                All-in-One AI Tools Platform
              </h1>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto relative">
              Generate text, images, videos, and content with state-of-the-art AI models.
              Experience the power of artificial intelligence in one unified platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {!session ? (
                <Link
                  href="/auth/signup"
                  className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-200 relative overflow-hidden group"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </Link>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-lg text-gray-900">
                    Welcome back, <span className="font-semibold">{session.user?.name}</span>!
                  </p>
                  <div className="flex gap-4">
                    <div className="rounded-lg bg-white px-4 py-2 shadow-sm ring-1 ring-gray-900/5">
                      <p className="text-sm text-gray-600">Current Plan</p>
                      <p className="mt-1 font-semibold text-gray-900">{plan}</p>
                    </div>
                    <div className="rounded-lg bg-white px-4 py-2 shadow-sm ring-1 ring-gray-900/5">
                      <p className="text-sm text-gray-600">Gold Balance</p>
                      <p className="mt-1 font-semibold text-gray-900">{goldBalance}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.title}
                variants={item}
                className="relative group"
              >
                <Link href={tool.href}>
                  <div className="group h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                          <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">{tool.cost} gold/gen</span>
                        </div>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-black transition-colors duration-300">{tool.title}</h3>
                      <p className="mt-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">{tool.description}</p>
                      <ul className="mt-4 space-y-2">
                        {tool.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                            <svg className="mr-2 h-4 w-4 text-gray-400 group-hover:text-black transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
          <div className="absolute -inset-x-40 -top-40 -bottom-40 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 opacity-30"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 sm:text-4xl">
              Ready to start creating?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Choose a plan that works for you and start generating amazing content with our AI tools.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/pricing"
                className="rounded-full bg-white/90 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-black shadow-lg hover:bg-white hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200 relative overflow-hidden group"
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-200">View Pricing Plans</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
