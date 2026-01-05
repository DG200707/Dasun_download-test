async function downloadLogic() {
    const url = document.getElementById('videoUrl').value;
    const loader = document.getElementById('loader');
    const result = document.getElementById('result');

    if (url === "") {
        alert("කරුණාකර Link එක ඇතුළත් කරන්න!");
        return;
    }

    // Loader එක පෙන්වීම සහ පැරණි ප්‍රතිඵල ඉවත් කිරීම
    loader.style.display = "block";
    result.innerHTML = "";

    try {
        // API එක වෙත Request එක යැවීම
        const response = await fetch("https://cobalt-api.v0l.me/", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url: url,
                videoQuality: "720" // අවශ්‍ය Quality එක මෙහි සඳහන් කළ හැක
            })
        });

        const data = await response.json();

        loader.style.display = "none";

        if (data.status === "stream" || data.status === "picker" || data.status === "redirect") {
            // සාර්ථක වූ විට ප්‍රතිඵලය පෙන්වීම
            const downloadUrl = data.url;
            result.innerHTML = `
                <div style="margin-top:20px; padding:15px; background:rgba(0,255,0,0.2); border-radius:10px;">
                    <p style="color:#fff;">වීඩියෝව සාර්ථකව සකස් කරන ලදී!</p>
                    <a href="${downloadUrl}" target="_blank" style="color:#00d2ff; text-decoration:none; font-weight:bold; border: 1px solid #00d2ff; padding: 5px 10px; border-radius: 5px;">Download Now</a>
                </div>
            `;
        } else {
            // API එකෙන් වැරැද්දක් ආවොත්
            result.innerHTML = `<p style="color:red;">සමාවන්න, මෙම වීඩියෝව ලබාගත නොහැක. (Error: ${data.text || 'Unknown'})</p>`;
        }

    } catch (error) {
        // Network Error එකක් ආවොත්
        loader.style.display = "none";
        result.innerHTML = `<p style="color:red;">සම්බන්ධතාවයේ දෝෂයක් පවතී. කරුණාකර නැවත උත්සාහ කරන්න.</p>`;
        console.error("Error:", error);
    }
}
