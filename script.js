async function downloadLogic() {
    const url = document.getElementById('videoUrl').value;
    const loader = document.getElementById('loader');
    const result = document.getElementById('result');

    if (url === "") {
        alert("කරුණාකර Link එක ඇතුළත් කරන්න!");
        return;
    }

    loader.style.display = "block";
    result.innerHTML = "";

    try {
        // අලුත් API එකක් - මෙය බොහෝ විට stable වේ
        const response = await fetch(`https://api.vyt.sh/extract?url=${encodeURIComponent(url)}`);
        
        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        console.log("API Response:", data); // මෙතනින් අපිට error එක මොකක්ද කියලා හරියටම බලන්න පුළුවන්

        loader.style.display = "none";

        // API එකෙන් දත්ත ලැබෙන ආකාරය අනුව මෙය සකසා ඇත
        if (data && data.url) {
            result.innerHTML = `
                <div style="margin-top:20px; padding:15px; background:rgba(0,255,0,0.1); border: 1px solid #00ff00; border-radius:10px;">
                    <p style="color:#fff;">වීඩියෝව හමු විය!</p>
                    <a href="${data.url}" target="_blank" download style="color:#fff; background:#00d2ff; text-decoration:none; font-weight:bold; padding: 10px 20px; border-radius: 5px; display:inline-block; margin-top:10px;">Download Now</a>
                </div>
            `;
        } else {
            result.innerHTML = `<p style="color:#ffcc00;">සමාවන්න, මෙම ලින්ක් එකෙන් වීඩියෝව ලබාගත නොහැක. වෙනත් ලින්ක් එකක් උත්සාහ කරන්න.</p>`;
        }

    } catch (error) {
        loader.style.display = "none";
        result.innerHTML = `<p style="color:#ff4d4d;">Error: API එක සම්බන්ධ කරගත නොහැකි විය. ඔබ Vercel හොස්ට් කර බලන්න.</p>`;
        console.error("Full Error:", error);
    }
}
