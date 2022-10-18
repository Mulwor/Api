import './index.css'
import React, {useState} from "react";
import axios from "axios";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nextPage, setNextPage] = useState(true)
    const [alertMessage, setAlertMessage] = useState("")


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        // console.log(`The name you entered was: ${username} ${email} ${password}`)

        axios({
            method: "POST",
            url:"https://dev.mkkkr.net/user/api/v1/login",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'Grpc-Metadata-Authorization': '{token}',
            },
            data: {
                email: email,
                password: password,
            },
            // body: JSON.stringify(event),
        })

            .then(function (response) {
                // const tokenData = response.json();
                // console.log(JSON.stringify(response.headers['grpc-metadata-authorization']));
                console.log(response.data);
                console.log('headers ', response.headers)
                setAlertMessage("Вы успешно зарегались")
            })
            .catch(function (error) {
                setAlertMessage("Возможно вы ввели какие-то данные неправильно")
                if (error.response) {
                    setAlertMessage("Возможно вы ввели какие-то данные неправильно")
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
            <h3 className={'title'}>Second-task</h3>
            <p className={'line'}></p>
            <div className={'block'}>
                <p> 1. Сделать авторизацию с двумя формачками: почта и пароль </p>

                <p> 2. Когда делается запрос на вхождения в аккаунт, с бекенда возвращается авторизационный токен.
                    Необходимо его "поймать" (получить ответ от запроса на логин) и сохранить его в хранилище по типу
                    localStorage. Однако токен находится не в теле (body), а в header.
                </p>

                <link href="https://dev.mkkkr.net/user/api/v1/docs/#/UserExternalAPI/UserExternalAPI_Login "/>
            </div>
                { nextPage &&  (
                <form onSubmit={handleSubmit}>
                    <label> Email:
                        <input value={email} name="email" type="email"
                               onChange={(event) => setEmail(event.target.value)} required
                        />
                    </label>

                    <label> Password:
                        <input value={password} name="password" type="password" onChange={(event) => setPassword(event.target.value)} required/>
                    </label>

                    <button disabled={ !password || !email } type = "submit"> Войти в аккаунт </button>
                </form>
                )}

                <div>{alertMessage}</div>
        </div>
    )
}