import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

  const handleSaveDraft = () => {
    onSaveDraft?.();
  };

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
        {/* Estimated Completion Time */}
        <FormField
          control={control}
          name="completionDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Completion (Days)</FormLabel>
              <Select
                value={String(field.value ?? 1)}
                onValueChange={(value) => field.onChange(parseInt(value, 10))}
              >
                <FormControl>
                  <SelectTrigger className="h-10 w-full">
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((days) => (
                    <SelectItem key={days} value={String(days)}>
                      {days === 1 ? "1 day" : `${days} days`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  <div className="flex items-center gap-2 px-3 border-r-0 rounded-l-md bg-muted">
                    <span className="text-sm">🇲🇾</span>
                    <span className="text-sm font-medium">MYR</span>
                  </div>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                    className="h-10 rounded-l-none"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <Separator />

        {/* Price summary */}
        <PriceSummary
          basePrice={basePrice}
          processingFee={processingFee}
          totalPrice={totalPrice}
        />

        {/* Action buttons */}
        <div className="space-y-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full"
          >
            {isSubmitting ? "Publishing..." : "Publish"}
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

interface PriceSummaryProps {
  basePrice: number;
  processingFee: number;
  totalPrice: number;
}

export const PriceSummary = ({
  basePrice,
  processingFee,
  totalPrice,
}: PriceSummaryProps) => {
  return (
    <div className="space-y-1 text-muted-foreground">
      <div className="flex justify-between text-sm">
        <span>Base Price</span>
        <span className="font-medium">RM {basePrice}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>
          Service Processing Fee <span className="text-xs">(30%)</span>
        </span>
        <span className="font-medium">RM {processingFee}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Total</span>
        <span className="font-medium">RM {totalPrice}</span>
      </div>
      <Separator />
      <div className="flex justify-between">
        <span className="">Your returns</span>
        <span>RM {basePrice}</span>
      </div>
    </div>
  );
};
