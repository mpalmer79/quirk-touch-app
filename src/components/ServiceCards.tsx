import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardCheck, Package } from "lucide-react";
import scheduleImage from "@/assets/schedule-service.jpg";
import inspectionImage from "@/assets/inspection.jpg";
import partsImage from "@/assets/parts.jpg";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  image: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
}

const ServiceCard = ({ image, icon, title, description, buttonText, onClick }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted">{icon}</div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="accent" className="w-full" onClick={onClick}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

const ServiceCards = () => {
  const navigate = useNavigate();

  const services: ServiceCardProps[] = [
    {
      image: scheduleImage,
      icon: <Calendar className="w-6 h-6" />,
      title: "SCHEDULE SERVICE",
      description: "Book maintenance or repairs with our Certified Service experts.",
      buttonText: "SCHEDULE SERVICE",
      onClick: () => navigate("/schedule"),
    },
    {
      image: inspectionImage,
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "MULTI-POINT VEHICLE INSPECTION",
      description: "Comprehensive look into tires, wipers, fluids, brakes, battery and more.",
      buttonText: "LEARN MORE",
      onClick: () => navigate("/appointments"),
    },
    {
      image: partsImage,
      icon: <Package className="w-6 h-6" />,
      title: "GM GENUINE PARTS & ACDELCO PARTS",
      description: "Order the right GM parts for your vehicle.",
      buttonText: "ORDER PARTS",
      onClick: () => navigate("/trade"),
    },
  ];

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
