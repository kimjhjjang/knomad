import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export default function ConfirmPage() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg text-center">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-nomad-primary/10 flex items-center justify-center">
                <Mail className="w-8 h-8 text-nomad-primary" />
              </div>
            </div>
            <CardTitle className="text-xl">이메일을 확인해주세요</CardTitle>
            <CardDescription>
              입력하신 이메일 주소로 확인 링크를 보내드렸습니다.
              <br />
              이메일의 링크를 클릭하여 회원가입을 완료해주세요.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500">
              이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.
            </p>
          </CardContent>

          <CardFooter className="justify-center pb-6">
            <Link href="/login">
              <Button variant="outline">로그인 페이지로 이동</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
