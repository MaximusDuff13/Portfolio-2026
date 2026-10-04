// The two testimonials, verbatim. Every option renders these strings exactly: no quotation marks
// are added to the text (an option that wants a quote glyph draws it as a separate, aria-hidden
// element), nothing is shortened.
//
// The Product Director quote is intentionally also used, in a different form, in Impact.
export type Testimonial = { id: string; text: string; role: string }

export const designQuote: Testimonial = {
  id: 'design',
  text: "Michael's UX design skills are truly impressive. He brings forward creative ideas and different approaches to the product, constantly reminding us how much creativity goes into great UI/UX design.",
  role: 'Program Director',
}

export const projectQuote: Testimonial = {
  id: 'project',
  text: 'We have started using AI-based conversion mapping and were able to produce the first mapping sheet in just 24 hours. However, this is a significant step forward, considering that the same effort would traditionally take approximately 2 to 3 weeks.',
  role: 'Product Director',
}

export const testimonials = [designQuote, projectQuote]

/* The section's only label: its name, in the eyebrow token. */
export const sectionLabel = 'Testimonials'
