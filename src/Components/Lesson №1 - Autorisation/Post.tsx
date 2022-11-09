import React, {ChangeEvent, useState} from "react";
import './Post.css';
import axios from "axios";

export function Post() {
    // Login and email
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("");

    // Password, confirmPassword, showInccorrectPassword
    const [password, setPassword] = useState("");
    const [confirmPassword, confirmSetPassword] = useState("");
    const [showIncorrectPasswordMessage, setShowIncorrectPasswordMessage] = useState(false);

    // Next Page
    const [nextPage, setNextPage] = useState(true)

    // If we catch mistake
    const [alertMessage, setAlertMessage] = useState("")



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
        // console.log(`The name you entered was: ${username} ${email} ${password}`)

        axios({
            method: "POST",
            url:"https://links-to.site/user/api/v1/user",
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
                setAlertMessage("Вы успешно зарегались")
            })
            .catch(function (error) {
                if (error.response) {
                    setAlertMessage("Ошибочка")
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
            setNextPage(false)
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
                            <p> 4. Когда сервер возвращает ошибку тебе на регистрацию, покажи ее пользователю
                                 Если же бекенд вернет status  200, то покажи пользователю сообщение "вы успешно зарегистрировались" </p>
                    </div>
                    <p className={'line'}></p>
                </div>


                <div className={'anotherBlock'}>
                    { nextPage &&  (
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
                                <label> Password:
                                    <input value={password} name="password" type="password" id="password"
                                           onChange={checkPassword} required
                                    />
                                </label>
                                <label> Confirm password:
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
                        )}

                    <div>{alertMessage}</div>

                </div>
                <p className={'line'}></p>
            </div>
        </div>
    )
}
