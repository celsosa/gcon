import './globals.css'
import "./data-tables-css.css";
import "./satoshi.css";
import { UserProfileProvider } from '@/contexts/UserProfileContext';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProfileProvider>
      <html lang="en">

        <body suppressHydrationWarning={true}>
          <main className="min-h-screen w-full flex flex-col ">
            {children}
          </main>
        </body>
      </html>
    </UserProfileProvider>
  )
}
