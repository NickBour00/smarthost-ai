const messageInput = document.getElementById("message");
const generateBtn = document.getElementById("generate");
const resultBox = document.getElementById("result");

generateBtn.addEventListener("click", async () => {
  const input = messageInput.value.trim();

  if (!input) {
    resultBox.textContent = "Please enter a guest message.";
    return;
  }

  resultBox.textContent = "Loading...";

  try {
    const res = await fetch("https://smarthost-ai.vercel.app/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: input,
        tone: "friendly"
      })
    });

    const rawText = await res.text();

    if (!res.ok) {
      resultBox.textContent = `Error ${res.status}: ${rawText}`;
      return;
    }

    const data = JSON.parse(rawText);
    resultBox.textContent = data.result || "No result returned.";
  } catch (error) {
    resultBox.textContent = "ERROR: " + error.message;
    console.error("Popup fetch error:", error);
  }
});