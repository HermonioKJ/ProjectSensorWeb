import RegisterForm from '@/components/shared/register-form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'


//Need for database implementation
export default function RegisterPage() {
  return (
    <div className="flex flex-row min-h-screen w-full ">
       <main className="w-full max-w-full mx-auto">
        <div style={{
            backgroundImage: 'url("https://imgcdnblog.carmudi.com.ph/carmudi-ph/wp-content/uploads/2018/07/19042123/IMG_2054-min.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
        }}>
        </div>
      </main>
      <main className="w-full max-w-full mx-auto">
        <Card className='h-full p-10 pl-12'>
          <CardContent className="pt-5">
            <RegisterForm />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}