"use client";
import NovelEditor from "@/components/NovelEditor";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useState } from "react";
export default function EditorPage({params,
}: {
  params: {
    noteId: Id<"notes">;
  };
}) {
  const note = useQuery(api.notes.getNote, {
    noteId: params.noteId,
  });
  const [content, setContent] = useState<string | undefined>(undefined);
  return (
      <div>
        <NovelEditor title={note?.text} setContent={setContent} />
        {/* <div className="">
          <Card>
            <CardContent>
              <h2 className="pt-4">Content Preview</h2>
              <div className="prose lg:prose-xl">{parse(`${content}`)}</div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    
  );
}