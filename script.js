function calculateSleepScore() {
    let sleepScore = 100.0;

    const goal = parseInt(document.getElementById("goal").value) * 60 || 0;
    const rem = document.getElementById("rem").value || "0 0";
    const deep = document.getElementById("deep").value || "0 0";
    const core = document.getElementById("core").value || "0 0";
    const awake = document.getElementById("awake").value || "0 0";

    const [remHours, remMinutes] = rem.split(" ").map(Number);
    const [deepHours, deepMinutes] = deep.split(" ").map(Number);
    const [coreHours, coreMinutes] = core.split(" ").map(Number);
    const [awakeHours, awakeMinutes] = awake.split(" ").map(Number);

    const remTotal = remHours * 60 + remMinutes;
    const deepTotal = deepHours * 60 + deepMinutes;
    const coreTotal = coreHours * 60 + coreMinutes;
    const awakeTotal = awakeHours * 60 + awakeMinutes;

    const totalSleep = remTotal + deepTotal + coreTotal;
    const totalMinutesAsleep = totalSleep - awakeTotal;
    const percentageFromGoal = (totalMinutesAsleep / goal) * 100;

    if (percentageFromGoal < 100) {
        sleepScore -= (100 - percentageFromGoal);
    }

    const remPct = (remTotal / totalMinutesAsleep) * 100;
    const deepPct = (deepTotal / totalMinutesAsleep) * 100;
    const corePct = (coreTotal / totalMinutesAsleep) * 100;
    const awakePct = (awakeTotal / totalSleep) * 100;

    const remInRange = remPct >= 20 && remPct <= 25;
    const deepInRange = deepPct >= 20 && deepPct <= 25;
    const coreInRange = corePct >= 40 && corePct <= 50;
    const awakeInRange = awakePct <= 15;

    if (!remInRange) sleepScore -= 2;
    if (!deepInRange) sleepScore -= 2;
    if (!coreInRange) sleepScore -= 2;
    if (!awakeInRange) sleepScore -= 2;

    // Populate result table
    const table = document.getElementById("scoreTable");
    const tbody = table.querySelector("tbody");
    tbody.innerHTML = "";

    const results = [
        { category: "Sleep Score", status: sleepScore.toFixed(2) },
        { category: "Awake Time (≤15%)", status: `${awakeInRange ? "✓ In Range" : "✗ Out of Range"} (${awakePct.toFixed(2)}%)` },
        { category: "REM Sleep (20–25%)", status: `${remInRange ? "✓ In Range" : "✗ Out of Range"} (${remPct.toFixed(2)}%)` },
        { category: "Core Sleep (40–50%)", status: `${coreInRange ? "✓ In Range" : "✗ Out of Range"} (${corePct.toFixed(2)}%)` },
        { category: "Deep Sleep (20–25%)", status: `${deepInRange ? "✓ In Range" : "✗ Out of Range"} (${deepPct.toFixed(2)}%)` }
    ];

    results.forEach(row => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = row.category;
        const td2 = document.createElement("td");
        td2.textContent = row.status;

        // Add CSS class based on row type
        if (row.category === "Sleep Score") {
            // Interpolate color from red (0) to green (100)
            const score = parseFloat(row.status);
            const red = score < 50 ? 255 : Math.round(255 - (score - 50) * 5.1);   // 255 → 0
            const green = score > 50 ? 255 : Math.round(score * 5.1);             // 0 → 255
            const bgColor = `rgb(${red}, ${green}, 0)`;

            tr.style.backgroundColor = bgColor;
            tr.style.color = "#000"; // black text for readability

        } else if (row.status.includes("✓")) {
            tr.classList.add("row-pass");
        } else {
            tr.classList.add("row-fail");
        }

        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
    });


    table.style.display = "table";
}
