import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { WatermelonMotif } from '@/components/ui/WatermelonMotif';

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-[#FAF9F5] text-[#14171A] min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto space-y-6">
          <WatermelonMotif size="md" className="mx-auto" />
          <h1 className="text-6xl font-black text-[#FF3B53] font-mono">404</h1>
          <h2 className="text-2xl font-bold">Page Not Found / الصفحة غير موجودة</h2>
          <p className="text-sm text-[#586069] leading-relaxed">
            The page you are looking for doesn’t exist or has moved.
            <br />
            الصفحة التي تبحث عنها غير متوفرة حالياً.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button href="/en" variant="primary" size="md">
              English Home
            </Button>
            <Button href="/ar" variant="secondary" size="md">
              الرئيسية بالعربية
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
