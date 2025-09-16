/** biome-ignore-all lint/suspicious/noExplicitAny: false */
import { json } from '@tanstack/react-start'

import type { Range } from '@/types'

export function badRequest(
  message: any,
  status: Range<400, 499>,
  data?: any,
): never {
  throw json({ error: message, data }, { status })
}

export function serverError(
  message: any,
  status: Range<500, 599>,
  data?: any,
): never {
  throw json({ error: message, data }, { status })
}
