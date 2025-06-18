const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        subscription: {
          create: {
            plan: 'FREE',
            goldBalance: 0
          }
        }
      }
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Subscription Routes
app.get('/api/subscription', authenticateToken, async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.userId }
    });

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json({
      plan: subscription.plan,
      goldBalance: subscription.goldBalance,
      queuePosition: subscription.queuePosition
    });
  } catch (error) {
    console.error('Subscription fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generator Routes
app.post('/api/generators/text', authenticateToken, async (req, res) => {
  try {
    const { prompt, model } = req.body;
    
    // Check gold balance
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.userId }
    });

    if (subscription.goldBalance < 10) {
      return res.status(400).json({ error: 'Insufficient gold balance' });
    }

    // TODO: Implement actual AI text generation
    const generatedText = `Generated text for prompt: ${prompt} using model: ${model}`;

    // Deduct gold
    await prisma.subscription.update({
      where: { userId: req.user.userId },
      data: { goldBalance: subscription.goldBalance - 10 }
    });

    res.json({ text: generatedText });
  } catch (error) {
    console.error('Text generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/generators/image', authenticateToken, async (req, res) => {
  try {
    const { prompt, style } = req.body;
    
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.userId }
    });

    if (subscription.goldBalance < 20) {
      return res.status(400).json({ error: 'Insufficient gold balance' });
    }

    // TODO: Implement actual AI image generation
    const generatedImageUrl = `https://example.com/generated-image-${Date.now()}.jpg`;

    await prisma.subscription.update({
      where: { userId: req.user.userId },
      data: { goldBalance: subscription.goldBalance - 20 }
    });

    res.json({ imageUrl: generatedImageUrl });
  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/generators/video', authenticateToken, async (req, res) => {
  try {
    const { prompt, duration } = req.body;
    
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.userId }
    });

    if (subscription.goldBalance < 50) {
      return res.status(400).json({ error: 'Insufficient gold balance' });
    }

    // TODO: Implement actual AI video generation
    const generatedVideoUrl = `https://example.com/generated-video-${Date.now()}.mp4`;

    await prisma.subscription.update({
      where: { userId: req.user.userId },
      data: { goldBalance: subscription.goldBalance - 50 }
    });

    res.json({ videoUrl: generatedVideoUrl });
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/generators/auto-content', authenticateToken, async (req, res) => {
  try {
    const { topic, type } = req.body;
    
    const subscription = await prisma.subscription.findUnique({
      where: { userId: req.user.userId }
    });

    if (subscription.goldBalance < 15) {
      return res.status(400).json({ error: 'Insufficient gold balance' });
    }

    // TODO: Implement actual AI content generation
    const generatedContent = `Generated ${type} content for topic: ${topic}`;

    await prisma.subscription.update({
      where: { userId: req.user.userId },
      data: { goldBalance: subscription.goldBalance - 15 }
    });

    res.json({ content: generatedContent });
  } catch (error) {
    console.error('Auto content generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
