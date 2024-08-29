// import { Card, CardContent } from "@/components/ui/card";
// import { type Editor as TipTapEditor } from "@tiptap/core";
// import { Editor } from "novel";

// type NovelEditorProps = {
//   setContent: any;
//   title: string|undefined;
// };
// export default function NovelEditor({ setContent, title }: NovelEditorProps) {
//   return (
//     <Card className="">
//       <CardContent>
//         <h1 className="pt-14 pb-3 text-5xl">{title}</h1>
//         <Editor className="appearance-none"
//           defaultValue={{
//             type: "doc",
//             content: [],
//             // content: content as JSONContent[] | undefined,
//           }}
//           onDebouncedUpdate={(editor?: TipTapEditor) => {
//             setContent(editor?.getHTML());
//           }}
//           disableLocalStorage={true}
//         />
//       </CardContent>
//     </Card>
//   );
// }