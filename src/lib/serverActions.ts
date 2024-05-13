"use server";
import { User } from "@/models/user";

export async function fetchUserDevice(username: string | null | undefined) {
  if (!username) return;

  console.log("From server action", username);
  let data = await User.findOne(
    {
      username: username?.toLowerCase(),
    },
    { _id: 0, username: 1, tankMonitor: 1 }
  );
  // const userTankMonitor = await data.json()
  // console.log(data)
  //data = { ...data, _id: data.id.toString() }
  data = JSON.parse(JSON.stringify(data));
  console.log("Data is: ", data);
  return data;
}

export async function fetchTankLevel(username: string | null | undefined) {
  if (!username) return;

  let data = await User.findOne(
    {
      username: username?.toLowerCase(),
    },
    { _id: 0, tankMonitor: 1 }
  );
  // const userTankMonitor = await data.json()
  // console.log(data)
  //data = { ...data, _id: data.id.toString() }
  data = JSON.parse(JSON.stringify(data));
  //console.log("Tank level is: ", data);
  return data;
}

export async function addTankField(
  username: string | null | undefined,
  tankID: string
) {
  try {
    let res = await User.updateOne(
      { username: username },
      {
        $set: {
          tankMonitor: {
            tankMonitorId: tankID,
            numberOfMonitoredTanks: "1",
            tankLastLevel: "1",
          },
        },
      }
    );
    return res;
  } catch (err) {
    throw new Error();
  }
}

export async function updateTankLevel(
  tankMonitorId: string | null,
  newTankLastLevel: Number
) {
  try {
    let res = await User.updateOne(
      { "tankMonitor.tankMonitorId": tankMonitorId },
      { $set: { "tankMonitor.tankLastLevel": newTankLastLevel } }
    );
    return res;
  } catch (err) {
    throw new Error();
  }
}
