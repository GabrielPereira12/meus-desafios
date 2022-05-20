import './style.css'
import React, { useState } from 'react'

export function Login() {
  return (
    <div className="logPage">
        <div className="logContainer">
          <h1>Faça seu login</h1>
          <p>Entre com suas informações de cadastro</p>
          <div className="logSection">
            <div className="inputs">
              <label htmlFor="email_input">E-mail</label>
              <div id="input_email">
                <img src="../../src/images/mail.svg"/>
                <input
                  type="email" nam
                  e="email_input"
                  id="email_input"
                  placeholder='Digite seu e-mail'
                  />
              </div>
            </div>
            <div className="inputs">
              <label htmlFor="password_input">Senha</label>
              <div id="input_pass">
                <img src="../../src/images/lock.svg"/>
                <input
                  src='./'
                  type="password"
                  name="password_input"
                  id="password_input"
                  placeholder='Digite sua senha'
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
      <img src="../../src/images/side-image.jpg" alt="Camp in image"/>
    </div>
  )
}
