import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Appointments from "./pages/Appointments";
import ServiceStatus from "./pages/ServiceStatus";
import Trade from "./pages/Trade";
import Checkin from "./pages/Checkin";
import Loyalty from "./pages/Loyalty";
import Schedule from "./pages/Schedule";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/menu" element={<Index />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/status" element={<ServiceStatus />} />
      <Route path="/trade" element={<Trade />} />
      <Route path="/checkin" element={<Checkin />} />
      <Route path="/loyalty" element={<Loyalty />} />
      <Route path="/schedule" element={<Schedule />} />
    </Routes>
  </Router>
);

export default App;
