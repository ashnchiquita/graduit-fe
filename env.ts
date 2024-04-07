import { z } from "zod";

const envOptions = {
  debug: true,
  validator: "zod",
  schema: {
    VITE_S1_API_URL: z.string().url(),
    VITE_LOGIN_API_URL: z.string().url(),
    VITE_S2_API_URL: z.string().url(),
  },
};

export default envOptions;
