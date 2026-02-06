'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, UserPlus, Loader2 } from 'lucide-react';
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
import { signup } from '@/app/login/actions';
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
        <UserPlus className="w-4 h-4 mr-2" />
      )}
      {pending ? '가입 중...' : '회원가입'}
    </Button>
  );
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  function handleSubmit(formData: FormData) {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다');
      return;
    }

    setPasswordError('');
    signup(formData);
  }

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">노마드 여정을 시작하세요</h1>
          <p className="text-gray-600 mt-2">
            NOMAD KOREA에 가입하고 나에게 딱 맞는 도시를 발견하세요
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">회원가입</CardTitle>
            <CardDescription>아래 정보를 입력해주세요</CardDescription>
          </CardHeader>

          <CardContent>
            {(error || passwordError) && (
              <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-600">
                {passwordError || error}
              </div>
            )}

            <form action={handleSubmit} className="space-y-4">
              {/* 이름 */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  이름
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="홍길동"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

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
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  비밀번호
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="8자 이상 입력하세요"
                    className="pl-10 pr-10"
                    minLength={8}
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

              {/* 비밀번호 확인 */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  비밀번호 확인
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 다시 입력하세요"
                    className="pl-10 pr-10"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* 이용약관 동의 */}
              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  <Link href="/terms" className="text-nomad-primary hover:underline">
                    이용약관
                  </Link>
                  {' '}및{' '}
                  <Link href="/privacy" className="text-nomad-primary hover:underline">
                    개인정보처리방침
                  </Link>
                  에 동의합니다
                </label>
              </div>

              {/* 가입 버튼 */}
              <SubmitButton />
            </form>
          </CardContent>

          <CardFooter className="justify-center pb-6">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="text-nomad-primary font-medium hover:underline">
                로그인
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
