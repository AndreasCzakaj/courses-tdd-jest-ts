import russellwhyte from "./user-russellwhyte.json"

export { russellwhyte }

export function createResponseFake() {
  return new ResponseFake()
}

type Collector = {
  contentType: string | undefined
  content: string | undefined
  status: number | undefined
  sent: boolean
}

class ResponseFake {
  private collector: Collector = {
    contentType: undefined,
    content: undefined,
    status: undefined,
    sent: false,
  }

  contentType(v: Collector["contentType"]) {
    this.collector.contentType = v
    return this
  }

  send(v: Collector["content"]) {
    this.collector.content = v
    this.collector.sent = true
    return this
  }

  status(v: Collector["status"]) {
    this.collector.status = v
    return this
  }
}
