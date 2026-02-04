'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './card';
import CountUp from 'react-countup';
import { useEffect, useState } from 'react';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}

export function StatCard({ icon: Icon, value, label, suffix = '', decimals = 0 }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-nomad-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-nomad-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {isVisible && (
                <CountUp end={value} duration={2} decimals={decimals} suffix={suffix} />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
