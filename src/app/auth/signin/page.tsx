'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function SignIn() {
  const router = useRouter();
  const { setToken } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { token } = await signInApi({ email, password });
      setToken(token);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();
  const { setToken } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { token } = await signInApi({ email, password });
      setToken(token);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[400px] p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600">
              Sign in to access all AI generation tools
            </p>
          </div>

          <div className="space-y-4">
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 mb-4">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/5"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-black text-white hover:bg-gray-800"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in with Email'}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account?</span>{' '}
              <a href="/auth/signup" className="font-medium text-black hover:underline">
                Sign up
              </a>
            </div>

          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            By signing in, you agree to our{' '}
            <a href="#" className="font-medium text-gray-900 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-medium text-gray-900 hover:underline">
              Privacy Policy
            </a>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
