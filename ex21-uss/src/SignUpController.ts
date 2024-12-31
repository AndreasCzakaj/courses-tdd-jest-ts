import { UserSelfService } from "./user-self-service"

export class SignUpController {
  constructor(private service: UserSelfService) {}

  async action(req, resp) {
    //console.log(`SignUpController.action: incoming req...`)
    const input = req.body

    // impl try/catch and send the appropriate http status
  }
}
