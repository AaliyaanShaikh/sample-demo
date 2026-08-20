import type { ReactNode } from "react";
import Link from "next/link";
import PageShell from "../components/layout/PageShell";

const lastUpdated = "March 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 font-serif text-xl text-white md:text-2xl">{title}</h2>
      <div className="space-y-4 text-sm font-light leading-relaxed text-white/80">
        {children}
      </div>
    </section>
  );
}

export default function TermsOfService() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      subtitle={`Rules for using our website and browsing this sample collection. Last updated: ${lastUpdated}.`}
    >
      <article className="max-w-3xl">
        <Section title="Agreement">
          <p>
            By accessing or using this sample website (“Site”) or
            placing an order, you agree to these Terms of Service. If you do not
            agree, please do not use the Site.
          </p>
        </Section>

        <Section title="Eligibility">
          <p>
            You must be at least the age of majority in your place of residence
            to use the Site and make purchases. By using the Site, you represent
            that you meet this requirement.
          </p>
        </Section>

        <Section title="Products and pricing">
          <p>
            We strive to display product descriptions, images, and prices
            accurately. Minor variations in colour, finish, or appearance may
            occur. We reserve the right to correct errors, update pricing, or
            withdraw products at any time before we accept your order.
          </p>
        </Section>

        <Section title="Orders and payment">
          <p>
            When you place an order, you offer to buy the products at the prices
            shown. We will confirm acceptance by email or by shipping the goods.
            Payment must be made through the methods we provide. You agree to
            provide current, complete, and accurate purchase and account
            information.
          </p>
        </Section>

        <Section title="Shipping and delivery">
          <p>
            Delivery times and costs are as stated at checkout or in our
            communications. Risk of loss passes to you when the goods are
            delivered to the carrier or to you, as applicable under our shipping
            policy. See our Contact page or order emails for support on delayed or
            damaged shipments.
          </p>
        </Section>

        <Section title="Returns and cancellations">
          <p>
            Return, exchange, and cancellation rights depend on applicable law and
            our stated return policy at the time of purchase. If you do not
            receive a product in a materially defective condition, contact us
            promptly with your order details.
          </p>
        </Section>

        <Section title="Intellectual property">
          <p>
            All content on the Site—including text, graphics, logos, images, and
            software—is owned by the site operator or its licensors and is protected
            by copyright and other laws. You may not copy, modify, distribute,
            or create derivative works without our prior written permission,
            except for personal, non-commercial viewing.
          </p>
        </Section>

        <Section title="Prohibited uses">
          <p>You agree not to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Use the Site for any unlawful purpose or to harm others.</li>
            <li>
              Attempt to gain unauthorised access to our systems, data, or other
              users’ accounts.
            </li>
            <li>
              Use automated means (scrapers, bots) to access the Site without
              permission.
            </li>
            <li>Interfere with the proper working of the Site or our services.</li>
          </ul>
        </Section>

        <Section title="Disclaimer of warranties">
          <p>
            The Site and products are provided on an “as is” and “as available”
            basis to the fullest extent permitted by law. We disclaim warranties
            of merchantability, fitness for a particular purpose, and
            non-infringement, except where such disclaimers are not allowed by
            law.
          </p>
        </Section>

        <Section title="Limitation of liability">
          <p>
            To the maximum extent permitted by applicable law, the site operator
            and its affiliates shall not be liable for indirect, incidental,
            special, consequential, or punitive damages, or any loss of profits,
            data, or goodwill, arising from your use of the Site or products.
            Our total liability for any claim arising from these terms or your
            use of the Site shall not exceed the amount you paid us for the
            relevant order in the twelve (12) months before the claim, unless
            mandatory law provides otherwise.
          </p>
        </Section>

        <Section title="Indemnity">
          <p>
            You agree to indemnify and hold harmless the site operator from claims,
            damages, losses, or expenses (including reasonable legal fees)
            arising from your violation of these terms or misuse of the Site.
          </p>
        </Section>

        <Section title="Governing law and disputes">
          <p>
            These terms are governed by the laws applicable in the jurisdiction
            where this sample storefront operates, without regard to conflict-of-law
            rules. Any disputes shall be resolved in the courts of that
            jurisdiction, unless mandatory consumer protection laws in your
            country give you the right to bring proceedings elsewhere.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            We may modify these Terms of Service at any time. The updated version
            will be posted on this page with a revised “Last updated” date.
            Continued use of the Site after changes constitutes acceptance where
            permitted by law.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms? Visit our{" "}
            <Link href="/contact" className="text-white underline underline-offset-2 hover:opacity-80">
              Contact
            </Link>{" "}
            page.
          </p>
        </Section>
      </article>
    </PageShell>
  );
}
