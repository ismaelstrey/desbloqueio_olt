
import { getSession } from "next-auth/react";
export const useAuthSession = async () => {
        const usuario = await getSession() 
      return {
        usuario
      }
}