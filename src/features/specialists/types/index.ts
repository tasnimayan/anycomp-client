import type { ApprovalStatus, PublishStatus } from "@/components/shared";

export interface Service {
  id: string;
  title: string;
  price: string;
  purchases: number;
  duration: string;
  approvalStatus: ApprovalStatus;
  publishStatus: PublishStatus;
}

export type ServiceTabFilter = "all" | "drafts" | "published";
