import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ClipboardCheck, Package, Phone, Printer } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * The ServiceMenu page acts as a hub for the various service offerings.
 * Each card routes to a dedicated page that contains the corresponding
 * panel. Keeping navigation separate allows us to layer in more
 * functionality later (forms, API calls, etc.) without cluttering
 * the home page.
 */
const options = [
  {
    title: "Schedule Service",
    description: "Book a maintenance or repair appointment.",
    icon: <Calendar className="w-5 h-5" />,
    path: "/appointments",
  },
  {
    title: "Service Status",
    description: "Track your vehicle's service progress.",
    icon: <ClipboardCheck className="w-5 h-5" />,
    path: "/status",
  },
  {
    title: "Trade‑In Estimate",
    description: "Get a sight‑unseen trade value.",
    icon: <Package className="w-5 h-5" />,
    path: "/trade",
  },
  {
    title: "Touchless Check‑In",
    description: "Drop off your vehicle without waiting.",
    icon: <Phone className="w-5 h-5" />,
    path: "/checkin",
  },
  {
    title: "Service Rewards",
    description: "Join our loyalty program and earn points.",
    icon: <Printer className="w-5 h-5" />,
    path: "/loyalty",
  },
];

export default function ServiceMenu() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Service Options
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((option) => (
            <Link key={option.path} to={option.path}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 flex flex-col items-start">
                  <div className="p-2 bg-accent/10 rounded-lg text-accent mb-4">
                    {option.icon}
                  </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 flex-1">
                      {option.description}
                    </p>
                    <span className="text-accent underline">Start</span>
                  </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}