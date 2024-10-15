'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInSchema } from '@/schemas/signInSchema';
import { Suspense } from 'react';
import { useToast } from '@/hooks/use-toast';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Extract query parameters

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    console.log(result);

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'The credentials you entered are incorrect. Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: `${result.error}`,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/conferences');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Access</h1>
          <p className="text-sm text-gray-400">
            Sign in to manage conferences securely
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-400">Email</FormLabel>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-500"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-400">Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-500"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account? &nbsp;
            <Link href="/sign-up" className="text-indigo-500 hover:text-indigo-700 font-medium">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function newSuspenseBoundaryWrappedSignInForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
