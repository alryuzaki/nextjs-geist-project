const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function signUp(data: { email: string; password: string; name: string }) {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to sign up');
  }

  return response.json();
}

export async function signIn(data: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to sign in');
  }

  return response.json();
}

export async function getSubscription(token: string) {
  const response = await fetch(`${API_URL}/api/subscription`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch subscription');
  }

  return response.json();
}

export async function generateText(token: string, data: { prompt: string; model: string }) {
  const response = await fetch(`${API_URL}/api/generators/text`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate text');
  }

  return response.json();
}

export async function generateImage(token: string, data: { prompt: string; style: string }) {
  const response = await fetch(`${API_URL}/api/generators/image`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate image');
  }

  return response.json();
}

export async function generateVideo(token: string, data: { prompt: string; duration: number }) {
  const response = await fetch(`${API_URL}/api/generators/video`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate video');
  }

  return response.json();
}

export async function generateAutoContent(token: string, data: { topic: string; type: string }) {
  const response = await fetch(`${API_URL}/api/generators/auto-content`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate content');
  }

  return response.json();
}
