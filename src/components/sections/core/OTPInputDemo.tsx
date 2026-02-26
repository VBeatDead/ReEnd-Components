import { OTPInput } from "../../ui/otp-input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ComponentPreview } from "../../docs/ComponentPreview";

function OTPInputDemo() {
  const { t } = useTranslation("core");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleComplete = (v: string) => {
    if (v === "123456") {
      setSuccess(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <ComponentPreview
      id="otp-input"
      title={t("otp_input.title", { defaultValue: "OTP Input" })}
      description={t("otp_input.description", { defaultValue: "One-time password input with Orbitron digit boxes. Auto-advances on entry, supports paste, shake animation on error, green success state, and resend countdown timer." })}
      props={[
        { name: "length", type: "number", required: false, description: "Number of digit boxes", default: "6" },
        { name: "value", type: "string", required: false, description: "Controlled value" },
        { name: "onChange", type: "(value: string) => void", required: false, description: "Change handler" },
        { name: "onComplete", type: "(value: string) => void", required: false, description: "Called when all digits are filled" },
        { name: "error", type: "boolean", required: false, description: "Error state — triggers shake animation + destructive border" },
        { name: "success", type: "boolean", required: false, description: "Success state — green border + text on all boxes" },
        { name: "disabled", type: "boolean", required: false, description: "Disabled state" },
        { name: "onResend", type: "() => void", required: false, description: "Shows resend button below inputs when provided" },
        { name: "resendCooldown", type: "number", required: false, description: "Initial countdown seconds before resend is available" },
        { name: "resendLabel", type: "string", required: false, description: "Label text for the resend button", default: '"RESEND"' },
      ]}
      code={`import { OTPInput } from "reend-components";

<OTPInput
  length={6}
  value={code}
  onChange={setCode}
  onComplete={(v) => verifyCode(v)}
  success={verified}
  error={invalid}
  onResend={handleResend}
  resendCooldown={45}
/>`}
    >
      <div className="space-y-8">
        {/* Main demo */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
            {t("otp_input.label", { defaultValue: "◆ VERIFICATION CODE" })} — {t("otp_input.try_hint", { defaultValue: "try typing or pasting 6 digits" })} <span className="text-primary">123456</span>
          </p>
          <OTPInput
            value={value}
            onChange={setValue}
            onComplete={handleComplete}
            error={error}
            success={success}
            onResend={() => {
              setValue("");
              setSuccess(false);
            }}
            resendCooldown={success ? 0 : 30}
          />
        </div>

        {/* States row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
              {t("otp_input.state_error", { defaultValue: "ERROR STATE" })}
            </p>
            <OTPInput length={4} error value="1234" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
              {t("otp_input.state_success", { defaultValue: "SUCCESS STATE" })}
            </p>
            <OTPInput length={4} success value="9182" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
              {t("otp_input.state_disabled", { defaultValue: "DISABLED" })}
            </p>
            <OTPInput length={4} value="9" disabled />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
              {t("otp_input.state_resend", { defaultValue: "WITH RESEND TIMER" })}
            </p>
            <OTPInput length={4} onResend={() => {}} resendCooldown={45} />
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

export default OTPInputDemo;
