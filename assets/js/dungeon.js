const dungeonActivity = document.querySelector("#dungeonActivity");
const dungeonAction = document.querySelector("#dungeonAction");
const dungeonTime = document.querySelector("#dungeonTime");
const floorCount = document.querySelector("#floorCount");
const roomCount = document.querySelector("#roomCount");

let dungeon = {
    rating: 500,
    grade: "E",
    progress: {
        floor: 1,
        room: 1,
        floorLimit: 1000,
        roomLimit: 10,
    },
    settings: {
        enemyBaseLvl: 1,
        enemyLvlGap: 2,
        enemyBaseStats: 1,
        enemyScaling: 1.1,
    },
    status: {
        exploring: false,
        paused: true,
        event: false,
    },
    statistics: {
        kills: 0,
        runtime: 0,
    },
    backlog: [],
    action: 0,
};

// ===== Dungeon Setup =====
// Enables start and pause on button click
dungeonActivity.addEventListener('click', function () {
    dungeonStartPause();
});

// Sets up the initial dungeon
const initialDungeonLoad = () => {
    if (localStorage.getItem("dungeonData") !== null) {
        dungeon = JSON.parse(localStorage.getItem("dungeonData"));
        dungeon.status = {
            exploring: false,
            paused: true,
            event: false,
        };
        updateDungeonLog();
    }
    loadDungeonProgress();
    dungeonTime.innerHTML = new Date(dungeon.statistics.runtime * 1000).toISOString().slice(11, 19);
    dungeonAction.innerHTML = "Resting...";
    dungeonActivity.innerHTML = "Explore";
    dungeonTime.innerHTML = "00:00:00";
    dungeonTimer = setInterval(dungeonEvent, 1000);
    playTimer = setInterval(dungeonCounter, 1000);
}

let hpGainInterval; // Variable to hold the interval ID

const dungeonStartPause = () => {
  if (!dungeon.status.paused) {
    sfxPause.play();

    dungeonAction.innerHTML = "Resting...";
    dungeonActivity.innerHTML = "Explore";
    dungeon.status.exploring = false;
    dungeon.status.paused = true;

    // Start the interval to add 1 HP per second
hpGainInterval = setInterval(() => {
  const hpIncrease = player.stats.hpMax * 0.05;
  player.stats.hp = Math.min(player.stats.hp + hpIncrease, player.stats.hpMax);
  playerLoadStats();
}, 2000);
  } else {
    sfxUnpause.play();

    dungeonAction.innerHTML = "Exploring...";
    dungeonActivity.innerHTML = "Pause";
    dungeon.status.exploring = true;
    dungeon.status.paused = false;

    // Clear the interval when unpausing
    clearInterval(hpGainInterval);
  }
}
// Function to update player's HP display
const updatePlayerHP = () => {
  playerHpElement.textContent = `${player.stats.hp}/${player.stats.hpMax}`;
}

// Counts the total time for the current run and total playtime
const dungeonCounter = () => {
    player.playtime++;
    dungeon.statistics.runtime++;
    dungeonTime.innerHTML = new Date(dungeon.statistics.runtime * 1000).toISOString().slice(11, 19);
    saveData();
}

// Loads the floor and room count
const loadDungeonProgress = () => {
    if (dungeon.progress.room > dungeon.progress.roomLimit) {
        dungeon.progress.room = 1;
        dungeon.progress.floor++;
    }
    floorCount.innerHTML = `Floor ${dungeon.progress.floor}`;
    roomCount.innerHTML = `Room ${dungeon.progress.room}`;
}

