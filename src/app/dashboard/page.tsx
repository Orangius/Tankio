"use client"

import React, { useEffect, useState } from "react"
import TankImage from "@/components/TankImage/TankImage"
import clsx from "clsx"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { fetchUserDevice } from "@/lib/serverActions"

const page = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login")
    },
  })
  console.log("session user: ", session?.user?.name)
  const [userData, setUserData] = useState<any>({})
  useEffect(() => {
    async function fetchTankInfo() {
      const TankData = await fetchUserDevice(session?.user?.name)
      console.log(TankData)
      setUserData(TankData)
    }
    fetchTankInfo()
    // console.log("TankData: ", userTankData)
  }, [session])
  // if (!userData.tankMonitor) {
  //   console.log("No tanks yet")
  // }
  return <div>{userData ? <h1> {userData.username}</h1> : null}</div>
}

export default page

// export default function page() {
//   const [pumpOnImage, setPumpOnImage] = useState(false)
//   const { data: session, status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       redirect("/login")
//     },
//   })
//   function swap() {
//     setPumpOnImage(!pumpOnImage)
//   }

//   return (
//     <div className="mx-4">
//       <h1>Welcome {session?.user?.name}</h1>
//       <div className=" bg-secondary border border-primary rounded-[24px] ">
//         <div className="flex justify-between items-center mt-2 mx-2">
//           <button
//             className="h-8 ml-2 mt-2 rounded-[15px] font-bold text-xl w-20 bg-primary text-primary-foreground"
//             onClick={swap}
//           >
//             {pumpOnImage ? "Off" : "On"}
//           </button>
//           <h3 className="font-bold text-xl">50%</h3>
//         </div>
//         <div className={clsx({ hidden: pumpOnImage })}>
//           {" "}
//           <TankImage level={50} animated={false} />
//         </div>
//         <div className={clsx({ hidden: !pumpOnImage })}>
//           {" "}
//           <TankImage level={50} animated={true} />
//         </div>
//       </div>
//     </div>
//   )
// }
