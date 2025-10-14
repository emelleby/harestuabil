'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@/components/ui/field'
import { ServiceType } from '@/types/service'
import Link from 'next/link'

// Norwegian service type labels
const SERVICE_LABELS: Record<ServiceType, string> = {
  verksted: 'Verksted',
  'dekk-og-felg': 'Dekk og felg',
  dekkhotell: 'Dekkhotell',
  bilglass: 'Bilglass'
}

// Zod schema for form validation
const formSchema = z.object({
  navn: z.string().min(2, {
    message: 'Navn er påkrevd'
  }),
  epost: z.email('Ugyldig e-postadresse'),
  telefon: z.string().optional(),
  tjenesteType: z.string().optional(),
  melding: z.string().min(10, {
    message: 'Vi vil gjerne ha en melding! 10+ tegn'
  }),
  personvernAccept: z.boolean().refine((val) => val === true, {
    message: 'Du må akseptere personvernerklæringen'
  }),
  honeypot: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

// Encode form data for Netlify
function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | undefined>()

  // 1. Define the form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      navn: '',
      epost: '',
      telefon: '',
      tjenesteType: '',
      melding: '',
      personvernAccept: false,
      honeypot: ''
    }
  })

  // 2. Define submit handler
  async function onSubmit(values: FormData) {
    // Check honeypot
    if (values.honeypot) {
      return // Likely spam, silently ignore
    }

    try {
      // Prepare form data for Netlify
      const formData = {
        'form-name': 'kontakt',
        navn: values.navn,
        epost: values.epost,
        telefon: values.telefon || '',
        tjenesteType: values.tjenesteType || '',
        melding: values.melding || ''
      }

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(formData)
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Nettverksfeil ved innsending av skjema')
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'En feil oppstod ved innsending av skjema')
    }
  }

  // 3. Define reset handler
  function onReset() {
    form.reset()
    setIsSubmitted(false)
    setSubmitError(undefined)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 bg-emerald-500/10 border border-emerald-500 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Takk for din henvendelse!</h3>
        <p className="text-green-700 dark:text-emerald-200">
          Vi har mottatt din melding og vil kontakte deg så snart som mulig.
        </p>
        <Button onClick={onReset} variant="outline">
          Send ny henvendelse
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        name="kontakt"
        method="POST"
        data-netlify="true"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl"
        role="form"
        lang="nb"
        noValidate
      >
        {/* Hidden field for Netlify Forms */}
        <input type="hidden" name="form-name" value="kontakt" />

        {/* Honeypot field */}
        <FormField
          control={form.control}
          name="honeypot"
          render={({ field }) => (
            <input
              {...field}
              type="text"
              style={{ display: 'none' }}
              data-testid="honeypot-field"
              tabIndex={-1}
              autoComplete="off"
            />
          )}
        />

        <FieldGroup>
          <FieldSet>
            <FormField
              control={form.control}
              name="navn"
              render={({ field }) => (
                <Field orientation="responsive">
                  <FieldLabel htmlFor="navn">
                    Navn <span className="text-rose-600">*</span>
                  </FieldLabel>
                  <Input id="navn" className="w-full" placeholder="" {...field} />
                  <FieldError className="">
                    <FormMessage className="pl-4" />
                  </FieldError>
                </Field>
              )}
            />

            <FormField
              control={form.control}
              name="epost"
              render={({ field }) => (
                <Field orientation="responsive">
                  <FieldLabel htmlFor="epost">
                    E-post <span className="text-rose-600">*</span>
                  </FieldLabel>
                  <Input id="epost" type="email" placeholder="" {...field} />
                  <FieldError>
                    <FormMessage className="pl-4" />
                  </FieldError>
                </Field>
              )}
            />

            <FormField
              control={form.control}
              name="telefon"
              render={({ field }) => (
                <Field orientation="responsive">
                  <FieldLabel htmlFor="telefon">Telefon</FieldLabel>
                  <Input id="telefon" type="tel" placeholder="+47 123 45 678" {...field} />
                  <FieldError>
                    <FormMessage />
                  </FieldError>
                </Field>
              )}
            />

            <FormField
              control={form.control}
              name="tjenesteType"
              render={({ field }) => (
                <Field orientation="responsive">
                  <FieldLabel htmlFor="tjenesteType">Tjenestetype</FieldLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="tjenesteType">
                      <SelectValue placeholder="Velg tjeneste" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SERVICE_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError>
                    <FormMessage />
                  </FieldError>
                </Field>
              )}
            />

            <FormField
              control={form.control}
              name="melding"
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="melding">
                    Melding <span className="text-rose-600">*</span>
                  </FieldLabel>
                  <Textarea id="melding" rows={4} placeholder="Beskriv hva du trenger hjelp med..." {...field} />
                  <FieldError>
                    <FormMessage />
                  </FieldError>
                </Field>
              )}
            />

            <FormField
              control={form.control}
              name="personvernAccept"
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox id="personvernAccept" checked={field.value} onCheckedChange={field.onChange} />
                  <FieldContent>
                    <FieldLabel htmlFor="personvernAccept">
                      Jeg aksepterer <span className="text-rose-600">*</span>
                    </FieldLabel>
                    <FieldDescription className="!m-0">
                      Aksept om at mine personopplysninger behandles i henhold til{' '}
                      <Link href="/personvern">personvernerklæringen</Link>
                    </FieldDescription>
                    <FieldError>
                      <FormMessage />
                    </FieldError>
                  </FieldContent>
                </Field>
              )}
            />
          </FieldSet>
        </FieldGroup>

        {submitError && (
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
            <p className="text-rose-700">{submitError}</p>
          </div>
        )}

        <div className="flex gap-4 px-4">
          <Button type="submit" disabled={form.formState.isSubmitting} className="flex-1">
            {form.formState.isSubmitting ? 'Sender...' : 'Send inn'}
          </Button>
          <Button type="button" variant="outline" onClick={onReset} disabled={form.formState.isSubmitting}>
            Nullstill
          </Button>
        </div>
      </form>
    </Form>
  )
}
