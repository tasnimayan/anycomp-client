import { ImageIcon } from "lucide-react";

export function ServiceImageUpload() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Main upload area */}
      <div className="col-span-1 row-span-2 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center p-6 bg-muted/30 min-h-[240px]">
        <ImageIcon className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-xs text-muted-foreground text-center">
          Upload an image for your service listing in PNG, JPG or JPEG.
        </p>
        <p className="text-xs text-muted-foreground">up to 5MB</p>
      </div>

      {/* Sample images */}
      <div className="bg-blue-800 rounded-lg overflow-hidden h-[115px]">
        <div className="w-full h-full flex items-center justify-center p-3">
          <div className="text-white text-center">
            <p className="text-xs font-semibold">10 Best Company</p>
            <p className="text-xs font-semibold">Secretarial in</p>
            <p className="text-xs font-semibold">Johor Bahru</p>
          </div>
        </div>
      </div>

      <div className="bg-red-800 rounded-lg overflow-hidden h-[115px]">
        <div className="w-full h-full flex items-center justify-center p-3">
          <div className="text-white text-center text-xs">
            <p className="font-semibold">A Company Secretary</p>
            <p className="font-semibold">Represents a Key Role</p>
            <p className="font-semibold">in Any Business.</p>
            <p className="font-semibold">This is Why</p>
          </div>
        </div>
      </div>
    </div>
  );
}
