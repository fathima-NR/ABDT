import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { serviceCategories } from "../data/services";
import { whatsappHref } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";
import Button from "./Button";
import { WhatsAppIcon } from "./SocialIcons";

const fieldClass =
  "w-full border border-line bg-white px-3 py-3 text-base text-ink outline-none focus:border-uae-red";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-uae-red">
      {message}
    </p>
  );
}

function ServiceSelect({ id, value, onChange, onBlur, invalid, describedBy, placeholder, options }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return undefined;
    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }
    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${open ? "z-30" : ""}`}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid ? "true" : "false"}
        aria-describedby={describedBy}
        onClick={() => setOpen((current) => !current)}
        onBlur={onBlur}
        className={`${fieldClass} flex items-center justify-between gap-3 text-start ${selected ? "text-ink" : "text-muted"} ${invalid ? "border-uae-red" : ""}`}
      >
        <span className="truncate">{selected?.label || placeholder}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-navy transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-30 mt-1 max-h-64 w-full overflow-auto border border-line bg-white py-1 shadow-[0_12px_28px_rgb(20_20_20/0.12)]"
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`block w-full px-3 py-2.5 text-start text-sm transition-colors ${active ? "bg-uae-red text-white" : "text-ink hover:bg-uae-red/10 hover:text-uae-red"}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default function ContactForm() {
  const { t, language } = useI18n();
  const [opened, setOpened] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      service: "",
      message: "",
    },
  });

  useEffect(() => {
    clearErrors();
  }, [language, clearErrors]);

  function onSubmit(values) {
    const serviceTitle = t.services.categories[values.service]?.title || values.service;
    const lines = [
      t.whatsappMessage,
      `${t.form.name}: ${values.fullName.trim()}`,
      `${t.form.mobile}: ${values.mobile.trim()}`,
    ];
    if (values.email.trim()) lines.push(`${t.form.email}: ${values.email.trim()}`);
    lines.push(`${t.form.service}: ${serviceTitle}`, values.message.trim());

    const href = whatsappHref(lines.join("\n"));
    const popup = window.open(href, "_blank", "noopener,noreferrer");
    if (!popup) window.location.assign(href);

    reset();
    setOpened(true);
  }

  return (
    <div className="border border-line bg-white p-6 sm:p-8">
      {opened ? (
        <p className="mb-6 border border-line bg-page p-4 text-sm leading-relaxed text-ink" role="status">
          {t.form.opened}
        </p>
      ) : null}

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold text-navy">
            {t.form.name}
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={fieldClass}
            {...register("fullName", {
              required: t.form.errors.name,
              minLength: { value: 2, message: t.form.errors.name },
              maxLength: { value: 80, message: t.form.errors.name },
            })}
          />
          <FieldError id="fullName-error" message={errors.fullName?.message} />
        </div>

        <div>
          <label htmlFor="mobile" className="mb-1.5 block text-sm font-semibold text-navy">
            {t.form.mobile}
          </label>
          <input
            id="mobile"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            aria-invalid={errors.mobile ? "true" : "false"}
            aria-describedby={errors.mobile ? "mobile-error" : undefined}
            className={fieldClass}
            {...register("mobile", {
              required: t.form.errors.mobile,
              pattern: { value: /^[0-9+\s()-]{7,20}$/, message: t.form.errors.mobile },
            })}
          />
          <FieldError id="mobile-error" message={errors.mobile?.message} />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">
            {t.form.email}
          </label>
          <input
            id="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass}
            {...register("email", {
              validate: (value) =>
                !value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || t.form.errors.email,
            })}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-navy">
            {t.form.service}
          </label>
          <Controller
            name="service"
            control={control}
            rules={{ required: t.form.errors.service }}
            render={({ field }) => (
              <ServiceSelect
                id="service"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                invalid={Boolean(errors.service)}
                describedBy={errors.service ? "service-error" : undefined}
                placeholder={t.form.servicePlaceholder}
                options={serviceCategories.map((category) => ({
                  value: category.id,
                  label: t.services.categories[category.id].title,
                }))}
              />
            )}
          />
          <FieldError id="service-error" message={errors.service?.message} />
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
            {t.form.message}
          </label>
          <textarea
            id="message"
            rows={5}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error message-note" : "message-note"}
            className={fieldClass}
            {...register("message", {
              required: t.form.errors.message,
              minLength: { value: 10, message: t.form.errors.message },
              maxLength: { value: 1000, message: t.form.errors.message },
            })}
          />
          <p id="message-note" className="mt-1 text-sm text-muted">
            {t.form.sensitive}
          </p>
          <FieldError id="message-error" message={errors.message?.message} />
        </div>

        <Button type="submit" variant="whatsapp" className="w-full sm:w-auto">
          <WhatsAppIcon className="h-5 w-5" />
          {t.form.submit}
        </Button>
      </form>
    </div>
  );
}
