import { Link } from '@tanstack/react-router'

import { ResetPasswordForm } from './components/reset-password-form'
import { Shell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function ResetPassword() {
  return (
    <Shell className="max-w-lg">
      <Card className="gap-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ResetPasswordForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-2">
          <div className="text-muted-foreground text-sm">
            <Link
              aria-label="Register"
              to="/sign-up"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Need an account?
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
