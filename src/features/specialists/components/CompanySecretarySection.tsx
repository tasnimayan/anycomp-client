import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { UserAvatar } from "../../../components/shared";

export const CompanySecretarySection = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Company Secretary</h3>

      <div className="flex gap-8">
        {/* Profile card */}
        <div>
          <div className="flex items-center gap-3">
            <UserAvatar name="Grace Lam" className="size-18" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm leading-none">
                  Grace Lam
                </span>
                <span className="text-xs">
                  <CheckCircle2 className="size-3 mr-1 inline-block text-success" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Corpsec Services Sdn Bhd
              </p>
              <Button size="sm">View Profile</Button>
            </div>
          </div>
          <Button
            size="xs"
            className="bg-sidebar-background hover:bg-sidebar-background/90 text-xs"
          >
            View Profile
          </Button>

          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
            A company secretarial service founded by Grace, who believes that
            every company deserves clarity, confidence, and care in their
            compliance journey. Inspired by the spirit of entrepreneurship, Aida
            treats every client’s business as if it were her own — attentive to
            detail, committed to deadlines, and focused on growth. Step into a
            partnership built on trust, transparency, and professional
            excellence. Whether you’re just starting out or managing a growing
            company, Aida is here to make your corporate governance smooth,
            secure, and stress-free. Your company’s peace of mind starts here
          </p>
        </div>

        {/* Certifications */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Certified Company Secretary</p>
          <div className="flex items-center gap-4">
            <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
              SSM
            </div>
            <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
              ACCA
            </div>
            <div className="h-8 w-12 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
              CS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
