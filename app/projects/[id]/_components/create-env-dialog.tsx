"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateEnvironment, createEnvironmentSchema } from "../_schema";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { createEnvironmentAction } from "../_action";
import { toast } from "sonner";

type Props = {
  projectId: string;
  trigger?: React.ReactElement;
};

const CreateEnvDialog: React.FC<Props> = ({ projectId, trigger }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<Omit<CreateEnvironment, "projectId">>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(createEnvironmentSchema.omit({ projectId: true })),
  });

  const description = form.watch("description");

  const submitHandler = async (
    values: Omit<CreateEnvironment, "projectId">
  ) => {
    const res = await createEnvironmentAction({ ...values, projectId });

    if (!res.success) {
      if (res.error) {
        Object.entries(res.error).map(([key, value]) =>
          form.setError(
            key as keyof Omit<CreateEnvironment, "projectId">,
            value
          )
        );
      } else {
        toast.error(res.message);
      }
    } else {
      toast.success("Created a new environment successfully");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Environment</DialogTitle>
          <DialogDescription>
            Add a new environment to add new variables to
          </DialogDescription>
        </DialogHeader>

        <div>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <FieldGroup>
              <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-env-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="create-env-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Production"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-env-description">
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="create-env-description"
                        aria-invalid={fieldState.invalid}
                        placeholder="Optional description..."
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="text-xs text-muted-foreground">
                          {80 - (description?.length || 0)} characters left
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <DialogFooter>
                <DialogClose
                  render={<Button variant="secondary">Cancel</Button>}
                />
                <Button type="submit">
                  {form.formState.isSubmitting ? (
                    <>
                      <Spinner /> Creating
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEnvDialog;
