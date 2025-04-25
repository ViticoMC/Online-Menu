import {create} from "zustand"

export  const useAdminStore = create((set) => ({
  isAdmin : false,
  isAggProduct :false,
  isAggService :false,
  setIsAdmin : (isAdmin) => set({ isAdmin }),
  setIsAggProduct :(isAggProduct) => set({isAggProduct}),
  setIsAggService :(isAggService) => set({isAggService})
}))

