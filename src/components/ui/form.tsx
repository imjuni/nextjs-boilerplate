'use client';

import React from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Root } from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
} from 'react-hook-form';

import { Label } from '#/components/ui/label';
import { cn } from '#/lib/utils';

import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

export const Form = FormProvider;

interface IFormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
}

const FormFieldContext = React.createContext<IFormFieldContextValue>(
  {} as IFormFieldContextValue,
);

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>): React.ReactNode => {
  const contextValue = React.useMemo(() => ({ name: props.name }), [props]);
  return (
    <FormFieldContext.Provider value={contextValue}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

interface IFormItemContextValue {
  id: string;
}

export const FormItemContext = React.createContext<IFormItemContextValue>(
  {} as IFormItemContextValue,
);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

export const FormItem: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  const id = React.useId();
  const contextValue = React.useMemo(() => ({ id }), [id]);

  return (
    <FormItemContext.Provider value={contextValue}>
      <div
        className={cn('grid gap-2', className)}
        data-slot="form-item"
        {...props}
      />
    </FormItemContext.Provider>
  );
};

export const FormLabel: React.FC<React.ComponentProps<typeof Root>> = ({
  className,
  ...props
}) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cn('data-[error=true]:text-destructive', className)}
      data-error={!!error}
      data-slot="form-label"
      htmlFor={formItemId}
      {...props}
    />
  );
};

export const FormControl: React.FC<React.ComponentProps<typeof Slot>> = ({
  ...props
}) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      aria-invalid={!!error}
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      {...props}
    />
  );
};

export const FormDescription: React.FC<React.ComponentProps<'p'>> = ({
  className,
  ...props
}) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      className={cn('text-muted-foreground text-sm', className)}
      data-slot="form-description"
      id={formDescriptionId}
      {...props}
    />
  );
};

export const FormMessage: React.FC<React.ComponentProps<'p'>> = ({
  className,
  ...props
}) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      className={cn('text-destructive text-sm', className)}
      data-slot="form-message"
      id={formMessageId}
      {...props}
    >
      {body}
    </p>
  );
};

// export {
//   useFormField,
//   Form,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
//   FormMessage,
//   FormField,
// };
