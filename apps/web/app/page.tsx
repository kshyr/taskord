import { Card, CardHeader, CardTitle } from '@shared-ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Index() {
  return (
    <main className="bg-background min-h-screen flex justify-center items-center">
      <Link href="/data-modeling">
        <Card>
          <CardHeader>
            <CardTitle className="inline">
              Data Modeling Editor
              <ArrowRight className="inline ml-4 mb-1" />
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </main>
  );
}
