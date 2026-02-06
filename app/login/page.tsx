'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Lock, LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { login } from './actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full bg-nomad-primary hover:bg-nomad-primary/90"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <LogIn className="w-4 h-4 mr-2" />
      )}
      {pending ? '로그인 중...' : '로그인'}
    </Button>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">다시 만나서 반갑습니다</h1>
          <p className="text-gray-600 mt-2">
            NOMAD KOREA에 로그인하고 나만의 노마드 도시를 찾아보세요
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">로그인</CardTitle>
            <CardDescription>이메일과 비밀번호를 입력해주세요</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">
                {error}
              </div>
            )}

            <form action={login} className="space-y-4">
              {/* 이메일 */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  이메일
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* 비밀번호 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    비밀번호
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-nomad-primary hover:underline"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* 로그인 버튼 */}
              <SubmitButton />
            </form>
          </CardContent>

          <CardFooter className="justify-center pb-6">
            <p className="text-sm text-gray-600">
              아직 계정이 없으신가요?{' '}
              <Link href="/register" className="text-nomad-primary font-medium hover:underline">
                회원가입
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
