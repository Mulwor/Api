import React, {ChangeEvent, useState} from "react";
import './Post.css';
import axios from "axios";

export function Post() {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, confirmSetPassword] = useState("");
    const [showIncorrectPasswordMessage, setShowIncorrectPasswordMessage] = useState(false);


    const checkPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
            if (event.currentTarget.value === confirmPassword) {
                setShowIncorrectPasswordMessage(false);
            } else {
                setShowIncorrectPasswordMessage(true)
            }
    }
    const checkConfirmPasswords = (event: ChangeEvent<HTMLInputElement>) => {
        confirmSetPassword(event.currentTarget.value)
        if (event.currentTarget.value === password) {
            setShowIncorrectPasswordMessage(false);
        } else {
            setShowIncorrectPasswordMessage(true)
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        console.log(`The name you entered was: ${username} ${email} ${password}`)

        axios({
            method: "POST",
            url:"https://dev.mkkkr.net/user/api/v1/user",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                username: username,
                email: email,
                password: password
            },
            })
            .then(function (response) {
                console.log(response.data);
                // console.log(response.status);
                // console.log(response.statusText);
                // console.log(response.headers);
                // console.log(response.config);
            })
            .catch(function (error) {
                if (error.response) {
                    // Сервер отвечает кодом, который выходит за пределеы 200
                    // 1. Выводит в текстовом формате ошибку
                    console.log(error.response.data);
                    /* Варианты:
                    1. a.app.CreateUser: Tx: repo.Save: db.GetContext: email exist
                    2. invalid CreateUserRequest.Password: value length must be between 8 and 32 runes, inclusive
                    3. a.app.CreateUser: Tx: repo.Save: db.GetContext: username exist

                    */

                    // Выводит статус ошибки
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // Запрос был сделан, но ответ не был получен
                    // Экземпляр: `error.request` — это экземпляр XMLHttpRequest в браузере и экземпляр => http.ClientRequest в node.js
                    console.log(error.request);
                } else {
                    // Произошло что-то при настройке запроса, вызвавшее ошибку
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

    }

    return (
        <div>
            <div className={'form'}>
                <div className={"babel"}>
                    <h3 className={'title'}>First-task</h3>
                    <p className={'line'}></p>
                    <div className={'block'}>
                            <p> 1. Необходимо сделать форму, где пользователь вводит username, email и два поля для пароля.</p>
                            <p> 2. Если пользователь в одном поле для пароля внес один пароль, во второй форме, другой пароль, то выдавать ему ошибку "пароли не совпадают"</p>
                            <p> 3. Если пароли одинаковые, и проверка проходит, пользователь может нажать на кнопку "зарегистрироваться"</p>
                            <p> 4. <b>Допилить:</b> Когда сервер возвращает ошибку тебе на регистрацию, покажи ее пользователю
                                 Если же бекенд вернет status  200, то покажи пользователю сообщение "вы успешно зарегистрировались" </p>
                    </div>
                    <p className={'line'}></p>
                </div>

                <div className={'anotherBlock'}>
                        <form onSubmit={handleSubmit}>
                            <label> Username:
                                <input value={username} name="username"
                                       onChange={(event) => setUserName(event.target.value)} required
                                />
                            </label>

                            <label> Email:
                                <input value={email} name="email" type="email"
                                    onChange={(event) => setEmail(event.target.value)} required
                                />
                            </label>

                            <label htmlFor="password"> Password:
                                <input value={password} name="password" type="password" id="password"
                                    onChange={checkPassword} required
                                />
                            </label>

                            <label  htmlFor="confirmPassword"> Confirm password:
                                <input
                                    value={confirmPassword} id="confirmPassword" type="password"
                                    onChange={checkConfirmPasswords} required
                                />
                            </label>

                            {showIncorrectPasswordMessage ? <div> Пароли не совпадают </div> : ''}

                            <button
                                disabled={
                                    !confirmPassword || !password || !email || !username
                                    || confirmPassword !== password
                                }
                                type = "submit"> Зарегистрироваться </button>
                        </form>
                </div>
                <p className={'line'}></p>
            </div>
        </div>
    )
}
