import apiClient from "../AxiosConfig"
import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import Captcha from "../components/Captcha"
import { useAppContext } from "../utils/AppContext"

const Login = () => {
  const { isLoggedIn, authLoading } = useAppContext();
  const recaptcha = useRef(null);
  const [info, setInfo] = useState("");
  const navigate = useNavigate();
  const [isWaiting, setWaiting] = useState(false);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) setLoading(true);
    else if (isLoggedIn)  navigate("/");
    else setLoading(false);
  }, [isLoggedIn, authLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  
  const onSubmit = async (data) => {
    const captchaToken = recaptcha.current.getValue();
    if (!captchaToken) return setInfo("Veuillez cocher la case \"Je ne suis pas un robot\"");

    try {
      setWaiting(true);
      await apiClient.post("/api/compte/login", {...data, captchaToken}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      const message = (error.response && error.response.data.message) ? error.response.data.message : error.message;
      console.error(error);
      setInfo(message);
    } finally {
      setWaiting(false);
    }
  }

  return (
    <>
      <title>SignEm - Connexion</title>
      {
        !isLoading ? (
          <>
            <form className="formPrimary pl" onSubmit={ handleSubmit(onSubmit) }>
              <div className="formField">
                <label htmlFor="emailInput" className="formFieldLabel">Adresse email : </label>
                <input {...register("email", {required: "Ce champ est obligatoire"})} type="text" className="formFieldInput formFieldSection" id="emailInput" />
                {errors.name && (<p className="errorMessage">{ errors.name.message }</p>)}
              </div>
              <div className="formField">
                <label htmlFor="mdpInput" className="formFieldLabel">Mot de passe : </label>
                <input {...register("mdp", {required: "Ce champ est obligatoire"})} type="password" className="formFieldInput formFieldSection" id="mdpInput" />
                { errors.mdp && (<p className="errorMessage">{ errors.mdp.message }</p>) }
              </div>
              <Captcha recaptcha={ recaptcha } />
              { info ? <p className="errorMessage">{ info }</p> : "" }
              { isWaiting ? <Spinner className="" /> : <button type="submit" className="buttonPrimary centered">Se connecter</button> }
            </form>
          </>
        ) : <Spinner/>
      }
    </>
  )
}

export default Login