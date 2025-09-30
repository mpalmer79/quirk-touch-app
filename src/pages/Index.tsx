import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import ServiceSpecials from "@/components/ServiceSpecials";
import FloatingScheduleButton from "@/components/FloatingScheduleButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServiceCards />
      <ServiceSpecials />
      <FloatingScheduleButton />
    </div>
  );
};

export default Index;
