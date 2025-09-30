import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Printer } from "lucide-react";

interface SpecialProps {
  image: string;
  title: string;
  price: string;
  description: string;
  expiration?: string;
  warranty?: string;
}

const SpecialCard = ({ image, title, price, description, expiration, warranty }: SpecialProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 overflow-hidden bg-muted">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-2 leading-tight">{title}</h3>
        {warranty && (
          <p className="text-sm text-muted-foreground mb-2">{warranty}</p>
        )}
        <div className="text-3xl font-bold text-accent mb-3">{price}</div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        {expiration && (
          <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Expires: {expiration}
          </p>
        )}
        <div className="flex gap-2">
          <Button variant="accent" size="sm" className="flex-1">
            <Calendar className="w-4 h-4" />
            Schedule
          </Button>
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ServiceSpecials = () => {
  const specials = [
    {
      image: "https://di-uploads-pod3.dealerinspire.com/quirkchevymanchester/uploads/2016/08/TireStack1.jpg",
      title: "30 DAY PRICE MATCH",
      price: "30 DAY",
      description: "30 Price match on tires. Eligible brands include BFGoodrich, Bridgestone, Continental, Dunlop, Firestone, General Goodyear, Hankook, Michelin, Pirelli, Uniroyal.",
      expiration: "",
    },
    {
      image: "https://di-gm-enrollment.s3.amazonaws.com/coupons/202.jpg",
      title: "6-Quart ACDelco GM OE dexos®1 Full Synthetic Oil Change and Tire Rotation",
      price: "$129.95",
      description: "Tire balancing, tax, and more than 6 quarts of oil extra. Excludes diesel engines and Corvettes.",
      expiration: "11/24/2025",
    },
    {
      image: "https://di-gm-enrollment.s3.amazonaws.com/coupons/212.jpg",
      title: "8-Quart ACDelco GM OE dexos®1 Full Synthetic Oil Change and Tire Rotation",
      price: "$149.95",
      description: "Tire balancing, tax, and more than 8 quarts of oil extra. 8-quart dexos®R oil change may be required on 2021-2024 6.2L engines.",
      expiration: "11/24/2025",
    },
    {
      image: "https://di-gm-enrollment.s3.amazonaws.com/coupons/232.jpg",
      title: "Most ACDelco Silver Front Brake Pads Installed",
      price: "$269.95",
      description: "Installation and rotor inspection included. Turning or replacing rotors, all other services, and tax extra.",
      expiration: "11/24/2025",
      warranty: "12 Months/Unlimited Mile Warranty",
    },
    {
      image: "https://di-gm-enrollment.s3.amazonaws.com/coupons/203.jpg",
      title: "Most ACDelco Gold Front Brake Pads Installed",
      price: "$289.95",
      description: "Installation and rotor inspection included. Turning or replacing rotors, all other services, and tax extra.",
      expiration: "11/24/2025",
      warranty: "24 Months/Unlimited Mile Warranty",
    },
    {
      image: "https://di-gm-enrollment.s3.amazonaws.com/coupons/235.jpg",
      title: "Most GM Genuine Parts Front Brake Pads Installed",
      price: "$399.95",
      description: "Installation and rotor inspection included. Turning or replacing rotors, all other services, and tax extra.",
      expiration: "11/24/2025",
      warranty: "24 Months/Unlimited Mile Warranty",
    },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">SERVICE SPECIALS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specials.map((special, index) => (
            <SpecialCard key={index} {...special} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSpecials;
