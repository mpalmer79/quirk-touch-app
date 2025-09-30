import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ClipboardCheck, Package } from "lucide-react";
import scheduleImage from "@/assets/schedule-service.jpg";
import inspectionImage from "@/assets/inspection.jpg";
import partsImage from "@/assets/parts.jpg";

interface ServiceCardProps {
  image: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
}

const ServiceCard = ({ image, icon, title, description, buttonText }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 bg-accent/10 rounded-lg text-accent">
            {icon}
          </div>
          <h3 className="text-xl font-bold leading-tight flex-1">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="accent" className="w-full">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

const ServiceCards = () => {
  const services = [
    {
      image: scheduleImage,
      icon: <Calendar className="w-5 h-5" />,
      title: "SCHEDULE SERVICE",
      description: "Schedule service and maintenance with our Certified Service experts today.",
      buttonText: "SCHEDULE SERVICE",
    },
    {
      image: inspectionImage,
      icon: <ClipboardCheck className="w-5 h-5" />,
      title: "MULTI-POINT VEHICLE INSPECTION",
      description: "Our Certified Service technicians will complete a comprehensive look into your vehicle's tires, wiper blades, fluid levels, brakes, battery and more.",
      buttonText: "LEARN MORE",
    },
    {
      image: partsImage,
      icon: <Package className="w-5 h-5" />,
      title: "GM GENUINE PARTS & ACDELCO PARTS",
      description: "At Quirk Chevrolet we're your one-stop shop for auto parts. Let us find the right part for your vehicle.",
      buttonText: "ORDER PARTS",
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
