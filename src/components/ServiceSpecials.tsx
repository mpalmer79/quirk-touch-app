import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SpecialProps {
  image: string;
  title: string;
  price: string;
  description: string;
  expiration?: string;
  warranty?: string;
  onSchedule?: () => void;
}

const SpecialCard = ({
  image,
  title,
  price,
  description,
  expiration,
  warranty,
  onSchedule,
}: SpecialProps) => {
  return (
    <Card className="overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-2xl font-bold text-blue-600">{price}</p>
          <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
          {expiration && (
            <p className="text-xs text-muted-foreground mt-2">Expires: {expiration}</p>
          )}
          {warranty && (
            <p className="text-xs text-muted-foreground">Warranty: {warranty}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="accent" onClick={onSchedule}>
            <Calendar className="w-4 h-4" />
            Schedule
          </Button>
          <Button variant="outline"><Phone className="w-4 h-4" /></Button>
          <Button variant="outline"><Printer className="w-4 h-4" /></Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ServiceSpecials() {
  const navigate = useNavigate();
  const goSchedule = () => navigate("/schedule");

  const specials = [
    {
      image: "/images/oil.jpg",
      title: "6-Quart ACDelco GM OE dexos®1 Full Synthetic Oil Change",
      price: "$129.95",
      description:
        "Tax and shop supplies extra. Includes up to 6 quarts of oil. Excludes diesel engines and Corvettes.",
      expiration: "11/24/2025",
    },
    {
      image: "/images/oil-8qts.jpg",
      title: "8-Quart ACDelco GM OE dexos®1 Full Synthetic Oil Change",
      price: "$149.95",
      description:
        "Includes up to 8 quarts of dexos® oil. May be required on 2021-2024 6.2L engines.",
      expiration: "11/24/2025",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {specials.map((s) => (
        <SpecialCard key={s.title} {...s} onSchedule={goSchedule} />
      ))}
    </div>
  );
}
