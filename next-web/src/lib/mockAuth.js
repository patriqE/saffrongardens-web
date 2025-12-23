/**
 * Mock Authentication for Frontend Testing
 * Use these credentials to test different user roles without backend
 */

// Hardcoded test users
export const MOCK_USERS = {
  admin: {
    id: 1,
    email: "admin@test.com",
    username: "admin",
    password: "admin123",
    role: "ADMIN",
    name: "Admin User",
    approved: true,
  },
  planner: {
    id: 2,
    email: "planner@test.com",
    username: "planner",
    password: "planner123",
    role: "EVENT_PLANNER",
    name: "Event Planner",
    approved: true,
  },
  vendor: {
    id: 3,
    email: "vendor@test.com",
    username: "vendor",
    password: "vendor123",
    role: "VENDOR",
    name: "Vendor User",
    businessName: "Test Catering Services",
    category: "CATERER",
    approved: true,
  },
};

/**
 * Mock login function
 * @param {string} username - Username or email
 * @param {string} password - Password
 * @returns {Promise<{token: string, user: object}>}
 */
export async function mockLogin(username, password) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Find user by username or email
  const user = Object.values(MOCK_USERS).find(
    (u) =>
      (u.username === username || u.email === username) &&
      u.password === password
  );

  if (!user) {
    throw new Error("Invalid username or password");
  }

  // Return user data without password
  const { password: _, ...userWithoutPassword } = user;

  return {
    token: `mock_token_${user.role}_${Date.now()}`,
    user: userWithoutPassword,
  };
}

/**
 * Check if mock auth is enabled
 * Set NEXT_PUBLIC_USE_MOCK_AUTH=true in .env.local to enable
 */
export const isMockAuthEnabled = () => {
  return (
    process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true" ||
    process.env.NODE_ENV === "development"
  );
};
