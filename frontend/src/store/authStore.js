const { create } = require('zustand');
const { persist } = require('zustand/middleware');

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      isAuthenticated: () => !!get().token,
    }),
    { name: 'edubridge-auth' }
  )
);

module.exports = { useAuthStore };
