import { HttpResponse } from "./http"
import { UserError } from "./user-self-service"
import { ValidationError } from "./validation"

export const CONTENT_TYPE_JSON = "application/json"

export function calcHttpErrorCode(e: unknown): number {
  if (e instanceof UserError || e instanceof ValidationError) {
    return 400
  }
  return 500
}

/**
 * Runs a service call and maps its outcome to the HTTP response:
 * the result as JSON with the given status, or an error status w/out content.
 */
export async function respond(
  resp: HttpResponse,
  successStatus: number,
  serviceCall: () => Promise<unknown>
): Promise<void> {
  try {
    const result = await serviceCall()
    resp.contentType(CONTENT_TYPE_JSON).status(successStatus).send(result)
  } catch (serviceError) {
    resp.status(calcHttpErrorCode(serviceError)).send()
  }
}
