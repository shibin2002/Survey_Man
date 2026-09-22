import { useState } from "react"
import { company, services } from "../data/content"

const initial = {
  name: "",
  phone: "",
  email: "",
  service: services[0].name,
  message: "",
}

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      "",
      form.message,
    ].join("\n")
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Survey request — ${form.service}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${company.lat},${company.lng}`

  return (
    <section id="contact" className="relative py-12 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl md:text-6xl">REACH SURVEY MAN</h2>
          <p className="mt-3 text-mute">Questions? Reach out anytime at our dedicated survey support numbers.</p>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">Phone</dt>
              <dd className="mt-1.5 space-y-1">
                {company.phones.map((phone) => (
                  <a key={phone.href} href={phone.href} className="block text-xl hover:text-accent">
                    {phone.label}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">WhatsApp</dt>
              <dd className="mt-1.5">
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl hover:text-accent"
                >
                  {company.phones[0].label}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">Email</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${company.email}`} className="text-xl hover:text-accent">
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">Location</dt>
              <dd className="mt-1.5 text-xl">{company.locationLine}</dd>
              <a
                href={mapsDirectionsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-accent hover:text-accent"
              >
                Get Directions →
              </a>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 border border-line p-5 md:p-6">
          <Field label="Name" name="name" value={form.name} onChange={onChange} required />
          <Field label="Phone" name="phone" value={form.phone} onChange={onChange} required />
          <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
          <label className="block">
            <span className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase">Service Required</span>
            <select
              name="service"
              value={form.service}
              onChange={onChange}
              className="mt-2 w-full border border-line bg-transparent px-4 py-3"
            >
              {services.map((service) => (
                <option key={service.id} value={service.name} className="bg-bg">
                  {service.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={4}
              className="mt-2 w-full border border-line bg-transparent px-4 py-3"
            />
          </label>
          <button type="submit" className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-on-accent">
            Request a Survey
          </button>
          {sent && (
            <p className="text-sm text-mute">
              Your email client should open with the request. If it does not, write to {company.email}.
            </p>
          )}
        </form>
      </div>


    </section>
  )
}

function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-[0.16em] text-mute uppercase">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full border border-line bg-transparent px-4 py-3"
      />
    </label>
  )
}
