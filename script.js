function calculateSleepScore() {
    let sleepScore = 100.0

    const goal = parseInt(document.getElementById("goal").value) * 60 || "0"
    const rem = document.getElementById("rem").value || "0, 0";
    const deep = document.getElementById("deep").value || "0, 0";
    const core = document.getElementById("core").value || "0, 0";
    const awake = document.getElementById("awake").value || "0, 0";
    

    // Convert sleep times from "hours, minutes" format to total minutes
    const [remHours, remMinutes] = rem.split(" ").map(Number);
    const [deepHours, deepMinutes] = deep.split(" ").map(Number);
    const [coreHours, coreMinutes] = core.split(" ").map(Number);
    const [awakeHours, awakeMinutes] = awake.split(" ").map(Number);

    const totalSleep = (remHours + deepHours + coreHours) * 60 + remMinutes + deepMinutes + coreMinutes;
    const totalAwake = awakeHours * 60 + awakeMinutes;
    const totalMinutesAsleep = totalSleep - totalAwake
    const percentageFromGoal = totalMinutesAsleep / goal * 100

    if (percentageFromGoal < 100) {
        sleepScore -= (100 - percentageFromGoal)
    }

    const remPercentage = (remHours * 60 + remMinutes) / totalMinutesAsleep * 100
    const deepPercentage = (deepHours * 60 + deepMinutes) / totalMinutesAsleep * 100
    const corePercentage = (coreHours * 60 + coreMinutes) / totalMinutesAsleep * 100
    const awakePercentage = (awakeHours * 60 + awakeMinutes) / totalMinutesAsleep * 100

    if (!remPercentage >= 20 && !remPercentage <= 25) {
        sleepScore -= 2
    }
    if (!deepPercentage >= 20 && !deepPercentage <= 25) {
        sleepScore -= 2
    }
    if (!corePercentage >= 20 && !corePercentage <= 25) {
        sleepScore -= 2
    }
    if (awakePercentage > 15) {
        sleepScore -= 2
    }

    // Display the result
    alert("Your Sleep Score is: " + sleepScore.toFixed(2));
}
