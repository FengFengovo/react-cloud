import {
  getUserDetailAPI,
  getUserPlayListAPI,
  getUserDynamicAPI,
} from "@/apis/user"
import type { Dynamics } from "@/apis/user"
import { useEffect, useState } from "react"
import type { UserDetail } from "@/apis/user"
export default function UseUserHome(userId) {
  const [userInfo, setUserInfo] = useState<UserDetail>()
  const [userPlayList, setUserPlayList] = useState([])
  const [userDynamic, setUserDynamic] = useState<Dynamics>()
  const getUserDetail = async () => {
    const res = await getUserDetailAPI(userId)
    setUserInfo(res)
  }
  const getUserPlayList = async () => {
    const playlist = await getUserPlayListAPI(userId)
    setUserPlayList(playlist?.playlist)
  }
  const getUserDynamic = async () => {
    const res = await getUserDynamicAPI(userId)
    setUserDynamic(res)
  }
  useEffect(() => {
    if (userId) {
      getUserDetail()
      getUserPlayList()
      getUserDynamic()
    }
  }, [userId])
  return {
    userInfo,
    userPlayList,
    userDynamic,
  }
}
