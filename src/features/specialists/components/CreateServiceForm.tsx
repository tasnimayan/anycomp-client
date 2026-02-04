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
import {
  CreditCard,
  FileText,
  MapPin,
  Star,
  UserRoundPlus,
} from "lucide-react";
import { useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import ImageUpload from "../../../components/shared/ImageUpload";
import MultiSelect from "../../../components/shared/MultiSelect";
import { FeeFormCard } from "../components/FeeFormCard";

const MAX_WORDS = 500;

// Form Schema
const createServiceSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
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
  offerings: z.array(z.string()).optional(),
});

export type CreateServiceFormValues = z.infer<typeof createServiceSchema>;

const defaultValues: CreateServiceFormValues = {
  title: "",
  description: "",
  completionDays: 1,
  price: 0,
  offerings: [],
};

export function CreateServiceForm() {
  const form = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createServiceSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: CreateServiceFormValues) => {
    console.log("Service created:", data);
  };

  const handleSaveDraft = () => {
    const data = form.getValues();
    console.log("Service draft saved:", data);
  };

  const description = useWatch({ control: form.control, name: "description" });

  const wordCount = description?.trim()
    ? description.trim().split(/\s+/).length
    : 0;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-8">
        <div className="flex-1 space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Service Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-10 text-lg font-medium"
                    placeholder="Enter your service title"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImageUpload />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Description
                </FormLabel>
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

          <ServiceOfferingsField />
        </div>

        <div className="w-[350px] shrink-0">
          <FeeFormCard onSaveDraft={handleSaveDraft} />
        </div>
      </form>
    </Form>
  );
}

function ServiceOfferingsField() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const { control } = useFormContext<CreateServiceFormValues>();

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

              <MultiSelect
                options={mockServiceOfferings}
                value={selectedOptions}
                onChange={setSelectedOptions}
                placeholder="Search or select items..."
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export const mockServiceOfferings = [
  {
    id: "option1",
    label: "Company Secretary Subscription",
    description: "Annual consultation with a company secretary",
    icon: <UserRoundPlus className="size-3" />,
  },
  {
    id: "option2",
    label: "Opening of a Bank Account",
    description: "Assistance with corporate bank account setup",
    icon: <CreditCard className="size-3" />,
  },
  {
    id: "option3",
    label: "Access Company Records and SHM Forms",
    description: "Download/retrieve statutory documents",
    icon: <FileText className="size-3" />,
  },
  {
    id: "option4",
    label: "Priority Filing",
    description: "Fast-track processing and document filing",
    icon: <Star className="size-3" />,
  },
  {
    id: "option5",
    label: "Registered Office Address Use",
    description: "Use of GSA compliance office address",
    icon: <MapPin className="size-3" />,
  },
];
