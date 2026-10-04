import { HttpRequest, HttpResponse } from "./http"
import { UserSelfService } from "./user-self-service"

export class LoginController {
  constructor(private readonly service: UserSelfService) {}

  async action(req: HttpRequest, resp: HttpResponse): Promise<void> {
    //console.log(`LoginController.action: incoming req...`)
    // ToDo, test first:
    // - pass `req.body` to the service
    // - send the result as JSON with status 200
    // - impl try/catch and send the appropriate http status, see `calcHttpErrorCode`
  }
}
