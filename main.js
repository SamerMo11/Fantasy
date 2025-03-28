    function togglePages1() {
        let page1 = document.querySelector(".page1");
        let page2 = document.querySelector(".page2");

        page1.classList.add("remove");
        page2.classList.add("active");
    }




    document.querySelectorAll(".squad").forEach(squad => {
                squad.addEventListener("click", function () {
                    document.querySelector(".page2").classList.add("remove");
                    document.querySelector(".page2").classList.remove("active");
                    document.querySelector(".page3").classList.remove("remove");
                    document.querySelector(".page3").classList.add("active");

                    // نسخ التشكيلة المختارة وعرضها في page3
                    document.getElementById("selectedSquad").innerHTML = this.outerHTML;
                });
            });

            // 📌 عند الضغط على زر "back"، يتم إخفاء page3 وإظهار page2
            document.querySelector(".back").addEventListener("click", function () {
                document.querySelector(".page3").classList.add("remove");
                document.querySelector(".page3").classList.remove("active");
                document.querySelector(".page2").classList.remove("remove");
                document.querySelector(".page2").classList.add("active");
            });







            const teams = {
                team1: "The Boys",
                team2: "The Legends",
                team3: "Champions"
            };

    function chars() {
        return [
        {
            key: 'fw',
            name: 'samer',
            price: '10',
            team : "team1"
        },
        {
            key: 'fw',
            name: 'eldahesh',
            price: '10',
            team: "team2"
        },
        {
            key: 'fw',
            name: 'mazen h',
            price: '9',
            team: "team3"
        },
        {
            key: 'fw',
            name: 'elwelely',
            price: '7.5',
            team: "team2"
        },
        {
            key: 'fw',
            name: 'makram',
            price: '6.5',
            team: "team3"
        },
        {
            key: 'fw',
            name: 'medo',
            price: '6.5',
            team: "team3"
        },
    // ------------------------------------------------------
        {
            key: 'md',
            name: 'marwan',
            price: '9',
            team: "team3"
        },
        {
            key: 'md',
            name: 'galal',
            price: '9',
            team: "team3"
        },
        {
            key: 'md',
            name: 'mohab',
            price: '9',
            team: "team3"
        },
        {
            key: 'md',
            name: 'elanany',
            price: '7.5',
            team: "team2"
        },
        {
            key: 'md',
            name: 'abdallah',
            price: '7',
            team : "team1"
        },
        {
            key: 'md',
            name: 'elabyd',
            price: '7',
            team: "team3"
        },
        
        {
            key: 'md',
            name: 'basiouny',
            price: '6.5',
            team : "team1"
        },
        {
            key: 'md',
            name: 'elmashad',
            price: '6.5',
            team: "team2"
        },
    // ---------------------------------------
        {
            key: 'df',
            name: 'ziad',
            price: '6',
            team : "team1"
        },
        {
            key: 'df',
            name: 'tamer',
            price: '6',
            team: "team2"
        },
        {
            key: 'df',
            name: 'ibrahim',
            price: '5.5',
            team: "team3"
        },
        {
            key: 'df',
            name: 'magdy',
            price: '5.5',
            team: "team3"
        },
        {
            key: 'df',
            name: 'islam',
            price: '5',
            team: "team3"
        },
        {
            key: 'df',
            name: 'mazen',
            price: '5',
            team : "team1"
        },
        ]
    }
    const page2 = document.querySelector(".page2");
const page3 = document.querySelector(".page3");
const closeBtn = document.querySelector(".back");
const selectedSquadDiv = document.getElementById("selectedSquad");
const players = document.querySelector(".players");
const players2 = document.querySelector(".players2");
const budgetElement = document.querySelector(".budget span");

let lastClickedButton = null; 
let budget = 50;
let selectedPlayers = new Set();

players.classList.add("remove");

// تحديث الميزانية
function updateBudget(amount) {
    budget += amount;
    budgetElement.textContent = budget;
}

