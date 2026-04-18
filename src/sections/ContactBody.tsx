import type { ReactNode } from "react";
import { Reveal } from "../../components/ui/Reveal";

/** portfolio.html から機械変換 */
export function ContactBody(): ReactNode {
  return (
    <>
              <Reveal delayMs={100}>
              <div className="contact-content text-left">
                <div className="contact-divider" aria-hidden="true"></div>
                <p className="contact-main">
                  ご依頼・ご相談は、原則として 株式会社YEBISU 代表 水谷真也
                  経由でお願いしています
                </p>
                <p className="contact-sub contact-sub--note">
                  直接のご連絡が必要な場合も、まずは水谷さんにお声がけください
                </p>
                <div className="contact-divider bottom" aria-hidden="true"></div>
              </div>
              </Reveal>
    </>
  );
}
