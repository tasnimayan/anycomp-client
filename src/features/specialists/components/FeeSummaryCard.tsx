import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { PriceSummary } from "./FeeFormCard";

interface FeeSummaryCardProps {
  basePrice: number;
  processingFee: number;
  totalPrice: number;
}

export function FeeSummaryCard({
  basePrice,
  processingFee,
  totalPrice,
}: FeeSummaryCardProps) {
  return (
    <Card className="sticky top-4 border-none rounded-xs shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold leading-1.5">
          Professional Fee
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Set a rate for your service
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-4">
          <p className="text-2xl font-bold">RM {basePrice}</p>
        </div>
        <Separator />

        <PriceSummary
          basePrice={basePrice}
          processingFee={processingFee}
          totalPrice={totalPrice}
        />
      </CardContent>
    </Card>
  );
}
