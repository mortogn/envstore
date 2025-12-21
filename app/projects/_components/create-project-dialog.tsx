"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CreateProject, createProjectSchema } from "../_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import { Button } from "@/components/ui/button";
import { createProjectAction } from "../_action";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  trigger?: React.ReactElement;
};

const CreateProjectDialog: React.FC<Props> = ({ trigger }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateProject>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(createProjectSchema),
  });

  const descriptionValue = form.watch("description");

  const submitHandler = async (values: CreateProject) => {
    const res = await createProjectAction(values);

    if (!res?.success) {
      if (res?.error) {
        Object.entries(res.error).map(([key, value]) =>
          form.setError(key as keyof CreateProject, value)
        );
      }

      if (res?.message) {
        toast.error(res.message);
      }
    } else {
      form.reset();
      setOpen(false);
      toast.success("Project created successfully.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Add a new project for your environment variables
          </DialogDescription>

          <div className="mt-2">
            <form onSubmit={form.handleSubmit(submitHandler)}>
              <FieldGroup>
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="create-project-title">
                        Title
                      </FieldLabel>
                      <Input
                        {...field}
                        id="create-project-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Awesome project"
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
                      <FieldLabel htmlFor="create-project-description">
                        Description
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="create-project-description"
                          aria-invalid={fieldState.invalid}
                          placeholder="Optional description.."
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="text-muted-foreground text-xs">
                            {100 - (descriptionValue?.length || 0)} characters
                            left
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
                    render={<Button variant="ghost">Cancel</Button>}
                  />
                  <Button type="submit">
                    {form.formState.isSubmitting ? (
                      <>
                        <Spinner />
                        Creating...
                      </>
                    ) : (
                      "Create"
                    )}
                  </Button>
                </DialogFooter>
              </FieldGroup>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
