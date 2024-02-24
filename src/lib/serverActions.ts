"use server"
import { User } from "@/models/user"

export async function fetchUserDevice(username: string | null | undefined) {
  if (!username) return

  console.log("From server action", username)
  let data = await User.findOne(
    {
      username: username?.toLowerCase(),
    },
    { _id: 0, username: 1, tankMonitor: 1 }
  )
  // const userTankMonitor = await data.json()
  // console.log(data)
  //data = { ...data, _id: data.id.toString() }
  data = JSON.parse(JSON.stringify(data))
  console.log(data)
  return data
}
