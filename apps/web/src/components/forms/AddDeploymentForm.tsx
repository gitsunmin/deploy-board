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
import { Button } from "@/components/ui/button";
import { addDeploymentFormSchema } from "@/formSchema/addDeployment";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gql, useMutation } from "@apollo/client";
import {
  DeploymentStatus,
  type CreateDeploymentMutation,
} from "@repo/types/graphql";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { Deployment } from '@repo/types/schema';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';

const CREATE_DEPLOYMENT = gql`
  mutation CreateDeployment($input: DeploymentInput!) {
    createDeployment(input: $input) {
      id
      name
      description
      deployer
    }
  }
`;

type Props = {
  deploymentList: Deployment[];
}

export const AddDeploymentForm = ({ deploymentList }: Props) => {
  const [creating, setCreating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [createDeploymentMutation] =
    useMutation<CreateDeploymentMutation>(CREATE_DEPLOYMENT);

  const form = useForm<z.infer<typeof addDeploymentFormSchema>>({
    resolver: zodResolver(addDeploymentFormSchema),
    defaultValues: {
      name: "",
      description: "",
      deployer: "",
      status: DeploymentStatus.Yet,
    },
  });

  const handleDefaultDeployment = () => {
    setCreating(true);

    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  };

  const onSubmit = (data: z.infer<typeof addDeploymentFormSchema>) => {
    setCreating(false);
    createDeploymentMutation({
      variables: {
        input: {
          name: data.name,
          description: data.description,
          deployer: data.deployer,
          status: data.status,
          dependsOn: data.dependsOn,
        },
      },
    })
      .then((res) => {
        console.log("Deployment created", res);
      })
      .catch((err) => {
        console.error("Error creating deployment", err);
      });
  };

  const dependsOnList = deploymentList.map((deployment) => ({
    id: deployment.id,
    name: deployment.name,
  }))


  return (
    <>
      <Card
        className={cn("bg-amber-50", {
          hidden: !creating,
        })}
        ref={ref}
      >
        <CardContent>
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="py-1">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Deployment Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
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
              <FormField
                control={form.control}
                name="deployer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="py-1">Deployer</FormLabel>
                    <FormControl>
                      <Input placeholder="Deployer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dependsOn"
                defaultValue={[]}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 items-center ">
                    <FormLabel className="py-1 w-24">dependsOn</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className='w-full'>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-between w-full bg-amber-50",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <span className="truncate mr-2 flex-1 text-left ">
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

              <Button className="mt-4 font-bold" type="submit">
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {creating || (
        <Button
          className="mt-4 w-full"
          variant="outline"
          onClick={handleDefaultDeployment}
        >
          <PlusIcon />
        </Button>
      )}
    </>
  );
};
