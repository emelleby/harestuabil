import React, { useReducer } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  ContactFormData,
  ContactFormState,
  ContactFormAction,
  ContactFormErrors,
} from "@/types/contact";
import { ServiceType } from "@/types/service";

// Norwegian service type labels
const SERVICE_LABELS: Record<ServiceType, string> = {
  verksted: "Verksted",
  "dekk-og-felg": "Dekk og felg",
  dekkhotell: "Dekkhotell",
  bilglass: "Bilglass",
};

// Initial form state
const initialState: ContactFormState = {
  data: {
    navn: "",
    epost: "",
    telefon: "",
    tjenesteType: "",
    melding: "",
    personvernAccept: false,
    honeypot: "",
  },
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
};

// Form reducer
function contactFormReducer(
  state: ContactFormState,
  action: ContactFormAction
): ContactFormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: undefined, // Clear field error when user types
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };
    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };
    case "SET_SUBMITTED":
      return {
        ...state,
        isSubmitted: action.isSubmitted,
        isSubmitting: false,
      };
    case "SET_SUBMIT_ERROR":
      return {
        ...state,
        submitError: action.error,
        isSubmitting: false,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

// Validation function
function validateForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.navn.trim()) {
    errors.navn = "Navn er påkrevd";
  }

  if (!data.epost.trim()) {
    errors.epost = "E-post er påkrevd";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.epost)) {
    errors.epost = "Ugyldig e-postadresse";
  }

  if (!data.tjenesteType) {
    errors.tjenesteType = "Tjeneste type er påkrevd";
  }

  if (!data.melding.trim()) {
    errors.melding = "Melding er påkrevd";
  }

  if (!data.personvernAccept) {
    errors.personvernAccept = "Du må akseptere personvernerklæringen";
  }

  return errors;
}

