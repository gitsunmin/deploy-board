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
import { Textarea } from "@/components/ui/textarea";
import { updateDeploymentFormSchema } from "@/formSchema/updateDeployment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeploymentStatus, type DeleteDeploymentMutation, type UpdateDeploymentMutation, type Deployment } from "@repo/types/graphql";
import { gql, useMutation } from "@apollo/client";

const DELETE_DEPLOYMENT = gql`
  mutation DeleteDeployment($id: ID!) {
    deleteDeployment(id: $id)
  }
`;

const UPDATE_DEPLOYMENT = gql`
  mutation UpdateDeployment($id: ID!, $input: DeploymentInput!) {
    updateDeployment(id: $id, input: $input) {
      id
      name
      description
      deployer
      status
    }
  }
`;

type Props = {
  data: Deployment;
};

export const UpdateDeploymentForm = ({ data }: Props) => {
  const [deleteDeploymentMutation] = useMutation<DeleteDeploymentMutation>(DELETE_DEPLOYMENT);
  const [updateDeploymentMutation] = useMutation<UpdateDeploymentMutation>(UPDATE_DEPLOYMENT);

  const form = useForm<z.infer<typeof updateDeploymentFormSchema>>({
    resolver: zodResolver(updateDeploymentFormSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      description: data.description ?? "",
      deployer: data.deployer,
      status: data.status,
    },
  });

  const handleSubmit = (data: z.infer<typeof updateDeploymentFormSchema>) => {
    updateDeploymentMutation({
      variables: {
        id: data.id,
        input: {
          name: data.name,
          description: data.description,
          deployer: data.deployer,
          status: data.status,
        },
      },
      onCompleted: (res) => {
        console.log("Update deployment response", res);
      },
    }).catch((err) => {
      console.error("Error updating deployment", err);
    });
  };

  const handleDelete = (id: string) => () => {
    deleteDeploymentMutation({
      variables: { id },
      onCompleted: (res) => {
        console.log("Delete deployment response", res);
      },
      onError: (err) => {
        console.error("Error deleting deployment", err);
      },
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
              <div className="absolute -top-10 -right-11">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="rotate-45 bg-white border-t-1 border-l-1 border-r-1 rounded-bl-none rounded-br-none border-solid border-boder cursor-pointer"
                    >
                      <Trash2 className="-rotate-45" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you delete this deployment?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        If you delete it, it will not recover.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete(data.id)}>
                        OK
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-4 gap-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-2 col-span-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-2 items-center">
                        <FormLabel className="py-1 w-24">Name</FormLabel>
                        <FormControl className="w-full">
                          <Input
                            placeholder="Deployment Name"
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
                    name="deployer"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-2 items-center">
                        <FormLabel className="py-1 w-24">Deployer</FormLabel>
                        <FormControl className="w-full">
                          <Input placeholder="Deployer Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex">
                        <FormLabel className="py-1 w-24">Status</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                DeploymentStatus.Failed,
                                DeploymentStatus.InProgress,
                                DeploymentStatus.Pending,
                                DeploymentStatus.Success,
                              ].map((status) => {
                                return (
                                  <SelectItem
                                    key={status}
                                    value={status}
                                    className="w-full"
                                  >
                                    {status}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Separator className="my-2" />
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
