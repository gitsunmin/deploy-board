import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addDeploymentFormSchema } from '@/formSchema/addDeployment';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { addDeploymentRequest } from '@/apiClient/deployment/client';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';


export const AddDeploymentForm = () => {
  const [creating, setCreating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof addDeploymentFormSchema>>({
    resolver: zodResolver(addDeploymentFormSchema),
    defaultValues: {
      name: '',
      description: '',
      deployer: '',
    },
  });

  const handleDefaultDeployment = () => {
    setCreating(true);

    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 300);
  }

  const onSubmit = (data: z.infer<typeof addDeploymentFormSchema>) => {
    addDeploymentRequest(data);
    setCreating(false);
  };

  return (
    <>

      <Card
        className={cn('bg-amber-50',
          {
            'hidden': !creating,
          }
        )}
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

              <Button className="mt-4 font-bold" type="submit">
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {
        creating ||
        <Button className="mt-4 w-full" variant="outline" onClick={handleDefaultDeployment}>
          <PlusIcon />
        </Button>
      }
    </>
  );
};
