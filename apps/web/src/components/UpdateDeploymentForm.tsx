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
import { Check, ChevronsUpDown, Trash2 } from "lucide-react";
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
import {
  DeploymentStatus,
  type DeleteDeploymentMutation,
  type UpdateDeploymentMutation,
  type Deployment,
} from "@repo/types/graphql";
import { gql, useMutation } from "@apollo/client";
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from '@/lib/utils';

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
      dependsOn
    }
  }
`;

type Props = {
  data: Deployment;
  deploymentList: Deployment[];
};

export const UpdateDeploymentForm = ({ data, deploymentList }: Props) => {
  const [deleteDeploymentMutation] =
    useMutation<DeleteDeploymentMutation>(DELETE_DEPLOYMENT);
  const [updateDeploymentMutation] =
    useMutation<UpdateDeploymentMutation>(UPDATE_DEPLOYMENT);

  const form = useForm<z.infer<typeof updateDeploymentFormSchema>>({
    resolver: zodResolver(updateDeploymentFormSchema),
    defaultValues: {
      id: data.id,
      name: data.name,
      description: data.description ?? "",
      deployer: data.deployer,
      status: data.status,
      dependsOn: data.dependsOn ?? [],
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
          dependsOn: data.dependsOn,
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

  const dependsOnList = deploymentList.filter(
    (deployment) => deployment.id !== data.id
  ).map((deployment) => ({
    id: deployment.id,
    name: deployment.name,
  }))

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
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-2">
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
                {
                  dependsOnList.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-2 col-span-2 md:col-span-1'>
                      <FormField
                        control={form.control}
                        name="dependsOn"
                        defaultValue={data.dependsOn ?? []}
                        render={({ field }) => (
                          <FormItem className="grid grid-cols-2 items-center col-span-2">
                            <FormLabel className="py-1 w-24">dependsOn</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl className=''>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "justify-between w-full",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <span className="truncate mr-2 flex-1 text-left">
                                      {field.value
                                        ? dependsOnList.filter(
                                          (deployment) => field.value.includes(deployment.id)
                                        )?.map((deployment) => deployment.name).join(", ")
                                        : "Select language"}
                                    </span>
                                    <ChevronsUpDown className="opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full">
                                <Command filter={(value, search) => {
                                  const deployment = dependsOnList.find(d => d.id === value);
                                  if (!deployment) return 0;

                                  return deployment.name.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
                                }}>
                                  <CommandInput
                                    placeholder="Search framework..."
                                    className="h-9"
                                  />
                                  <CommandList>
                                    <CommandEmpty>No deployment found.</CommandEmpty>
                                    <CommandGroup>
                                      {dependsOnList.map((deployment) => (
                                        <CommandItem
                                          value={deployment.id}
                                          key={deployment.id}
                                          onSelect={() => {
                                            field.onChange(
                                              field.value.includes(deployment.id)
                                                ? field.value.filter((id) => id !== deployment.id)
                                                : [...field.value, deployment.id]
                                            );
                                          }}
                                        >
                                          {deployment.name}
                                          <Check
                                            className={cn(
                                              "ml-auto",
                                              field.value.find((dependsOn) => dependsOn === deployment.id)
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                }
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-2 col-span-2 md:col-span-1'>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-2 items-center col-span-2">
                        <FormLabel className="py-1 w-24">Status</FormLabel>
                        <FormControl className="w-full">
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
                                DeploymentStatus.Yet,
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
