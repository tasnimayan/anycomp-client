interface ServiceCardProps {
  bannerImage: string;
  providerName: string;
  providerRole: string;
  providerAvatar: string;
  title: string;
  price: string;
  currency?: string;
}

export const ServiceCard = ({
  bannerImage,
  providerName,
  providerRole,
  providerAvatar,
  title,
  price,
  currency = "RM",
}: ServiceCardProps) => {
  return (
    <article className="service-card group cursor-pointer">
      {/* Banner Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={bannerImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Provider Info */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={providerAvatar}
            alt={providerName}
            className="w-7 h-7 rounded-full object-cover"
          />
          <div className="flex items-center gap-1.5 text-sm">
            <span className="font-semibold text-foreground">{providerName}</span>
            <span className="text-muted-foreground">- {providerRole}</span>
          </div>
        </div>

        {/* Service Title */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {title}
        </p>

        {/* Price */}
        <p className="text-base font-bold text-foreground">
          {currency} {price}
        </p>
      </div>
    </article>
  );
};