// ========== Events in the Dungeon ==========
const dungeonEvent = () => {
    if (dungeon.status.exploring && !dungeon.status.event) {
        dungeon.action++;
        let choices;
        let eventRoll;
        let eventTypes = ["blessing", "curse", "treasure", "trap", "enemy", "enemy", "nothing", "nothing", "nothing", "nothing", "monarch", "shop", "mysterious traveler"];
        if (dungeon.action > 2 && dungeon.action < 6) {
            eventTypes.push("nextroom");
        } else if (dungeon.action > 5) {
            eventTypes = ["nextroom"];
        }
        const event = eventTypes[Math.floor(Math.random() * eventTypes.length)];

        switch (event) {
            case "nextroom":
                dungeon.status.event = true;
                choices = `
                    <div class="decision-panel">
                        <button id="choice1">Enter</button>
                        <button id="choice2">Ignore</button>
                    </div>`;
                if (dungeon.progress.room == dungeon.progress.roomLimit) {
                    addDungeonLog(`<span class="Heirloom">You found the door to the boss room.</span>`, choices);
                } else {
                    addDungeonLog("You found a door.", choices);
                }
                document.querySelector("#choice1").onclick = function () {
                    sfxConfirm.play();
                    if (dungeon.progress.room == dungeon.progress.roomLimit) {
                        guardianBattle();
                    } else {
                        eventRoll = randomizeNum(1, 3);
                        if (eventRoll == 1) {
                            incrementRoom();
                            mimicBattle("door");
                            addDungeonLog("You moved to the next floor.");
                        } else if (eventRoll == 2) {
                            incrementRoom();
                            choices = `
                                <div class="decision-panel">
                                    <button id="choice1">Open the chest</button>
                                    <button id="choice2">Ignore</button>
                                </div>`;
                            addDungeonLog(`You moved to the next room and found a treasure chamber. There is a <i class="fa fa-toolbox"></i>Chest inside.`, choices);
                            document.querySelector("#choice1").onclick = function () {
                                chestEvent();
                            }
                            document.querySelector("#choice2").onclick = function () {
                                dungeon.action = 0;
                                ignoreEvent();
                            };
                        } else {
                            dungeon.status.event = false;
                            incrementRoom();
                            addDungeonLog("You moved to the next room.");
                        }
                    }
                };
                document.querySelector("#choice2").onclick = function () {
                    dungeon.action = 0;
                    ignoreEvent();
                };
                break;
case "trap":
  dungeon.status.event = true;
  choices = `
    <div class="decision-panel">
      <button id="choice1">Try open the chest</button>
      <button id="choice2">Ignore</button>
    </div>`;
  addDungeonLog("You found the boss room with nothing inside and saw a <i class='fa fa-toolbox'></i> Chest.", choices);

  document.querySelector("#choice1").onclick = function() {
    trapEvent();
    dungeon.status.event = false;
  };

  document.querySelector("#choice2").onclick = function() {
    ignoreEvent();
  };
  break;
            case "treasure":
                dungeon.status.event = true;
                choices = `
                    <div class="decision-panel">
                        <button id="choice1">Open the chest</button>
                        <button id="choice2">Ignore</button>
                    </div>`;
                addDungeonLog(`You found a treasure chamber. There is a <i class="fa fa-toolbox"></i>Chest inside.`, choices);
                document.querySelector("#choice1").onclick = function () {
                    chestEvent();
                }
                document.querySelector("#choice2").onclick = function () {
                    ignoreEvent();
                };
                break;
case "shop":
    dungeon.status.event = true;
    choices = `
        <div class="decision-panel">
            <button id="choice1">Buy Item</button>
            <button id="choice2">Ignore</button>
        </div>`;
    addDungeonLog(`You found a merchant <i class="ra ra-dervish-swords"></i>do you want to buy item for <i class="fas fa-coins" style="color: #FFD700;"></i><span class="Common">5000</span> to get item? item is randomized`, choices);
    document.querySelector("#choice1").onclick = function () {
        let cost = 5000;
        if (player.gold < cost) {
            sfxDeny.play();
            addDungeonLog("You don't have enough gold.");
        } else {
            player.gold -= cost;
            sfxConfirm.play();
            shopEvent();
        }
dungeon.status.event = false;
    }
    document.querySelector("#choice2").onclick = function () {
        ignoreEvent();
    }
                break
            case "nothing":
                nothingEvent();
                break;
            case "enemy":
                dungeon.status.event = true;
                choices = `
                    <div class="decision-panel">
                        <button id="choice1">Engage</button>
                        <button id="choice2">Flee</button>
                    </div>`;
                generateRandomEnemy();
                addDungeonLog(`You encountered ${enemy.name}.`, choices);
                player.inCombat = true;
                document.querySelector("#choice1").onclick = function () {
                    engageBattle();
                }
                document.querySelector("#choice2").onclick = function () {
                    fleeBattle();
                }
                break;
case "mysterious traveler":
  dungeon.status.event = true;
  choices = `
    <div class="decision-panel">
      <button id="choice1">MD</button>
      <button id="choice2">Avidek</button>
      <button id="choice3">Void</button>
    </div>`;
  addDungeonLog("You encountered a Mysterious Traveler who asks you a question: 'Who is the real Hitler?'", choices);

  document.querySelector("#choice1").onclick = function() {
    choose("MD");
    dungeon.status.event = false;
  };

  document.querySelector("#choice2").onclick = function() {
    choose("Avidek");
    dungeon.status.event = false;
  };

  document.querySelector("#choice3").onclick = function() {
    choose("Void");
    dungeon.status.event = false;
  };
  break;
case "blessing":
                eventRoll = randomizeNum(1, 2);
                if (eventRoll == 1) {
                    dungeon.status.event = true;
                    blessingValidation();
                    let cost = player.blessing * (500 * (player.blessing * 0.5)) + 750;
                    choices = `
                        <div class="decision-panel">
                            <button id="choice1">Offer</button>
                            <button id="choice2">Ignore</button>
                        </div>`;
                    addDungeonLog(`<span class="Legendary">You found a Statue of Blessing. Do you want to offer <i class="fas fa-coins" style="color: #FFD700;"></i><span class="Common">${nFormatter(cost)}</span> to gain blessings? (Blessing Lv.${player.blessing})</span>`, choices);
                    document.querySelector("#choice1").onclick = function () {
                        if (player.gold < cost) {
                            sfxDeny.play();
                            addDungeonLog("You don't have enough gold.");
                        } else {
                            player.gold -= cost;
                            sfxConfirm.play();
                            statBlessing();
                        }
                        dungeon.status.event = false;
                    }
                    document.querySelector("#choice2").onclick = function () {
                        ignoreEvent();
                    };
                } else {
                    nothingEvent();
                }
                break;
            case "curse":
                eventRoll = randomizeNum(1, 3);
                if (eventRoll == 1) {
                    dungeon.status.event = true;
                    let curseLvl = Math.round((dungeon.settings.enemyScaling - 1) * 10);
                    let cost = curseLvl * (3000 * (curseLvl * 0.5)) + 5000;
                    choices = `
                            <div class="decision-panel">
                                <button id="choice1">Offer</button>
                                <button id="choice2">Ignore</button>
                            </div>`;
                    addDungeonLog(`<span class="Heirloom">You found a Cursed Totem. Do you want to offer <i class="fas fa-coins" style="color: #FFD700;"></i><span class="Common">${nFormatter(cost)}</span>? This will strengthen the monsters but will also improve the loot quality. (Curse Lv.${curseLvl})</span>`, choices);
                    document.querySelector("#choice1").onclick = function () {
                        if (player.gold < cost) {
                            sfxDeny.play();
                            addDungeonLog("You don't have enough gold.");
                        } else {
                            player.gold -= cost;
                            sfxConfirm.play();
                            cursedTotem(curseLvl);
                        }
                        dungeon.status.event = false;
                    }
                    document.querySelector("#choice2").onclick = function () {
                        ignoreEvent();
                    };
                } else {
                    nothingEvent();
                }
                break;
            case "monarch":
                eventRoll = randomizeNum(1, 7);
                if (eventRoll == 1) {
                    dungeon.status.event = true;
                    choices = `
                            <div class="decision-panel">
                                <button id="choice1">Enter</button>
                                <button id="choice2">Ignore</button>
                            </div>`;
                    addDungeonLog(`<span class="Heirloom">You found a mysterious chamber. It seems like there is something sleeping inside.</span>`, choices);
                    document.querySelector("#choice1").onclick = function () {
                        specialBossBattle();
                    }
                    document.querySelector("#choice2").onclick = function () {
                        ignoreEvent();
                    };
                } else {
                    nothingEvent();
                }
        }
    }
}

