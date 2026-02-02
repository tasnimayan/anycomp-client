import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfessionalFeeCardProps {
  basePrice: number;
  processingFee: number;
  onEdit?: () => void;
  onPublish?: () => void;
}

export function ProfessionalFeeCard({
  basePrice = 1800,
  processingFee = 540,
  onEdit,
  onPublish,
}: ProfessionalFeeCardProps) {
  const total = basePrice + processingFee;

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 border-sidebar-background text-sidebar-background hover:bg-sidebar-background hover:text-white"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          className="flex-1 bg-sidebar-background hover:bg-sidebar-background/90"
          onClick={onPublish}
        >
          Publish
        </Button>
      </div>

      {/* Fee card */}
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Professional Fee
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Set a rate for your service
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main price */}
          <div className="text-center py-4 border-b">
            <p className="text-3xl font-bold">RM 1,800</p>
          </div>

          {/* Price breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base price</span>
              <span className="font-medium">
                RM {basePrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Service processing fee
              </span>
              <span className="font-medium">RM {processingFee}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-muted-foreground">Total</span>
              <span className="font-medium">RM {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Returns */}
          <div className="flex justify-between text-sm pt-2 border-t">
            <span className="text-muted-foreground">Your returns</span>
            <span className="font-semibold text-primary">
              RM {basePrice.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
