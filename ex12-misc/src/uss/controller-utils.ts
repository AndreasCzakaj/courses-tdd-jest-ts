import { HttpResponse } from "./http"
import {
  AccountNotVerifiedError,
  AuthenticationError,
} from "./user-self-service"
import { ValidationError } from "./validation"

export const MESSAGE_SERVER_ERROR = "try again later"

/** The errors that are the client's fault, with their HTTP status */
const CLIENT_ERRORS = [
  { type: ValidationError, status: 400 },
  { type: AuthenticationError, status: 401 },
  { type: AccountNotVerifiedError, status: 400 },
]

export function calcHttpErrorCode(e: unknown): number {
  const clientError = CLIENT_ERRORS.find(({ type }) => e instanceof type)
  return clientError?.status ?? 500
}

/** Clients get the details of their own errors only, never the server's internals. */
export function calcErrorMessage(e: unknown): string {
  return calcHttpErrorCode(e) < 500
    ? (e as Error).message
    : MESSAGE_SERVER_ERROR
}

/**
 * Runs a service call and maps its outcome to the HTTP response:
 * the result as JSON with the given status, or an error status with a message.
 */
export async function respond(
  resp: HttpResponse,
  successStatus: number,
  serviceCall: () => Promise<unknown>,
): Promise<void> {
  try {
    const result = await serviceCall()
    resp.status(successStatus).json(result)
  } catch (serviceError) {
    const status = calcHttpErrorCode(serviceError)
    if (status >= 500) {
      console.error(serviceError)
    }
    resp.status(status).json({ error: calcErrorMessage(serviceError) })
  }
}
