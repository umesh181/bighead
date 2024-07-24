"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ChatPanel from "./chat-panel";

export default function DocumentPage({
  params,
}: {
  params: {
    documentId: Id<"documents">;
  };
}) {
  const document = useQuery(api.documents.getDocument, {
    documentId: params.documentId,
  });

  if (!document) {
    return <div>You dont have access to view this document</div>;
  }

  return (
    <main className="p-20 pt-10 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">{document.title}</h1>
      </div>

      <div className="flex gap-12">
      <Tabs defaultValue="document" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="document">Document</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="document">
            <div className="bg-gray-900 p-4 rounded-xl flex-1 h-[500px]">
              {document.documentUrl && (
                <iframe className="w-full h-full" src={document.documentUrl} />
              )}
            </div>
          </TabsContent>
          <TabsContent value="chat">
            <ChatPanel documentId={document._id} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}