'use client';
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const itemsList = [
  { id: "item1", name: "Apple MacBook Pro" },
  { id: "item2", name: "Logitech Mouse" },
  { id: "item3", name: "Mechanical Keyboard" },
  { id: "item4", name: "Dell Monitor" },
  { id: "item5", name: "USB-C Hub" },
];

function ItemSelect({ selectedItem, setSelectedItem, setRate }: any) {
  const [open, setOpen] = useState(false);

  const selectedLabel = itemsList.find((item) => item.name === selectedItem)?.name;

  return (
    <div className="w-full">
      <Label>Item</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedLabel || "Select Item"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px]">
          <Command>
            <CommandInput placeholder="Search items..." />
            <CommandList>
              <CommandEmpty>No items found.</CommandEmpty>
              {itemsList.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    setSelectedItem({ id: item.id, name: item.name });
                    setRate("100"); // Replace with dynamic logic
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItem === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ItemSelect;
