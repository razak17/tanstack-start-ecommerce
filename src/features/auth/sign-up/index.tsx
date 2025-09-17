import { Link } from '@tanstack/react-router'

import { SignUpForm } from './components/sign-up-form'
import { Shell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { OAuthSignIn } from '../oauth-sigin'

export default function SignUp() {
  return (
    <Shell className="max-w-lg">
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Choose your preferred registration method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <p className="px-8 text-center text-muted-foreground text-sm">
            By creating an account, you agree to our{' '}
            <Link
              aria-label="Terms"
              to="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              aria-label="Privacy"
              to="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </Shell>
  )
}
