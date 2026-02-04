import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";

interface EditServiceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (data: ServiceFormData) => void;
}

interface ServiceFormData {
  title: string;
  description: string;
  completionDays: number;
  price: number;
  additionalOfferings: string[];
}

const defaultOfferings = [
  "Company Secretary Subscription",
  "CTC Copies",
  "eSignature",
  "Company Secretary Subscription",
];

export function EditServiceSheet({
  open,
  onOpenChange,
  onConfirm,
}: EditServiceSheetProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completionDays, setCompletionDays] = useState("1");
  const [price, setPrice] = useState("0.00");
  const [offerings, setOfferings] = useState<string[]>(defaultOfferings);

  // const wordCount = description.trim()
  //   ? description.trim().split(/\s+/).length
  //   : 0;
  const maxWords = 500;

  const handleRemoveOffering = (index: number) => {
    setOfferings(offerings.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    onConfirm?.({
      title,
      description,
      completionDays: parseInt(completionDays) || 1,
      price: parseFloat(price) || 0,
      additionalOfferings: offerings,
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[450px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="text-lg font-semibold">
            Edit Service
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              ({maxWords} words)
            </p>
          </div>

          {/* Estimated Completion Time */}
          <div className="space-y-2">
            <Label htmlFor="completion" className="text-sm font-medium">
              Estimated Completion Time (Days)
            </Label>
            <Input
              id="completion"
              type="number"
              min="1"
              value={completionDays}
              onChange={(e) => setCompletionDays(e.target.value)}
              className="h-10"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price
            </Label>
            <div className="flex">
              <div className="flex items-center gap-2 px-3 border border-r-0 rounded-l-md bg-muted">
                <span className="text-sm">🇲🇾</span>
                <span className="text-sm font-medium">MYR</span>
              </div>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-10 rounded-l-none"
              />
            </div>
          </div>

          {/* Additional Offerings */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Additional Offerings</Label>
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
                      onClick={() => handleRemoveOffering(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="p-6 pt-4 border-t flex gap-3">
          <Button
            variant="destructive"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1">
            Confirm
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
