"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { employeeFormSchema } from "@/lib/formSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const UpdateEmployee = ({
  employee,
  position,
}: {
  employee: Employee;
  position?: "self-end" | "justify-self-end";
}) => {
  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: employee.name,
      email: employee.email ?? "NA",
      uid: employee.uid,
      role: employee.role,
      address: employee.address,
      phoneNumber: employee.phoneNumber?.toString() ?? "",
      password: employee.password,
    },
  });

  const onSubmit = async (data: z.infer<typeof employeeFormSchema>) => {
    console.log("formData", data);
    try {
      const response = await fetch(
        `https://rfidattendance-mu.vercel.app/api/user/update/${employee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);

      form.reset();
      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[320px] overflow-x-auto rounded-md p-4 text-primary">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
        position: "top-right",
      });
    } catch (error) {
      console.error("Error fetching next employee ID:", error);
    }
  };

  return (
    <div className={cn(position)}>
      <Dialog>
        <DialogTrigger className="text-sm flex items-center gap-2 px-2 py-1.5 hover:bg-primary-1/20 w-full rounded-sm">
          <Pencil size={16} />
          Update
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Employee</DialogTitle>
          </DialogHeader>

          <form
            id="update-employee-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="update-employee-form-name">
                      Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="update-employee-form-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field orientation="horizontal">
                <Controller
                  name="uid"
                  disabled
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="update-employee-form-uid">
                        UID
                      </FieldLabel>
                      <Input
                        {...field}
                        id="update-employee-form-uid"
                        aria-invalid={fieldState.invalid}
                        placeholder="Select UID"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="update-employee-form-phoneNumber">
                        Phone Number
                      </FieldLabel>
                      <Input
                        {...field}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        id="update-employee-form-phoneNumber"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Phone Number"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </Field>

              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="update-employee-form-role">
                      Role
                    </FieldLabel>
                    <Input
                      {...field}
                      id="update-employee-form-role"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="address"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="update-employee-form-address">
                      Address
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="update-employee-form-address"
                        placeholder="Address"
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field?.value?.length ?? "0"}/100 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              form="update-employee-form"
            >
              Submit
            </Button>
          </Field>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateEmployee;
