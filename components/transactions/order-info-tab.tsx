import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, NotebookPen } from "lucide-react";
import ItemListEditor from "@/components/transactions/item-list-editor";

export default function OrderInfoTab({ notes, setNotes }: any) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="grid grid-cols-3 gap-4 p-6">
          {/* Transaction form fields here */}
          <div><Label>Transaction #</Label><Input placeholder="Auto-generated" disabled /></div>
          <div><Label>Date</Label><Input type="date" /></div>
          <div>
            <Label>Customer</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Select Customer" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cust1">Customer A</SelectItem>
                <SelectItem value="cust2">Customer B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* More fields as needed... */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Package className="h-5 w-5 mr-2" />Items</CardTitle>
        </CardHeader>
        <CardContent>
            {/* add items to the order */}
          <ItemListEditor />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><NotebookPen className="h-5 w-5 mr-2" />Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
