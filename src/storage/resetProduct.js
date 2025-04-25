import {create} from "zustand"

export  const useResetProduct = create((set) => ({
  resetProduct : "",
  setResetProduct :(id) => set({resetProduct : id})
}))

