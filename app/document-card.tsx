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
import { Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { DeleteDocumentButton } from "./documents/[documentId]/delete-document-button";

  export function DocumentCard({ document }: { document: Doc<"documents"> }){
    return (
    <Card>
    <CardHeader>
      <CardTitle>{document.title}</CardTitle>
      <CardDescription></CardDescription>
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
          <Link href={`/documents/${document._id}`}>
            <Eye className="w-4 h-4" /> View
          </Link>
        </Button>
        <DeleteDocumentButton documentId={document._id} />
      </div>
    
    </CardFooter>
  </Card>
  );
  
  }