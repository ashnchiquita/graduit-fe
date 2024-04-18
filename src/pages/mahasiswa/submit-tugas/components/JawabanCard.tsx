// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/Card";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form/form";
// import { Textarea } from "@/components/ui/textarea";
// import { TopicCardProps, useTopicCardImpl } from "./useTopicCardImpl";

// export const TopicCard = ({ form, lecturerId }: TopicCardProps) => {
//   const {
//     streamSearchValue,
//     setStreamSeachValue,
//     topicList,
//     setTopicDescription,
//   } = useTopicCardImpl({
//     lecturerId,
//     form,
//   });

//   return (
//     <Card
//       HeaderElement={
//         <CardHeader>
//           <CardTitle>
//             Jawaban <span className="text-destructive">*</span>
//           </CardTitle>
//           <CardDescription>Silakan unggah jawaban Anda.</CardDescription>
//         </CardHeader>
//       }
//       ContentElement={
//         <div className="space-y-4">
//           <FormField
//             control={form.control}
//             name="jawabanSubmisiTugas"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Deskripsi Singkat</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Tuliskan jawaban Anda di sini..."
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//       }
//     />
//   );
// };
