import { generateReactHelpers } from '@uploadthing/react'

import type { OurFileRouter } from '@/server/storage/uploadthing'

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>()
