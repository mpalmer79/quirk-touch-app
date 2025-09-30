import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { copy } from "@/copy/en";

export default function LoyaltyPanel({
  onJoin
}: {
  onJoin?: () => void;
}) {
  const c = copy.loyalty;
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{c.title}</h3>
        <p className="text-muted-foreground mb-4">{c.lead}</p>

        <ul className="list-disc pl-5 space-y-1 mb-6">
          {c.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <details>
          <summary className="cursor-pointer font-medium underline underline-offset-4">
            Open for more
          </summary>
          <p className="mt-3 text-xs text-muted-foreground">{c.fineprint}</p>
        </details>

        <div className="mt-6">
          <Button onClick={onJoin}>{c.cta}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
