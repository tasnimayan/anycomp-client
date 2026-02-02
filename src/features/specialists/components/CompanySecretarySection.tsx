import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { UserAvatar } from "../../../components/shared";

export function CompanySecretarySection() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Company Secretary</h3>

      <div className="flex gap-8">
        {/* Profile card */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <UserAvatar name="Grace Lam" size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Grace Lam</span>
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Specialist
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Corporate Secretary/Sdn Bhd
              </p>
            </div>
          </div>
          <Button
            size="sm"
            className="bg-sidebar-background hover:bg-sidebar-background/90 text-xs h-7"
          >
            View Profile
          </Button>

          <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
            A company secretarial service founded by Grace, who believes that
            every entrepreneur deserves reliable and affordable support.
            Inspired by the spirit of entrepreneurship, Grace treats every
            client's business as if it were her own – attentive to detail,
            committed to excellence, and focused on building relationships that
            help businesses thrive well beyond compliance.
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
}
