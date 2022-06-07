import './style.css'
import React, { useState } from 'react'

export function Login() {
  const [urlMailFocus, setUrlMail] = useState("../../src/images/mail.svg")
  const [urlPasFocus, setUrlPas] = useState("../../src/images/lock.svg")

  return (
    <div className="logPage">
        <div className="logContainer">
          <h1>Faça seu login</h1>
          <p>Entre com suas informações de cadastro</p>
          <div className="logSection">
            <div className="inputs">
              <label htmlFor="email_input">E-mail</label>
              <div id="input_email">
                <img id='mail-focus' src={urlMailFocus}/>
                <input
                  type="email" 
                  name="email_input"
                  id="email_input"
                  className=''
                  placeholder='Digite seu e-mail'
                  onFocus={() => setUrlMail("../../src/images/mail-focus.svg")}
                  onBlur={() => setUrlMail("../../src/images/mail.svg")}
                  />
              </div>
            </div>
            <div className="inputs">
              <label htmlFor="password_input">Senha</label>
              <div id="input_pass">
                <img id='lock-focus' src={urlPasFocus}/>
                <input
                  src='./'
                  type="password"
                  name="password_input"
                  id="password_input"
                  placeholder='Digite sua senha'
                  onFocus={() => setUrlPas("../../src/images/lock-focus.svg")}
                  onBlur={() => setUrlPas("../../src/images/lock.svg")}
                  />
              </div>
            </div>
            <div className="checkSection">
              <div id="cheking">
                <input type="checkbox" name="check_me" id="check_me" />
                <label htmlFor="check_me">Lembre-me</label>
              </div>
              <p><a href="#">Esqueci minha senha</a></p>
            </div>
            <button id="log_in_button" type="submit">ENTRAR</button>
            <p id='regist'>Não tem uma conta? <a href="#">Registre-se</a></p>
          </div>
      </div>
      <img src="../../src/images/side-image.jpg"/>
    </div>
  )
}
