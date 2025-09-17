import { createServerFileRoute } from '@tanstack/react-start/server'
import { createRouteHandler } from 'uploadthing/server'

import { ourFileRouter } from '@/server/storage/uploadthing'

const handlers = createRouteHandler({ router: ourFileRouter })

export const ServerRoute = createServerFileRoute('/api/uploadthing').methods({
  GET: handlers,
  POST: handlers,
})
