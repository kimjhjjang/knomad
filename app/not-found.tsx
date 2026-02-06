import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="text-8xl font-bold text-gray-200">404</div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-500">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="bg-nomad-primary hover:bg-nomad-primary/90">
              홈으로 돌아가기
            </Button>
          </Link>
          <Link href="/cities">
            <Button variant="outline">도시 탐색하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
