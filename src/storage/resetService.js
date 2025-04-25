import {create} from "zustand"

export  const useResetServices = create((set) => ({
  resetService : "",
  setResetService :(id) => set({resetService : id})
}))

