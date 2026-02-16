import SignatureCoreSection from "./signature/SignatureCoreSection";
import SignatureDataSection from "./signature/SignatureDataSection";
import SignatureFeedbackSection from "./signature/SignatureFeedbackSection";
import SignatureContentSection from "./signature/SignatureContentSection";

const SignatureSection = () => (
  <>
    <SignatureCoreSection />
    <SignatureDataSection />
    <SignatureFeedbackSection />
    <SignatureContentSection />
  </>
);

export default SignatureSection;
