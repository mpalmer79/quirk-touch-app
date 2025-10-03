import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// 4-step wizard (Vehicle → Services → Appointment → Review + Contact)
export default function Schedule() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Vehicle
  const [year, setYear] = useState("2024");
  const [make, setMake] = useState("Chevrolet");
  const [model, setModel] = useState("Silverado 1500");
  const [mileage, setMileage] = useState("");

  // Services
  const services = [
    "Scheduled Maintenance",
    "Oil Change",
    "Oil Change w/ Tire Rotation",
    "Replace Cabin Air Filter",
    "Replace Front Wiper Blades",
  ];
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Appointment
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Contact
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // UX: prevent double-submits
  const [submitting, setSubmitting] = useState(false);

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const toggleService = (name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // Submit to Netlify function -> sends email to service advisor
  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      vehicle: { year, make, model, mileage },
      services: selectedServices,
      appointment: { date, time },
      contact: { name: contactName, email: contactEmail, phone: contactPhone },
    };

    try {
      const res = await fetch("/.netlify/functions/send-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text(); // surface server error (e.g., SendGrid reason)
        throw new Error(text || "Bad response");
      }

      alert("Request sent! A service advisor will contact you.");
      navigate("/");
    } catch (e: any) {
      alert(
        `Sorry—couldn’t send your request. Please call the service department or try again.\n\n${e?.message ?? ""}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-600 underline"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-6">Schedule Service</h1>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className={step >= 1 ? "font-semibold text-foreground" : ""}>
                1 Vehicle
              </span>
              <span>›</span>
              <span className={step >= 2 ? "font-semibold text-foreground" : ""}>
                2 Services
              </span>
              <span>›</span>
              <span className={step >= 3 ? "font-semibold text-foreground" : ""}>
                3 Appointment
              </span>
              <span>›</span>
              <span className={step >= 4 ? "font-semibold text-foreground" : ""}>
                4 Review
              </span>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {["2025", "2024", "2023", "2022"].map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={make} onValueChange={setMake}>
                    <SelectTrigger>
                      <SelectValue placeholder="Make" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Chevrolet", "GMC", "Buick", "Cadillac"].map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Model" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Silverado 1500",
                        "Equinox",
                        "Tahoe",
                        "Traverse",
                        "Blazer",
                      ].map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm mb-1 block">Mileage (optional)</label>
                  <Input
                    inputMode="numeric"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="e.g., 12,345"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={next}>Continue</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Based on your {year} {make} {model}.
                </p>
                <div className="grid gap-3">
                  {services.map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-3 p-3 border rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(s)}
                        onChange={() => toggleService(s)}
                      />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="secondary" onClick={back}>
                    Back
                  </Button>
                  <Button onClick={next}>Continue</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                  <div>
                    <label className="text-sm mb-1 block">Date</label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Time</label>
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="secondary" onClick={back}>
                    Back
                  </Button>
                  <Button onClick={next} disabled={!date || !time}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="border rounded-lg p-4 text-sm space-y-1">
                  <div>
                    <span className="font-medium">Vehicle:</span> {year} {make} {model}{" "}
                    {mileage && `(${mileage} mi)`}
                  </div>
                  <div>
                    <span className="font-medium">Services:</span>{" "}
                    {selectedServices.length ? selectedServices.join(", ") : "—"}
                  </div>
                  <div>
                    <span className="font-medium">Appointment:</span> {date} at {time}
                  </div>
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-sm mb-1 block">Name</label>
                    <Input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Email</label>
                    <Input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Phone</label>
                    <Input
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="(555) 555-5555"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="secondary" onClick={back}>
                    Back
                  </Button>
                  <Button onClick={submit} disabled={!contactName || submitting}>
                    {submitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