// ========= Dungeon Choice Events ==========
// Starts the battle
const engageBattle = () => {
    showCombatInfo();
    startCombat(bgmBattleMain);
    addCombatLog(`You encountered ${enemy.name}.`);
    updateDungeonLog();
}

// Mimic encounter
const mimicBattle = (type) => {
    generateRandomEnemy(type);
    showCombatInfo();
    startCombat(bgmBattleMain);
    addCombatLog(`You encountered ${enemy.name}.`);
    addDungeonLog(`You encountered ${enemy.name}.`);
}

// Guardian boss fight
const guardianBattle = () => {
    incrementRoom();
    generateRandomEnemy("guardian");
    showCombatInfo();
    startCombat(bgmBattleGuardian);
    addCombatLog(`Floor Guardian ${enemy.name} is blocking your way.`);
    addDungeonLog("You moved to the next floor.");
}

// Guardian boss fight
const specialBossBattle = () => {
    generateRandomEnemy("sboss");
    showCombatInfo();
    startCombat(bgmBattleBoss);
    addCombatLog(`Dungeon Monarch ${enemy.name} has awoken.`);
    addDungeonLog(`Dungeon Monarch ${enemy.name} has awoken.`);
}

// Flee from the monster
const fleeBattle = () => {
    let eventRoll = randomizeNum(1, 2);
    if (eventRoll == 1) {
        sfxConfirm.play();
        addDungeonLog(`You managed to flee.`);
        player.inCombat = false;
        dungeon.status.event = false;
    } else {
        addDungeonLog(`You failed to escape!`);
        showCombatInfo();
        startCombat(bgmBattleMain);
        addCombatLog(`You encountered ${enemy.name}.`);
        addCombatLog(`You failed to escape!`);
    }
}

