// The parts of the HTTP request and response that the controllers depend on.
// Interfaces on purpose: they isolate the controllers from Express.
// Express' `Request` and `Response` satisfy them, and so do the fakes in the tests.

export interface HttpRequest {
  body?: unknown
}

export interface HttpResponse {
  contentType(type: string): HttpResponse
  status(code: number): HttpResponse
  send(body?: unknown): HttpResponse
}
