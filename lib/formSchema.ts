import z from "zod";

export const employeeFormSchema = z.object({
  name: z
    .string({
      error: "Expected alphabets only",
    })
    .min(1, "Name must not be empty.")
    .max(32, "Name must be at most 32 characters."),
  uid: z.string({
    error: "invalid UID",
  }),
  email: z.email({
    error: "Please enter correct email.",
  }),
  role: z.enum(["Manager", "Employee", "Admin"], { error: "invalid role" }),
  address: z
    .string({
      error: "invalid",
    })
    .min(10, "Address must be at least 10 characters.")
    .max(100, "Address must be at most 100 characters."),
  password: z.string(),
  phoneNumber: z
    .string({
      error: "Expected digits only",
    })
    .min(10, "Phone Number must be 10 digits")
    .max(10, "Phone Number must be 10 digits"),
});

export const UIDSchema = z.object({
  uid: z
    .string({
      error: "Please enter correct UID",
    })
    .min(1, "UID not be empty.")
    .max(32, "UID must be at most 32 characters."),
});
