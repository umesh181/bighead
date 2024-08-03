// "use client";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { useMutation } from "convex/react";
// import { useEffect } from 'react';

// export default function NoteEditor({ noteId, initialContent }: { noteId: Id<"notes">, initialContent: string }) {
//   const updateNote = useMutation(api.notes.update);

//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: initialContent,
//     onUpdate: ({ editor }) => {
//       const content = editor.getHTML();
//       updateNote({ id: noteId, content });
//     },
//     autofocus: true,
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (editor) {
//         const content = editor.getHTML();
//         updateNote({ id: noteId, content });
//       }
//     }, 15000);

//     return () => clearInterval(interval);
//   }, [editor, noteId, updateNote]);

//   return <EditorContent editor={editor} />;
// }