// Chest event randomizer
const chestEvent = () => {
    sfxConfirm.play();
    let eventRoll = randomizeNum(1, 4);
    if (eventRoll == 1) {
        mimicBattle("chest");
    } else if (eventRoll == 2) {
        if (dungeon.progress.floor == 1) {
            goldDrop();
        } else {
            createEquipmentPrint("dungeon");
        }
        dungeon.status.event = false;
    } else if (eventRoll == 3) {
        goldDrop();
        dungeon.status.event = false;
    } else {
        addDungeonLog("The chest is empty.");
        dungeon.status.event = false;
    }
}

// Calculates Gold Drop
const goldDrop = () => {
    sfxSell.play();
    let goldValue = randomizeNum(70, 1000) * dungeon.progress.floor;
    addDungeonLog(`You found <i class="fas fa-coins" style="color: #FFD700;"></i>${nFormatter(goldValue)}.`);
    player.gold += goldValue;
    playerLoadStats();
}

const shopEvent = () => {
    sfxConfirm.play();
    let eventRoll = 1;
     if (eventRoll == 1) {
createEquipmentPrint("shop");
dungeon.status.event = false;
    playerLoadStats();

    }
}
const trapEvent = () => {
  sfxConfirm.play();
  let eventRoll = Math.floor(Math.random() * 3) + 1;

   if (eventRoll === 1) {
    var healthLossPercentage = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    var healthLoss = Math.floor(player.stats.hp * (healthLossPercentage / 100));
    player.stats.hp -= healthLoss;
    addDungeonLog("As you grab the gold, a hidden trap is triggered the boss wakes up and slash you, causing you to lose " + healthLoss + " health. Your health is now " + player.stats.hp + "/" + player.stats.hpMax + " but you succesfully run away from the monarch/boss room.");
    playerLoadStats();
  } else if (eventRoll === 2) {
    var goldAmount = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    player.gold += goldAmount;
    addDungeonLog("You find " + goldAmount + " gold inside the chest. Your total gold is now " + player.gold + ".");
    playerLoadStats();
  } else if (eventRoll === 3) {
    var healthLossPercentage = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
    var healthLoss = Math.floor(player.stats.hp * (healthLossPercentage / 100));
    player.stats.hp -= healthLoss;
    addDungeonLog("As you grab the gold, a hidden trap is triggered, causing you to lose " + healthLoss + " health. Your health is now " + player.stats.hp + "/" + player.stats.hpMax + ".");
    playerLoadStats();
  }
}

const choose = (selectedChoice) => {
  sfxConfirm.play();
  let eventRoll = Math.floor(Math.random() * 3) + 1;
  let correctAnswer = '';

  if (selectedChoice === 1) {
    correctAnswer = 'MD';
  } else if (selectedChoice === 2) {
    correctAnswer = 'Avidek';
  } else if (selectedChoice === 3) {
    correctAnswer = 'Void';
  }

  if (eventRoll === 1) {
    var healthReduction = Math.floor(player.stats.hp * 0.4);
    player.stats.hp -= healthReduction;
    addDungeonLog("Your answer is wrong. The Mysterious Traveler smash you with this hammer, deducting " + healthReduction + " health. The Traveler disappears.");
    playerLoadStats();
  } else if (eventRoll === 2) {
    var goldAmount = Math.floor(Math.random() * (1500 - 100 + 1)) + 100;
    player.gold += goldAmount;
    addDungeonLog("Your answer is correct! I'm giving you " + goldAmount + " gold. And leaves" + correctAnswer + ".");
    playerLoadStats();
  } else if (eventRoll === 3) {
    var healthLossPercentage = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    var healthLoss = Math.floor(player.stats.hp * (healthLossPercentage / 100));
    player.stats.hp -= healthLoss;
    addDungeonLog("Not even close, you fucking idiot! The Traveler slaps you, causing " + healthLoss + " health damage. and he cums on you and leave");
    playerLoadStats();
  }
}
// Non choices dungeon event messages
const nothingEvent = () => {
    let eventRoll = randomizeNum(1, 10);
    if (eventRoll == 1) {
        addDungeonLog("You explored and found nothing.");
    } else if (eventRoll == 2) {
        addDungeonLog("You found an empty chest.");
    } else if (eventRoll == 3) {
        addDungeonLog("You realized you are Gay you feel sad and walk away.");
    } else if (eventRoll == 4) {
        addDungeonLog("You found a monster corpse.");
    } else if (eventRoll == 5) {
        addDungeonLog("You found a corpse.");
    } else if (eventRoll == 6) {
        addDungeonLog("You found a wild guy acting like a girl with blue hair and accused you of rape, you run away.");
    } else if (eventRoll == 7) {
        addDungeonLog("You found your mother dancing on tiktok.");
    } else if (eventRoll == 8) {
        addDungeonLog("There is nothing in this area.");
    } else if (eventRoll == 9) {
        addDungeonLog("Someone cums on you and leave");
    } else if (eventRoll == 10) {
        addDungeonLog("You found an abandoned house full of hentais!");
    }
}

