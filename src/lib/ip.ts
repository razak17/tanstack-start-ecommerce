import { getEvent, getRequestIP } from '@tanstack/react-start/server'

import { badRequest } from './response'

export function checkIp(): string {
  const ip = getRequestIP() ?? getRequestIP(getEvent(), { xForwardedFor: true })
  if (!ip) badRequest('Suspicious request without IP address', 400)
  return ip
}
