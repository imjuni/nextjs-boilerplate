'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form';
import { Input } from '#/components/ui/input';

import type { SubmitHandler } from 'react-hook-form';

const schema = z.object({
  name: z.string().max(20).min(1),
});

type TForm = z.infer<typeof schema>;

const FormModule: React.FC = () => {
  const form = useForm<TForm>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<TForm> = (data) => console.log(data);

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pokemon Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your pokemon name" {...field} />
              </FormControl>
              <FormDescription>
                Enter your pokemon name to search
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FormModule;