// Random stat buff
const statBlessing = () => {
    sfxBuff.play();
    let stats = ["hp", "atk", "def", "atkSpd", "vamp", "critRate", "critDmg"];
    let buff = stats[Math.floor(Math.random() * stats.length)];
    let value;
    switch (buff) {
        case "hp":
            value = 40;
            player.bonusStats.hp += value;
            break;
        case "atk":
            value = 20;
            player.bonusStats.atk += value;
            break;
        case "def":
            value = 10;
            player.bonusStats.def += value;
            break;
        case "atkSpd":
            value = 3;
            player.bonusStats.atkSpd += value;
            break;
        case "vamp":
            value = 4;
            player.bonusStats.vamp += value;
            break;
        case "critRate":
            value = 2;
            player.bonusStats.critRate += value;
            break;
        case "critDmg":
            value = 6;
            player.bonusStats.critDmg += value;
            break;
    }
    addDungeonLog(`You gained ${value}% bonus ${buff.replace(/([A-Z])/g, ".$1").replace(/crit/g, "c").toUpperCase()} from the blessing. (Blessing Lv.${player.blessing} > Blessing Lv.${player.blessing + 1})`);
    blessingUp();
    playerLoadStats();
    saveData();
}

// Cursed totem offering
const cursedTotem = (curseLvl) => {
    sfxBuff.play();
    dungeon.settings.enemyScaling += 0.1;
    addDungeonLog(`The monsters in the dungeon became stronger and the loot quality improved. (Curse Lv.${curseLvl} > Curse Lv.${curseLvl + 1})`);
    saveData();
}

// Ignore event and proceed exploring
const ignoreEvent = () => {
    sfxConfirm.play();
    dungeon.status.event = false;
    addDungeonLog("You ignored it and decided to move on.");
}

// Increase room or floor accordingly
const incrementRoom = () => {
    dungeon.progress.room++;
    dungeon.action = 0;
    loadDungeonProgress();
}

// Increases player total blessing
const blessingUp = () => {
    blessingValidation();
    player.blessing++;
}

// Validates whether blessing exists or not
const blessingValidation = () => {
    if (player.blessing == undefined) {
        player.blessing = 1;
    }
}

// ========= Dungeon Backlog ==========
// Displays every dungeon activity
const updateDungeonLog = (choices) => {
    let dungeonLog = document.querySelector("#dungeonLog");
    dungeonLog.innerHTML = "";

    // Display the recent 50 dungeon logs
    for (let message of dungeon.backlog.slice(-50)) {
        let logElement = document.createElement("p");
        logElement.innerHTML = message;
        dungeonLog.appendChild(logElement);
    }

    // If the event has choices, display it
    if (typeof choices !== 'undefined') {
        let eventChoices = document.createElement("div");
        eventChoices.innerHTML = choices;
        dungeonLog.appendChild(eventChoices);
    }

    dungeonLog.scrollTop = dungeonLog.scrollHeight;
}

// Add a log to the dungeon backlog
const addDungeonLog = (message, choices) => {
    dungeon.backlog.push(message);
    updateDungeonLog(choices);
}

// Evaluate a dungeon difficulty
const evaluateDungeon = () => {
    let base = 500;
    // Work in Progress
}