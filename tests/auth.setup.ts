import { test as setup } from "@playwright/test";
// Reads a template storage-state file that will be updated with a fresh token.
import user from "../.auth/user.json";
// Writes the updated storage-state file back to disk.
import fs from "fs";

// Stores authenticated browser state used by dependent test projects.
const authFile = '.auth/user.json'


// Logs in once and persists session state for reuse across tests.
setup("Authenticate user", async ({ request }) => {

  // Authenticates through API to avoid UI-based login in setup.
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: {
          email: "mridul.uits@gmail.com",
          password: "123456789",
        },
      },
    },
  );
  // Extracts JWT token from login response.
  const responseBody = await response.json();
  const accessToken = responseBody.user.token;
  // Injects token into localStorage in the storage-state JSON.
  user.origins[0].localStorage[0].value = accessToken ;
  // Persists the updated authenticated state for dependent test projects.
  fs.writeFileSync(authFile, JSON.stringify(user));

  // Exposes token for tests that need direct Authorization headers.
  process.env['ACCESS_TOKEN'] = accessToken;

});
