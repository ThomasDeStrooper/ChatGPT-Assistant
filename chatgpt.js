// Check if user already stored their API key
let apiKey = localStorage.getItem("chatgpt_api_key");

if (!apiKey) {
    apiKey = prompt("Enter your OpenAI API Key:");
    if (apiKey) {
        localStorage.setItem("chatgpt_api_key", apiKey);
    } else {
        alert("API Key is required to use ChatGPT.");
    }
}

async function chatWithGPT(prompt) {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        })
    });
    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response from ChatGPT.";
}

(async () => {
    const reply = await chatWithGPT("Hello from Seanime!");
    console.log(reply);
    alert(reply);
})();
