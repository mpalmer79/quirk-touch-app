import heroImage from "@/assets/hero-service.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative">
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="GM technicians in service bay" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              NOBODY KNOWS YOUR CHEVROLET LIKE WE DO
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-95">
              From the wipers to the wheels, at Quirk Chevrolet of Manchester, the Certified Service 
              experts know the exact needs of your Chevrolet car, truck or SUV. Certified Service experts 
              are trained to know every inch of your vehicle and can help you keep it running with the 
              performance you've come to expect from Chevrolet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