// عرض اللاعبين مع التصفية
function displayPlayers(event) {
    const key = event.target.getAttribute("data-key");
    const isFilled = event.target.classList.contains("filled");
    lastClickedButton = event.target;

    if (isFilled) {
        removePlayer(lastClickedButton);
        return;
    }

    players2.innerHTML = "";

    chars()
        .filter(player => player.key === key && !selectedPlayers.has(player.name))
        .forEach(player => {
            const playerDiv = document.createElement("div");
            playerDiv.classList.add("player");
            playerDiv.innerHTML = `
                <img src="Kits/${player.team}.webp" alt="KitImg">
                <p class="name">${player.name}</p>
                <p class="pos">${player.key}</p>
                <p class="price">${player.price} mil</p>
            `;

            playerDiv.addEventListener("click", () => selectPlayer(player));
            players2.appendChild(playerDiv);
        });

    players.classList.add("active");
    players.classList.remove("remove");
}

// اختيار لاعب وتحديث الزر المضغوط عليه
function selectPlayer(player) {
    if (!lastClickedButton) return;

    const playerPrice = parseFloat(player.price);

    if (budget - playerPrice < 0) {
        alert("لا يمكنك اختيار هذا اللاعب، الميزانية غير كافية!");
        return;
    }

    lastClickedButton.innerHTML = `
        <img src="Kits/${player.team}.webp" alt="KitImg">
        <p>${player.name}</p>
        <i class="fas fa-exchange-alt change-player-icon"></i>
    `;
    lastClickedButton.classList.add("filled");
    lastClickedButton.setAttribute("data-price", playerPrice);
    lastClickedButton.setAttribute("data-player", player.name);

    selectedPlayers.add(player.name);
    updateBudget(-playerPrice);
    players.classList.add("remove");
    players.classList.remove("active");

    // إضافة حدث النقر على الأيقونة
    const icon = lastClickedButton.querySelector('.change-player-icon');
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        removePlayer(lastClickedButton);
        displayPlayers({target: lastClickedButton});
    });
}

// إزالة لاعب وإرجاع الميزانية وإتاحته من جديد
function removePlayer(button) {
    if (!button.classList.contains("filled")) return;

    const playerPrice = parseFloat(button.getAttribute("data-price"));
    const playerName = button.getAttribute("data-player");

    updateBudget(playerPrice);
    
    button.innerHTML = "اختيار لاعب";
    button.classList.remove("filled");
    button.removeAttribute("data-price");
    button.removeAttribute("data-player");

    selectedPlayers.delete(playerName);
}

// اختيار التشكيلة والانتقال بين الصفحات
document.querySelectorAll(".squad").forEach(squad => {
    squad.addEventListener("click", function () {
        page2.classList.add("remove");
        page2.classList.remove("active");
        page3.classList.remove("remove");
        page3.classList.add("active");

        const newSquadDiv = document.createElement("div");
        newSquadDiv.classList.add("selected-squad");
        newSquadDiv.innerHTML = `
            <p>formation : <span>${this.querySelector("span").textContent}</span></p>
            <div class="info">${this.querySelector(".info").innerHTML}</div>
        `;

        selectedSquadDiv.innerHTML = "";
        selectedSquadDiv.appendChild(newSquadDiv);

        newSquadDiv.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", displayPlayers);
        });
    });
});

// الرجوع للصفحة السابقة
closeBtn.addEventListener("click", () => {
    page3.classList.add("remove");
    page3.classList.remove("active");
    page2.classList.remove("remove");
    page2.classList.add("active");

    players.classList.add("remove");
    players.classList.remove("active");
});














// ... الكود السابق يبقى كما هو ...

// دالة لتهيئة جميع الزرارت بما فيها الزرارين الجديدين
function initializeAllButtons() {
    // الزرارت الأصلية
    document.querySelectorAll(".squad").forEach(squad => {
        squad.addEventListener("click", function() {
            // ... الكود الأصلي ...
        });
    });

    // الزرارات داخل التشكيلة المختارة
    document.querySelectorAll(".info button").forEach(button => {
        button.addEventListener("click", displayPlayers);
    });

    // الزرارات الجديدة (+)
    // document.querySelectorAll(".sub button").forEach(button => {
    //     // نضيف سمة data-key إذا لم تكن موجودة (يمكن تخصيصها حسب الحاجة)
    //     if (!button.hasAttribute("data-key")) {
    //         button.setAttribute("data-key", "SUB"); // أو أي قيمة تريدها
    //     }
    //     button.addEventListener("click", displayPlayers);
    // });
}

// نستدعي الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    initializeAllButtons();
});

// ... باقي الكود يبقى كما هو ...



