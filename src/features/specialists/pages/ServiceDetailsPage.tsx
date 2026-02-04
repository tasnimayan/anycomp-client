import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { CompanySecretarySection } from "../components/CompanySecretarySection";
import { EditServiceSheet } from "../components/EditServiceSheet";
import { FeeSummaryCard } from "../components/FeeSummaryCard";
import { ServiceImageUpload } from "../components/ServiceImageUpload";

export default function ServiceDetailsPage() {
  const [editSheetOpen, setEditSheetOpen] = useState(false);

  const handleEdit = () => {
    setEditSheetOpen(true);
  };

  const handlePublish = () => {
    console.log("Publishing service...");
  };

  const onSave = () => {
    console.log("Saving service...");
  };

  return (
    <>
      <div className="flex gap-8">
        <div className="flex-1 space-y-6">
          <h1 className="text-xl font-semibold text-foreground">
            Register a new company | Private Limited - Sdn Bhd
          </h1>

          {/* Image upload section */}
          <ServiceImageUpload />

          {/* Description section */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Description
              </h3>
              <p className="text-sm text-muted-foreground pb-4">
                Describe your service here
              </p>
            </div>

            <Separator />
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Additional Offerings
              </h3>
              <p className="text-sm text-muted-foreground pb-4">
                Enhance your service by adding additional offerings
              </p>
            </div>

            <Separator className="mb-8" />
            <CompanySecretarySection />
          </div>
        </div>

        {/* Right sidebar - Fee Summary Card */}
        <div className="w-[350px] shrink-0">
          <div className="flex gap-2 mb-4">
            <Button variant="outline" className="flex-1" onClick={handleEdit}>
              Edit
            </Button>
            <Button className="flex-1" onClick={handlePublish}>
              Publish
            </Button>
          </div>

          <FeeSummaryCard
            basePrice={1800}
            processingFee={540}
            totalPrice={2340}
          />
        </div>
      </div>

      {/* Edit Service Sheet */}
      <EditServiceSheet
        open={editSheetOpen}
        onOpenChange={setEditSheetOpen}
        onConfirm={onSave}
      />
    </>
  );
}
