import create from "zustand"

export type clientType = "CUSTOMER" | "ADMINISTRATOR" | "COMPANY" | ""

interface MyStoreState {
    connectedClientType: clientType,
    userName: string,
    token: string,
    setConnectedClientType: (s: clientType) => void,
    logout:()=>void,
    login: (username: string, token: string, clientType: clientType) => void
  }
  
  export const useMyStore = create<MyStoreState>(
    (set) => ({
      connectedClientType: "",
      userName: "",
      token: "",
      logout: ()=> set(()=>{
      return {connectedClientType:"",userName:"",token:"" }
      }),
      login: (username: string, token: string, clientType: clientType) => set((state) => {
        return { connectedClientType: clientType, userName: username, token: token }
      }),
      setConnectedClientType: (clientType: clientType) => set((state) => {
        return { connectedClientType: clientType }
      })
    })
  )
 
  