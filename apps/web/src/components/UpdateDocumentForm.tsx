import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Document, MutationUpdateDocumentArgs } from "@repo/types/graphql";
import { gql, useMutation } from "@apollo/client";
import { updateDocumentFormSchema } from "@/formSchema/updateDocument";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const UPDATE_DOCUMENT = gql`
  mutation UpdateDocument($input: DocumentInput!) {
    updateDocument(input: $input) {
      title
      description
    }
  }
`;

type Props = {
  data: Document;
};

export const UpdateDocumentForm = ({ data }: Props) => {
  const [updateDeploymentMutation] =
    useMutation<MutationUpdateDocumentArgs>(UPDATE_DOCUMENT);

  const form = useForm<z.infer<typeof updateDocumentFormSchema>>({
    resolver: zodResolver(updateDocumentFormSchema),
    defaultValues: {
      title: data.title ?? "",
      description: data.description ?? "",
    },
  });

  const handleSubmit = (data: z.infer<typeof updateDocumentFormSchema>) => {
    updateDeploymentMutation({
      variables: {
        input: {
          title: data.title,
          description: data.description,
        },
      },
      onCompleted: (res) => {
        console.log("Update deployment response", res);
      },
    }).catch((err) => {
      console.error("Error updating deployment", err);
    });
  };

  return (
    <>
      <Card>
        <CardContent>
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-2 relative"
            >
              <div className="grid grid-cols-1 md:gap-x-4 gap-y-2">
                <div className="grid grid-cols-1 gap-y-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 items-center">
                        <FormLabel className="py-1 w-24">Title</FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Title"
                            className="font-bold"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="py-1">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-20"
                            placeholder="Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="mt-4 font-bold" type="submit">
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
