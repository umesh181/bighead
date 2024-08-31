"use client";
import Editor from "@/components/editor/advanced-editor";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { JSONContent } from "novel";
import { useEffect, useState } from "react";

function extractPlainText(content: JSONContent): string {
  let text = '';
  if (content.type === 'text') {
    return content.text || '';
  }
  if (content.content) {
    for (const node of content.content) {
      text += extractPlainText(node);
    }
  }
  return text;
}

export default function EditorPage({
  params,
}: {
  params: {
    noteId: Id<"notes">;
  };
}) {
  const note = useQuery(api.notes.getNote, {
    noteId: params.noteId,
  });
  const updateNoteContent = useMutation(api.notes.updateNoteContent);
  const [content, setContent] = useState<JSONContent | null>(null);
  const [saveStatus, setSaveStatus] = useState("Saved");

  useEffect(() => {
    if (note?.content) {
      try {
        const parsedContent = JSON.parse(note.content);
        setContent(parsedContent);
      } catch (error) {
        console.error("Error parsing note content:", error);
        setContent({ type: "doc", content: [] });
      }
    }
  }, [note]);

  useEffect(() => {
    if (!content) return;

    const timer = setInterval(async () => {
      const stringifiedContent = JSON.stringify(content);
      const plainTextContent = extractPlainText(content);
      if (stringifiedContent !== note?.content) {
        setSaveStatus("Saving...");
        try {
          await updateNoteContent({
            noteId: params.noteId,
            content: stringifiedContent,
            plainTextContent: plainTextContent,
          });
          setSaveStatus("Saved");
        } catch (error) {
          console.error("Error saving note:", error);
          setSaveStatus("Error saving");
        }
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [content, params.noteId, updateNoteContent, note?.content]);

  const handleEditorChange = (newContent: JSONContent) => {
    setContent(newContent);
    setSaveStatus("Unsaved");
  };

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="text-4xl">{note?.text}</div>
          <Button variant="outline" disabled>
            {saveStatus}
          </Button>
        </div>
        <div className="">
          <Editor
            initialValue={content}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
}