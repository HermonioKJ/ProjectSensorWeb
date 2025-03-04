import AppLogo from '@/components/shared/app-logo'
import LoginForm from '@/components/shared/login-form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full ">
      <main className="w-full max-w-md mx-auto">
        <Card>
          <CardHeader className="py-5 pt-10 space-y-4 flex justify-center items-center">
            <AppLogo />
          </CardHeader>
          <CardContent className="pb-5">
            <LoginForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}