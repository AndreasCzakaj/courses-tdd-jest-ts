import { HttpRequest, HttpResponse } from "./http"
import { UserSelfService } from "./user-self-service"

export class SignUpController {
  constructor(private readonly service: UserSelfService) {}

  async action(req: HttpRequest, resp: HttpResponse): Promise<void> {
    //console.log(`SignUpController.action: incoming req...`)
    // ToDo, test first:
    // - pass `req.body` to the service
    // - send the result as JSON with status 201
    // - impl try/catch and send the appropriate http status, see `calcHttpErrorCode`
  }
}
