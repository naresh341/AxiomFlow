export const ROLE_POLICY = {
  Admin: {
    disableAll: false,
  },
  Manager: {
    disableAll: false,
    restrictedActions: {
      delete: true,
    },
  },
  Employee: {
    disableAll: true,
  },
};
