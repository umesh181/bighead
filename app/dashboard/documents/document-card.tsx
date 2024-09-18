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
import { DeleteDocumentButton } from "./[documentId]/delete-document-button";

export function DocumentCard({ document }: { document: Doc<"documents"> }) {
  const creationDate = new Date(document._creationTime);
  const formattedDate = format(creationDate, "MMMM d, yyyy h:mm aa");

  return (
    <div> <Card>
    <CardHeader>
      <CardDescription>Created on {formattedDate}</CardDescription>
      <CardTitle>{document.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div>
        {!document.description ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          document.description
        )}
      </div>
    </CardContent>
    <CardFooter>
      <div className="flex justify-between gap-20">
        <Button asChild variant="secondary" className="flex items-center gap-2">
          <Link href={`/dashboard/documents/${document._id}`}>
            <Eye className="w-4 h-4" /> View
          </Link>
        </Button>
        <DeleteDocumentButton documentId={document._id} />
      </div>
    </CardFooter>
  </Card>
  </div>
     
    
  );
}
