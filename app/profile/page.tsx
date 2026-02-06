'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { User as UserIcon } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

const REGION_OPTIONS = ['수도권', '강원', '충청', '전라', '경상', '제주'];
const EXPERIENCE_OPTIONS = ['1년 미만', '1~3년', '3~5년', '5년 이상'];

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [preferredRegion, setPreferredRegion] = useState('');
  const [experience, setExperience] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        setName(data.user.user_metadata?.name || '');
      }
    });
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('프로필이 저장되었습니다! (데모 버전에서는 실제로 저장되지 않습니다)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-nomad-primary" />
              프로필 수정
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {/* 이메일 (읽기 전용) */}
              <div>
                <label className="block text-sm font-medium mb-2">이메일</label>
                <Input
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-xs text-gray-400 mt-1">이메일은 변경할 수 없습니다</p>
              </div>

              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium mb-2">이름</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              </div>

              {/* 자기소개 */}
              <div>
                <label className="block text-sm font-medium mb-2">자기소개</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="간단한 자기소개를 작성해주세요"
                  className="w-full border rounded-md p-3 min-h-[100px] resize-y"
                  rows={3}
                />
              </div>

              {/* 선호 지역 */}
              <div>
                <label className="block text-sm font-medium mb-2">선호 지역</label>
                <select
                  value={preferredRegion}
                  onChange={(e) => setPreferredRegion(e.target.value)}
                  className="w-full border rounded-md p-2.5 bg-white"
                >
                  <option value="">선택하세요</option>
                  {REGION_OPTIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* 노마드 경력 */}
              <div>
                <label className="block text-sm font-medium mb-2">노마드 경력</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full border rounded-md p-2.5 bg-white"
                >
                  <option value="">선택하세요</option>
                  {EXPERIENCE_OPTIONS.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-nomad-primary hover:bg-nomad-primary/90 h-11"
              >
                저장하기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
