'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-nomad-primary/10 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-nomad-primary" />
          </div>
          <CardTitle className="text-2xl">비밀번호 찾기</CardTitle>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg">이메일이 발송되었습니다</h3>
              <p className="text-sm text-gray-500">
                <strong>{email}</strong>으로 비밀번호 재설정 링크를 보냈습니다.
                이메일을 확인해주세요.
              </p>
              <p className="text-xs text-gray-400">
                이메일이 도착하지 않으면 스팸 폴더를 확인하거나 다시 시도해주세요.
              </p>
              <Link href="/login">
                <Button variant="outline" className="mt-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  로그인으로 돌아가기
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-gray-500 text-center">
                가입 시 사용한 이메일을 입력하면 비밀번호 재설정 링크를 보내드립니다.
              </p>
              <div>
                <label className="block text-sm font-medium mb-2">이메일</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-nomad-primary hover:bg-nomad-primary/90"
              >
                재설정 링크 보내기
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700">
                  <ArrowLeft className="w-3 h-3 inline mr-1" />
                  로그인으로 돌아가기
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
