import { PopupModal } from "react-calendly";
import { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
export const Calendly = ({ btnText, url }) => {

    const [calendlyBox, setCalendlyBox,] = useState()
    const [showcapcha, setShowCapcha,] = useState()
    return (

        <>
            {showcapcha &&
                <div className="mb-[20px]">
                    <ReCAPTCHA
                        sitekey="6Lf5jockAAAAADd7z_RFMHrmrham4ydFLP166YEI"
                        onChange={(e) => {
                            if(!!e) {
                                setCalendlyBox(true)
                            }
                         }}
                    />
                </div>
            }
            <button onClick={() => setShowCapcha(true)} className="btn Primary">
                {btnText}
            </button>

            <PopupModal
                url={url}
                onModalClose={() => setCalendlyBox(false)}
                open={calendlyBox}
                rootElement={document.getElementById("__next")}
            />
        </>
    );
}

export default Calendly;