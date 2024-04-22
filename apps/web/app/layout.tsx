import { ThemeProvider } from '@shared-ui/components/theme-provider';

import 'reactflow/dist/style.css';
import './globals.css';
import { redirect } from 'next/navigation';
export const metadata = {
  title: 'Welcome to web',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  process.env.NODE_ENV === 'production' && redirect('https://kshyr.dev');
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
