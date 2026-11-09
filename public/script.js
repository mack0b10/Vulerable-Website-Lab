
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        message.textContent = data.message;
        message.style.color = response.ok ? "#4ade80" : "#f87171";

    } catch (error) {
        message.textContent = "Unable to connect to the server.";
        message.style.color = "#f87171";
        console.error(error);
    }
});
