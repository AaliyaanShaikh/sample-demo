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

export default function PrivacyPolicy() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      subtitle={`How this sample storefront collects, uses, and protects your information. Last updated: ${lastUpdated}.`}
    >
      <article className="max-w-3xl">
        <Section title="Introduction">
          <p>
            This sample storefront (“we”, “us”, “our”) respects your privacy. This
            policy describes how we handle personal information when you visit
            our website, create an account, or purchase from us.
          </p>
        </Section>

        <Section title="Information we collect">
          <p>We may collect:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-normal text-white/90">Contact details</strong>{" "}
              — name, email address, phone number, and shipping or billing
              addresses when you place an order or contact us.
            </li>
            <li>
              <strong className="font-normal text-white/90">Order data</strong> —
              items purchased, payment status (processed by our payment
              providers), and delivery information.
            </li>
            <li>
              <strong className="font-normal text-white/90">Technical data</strong>{" "}
              — browser type, device information, and approximate location via
              IP address, used to secure and improve our site.
            </li>
            <li>
              <strong className="font-normal text-white/90">Communications</strong>{" "}
              — messages you send us (e.g. contact form or email).
            </li>
          </ul>
        </Section>

        <Section title="How we use your information">
          <p>We use this information to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Process and deliver your orders, and provide customer support.</li>
            <li>
              Send transactional emails (order confirmations, shipping updates)
              and, where you have opted in, marketing communications.
            </li>
            <li>Improve our website, products, and services.</li>
            <li>Detect and prevent fraud, abuse, or security issues.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </Section>

        <Section title="Legal bases (where applicable)">
          <p>
            Depending on your location, we may rely on consent, performance of a
            contract, legitimate interests (e.g. site security and analytics),
            or legal obligation to process your data.
          </p>
        </Section>

        <Section title="Sharing of information">
          <p>
            We may share data with trusted service providers who help us operate
            our business (e.g. payment processing, shipping, email delivery,
            hosting). They may only use your data to perform services for us and
            must protect it appropriately. We may also disclose information if
            required by law or to protect our rights and users’ safety.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            We keep personal information only as long as needed for the purposes
            described above, including legal, accounting, or reporting
            requirements, unless a longer period is required by law.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Depending on where you live, you may have rights to access, correct,
            delete, or restrict processing of your personal data, or to object to
            certain processing or to data portability. You may also withdraw
            consent where processing is consent-based. To exercise these rights,
            contact us using the details on our{" "}
            <Link href="/contact" className="text-white underline underline-offset-2 hover:opacity-80">
              Contact
            </Link>{" "}
            page.
          </p>
        </Section>

        <Section title="Security">
          <p>
            We use reasonable technical and organisational measures to protect
            your information. No method of transmission over the internet is
            completely secure; we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="Children’s privacy">
          <p>
            Our services are not directed at children under 16. We do not
            knowingly collect personal information from children. If you believe
            we have collected such information, please contact us.
          </p>
        </Section>

        <Section title="International transfers">
          <p>
            If you access our site from outside the country where we operate,
            your information may be transferred to and processed in countries
            that may have different data protection laws. We take steps designed
            to ensure appropriate safeguards where required.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. We will post the
            revised version on this page and update the “Last updated” date. We
            encourage you to review it periodically.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            For privacy-related questions or requests, please reach us via the
            contact information on our{" "}
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
