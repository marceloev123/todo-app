import { create } from 'zustand'

type ModalStore = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  mode: 'create' | 'update'
  setMode: (mode: 'create' | 'update') => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  mode: 'create',
  setMode: (mode) => set({ mode }),
}))
