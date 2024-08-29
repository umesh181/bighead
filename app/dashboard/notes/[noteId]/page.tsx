"use client";
import Editor from "@/components/editor/advanced-editor";
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
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
      <div>
        <div className="container p-8">
          <div className="text-4xl pb-4">{note?.text}</div>
         <div className="">
           <Editor initialValue={value} onChange={setValue} />
           {/* <div className="">{parse(`${value}`)}</div> */}
         </div>
       </div>

        {/* <NovelEditor title={note?.text} setContent={setContent} /> */}
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


// "use client";
// import React from "react";
// import Editor from "@/components/editor/advanced-editor";
// import { JSONContent } from "novel";
// import { useState } from "react";

// import { ModeToggle } from "@/components/ModeToggle";
// import { defaultValue } from "./default-value";
// import parse from "html-react-parser";
// export default function page() {
//   const [value, setValue] = useState<string | undefined>(undefined);
//   console.log(value);
//   return (
//     <div className="container p-8">
//       <div className="grid grid-cols-2 gap-6">
//         <Editor initialValue={value} onChange={setValue} />
//         <div className="">{parse(`${value}`)}</div>
//       </div>
//     </div>
//   );
// }
