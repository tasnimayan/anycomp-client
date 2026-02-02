import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const PROCESSING_FEE_RATE = 0.3;

interface FeeFormCardProps {
  onSaveDraft?: () => void;
}

export function FeeFormCard({ onSaveDraft }: FeeFormCardProps) {
  const {
    control,
    formState: { isSubmitting, isValid },
  } = useFormContext();

  const price = useWatch({ control, name: "price" }) ?? 0;

  const { basePrice, processingFee, totalPrice } = useMemo(() => {
    const base = price || 0;
    const fee = base * PROCESSING_FEE_RATE;
    return {
      basePrice: base,
      processingFee: fee,
      totalPrice: base + fee,
    };
  }, [price]);

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-MY", { minimumFractionDigits: 2 });

  const handleSaveDraft = () => {
    onSaveDraft?.();
  };

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Professional Fee</CardTitle>
        <p className="text-sm text-muted-foreground">
          Set a rate for your service
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Estimated Completion Time */}
        <FormField
          control={control}
          name="completionDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Completion (Days)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  className="h-10"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Price Input */}
        <FormField
          control={control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Price</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="flex items-center gap-2 px-3 border border-r-0 rounded-l-md bg-muted">
                    <span className="text-sm">🇲🇾</span>
                    <span className="text-sm font-medium">MYR</span>
                  </div>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    className="h-10 rounded-l-none"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Separator />

        {/* Price breakdown */}
        <PriceBreakdown
          basePrice={basePrice}
          processingFee={processingFee}
          totalPrice={totalPrice}
          formatCurrency={formatCurrency}
        />

        {/* Action buttons */}
        <div className="space-y-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full bg-sidebar-background hover:bg-sidebar-background/90"
          >
            {isSubmitting ? "Publishing..." : "Publish Service"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSubmitting}
            className="w-full"
          >
            Save as Draft
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface PriceBreakdownProps {
  basePrice: number;
  processingFee: number;
  totalPrice: number;
  formatCurrency: (value: number) => string;
}

function PriceBreakdown({
  basePrice,
  processingFee,
  totalPrice,
  formatCurrency,
}: PriceBreakdownProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Base Price</span>
        <span className="font-medium">MYR {formatCurrency(basePrice)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Processing Fee (30%)</span>
        <span className="font-medium">MYR {formatCurrency(processingFee)}</span>
      </div>
      <Separator />
      <div className="flex justify-between">
        <span className="font-semibold">Total</span>
        <span className="font-bold text-lg">MYR {formatCurrency(totalPrice)}</span>
      </div>
    </div>
  );
}
