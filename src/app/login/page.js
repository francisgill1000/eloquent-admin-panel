'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { LockIcon, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`/login`, form);
      console.log(response);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new Event("authChange"));


      // setMessage('Login successful!');
      router.push('/');
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-muted p-8 shadow-lg">
        <div className="text-center mb-8">
          <div style={{ width: 200, height: 60, margin: '0 auto' }}>
            {/* Logo placeholder */}
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Welcome Back!
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your invoices with ease.
          </p>
        </div>

        {message && (
          <p className="text-center mb-4 text-sm text-red-500">{message}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-accent" htmlFor="email">
              Email Address
            </label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@example.com"
                required
                className="w-full h-12 rounded-lg py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
              )}
            </div>
          </div>

          <div>
            <label
              className="text-sm font-medium text-accent"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative mt-2">
              <LockIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                type="password"
                required
                className="w-full h-12 rounded-lg py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password[0]}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 button rounded-lg font-semibold text-primary-foreground shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Not registered yet?{' '}
            <Link
              className="font-medium hover:underline"
              href="/signup"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
