import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CompanySecretarySection } from "../components/CompanySecretarySection";
import { EditServiceSheet } from "../components/EditServiceSheet";
import { ProfessionalFeeCard } from "../components/ProfessionalFeeCard";
import { ServiceImageUpload } from "../components/ServiceImageUpload";

export function ServiceDetailsPage() {
  const [editSheetOpen, setEditSheetOpen] = useState(false);

  const handleEdit = () => {
    setEditSheetOpen(true);
  };

  const handlePublish = () => {
    // Handle publish action
    console.log("Publishing service...");
  };

  const handleConfirmEdit = (data: {
    title: string;
    description: string;
    completionDays: number;
    price: number;
    additionalOfferings: string[];
  }) => {
    console.log("Service updated:", data);
  };

  return (
    <>
      <div className="flex gap-8">
        {/* Left content */}
        <div className="flex-1 space-y-6">
          {/* Title */}
          <h1 className="text-xl font-semibold text-foreground">
            Register a new company | Private Limited - Sdn Bhd
          </h1>

          {/* Image upload section */}
          <ServiceImageUpload />

          {/* Description section */}
          <div className="space-y-2">
            <Separator />
            <div className="py-4">
              <h3 className="font-semibold text-foreground mb-1">
                Description
              </h3>
              <p className="text-sm text-muted-foreground">
                Describe your service here
              </p>
            </div>
          </div>

          {/* Additional Offerings section */}
          <div className="space-y-2">
            <Separator />
            <div className="py-4">
              <h3 className="font-semibold text-foreground mb-1">
                Additional Offerings
              </h3>
              <p className="text-sm text-muted-foreground">
                Enhance your service by adding additional offerings
              </p>
            </div>
          </div>

          {/* Company Secretary section */}
          <div>
            <Separator className="mb-4" />
            <CompanySecretarySection />
          </div>
        </div>

        {/* Right sidebar - Professional Fee Card */}
        <div className="w-[280px] shrink-0">
          <ProfessionalFeeCard
            basePrice={1800}
            processingFee={540}
            onEdit={handleEdit}
            onPublish={handlePublish}
          />
        </div>
      </div>

      {/* Edit Service Sheet */}
      <EditServiceSheet
        open={editSheetOpen}
        onOpenChange={setEditSheetOpen}
        onConfirm={handleConfirmEdit}
      />
    </>
  );
}
