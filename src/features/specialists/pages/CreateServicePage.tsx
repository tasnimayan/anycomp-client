import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { FeeFormCard } from "../components/FeeFormCard";
import { ServiceImageUpload } from "../components/ServiceImageUpload";

// Constants
const MAX_WORDS = 500;
const DEFAULT_OFFERINGS = [
  "Company Secretary Subscription",
  "CTC Copies",
  "eSignature",
];

// Form Schema
const createServiceSchema = z.object({
  title: z
    .string()
    .min(1, "Service title is required")
    .min(10, "Title must be at least 10 characters")
    .max(200, "Title must be less than 200 characters"),
  description: z.string().max(5000, "Description is too long"),
  completionDays: z
    .number()
    .min(1, "Completion time must be at least 1 day")
    .max(365, "Completion time cannot exceed 365 days"),
  price: z
    .number()
    .min(0, "Price cannot be negative")
    .max(1000000, "Price exceeds maximum allowed"),
  offerings: z.array(z.string().min(1, "Offering cannot be empty")),
});

export type CreateServiceFormValues = z.infer<typeof createServiceSchema>;

const defaultValues: CreateServiceFormValues = {
  title: "Register a new company | Private Limited - Sdn Bhd",
  description: "",
  completionDays: 1,
  price: 1800,
  offerings: DEFAULT_OFFERINGS,
};

export function CreateServicePage() {
  const form = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createServiceSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: CreateServiceFormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission (publish)
  };

  const handleSaveDraft = () => {
    const data = form.getValues();
    console.log("Saving draft:", data);
    // Handle draft saving
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-8">
        <div className="flex-1 space-y-6">
          <ServiceTitleField />
          <ServiceImagesField />
          <ServiceDescriptionField />
          <ServiceOfferingsField />
        </div>

        <div className="w-[300px] shrink-0">
          <FeeFormCard onSaveDraft={handleSaveDraft} />
        </div>
      </form>
    </Form>
  );
}

// Field Components
function ServiceTitleField() {
  const { control } = useFormContext<CreateServiceFormValues>();

  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">Service Title</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="h-10 text-lg font-semibold"
              placeholder="Enter service title"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function ServiceImagesField() {
  return (
    <div className="space-y-2">
      <FormLabel className="text-sm font-medium">Service Images</FormLabel>
      <ServiceImageUpload />
    </div>
  );
}

function ServiceDescriptionField() {
  const { control } = useFormContext<CreateServiceFormValues>();
  const description = useWatch({ control, name: "description" });

  const wordCount = description?.trim()
    ? description.trim().split(/\s+/).length
    : 0;

  return (
    <div className="space-y-2">
      <Separator />
      <div className="py-4">
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe your service here..."
                  className="min-h-[120px] resize-none"
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <FormMessage />
                <p className="text-xs text-muted-foreground ml-auto">
                  {wordCount}/{MAX_WORDS} words
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function ServiceOfferingsField() {
  const { control, setValue, getValues } =
    useFormContext<CreateServiceFormValues>();
  const offerings = useWatch({ control, name: "offerings" });

  const handleRemoveOffering = (index: number) => {
    const currentOfferings = getValues("offerings");
    setValue(
      "offerings",
      currentOfferings.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const handleAddOffering = (newOffering: string) => {
    if (newOffering.trim()) {
      const currentOfferings = getValues("offerings");
      setValue("offerings", [...currentOfferings, newOffering.trim()], {
        shouldValidate: true,
      });
    }
  };

  return (
    <div className="space-y-2">
      <Separator />
      <div className="py-4 space-y-3">
        <FormField
          control={control}
          name="offerings"
          render={() => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Additional Offerings
              </FormLabel>
              <FormDescription>
                Enhance your service by adding additional offerings
              </FormDescription>

              <div className="border rounded-md p-3 min-h-[80px]">
                <div className="flex flex-wrap gap-2">
                  {offerings.map((offering, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-muted text-foreground font-normal text-xs py-1 px-2 flex items-center gap-1"
                    >
                      {offering}
                      <button
                        type="button"
                        onClick={() => handleRemoveOffering(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <OfferingInput onAdd={handleAddOffering} />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

function OfferingInput({ onAdd }: { onAdd: (value: string) => void }) {
  const [newOffering, setNewOffering] = useState("");

  const handleAdd = () => {
    if (newOffering.trim()) {
      onAdd(newOffering);
      setNewOffering("");
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={newOffering}
        onChange={(e) => setNewOffering(e.target.value)}
        placeholder="Add new offering..."
        className="flex-1"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
          }
        }}
      />
      <Button type="button" variant="outline" size="icon" onClick={handleAdd}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
