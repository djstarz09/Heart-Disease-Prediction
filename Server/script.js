document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("prediction-form");
    const result = document.getElementById("result");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        let featuresArray = [
            Number(document.getElementById("age").value),
            Number(document.getElementById("sex").value),
            Number(document.getElementById("cp").value),
            Number(document.getElementById("trestbps").value),
            Number(document.getElementById("chol").value),
            Number(document.getElementById("fbs").value),
            Number(document.getElementById("restecg").value),
            Number(document.getElementById("thalach").value),
            Number(document.getElementById("exang").value),
            Number(document.getElementById("oldpeak").value),
            Number(document.getElementById("slope").value),
            Number(document.getElementById("ca").value),
            Number(document.getElementById("thal").value)
        ];

        result.innerHTML = "🔄 Processing..."; // Show loading state

        try {
            const response = await fetch("/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ features: featuresArray }),
            });

            const data = await response.json();
            result.innerHTML = `🩺 Prediction: <strong>${data.prediction === 1 ? "Heart Disease Detected ❗" : "No Heart Disease ✅"}</strong>`;
        } catch (error) {
            result.innerHTML = "⚠️ Error: Unable to get a prediction.";
        }
    });
});
