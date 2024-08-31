import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { format } from "date-fns";
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";

export function NoteCard({ note }: { note: Doc<"notes"> }) {
  const creationDate = new Date(note._creationTime);
  const formattedDate = format(creationDate, "MMMM d, yyyy h:mm aa");

  return (
    <Card>
      <CardHeader>
        <CardDescription>Created on {formattedDate}</CardDescription>
        <CardTitle className="pt-3">{note.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {!note.text ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            
            <></>//here i will be adding the preview of the taken notes in the future.
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between gap-20">
          <Button asChild variant="secondary" className="flex items-center gap-2">
            <Link href={`/dashboard/notes/${note._id}`}>
              <Eye className="w-4 h-4" /> View
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}