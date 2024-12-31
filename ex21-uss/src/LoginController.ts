import { UserSelfService } from "./user-self-service"

export class LoginController {
  constructor(private service: UserSelfService) {}

  async action(req, resp) {
    //console.log(`LoginController.action: incoming req...`)
    const input = req.body

    // impl try/catch and send the appropriate http status
  }
}
