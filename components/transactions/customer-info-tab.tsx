import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CustomerInfoTab() {
  return (
    <Card>
      <CardHeader><CardTitle>Customer Information</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Label>Email</Label>
        <Input />
        <Label>Phone</Label>
        <Input />
      </CardContent>
    </Card>
  );
}
