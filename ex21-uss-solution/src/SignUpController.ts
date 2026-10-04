import { respond } from "./controller-utils"
import { HttpRequest, HttpResponse } from "./http"
import { SignUpData, UserSelfService } from "./user-self-service"

export class SignUpController {
  constructor(private readonly service: UserSelfService) {}

  async action(req: HttpRequest, resp: HttpResponse): Promise<void> {
    // the body is untrusted input: the service validates it
    const input = req.body as SignUpData | undefined

    await respond(resp, 201, () => this.service.signUp(input))
  }
}
