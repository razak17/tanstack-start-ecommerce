import { useAuthenticatedUser } from '@/lib/auth/client'

import { ChangePasswordForm } from './components/change-password-form'
import { EmailVerificationForm } from './components/email-verification-form'
import { ProfileForm } from './components/profile-form'
import { Shell } from '@/components/shell'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { User } from '@/server/db/schema'
import { UserRole } from '@/types'

export default function UserProfile() {
  const currentUser = useAuthenticatedUser()

  return (
    <Shell>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and profile image.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm user={currentUser as User} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>
                  Your account information and role.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-muted-foreground text-sm">
                    Role
                  </p>
                  <Badge
                    variant={
                      currentUser.role === UserRole.Admin
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {currentUser.role === UserRole.Admin
                      ? 'Administrator'
                      : 'Customer'}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground text-sm">
                    Member since
                  </p>
                  <p className="text-sm">
                    {new Date(currentUser.createdAt).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground text-sm">
                    Email Status
                  </p>
                  <div className="space-y-4">
                    <Badge
                      variant={
                        currentUser.emailVerified ? 'default' : 'destructive'
                      }
                    >
                      {currentUser.emailVerified ? 'Verified' : 'Not Verified'}
                    </Badge>
                    {!currentUser.emailVerified && (
                      <EmailVerificationForm
                        isAnonymousUser={currentUser.isAnonymous}
                        userEmail={currentUser.email}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Change your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChangePasswordForm isAnonymousUser={currentUser.isAnonymous} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Shell>
  )
}
