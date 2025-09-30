import { Phone, MapPin } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3 text-xs sm:text-sm gap-2">
          <div className="flex items-center gap-4">
            <a href="tel:8665598193" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              <span>SERVICE: (866) 559-8193</span>
            </a>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>1250 S WILLOW ST, MANCHESTER, NH 03103</span>
          </div>
        </div>
      </div>
      <div className="bg-[#1a1a1a] border-t border-border/20">
        <div className="container mx-auto px-4 py-2">
          <h1 className="text-lg font-bold text-center">QUIRK CHEVROLET SERVICE</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
