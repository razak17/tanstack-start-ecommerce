import { Link } from '@tanstack/react-router'

import { ForgotPasswordForm } from './components/forgot-password-form'
import { Shell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function ForgotPassword() {
  return (
    <Shell className="max-w-lg">
      <Card className="gap-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ForgotPasswordForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-2">
          <div className="text-muted-foreground text-sm">
            <Link
              aria-label="Register"
              to="/sign-in"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Back to login?
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
