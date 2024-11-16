import { Sessions } from "src/auth/entities/auth.model"
import { Tickets } from "src/tickets/tickets.model"
import { Trains } from "src/trains/trains.model"
import { Users } from "src/users/entities/users.model"

export type databaseModels = {
  Users: typeof Users
  Tickets: typeof Tickets
  Sessions: typeof Sessions
  Trains: typeof Trains
}