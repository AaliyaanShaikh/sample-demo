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

export default function CookiePolicy() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie Policy"
      subtitle={`How we use cookies and similar technologies on our website. Last updated: ${lastUpdated}.`}
    >
      <article className="max-w-3xl">
        <Section title="What are cookies?">
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help the site remember your preferences, keep you
            signed in where applicable, and understand how visitors use the site.
            “Similar technologies” include local storage and pixels.
          </p>
        </Section>

        <Section title="How we use cookies">
          <p>We use cookies and similar technologies to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="font-normal text-white/90">Essential</strong> —
              enable core functionality such as security, navigation, load
              balancing, and remembering your cookie choices where required.
            </li>
            <li>
              <strong className="font-normal text-white/90">Preferences</strong> —
              remember settings such as language or region, where you have chosen
              them.
            </li>
            <li>
              <strong className="font-normal text-white/90">Analytics</strong> —
              understand how visitors use our Site (e.g. pages viewed, duration)
              so we can improve performance and content.
            </li>
            <li>
              <strong className="font-normal text-white/90">Media</strong> —
              after you choose Accept or Accept all, campaign video on the home
              page may play automatically.
            </li>
          </ul>
        </Section>

        <Section title="Cookies we may use">
          <p>
            Specific cookie names and lifetimes may vary as we update our
            technology. They may include first-party cookies set by us and
            third-party cookies set by analytics or advertising partners when
            those features are enabled.
          </p>
        </Section>

        <Section title="Your choices">
          <p>
            You can control cookies through your browser settings—most browsers
            let you block or delete cookies. Blocking all cookies may affect
            Site functionality (e.g. shopping cart or checkout).
          </p>
          <p>
            Where required by law, we will ask for your consent before using
            non-essential cookies. You can withdraw consent at any time by
            adjusting your browser settings or, where we provide a cookie
            preference tool, through that tool.
          </p>
        </Section>

        <Section title="Do Not Track">
          <p>
            Some browsers send “Do Not Track” signals. There is no consistent
            industry standard; we do not currently respond to all such signals
            but you can use the choices above to limit tracking.
          </p>
        </Section>

        <Section title="Updates">
          <p>
            We may update this Cookie Policy from time to time. Changes will be
            posted on this page with an updated “Last updated” date.
          </p>
        </Section>

        <Section title="More information">
          <p>
            For how we use personal data more broadly, see our{" "}
            <Link href="/privacy" className="text-white underline underline-offset-2 hover:opacity-80">
              Privacy Policy
            </Link>
            . For questions, contact us via our{" "}
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
