import { TriangleAlert } from "lucide-react";

export default function DatabaseFetchError({ title, errorMessage }: { title: string, errorMessage: string }) {
    return (
        <div className="h-[100%] flex flex-col items-center justify-center text-center p-10 border rounded-2xl bg-muted/30">
            <TriangleAlert className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-muted-foreground mb-1">{title}</h2>
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
        </div>
    );
}