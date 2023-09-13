const form = document.querySelector(".form")
const username = document.querySelector("input[name=userName]")
const email = document.querySelector("input[name=email]")
const password = document.querySelector("input[name=password]")
form.addEventListener("submit", async event => {
    event.preventDefault()
    fetch("http://127.0.0.1:3000/signup", {
        method: "POST",
        mode: "cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Name: username.value || "",
            email: email.value || "",
            password: password.value || ""
        })
    }).then(res => res.json()).then(res => {
        window.localStorage.setItem("token", res.data.token)
        window.location = "/view/index.html"
    }).catch((err) => {
        console.log(err)
    })
})