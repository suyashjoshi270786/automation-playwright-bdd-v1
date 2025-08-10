// src/config/testdata.config.ts

export type TestUser = { email: string; password: string; name?: string };

const common = {
  admin: { email: "admin@example.com", password: "Admin@123" } as TestUser,
  user:  { email: "user@example.com",  password: "User@123"  } as TestUser,
};

const byEnv: Record<string, Partial<typeof common>> = {
  local: {},
  qa:    { user: { email: "qa.user@example.com", password: "QaUser@123" } },
  uat:   { user: { email: "uat.user@example.com", password: "UatUser@123" } },
};

export function getTestData(env: string) {
  return { ...common, ...(byEnv[env] ?? {}) };
}