// Encode form data for Netlify
function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export function ContactForm() {
  const [state, dispatch] = useReducer(contactFormReducer, initialState);

  const handleFieldChange = (
    field: keyof ContactFormData,
    value: string | boolean
  ) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (state.data.honeypot) {
      return; // Likely spam, silently ignore
    }

    // Validate form
    const errors = validateForm(state.data);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });

    try {
      // Prepare form data for Netlify
      const formData = {
        "form-name": "kontakt",
        navn: state.data.navn,
        epost: state.data.epost,
        telefon: state.data.telefon || "",
        tjenesteType: state.data.tjenesteType,
        melding: state.data.melding,
      };

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData),
      });

      if (response.ok) {
        dispatch({ type: "SET_SUBMITTED", isSubmitted: true });
      } else {
        throw new Error("Nettverksfeil ved innsending av skjema");
      }
    } catch (error) {
      dispatch({
        type: "SET_SUBMIT_ERROR",
        error:
          error instanceof Error
            ? error.message
            : "En feil oppstod ved innsending av skjema",
      });
    }
  };

  if (state.isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Takk for din henvendelse!
        </h3>
        <p className="text-green-700">
          Vi har mottatt din melding og vil kontakte deg så snart som mulig.
        </p>
      </div>
    );
  }

  return (
    <form
      name="kontakt"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
      role="form"
      lang="nb"
      noValidate
    >
      {/* Hidden field for Netlify Forms */}
      <input type="hidden" name="form-name" value="kontakt" />

      {/* Honeypot field */}
      <input
        type="text"
        name="honeypot"
        value={state.data.honeypot}
        onChange={(e) => handleFieldChange("honeypot", e.target.value)}
        style={{ display: "none" }}
        data-testid="honeypot-field"
        tabIndex={-1}
        autoComplete="off"
      />

      <Field>
        <Label htmlFor="navn">Navn *</Label>
        <Input
          id="navn"
          name="navn"
          type="text"
          value={state.data.navn}
          onChange={(e) => handleFieldChange("navn", e.target.value)}
          className={state.errors.navn ? "border-red-500" : ""}
          required
        />
        {state.errors.navn && (
          <p className="text-sm text-red-600 mt-1">{state.errors.navn}</p>
        )}
      </Field>

      <Field>
        <Label htmlFor="epost">E-post *</Label>
        <Input
          id="epost"
          name="epost"
          type="email"
          value={state.data.epost}
          onChange={(e) => handleFieldChange("epost", e.target.value)}
          onBlur={() => {
            if (
              state.data.epost &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.data.epost)
            ) {
              dispatch({
                type: "SET_ERRORS",
                errors: { ...state.errors, epost: "Ugyldig e-postadresse" },
              });
            }
          }}
          className={state.errors.epost ? "border-red-500" : ""}
          required
        />
        {state.errors.epost && (
          <p className="text-sm text-red-600 mt-1">{state.errors.epost}</p>
        )}
      </Field>

      <Field>
        <Label htmlFor="telefon">Telefon</Label>
        <Input
          id="telefon"
          name="telefon"
          type="tel"
          value={state.data.telefon}
          onChange={(e) => handleFieldChange("telefon", e.target.value)}
          placeholder="+47 123 45 678"
        />
      </Field>

      <Field>
        <Label htmlFor="tjenesteType" id="tjenesteType-label">
          Tjeneste type *
        </Label>
        <Select
          name="tjenesteType"
          value={state.data.tjenesteType}
          onValueChange={(value) => handleFieldChange("tjenesteType", value)}
          required
        >
          <SelectTrigger
            id="tjenesteType"
            aria-labelledby="tjenesteType-label"
            className={state.errors.tjenesteType ? "border-red-500" : ""}
          >
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
        {state.errors.tjenesteType && (
          <p className="text-sm text-red-600 mt-1">
            {state.errors.tjenesteType}
          </p>
        )}
      </Field>

      <Field>
        <Label htmlFor="melding">Melding *</Label>
        <Textarea
          id="melding"
          name="melding"
          value={state.data.melding}
          onChange={(e) => handleFieldChange("melding", e.target.value)}
          className={state.errors.melding ? "border-red-500" : ""}
          rows={5}
          placeholder="Beskriv hva du trenger hjelp med..."
          required
        />
        {state.errors.melding && (
          <p className="text-sm text-red-600 mt-1">{state.errors.melding}</p>
        )}
      </Field>

      <Field orientation="horizontal">
        <Checkbox
          id="personvernAccept"
          name="personvernAccept"
          checked={state.data.personvernAccept}
          onCheckedChange={(checked) =>
            handleFieldChange("personvernAccept", !!checked)
          }
          className={state.errors.personvernAccept ? "border-red-500" : ""}
          required
        />
        <FieldContent>
          <FieldLabel htmlFor="personvernAccept">
            Jeg aksepterer <span className="text-red-600">*</span>
          </FieldLabel>
          <FieldDescription>
            <FieldError>
              {state.errors.personvernAccept && (
                <p>{state.errors.personvernAccept}</p>
              )}
            </FieldError>
            Aksept om at mine personopplysninger behandles i henhold til{" "}
            <a href="/personvern" className="text-blue-600 hover:underline">
              personvernerklæringen
            </a>
          </FieldDescription>
        </FieldContent>
      </Field>

      <FieldLabel htmlFor="kubernetes-r2h">
        <Field orientation="horizontal">
          <Checkbox
            id="personvernAccept"
            name="personvernAccept"
            checked={state.data.personvernAccept}
            onCheckedChange={(checked) =>
              handleFieldChange("personvernAccept", !!checked)
            }
            className={state.errors.personvernAccept ? "border-red-500" : ""}
            required
          />
          <FieldContent>
            <FieldTitle>Kubernetes</FieldTitle>
            <FieldDescription>
              Run GPU workloads on a K8s configured cluster.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>

      {/* <Field>
        <div className="flex items-start space-x-2">
          <Checkbox
            id="personvernAccept"
            name="personvernAccept"
            checked={state.data.personvernAccept}
            onCheckedChange={(checked) =>
              handleFieldChange("personvernAccept", !!checked)
            }
            className={state.errors.personvernAccept ? "border-red-500" : ""}
            required
          />
          <Label htmlFor="personvernAccept" className="text-sm leading-5">
            Jeg aksepterer at mine personopplysninger behandles i henhold til{" "}
            <a href="/personvern" className="text-blue-600 hover:underline">
              personvernerklæringen
            </a>{" "}
            *
          </Label>
        </div>
        {state.errors.personvernAccept && (
          <p className="text-sm text-red-600 mt-1">
            {state.errors.personvernAccept}
          </p>
        )}
      </Field> */}

      {state.submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{state.submitError}</p>
        </div>
      )}

      <Button type="submit" disabled={state.isSubmitting} className="w-full">
        {state.isSubmitting ? "Sender..." : "Send inn"}
      </Button>
    </form>
  );
}
