import "./forgot.css"

export default function Forgot() {

    const sendmail = (e)=>{
        e.preventDefault(e);
        console.log("clicked");
         const email = document.getElementById("mail").value
         console.log(email);
    }

    return (
        <form className="forgotbody" onSubmit={sendmail}>
            <h2>Enter Your Email </h2>
            <input type="email" placeholder="Email" className="email" id="mail" />
            <input type="submit" value="Send mail" />
        </form>
    )
}
