import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const Captcha = ({ recaptcha }) => {
    const [isRecaptchaAllowed, setIsRecaptchaAllowed] = useState(null);

    useEffect(() => {
    let retries = 0;
    const maxRetries = 10;
  
    const checkConsent = () => {
      if (window.tarteaucitron?.state?.recaptcha !== undefined) {
        setIsRecaptchaAllowed(window.tarteaucitron?.state?.recaptcha);
      } else if (retries < maxRetries) {
        retries += 1;
        setTimeout(checkConsent, 500);
      } else {
        setIsRecaptchaAllowed(false);
      }
    };
      checkConsent();
    }, []);
  

  return (
    <>
      {isRecaptchaAllowed === null ? <Spinner /> : (isRecaptchaAllowed ? <ReCAPTCHA className="centered wfc pl" ref = { recaptcha } sitekey = { import.meta.env.VITE_CAPTCHA_SITE } /> : <p className="errorMessage">Les cookies captcha sont désactivé, veuillez les activer pour continuer.</p>)}
    </>
  )
}

export default Captcha