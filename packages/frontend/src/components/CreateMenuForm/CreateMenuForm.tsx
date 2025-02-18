"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";

// Validation schema
const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

interface MenuItemFormProps {
  parentId?: number;
  isSubmitting?: boolean;
  onSubmit?: ({
    parentId,
    name,
  }: {
    parentId: number;
    name: string;
  }) => Promise<void>;
  onCancel?: () => void;
}

export const CreateMenuForm = ({
  parentId = 0,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: MenuItemFormProps) => {
  const form = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (data: MenuItemFormData) => {
    try {
      await onSubmit?.({
        ...data,
        parentId,
      });
      onCancel?.();
      toast.success("Menu item created successfully");
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter menu item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
