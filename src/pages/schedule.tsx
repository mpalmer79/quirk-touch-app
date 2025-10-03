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

// Very lightweight 4-step wizard that mimics the GM flow without auth.
// Step 1: Year/Make/Model + mileage
// Step 2: common services
// Step 3: pick date + time
// Step 4: review & submit
export default function Schedule() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [year, setYear] = useState<string>("2024");
  const [make, setMake] = useState<string>("Chevrolet");
  const [model, setModel] = useState<string>("Silverado 1500");
  const [mileage, setMileage] = useState<string>("");

  const services = [
    "Scheduled Maintenance",
    "Oil Change",
    "Oil Change w/ Tire Rotation",
    "Replace Cabin Air Filter",
    "Replace Front Wiper Blades",
  ] as const;
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const toggleService = (name: string) => {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const submit = () => {
    alert(
      `Request submitted:\\n\\nVehicle: ${year} ${make} ${model} (${mileage} mi)\\nServices: ${selectedServices.join(", ") || "—"}\\nTime: ${date} ${time}`
    );
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 underline">
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-6">Schedule Service</h1>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className={step >= 1 ? "font-semibold text-foreground" : ""}>1 Vehicle</span>
              <span>›</span>
              <span className={step >= 2 ? "font-semibold text-foreground" : ""}>2 Services</span>
              <span>›</span>
              <span className={step >= 3 ? "font-semibold text-foreground" : ""}>3 Appointment</span>
              <span>›</span>
              <span className={step >= 4 ? "font-semibold text-foreground" : ""}>4 Review</span>
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>
                      {["2025","2024","2023","2022"].map(y => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={make} onValueChange={setMake}>
                    <SelectTrigger><SelectValue placeholder="Make" /></SelectTrigger>
                    <SelectContent>
                      {["Chevrolet","GMC","Buick","Cadillac"].map(m => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger><SelectValue placeholder="Model" /></SelectTrigger>
                    <SelectContent>
                      {["Silverado 1500","Equinox","Tahoe","Traverse","Blazer"].map(m => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
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
                <p className="text-muted-foreground text-sm">
                  Based on your {year} {make} {model}.
                </p>
                <div className="grid gap-3">
                  {services.map((s) => (
                    <label key={s} className="flex items-center gap-3 p-3 border rounded-lg">
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
                  <Button variant="secondary" onClick={back}>Back</Button>
                  <Button onClick={next}>Continue</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                  <div>
                    <label className="text-sm mb-1 block">Date</label>
                    <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm mb-1 block">Time</label>
                    <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="secondary" onClick={back}>Back</Button>
                  <Button onClick={next} disabled={!date || !time}>Continue</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="border rounded-lg p-4 text-sm space-y-1">
                  <div><span className="font-medium">Vehicle:</span> {year} {make} {model} {mileage && `(${mileage} mi)`}</div>
                  <div><span className="font-medium">Services:</span> {selectedServices.length ? selectedServices.join(", ") : "—"}</div>
                  <div><span className="font-medium">Appointment:</span> {date} at {time}</div>
                </div>
                <div className="flex justify-between">
                  <Button variant="secondary" onClick={back}>Back</Button>
                  <Button onClick={submit}>Submit Request</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
