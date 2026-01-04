import z from "zod";

export const employeeFormSchema = z.object({
  name: z
    .string({
      error: "Expected alphabets only",
    })
    .min(1, "Name must not be empty.")
    .max(32, "Name must be at most 32 characters."),
  UID: z
    .string({
      error: "invalid UID",
    })
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  role: z.enum(["Manager", "Employee", "Admin"], { error: "invalid role" }),
  address: z
    .string({
      error: "invalid",
    })
    .min(10, "Address must be at least 10 characters.")
    .max(100, "Address must be at most 100 characters."),
  phoneNumber: z
    .number({
      error: "Expected digits only",
    })
    .min(10, "Phone Number must be 10 digits")
    .max(10, "Phone Number must be 10 digits"),
});
