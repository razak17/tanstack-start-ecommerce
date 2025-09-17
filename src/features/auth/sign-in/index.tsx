import { Link } from '@tanstack/react-router'

import { useAuthentication } from '@/lib/auth/client'

import { SignInForm } from './components/sign-in-form'
import { Shell } from '@/components/shell'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnonymousSignIn } from '../anonymous-signin'
import { OAuthSignIn } from '../oauth-sigin'

export default function SignIn() {
  const { user } = useAuthentication()

  return (
    <Shell className="max-w-lg">
      <Card className="gap-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
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
          <SignInForm />
          {!user?.isAnonymous && (
            <>
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
              <AnonymousSignIn />
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-muted-foreground text-sm">
            <span className="mr-1 hidden sm:inline-block">
              Don&apos;t have an account?
            </span>
            <Link
              aria-label="signUp"
              to="/sign-up"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign Up
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            to="/forgot-password"
            className="text-primary text-sm underline-offset-4 transition-colors hover:underline"
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  )
}
