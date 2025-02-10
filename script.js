function startSpin() {
    let names = document.getElementById('names').value.split(',')
        .map(n => n.trim()).filter(n => n !== "");
    let numGroups = parseInt(document.getElementById('numGroups').value);

    if (names.length < numGroups) {
        alert("Jumlah nama harus lebih banyak dari jumlah kelompok!");
        return;
    }

    let shuffled = names.sort(() => Math.random() - 0.5);
    let groups = Array.from({ length: numGroups }, () => []);

    shuffled.forEach((name, index) => {
        groups[index % numGroups].push(name);
    });

    displayGroups(groups);
    spinWheel(names);
}

function displayGroups(groups) {
    let resultDiv = document.getElementById('groupResult');
    resultDiv.innerHTML = "";

    groups.forEach((group, i) => {
        let groupDiv = document.createElement("div");
        groupDiv.innerHTML = `<strong>🔥 Kelompok ${i + 1}:</strong> ${group.join(", ")}`;
        groupDiv.style.background = "rgba(0, 255, 255, 0.1)";
        groupDiv.style.padding = "10px";
        groupDiv.style.marginTop = "10px";
        groupDiv.style.borderRadius = "5px";
        resultDiv.appendChild(groupDiv);
    });
}

function spinWheel(names) {
    let canvas = document.getElementById("wheelCanvas");
    let ctx = canvas.getContext("2d");
    let colors = ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff80", "#00ffff", "#0080ff", "#8000ff"];

    canvas.width = 350;
    canvas.height = 350;

    let total = names.length;
    let startAngle = 0;

    names.forEach((name, i) => {
        let sliceAngle = (2 * Math.PI) / total;
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(175, 175);
        ctx.arc(175, 175, 175, startAngle, startAngle + sliceAngle);
        ctx.lineTo(175, 175);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.translate(175, 175);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.fillText(name, 80, 5);
        ctx.rotate(-(startAngle + sliceAngle / 2));
        ctx.translate(-175, -175);

        startAngle += sliceAngle;
    });

    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(175, 175, 30, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.font = "bold 18px Arial";
    ctx.fillText("SPIN", 155, 182);
          }
