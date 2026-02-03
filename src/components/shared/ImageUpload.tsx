import { cn } from "@/lib/utils";
import { CloudUpload, Info, Trash2 } from "lucide-react";
import { useCallback, useRef, useState, type DragEvent } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface ImageUploadProps {
  onImageSelect?: (file: File) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

const ImageUploadComponent = ({
  onImageSelect,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  disabled = false,
  className,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = useCallback(
    (file: File) => {
      setError("");

      if (file.size > maxSize) {
        setError(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      onImageSelect?.(file);
    },
    [maxSize, onImageSelect],
  );

  const handleDrag = useCallback(
    (e: DragEvent<HTMLDivElement>, dragging: boolean) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragging(dragging);
    },
    [disabled],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (!disabled && file) handleFileSelect(file);
    },
    [disabled, handleFileSelect],
  );

  const handleClick = () => !disabled && fileInputRef.current?.click();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === "Enter" || e.key === " ")) handleClick();
  };

  return (
    <div className={className}>
      <div
        onClick={handleClick}
        onDragOver={(e) => handleDrag(e, true)}
        onDragLeave={(e) => handleDrag(e, false)}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload image area"
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 px-6 py-12",
          "border-2 border-dashed rounded-xs transition-colors duration-200 cursor-pointer",
          disabled &&
            "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50",
          !disabled && isDragging && "border-blue-400 bg-blue-50",
          !disabled &&
            !isDragging &&
            "border-gray-300 bg-white hover:border-gray-400",
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            if (file) handleFileSelect(file);
            e.currentTarget.value = "";
          }}
          disabled={disabled}
          className="hidden"
          aria-label="File input"
        />

        <CloudUpload className="size-10 text-primary" aria-hidden="true" />

        <div className="text-xs text-center text-muted-foreground space-y-1">
          <p className="text-primary-foreground rounded-full px-2 py-1 bg-primary">
            Browse
          </p>
          <p>or</p>
          <p>Drag a file to upload</p>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-2">
        Accept formats: JPG, JPEG, PNG or WEBP
      </p>
    </div>
  );
};

const ImagePreview = ({
  image,
  onRemove,
}: {
  image: UploadedImage;
  onRemove: () => void;
}) => (
  <div className="bg-white rounded-xs shadow overflow-hidden hover:shadow-md transition-shadow flex items-center gap-3 px-2 py-2">
    <div className="relative size-16 bg-gray-100 rounded shrink-0">
      <img
        src={image.preview || "/placeholder.svg"}
        alt={image.file.name}
        className="w-full h-full object-cover"
      />
    </div>

    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-900 truncate">
        {image.file.name}
      </p>
      <p className="text-xs text-muted-foreground">
        Size: {(image.file.size / 1024).toFixed(2)} KB
      </p>
    </div>

    <Button
      variant="ghost"
      size="icon"
      onClick={onRemove}
      className="hover:text-destructive text-muted-foreground"
      aria-label="Remove image"
    >
      <Trash2 className="size-3.5" />
    </Button>
  </div>
);

export default function ImageUpload() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const handleImageSelect = useCallback((file: File) => {
    setUploadedImages((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
      },
      ...prev,
    ]);
  }, []);

  const handleRemoveImage = useCallback((id: string) => {
    setUploadedImages((prev) => {
      const image = prev.find((img) => img.id === id);
      if (image) URL.revokeObjectURL(image.preview);
      return prev.filter((img) => img.id !== id);
    });
  }, []);

  return (
    <div>
      <Label className="text-sm font-medium">Service Image</Label>
      <span className="text-xs mb-2 text-muted-foreground flex items-center gap-1">
        <Info className="size-3.5" /> Maximum of 3 images
      </span>

      <ImageUploadComponent
        onImageSelect={handleImageSelect}
        maxSize={5 * 1024 * 1024}
      />

      {uploadedImages.length > 0 && (
        <div className="space-y-3">
          {uploadedImages.map((image) => (
            <ImagePreview
              key={image.id}
              image={image}
              onRemove={() => handleRemoveImage(image.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
