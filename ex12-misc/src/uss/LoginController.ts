import { respond } from "./controller-utils"
import { HttpRequest, HttpResponse } from "./http"
import { UserSelfService } from "./user-self-service"

export class LoginController {
  constructor(private readonly service: UserSelfService) {}

  async action(req: HttpRequest, resp: HttpResponse): Promise<void> {
    // the body is untrusted input: the service validates it
    await respond(resp, 200, () => this.service.login(req.body))
  }
}
