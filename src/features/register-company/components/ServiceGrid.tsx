import type { Service } from "../types";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  services: Service[];
}

export const ServiceGrid = ({ services }: ServiceGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          bannerImage={service.bannerImage}
          providerName={service.providerName}
          providerRole={service.providerRole}
          providerAvatar={service.providerAvatar}
          title={service.title}
          price={service.price.toLocaleString()}
          currency={service.currency}
        />
      ))}
    </div>
  );
};
