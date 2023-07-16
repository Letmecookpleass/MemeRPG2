window.addEventListener("load", function () {
 if (player === null) {
  runLoad("character-creation", "flex");
 } else {
  let target = document.querySelector("#title-screen");
  target.style.display = "flex";
 }
 document.querySelector("#title-screen").addEventListener("click", function () {
  const player = JSON.parse(localStorage.getItem("playerData"));
  if (player.allocated) {
 enterDungeon();
  } else {
 allocationPopup();
  }
 });  

 // Submit Name 
 document.querySelector("#name-submit").addEventListener("submit", function (e) { 
  e.preventDefault(); 
  let playerName = document.querySelector("#name-input").value;  

  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; 
  if (format.test(playerName)) { 
 document.querySelector("#alert").innerHTML = "Fucking fix your name it should be normal and no character shit"; 
  } else { 
 if (playerName.length < 3 || playerName.length > 15) { 
  document.querySelector("#alert").innerHTML = "Name should be longer than your.. just do it 3-15 text"; 
 } else { 
  player = { 
 name: playerName, 
 lvl: 1, 
 stats: { 
  hp: null, 
  hpMax: null, 
  atk: null, 
  def: null, 
  pen: null, 
  atkSpd: null, 
  vamp: null, 
  critRate: null, 
  critDmg: null 
 }, 
 baseStats: { 
  hp: 500, 
  atk: 100, 
  def: 50, 
  pen: 0, 
  atkSpd: 0.6, 
  vamp: 0, 
  critRate: 0, 
  critDmg: 50 
 }, 
 equippedStats: { 
  hp: 0, 
  atk: 0, 
  def: 0, 
  pen: 0, 
  atkSpd: 0, 
  vamp: 0, 
  critRate: 0, 
  critDmg: 0, 
  hpPct: 0, 
  atkPct: 0, 
  defPct: 0, 
  penPct: 0, 
 }, 
 bonusStats: { 
  hp: 0, 
  atk: 0, 
  def: 0, 
  atkSpd: 0, 
  vamp: 0, 
  critRate: 0, 
  critDmg: 0 
 }, 
 exp: { 
  expCurr: 0, 
  expMax: 100, 
  expCurrLvl: 0, 
  expMaxLvl: 100, 
  lvlGained: 0 
 }, 
 inventory: { 
  consumables: [], 
  equipment: [] 
 }, 
 equipped: [], 
 gold: 0, 
 playtime: 0, 
 kills: 0, 
 deaths: 0, 
 inCombat: false 
  }; 
  calculateStats(); 
  player.stats.hp = player.stats.hpMax; 
  saveData(); 
  document.querySelector("#character-creation").style.display = "none"; 
  runLoad("title-screen", "flex"); 
 } 
  } 
 });  

 // Unequip all items 
 document.querySelector("#unequip-all").addEventListener("click", function () { 
  sfxOpen.play();  

  dungeon.status.exploring = false; 
  let dimTarget = document.querySelector('#inventory'); 
  dimTarget.style.filter = "brightness(50%)"; 
  defaultModalElement.style.display = "flex"; 
  defaultModalElement.innerHTML = ` 
  <div class="content"> 
 <p>Unequip all your items?</p> 
 <div class="button-container"> 
  <button id="unequip-confirm">Unequip</button> 
  <button id="unequip-cancel">Cancel</button> 
 </div> 
  </div>`; 
  let confirm = document.querySelector('#unequip-confirm'); 
  let cancel = document.querySelector('#unequip-cancel'); 
  confirm.onclick = function () { 
 sfxUnequip.play(); 
 unequipAll(); 
 continueExploring(); 
 defaultModalElement.style.display = "none"; 
 defaultModalElement.innerHTML = ""; 
 dimTarget.style.filter = "brightness(100%)"; 
  }; 
  cancel.onclick = function () { 
 sfxDecline.play(); 
 continueExploring(); 
 defaultModalElement.style.display = "none"; 
 defaultModalElement.innerHTML = ""; 
 dimTarget.style.filter = "brightness(100%)"; 
  }; 
 });  

 document.querySelector("#menu-btn").addEventListener("click", function () { 
  closeInventory();  

  dungeon.status.exploring = false; 
  let dimDungeon = document.querySelector('#dungeon-main'); 
  dimDungeon.style.filter = "brightness(50%)"; 
  menuModalElement.style.display = "flex";  

  // Menu tab 
  menuModalElement.innerHTML = ` 
  <div class="content"> 
 <div class="content-head"> 
  <h3>Menu</h3> 
  <p id="close-menu"><i class="fa fa-xmark"></i></p> 
 </div> 
 <button id="player-menu"><i class="fas fa-user"></i>${player.name} Overall Info</button> 
 <button id="stats">${player.name} Current Info</button> 
 <button id="volume-btn">Volume Settings</button> 
 <button id="export-import">Export/Import Data</button> 
  <button id="update-log">Update Log</button> 
  <button id="lobby-chat">Lobby Chat</button> 
 <button id="quit-run">Reset Data/Abandoned</button> 
  </div>`;  

  let close = document.querySelector('#close-menu'); 
  let playerMenu = document.querySelector('#player-menu'); 
  let runMenu = document.querySelector('#stats'); 
  let lobbyChat = document.querySelector('#lobby-chat'); 
  let updateLog = document.querySelector('#update-log'); 
  let quitRun = document.querySelector('#quit-run'); 
  let exportImport = document.querySelector('#export-import'); 
  let volumeSettings = document.querySelector('#volume-btn'); 

// Define the updateLog function
function updateLogOnClick() {
  // Navigate to the other HTML page
  window.location.href = 'info1.html';
}
updateLog.onclick = updateLogOnClick;

// Define the updateLog function
function lobbyChatOnClick() {
  // Navigate to the other HTML page
  window.location.href = 'chat.html';
}
lobbyChat.onclick = lobbyChatOnClick;

  // Player profile click function 
  playerMenu.onclick = function () { 
 sfxOpen.play(); 
 let playTime = new Date(player.playtime * 1000).toISOString().slice(11, 19); 
 menuModalElement.style.display = "none"; 
 defaultModalElement.style.display = "flex"; 
 defaultModalElement.innerHTML = ` 
 <div class="content" id="profile-tab"> 
  <div class="content-head"> 
 <h3>Statistics</h3> 
 <p id="profile-close"><i class="fa fa-xmark"></i></p> 
  </div> 
  <p>${player.name} Lv.${player.lvl}</p> 
  <p>Kills: ${nFormatter(player.kills)}</p> 
  <p>Deaths: ${nFormatter(player.deaths)}</p> 
  <p>Playtime: ${playTime}</p> 
 </div>`; 
 let profileTab = document.querySelector('#profile-tab'); 
 profileTab.style.width = "15rem"; 
 let profileClose = document.querySelector('#profile-close'); 
 profileClose.onclick = function () { 
  sfxDecline.play(); 
  defaultModalElement.style.display = "none"; 
  defaultModalElement.innerHTML = ""; 
  menuModalElement.style.display = "flex"; 
 }; 
  };  

  // Dungeon run click function 
  runMenu.onclick = function () { 
 sfxOpen.play(); 
 let runTime = new Date(dungeon.statistics.runtime * 1000).toISOString().slice(11, 19); 
 menuModalElement.style.display = "none"; 
 defaultModalElement.style.display = "flex"; 
 defaultModalElement.innerHTML = ` 
 <div class="content" id="run-tab"> 
  <div class="content-head"> 
 <h3>Current Run</h3> 
 <p id="run-close"><i class="fa fa-xmark"></i></p> 
  </div> 
  <p>${player.name} Lv.${player.lvl} (${player.skills})</p> 
  <p>Blessing Lvl: ${player.blessing}</p> 
  <p>Curse Lvl: ${Math.round((dungeon.settings.enemyScaling - 1) * 10)}</p> 
  <p>Kills: ${nFormatter(dungeon.statistics.kills)}</p> 
  <p>Runtime: ${runTime}</p>

<p>Current Room: ${dungeon.progress.room}/${dungeon.progress.roomLimit}</p>
<p>Current Floor: ${dungeon.progress.floor}/${dungeon.progress.floorLimit}</p>

 </div>`; 
 let runTab = document.querySelector('#run-tab'); 
 runTab.style.width = "15rem"; 
 let runClose = document.querySelector('#run-close'); 
 runClose.onclick = function () { 
  sfxDecline.play(); 
  defaultModalElement.style.display = "none"; 
  defaultModalElement.innerHTML = ""; 
  menuModalElement.style.display = "flex"; 
 }; 
  };  

  // Quit the current run 
  quitRun.onclick = function () { 
 sfxOpen.play(); 
 menuModalElement.style.display = "none"; 
 defaultModalElement.style.display = "flex"; 
 defaultModalElement.innerHTML = ` 
 <div class="content"> 
  <p>Do you want to abandon this run?</p> 
  <div class="button-container"> 
 <button id="quit-run">Abandon</button> 
 <button id="cancel-quit">Cancel</button> 
  </div> 
 </div>`; 
 let quit = document.querySelector('#quit-run'); 
 let cancel = document.querySelector('#cancel-quit'); 
 quit.onclick = function () { 
  sfxConfirm.play(); 
  // Clear out everything, send the player back to meny and clear progress. 
  bgmDungeon.stop(); 
  let dimDungeon = document.querySelector('#dungeon-main'); 
  dimDungeon.style.filter = "brightness(100%)"; 
  dimDungeon.style.display = "none"; 
  menuModalElement.style.display = "none"; 
  menuModalElement.innerHTML = ""; 
  defaultModalElement.style.display = "none"; 
  defaultModalElement.innerHTML = ""; 
  runLoad("title-screen", "flex"); 
  clearInterval(dungeonTimer); 
  clearInterval(playTimer); 
  progressReset(); 
 }; 
 cancel.onclick = function () { 
  sfxDecline.play(); 
  defaultModalElement.style.display = "none"; 
  defaultModalElement.innerHTML = ""; 
  menuModalElement.style.display = "flex"; 
 }; 
  };  

  // Opens the volume settings 
  volumeSettings.onclick = function () { 
 sfxOpen.play();  

 let master = volume.master * 100; 
 let bgm = (volume.bgm * 100) * 2; 
 let sfx = volume.sfx * 100; 
 menuModalElement.style.display = "none"; 
 defaultModalElement.style.display = "flex"; 
 defaultModalElement.innerHTML = ` 
 <div class="content" id="volume-tab"> 
  <div class="content-head"> 
 <h3>Volume</h3> 
 <p id="volume-close"><i class="fa fa-xmark"></i></p> 
  </div> 
  <label id="master-label" for="master-volume">Master (${master}%)</label> 
  <input type="range" id="master-volume" min="0" max="100" value="${master}"> 
  <label id="bgm-label" for="bgm-volume">BGM (${bgm}%)</label> 
  <input type="range" id="bgm-volume" min="0" max="100" value="${bgm}"> 
  <label id="sfx-label" for="sfx-volume">SFX (${sfx}%)</label> 
  <input type="range" id="sfx-volume" min="0" max="100" value="${sfx}"> 
  <button id="apply-volume">Apply</button> 
 </div>`; 
 let masterVol = document.querySelector('#master-volume'); 
 let bgmVol = document.querySelector('#bgm-volume'); 
 let sfxVol = document.querySelector('#sfx-volume'); 
 let applyVol = document.querySelector('#apply-volume'); 
 let volumeTab = document.querySelector('#volume-tab'); 
 volumeTab.style.width = "15rem"; 
 let volumeClose = document.querySelector('#volume-close'); 
 volumeClose.onclick = function () { 
  sfxDecline.play(); 
  defaultModalElement.style.display = "none"; 
  defaultModalElement.innerHTML = ""; 
  menuModalElement.style.display = "flex"; 
 };  

 // Volume Control 
 masterVol.oninput = function () { 
  master = this.value; 
  document.querySelector('#master-label').innerHTML = `Master (${master}%)`; 
 };  

 bgmVol.oninput = function () { 
  bgm = this.value; 
  document.querySelector('#bgm-label').innerHTML = `BGM (${bgm}%)`; 
 };  

 sfxVol.oninput = function () { 
  sfx = this.value; 
  document.querySelector('#sfx-label').innerHTML = `SFX (${sfx}%)`; 
 };  

 applyVol.onclick = function () { 
  volume.master = master / 100; 
  volume.bgm = (bgm / 100) / 2; 
  volume.sfx = sfx / 100; 
  bgmDungeon.stop(); 
  setVolume(); 
  bgmDungeon.play(); 
  saveData(); 
 }; 
  };  

  // Export/Import Save Data 
  exportImport.onclick = function () { 
 sfxOpen.play(); 
 let exportedData = exportData(); 
 menuModalElement.style.display = "none"; 
 defaultModalElement.style.display = "flex"; 
 defaultModalElement.innerHTML = ` 
 <div class="content" id="ei-tab"> 
  <div class="content-head"> 
 <h3>Export/Import Data</h3> 
 <p id="ei-close"><i class="fa fa-xmark"></i></p> 
  </div> 
  <h4>Export Data</h4> 
  <input type="text" id="export-input" autocomplete="off" value="${exportedData}" readonly> 
  <button id="copy-export">Copy</button> 
  <h4>Import Data</h4> 
  <input type="text" id="import-input" autocomplete="off"> 
  <button id="data-import">Import</button> 
 </div>`; 
 let eiTab = document.querySelector('#ei-tab'); 
 eiTab.style.width = "15rem"; 
 let eiClose = document.querySelector('#ei-close'); 
 let copyExport = document.querySelector('#copy-export') 
 let dataImport = document.querySelector('#data-import'); 
 let importInput = document.querySelector('#import-input'); 
 copyExport.onclick = function () { 
  sfxConfirm.play(); 
  let copyText = document.querySelector('#export-input'); 
  copyText.select(); 
  copyText.setSelectionRange(0, 99999); 
  navigator.clipboard.writeText(copyText.value); 
  copyExport.innerHTML = "Copied!"; 
 } 
 dataImport.onclick = function () { 
  importData(importInput.value); 
 }; 
 eiClose.onclick = function () { 
  sfxDecline.play(); 
  defaultModalElement.style.display = "none"; 
  defaultModalElement.innerHTML = ""; 
  menuModalElement.style.display = "flex"; 
 }; 
  };  

  // Close menu 
  close.onclick = function () { 
 sfxDecline.play(); 
 continueExploring(); 
 menuModalElement.style.display = "none"; 
 menuModalElement.innerHTML = ""; 
 dimDungeon.style.filter = "brightness(100%)"; 
  }; 
 }); 
});  

// Loading Screen 
const runLoad = (id, display) => { 
 let loader = document.querySelector("#loading"); 
 loader.style.display = "flex"; 
 setTimeout(async () => { 
  loader.style.display = "none"; 
  document.querySelector(`#${id}`).style.display = `${display}`; 
 }, 1000); 
}  

// Start the game 
const enterDungeon = () => { 
 sfxConfirm.play(); 
 document.querySelector("#title-screen").style.display = "none"; 
 runLoad("dungeon-main", "flex"); 
 if (player.inCombat) { 
  enemy = JSON.parse(localStorage.getItem("enemyData")); 
  showCombatInfo(); 
  startCombat(bgmBattleMain); 
 } else { 
  bgmDungeon.play(); 
 } 
 if (player.stats.hp == 0) { 
  progressReset(); 
 } 
 initialDungeonLoad(); 
 playerLoadStats(); 
}  

// Save all the data into local storage 
const saveData = () => { 
 const playerData = JSON.stringify(player); 
 const dungeonData = JSON.stringify(dungeon); 
 const enemyData = JSON.stringify(enemy); 
 const volumeData = JSON.stringify(volume); 
 localStorage.setItem("playerData", playerData); 
 localStorage.setItem("dungeonData", dungeonData); 
 localStorage.setItem("enemyData", enemyData); 
 localStorage.setItem("volumeData", volumeData); 
}  

// Calculate every player stat 
const calculateStats = () => { 
 let equipmentAtkSpd = player.baseStats.atkSpd * (player.equippedStats.atkSpd / 100); 
 let playerHpBase = player.baseStats.hp; 
 let playerAtkBase = player.baseStats.atk; 
 let playerDefBase = player.baseStats.def; 
 let playerAtkSpdBase = player.baseStats.atkSpd; 
 let playerVampBase = player.baseStats.vamp; 
 let playerCRateBase = player.baseStats.critRate; 
 let playerCDmgBase = player.baseStats.critDmg;  

 player.stats.hpMax = Math.round((playerHpBase + playerHpBase * (player.bonusStats.hp / 100)) + player.equippedStats.hp); 
 player.stats.atk = Math.round((playerAtkBase + playerAtkBase * (player.bonusStats.atk / 100)) + player.equippedStats.atk); 
 player.stats.def = Math.round((playerDefBase + playerDefBase * (player.bonusStats.def / 100)) + player.equippedStats.def); 
 player.stats.atkSpd = (playerAtkSpdBase + playerAtkSpdBase * (player.bonusStats.atkSpd / 100)) + equipmentAtkSpd + (equipmentAtkSpd * (player.equippedStats.atkSpd / 100)); 
 player.stats.vamp = playerVampBase + player.bonusStats.vamp + player.equippedStats.vamp; 
 player.stats.critRate = playerCRateBase + player.bonusStats.critRate + player.equippedStats.critRate; 
 player.stats.critDmg = playerCDmgBase + player.bonusStats.critDmg + player.equippedStats.critDmg;  

 // Caps attack speed to 2.5 
 if (player.stats.atkSpd > 2.5) { 
  player.stats.atkSpd = 2.5; 
 } 
}  

// Resets the progress back to start 
const progressReset = () => { 
 player.stats.hp = player.stats.hpMax; 
 player.lvl = 1; 
 player.blessing = 1; 
 player.exp = { 
  expCurr: 0, 
  expMax: 100, 
  expCurrLvl: 0, 
  expMaxLvl: 100, 
  lvlGained: 0 
 }; 
 player.bonusStats = { 
  hp: 0, 
  atk: 0, 
  def: 0, 
  atkSpd: 0, 
  vamp: 0, 
  critRate: 0, 
  critDmg: 0 
 }; 
 player.skills = []; 
 player.inCombat = false; 
 dungeon.progress.floor = 1; 
 dungeon.progress.room = 1; 
 dungeon.statistics.kills = 0; 
 dungeon.status = { 
  exploring: false, 
  paused: true, 
  event: false, 
 }; 
 dungeon.settings = { 
  enemyBaseLvl: 1, 
  enemyLvlGap: 5, 
  enemyBaseStats: 1, 
  enemyScaling: 1.1, 
 }; 
 delete dungeon.enemyMultipliers; 
 delete player.allocated; 
 dungeon.backlog.length = 0; 
 dungeon.action = 0; 
 dungeon.statistics.runtime = 0; 
 combatBacklog.length = 0; 
 saveData(); 
}  

// Export and Import Save Data 
const exportData = () => { 
 const exportedData = btoa(JSON.stringify(player)); 
 return exportedData; 
}  

const importData = (importedData) => { 
 try { 
  let playerImport = JSON.parse(atob(importedData)); 
  if (playerImport.inventory !== undefined) { 
 sfxOpen.play(); 
 defaultModalElement.style.display = "none"; 
 confirmationModalElement.style.display = "flex"; 
 confirmationModalElement.innerHTML = ` 
 <div class="content"> 
  <p>Are you sure you want to import this data? This will erase the current data and reset your dungeon progress.</p> 
  <div class="button-container"> 
 <button id="import-btn">Import</button> 
 <button id="cancel-btn">Cancel</button> 
  </div> 
 </div>`; 
 let confirm = document.querySelector("#import-btn"); 
 let cancel = document.querySelector("#cancel-btn"); 
 confirm.onclick = function () { 
  sfxConfirm.play(); 
  player = playerImport; 
  saveData(); 
  bgmDungeon.stop(); 
  let dimDungeon = document.querySelector('#dungeon-main'); 
  dimDungeon.style.filter = "brightness(100%)"; 
  dimDungeon.style.display = "none"; 
  menuModalElement.style.display = "none"; 
  menuModalElement.innerHTML = ""; 
  confirmationModalElement.style.display = "none"; 
  confirmationModalElement.innerHTML = ""; 
  defaultModalElement.style.display = "none"; 
  defaultModalElement.innerHTML = ""; 
  runLoad("title-screen", "flex"); 
  clearInterval(dungeonTimer); 
  clearInterval(playTimer); 
  progressReset(); 
 } 
 cancel.onclick = function () { 
  sfxDecline.play(); 
  confirmationModalElement.style.display = "none"; 
  confirmationModalElement.innerHTML = ""; 
  defaultModalElement.style.display = "flex"; 
 } 
  } else { 
 sfxDeny.play(); 
  } 
 } catch (err) { 
  sfxDeny.play(); 
 } 
}  

// Player Stat Allocation 
const allocationPopup = () => { 
 let allocation = { 
  hp: 5, 
  atk: 5, 
  def: 5, 
  atkSpd: 5 
 } 
 const updateStats = () => { 
  stats = { 
 hp: 50 * allocation.hp, 
 atk: 10 * allocation.atk, 
 def: 10 * allocation.def, 
 atkSpd: 0.4 + (0.02 * allocation.atkSpd) 
  } 
 } 
 updateStats(); 
 let points = 30; 
 const loadContent = function () { 
  defaultModalElement.innerHTML = ` 
  <div class="content" id="allocate-stats"> 
 <div class="content-head"> 
  <h3>Choose Stats Mf</h3> 
  <p id="allocate-close"><i class="fa fa-xmark"></i></p> 
 </div> 
 <div class="row"> 
  <p><i class="fas fa-heart"></i><span id="hpDisplay">HP: ${stats.hp}</span></p> 
  <div class="row"> 
 <button id="hpMin">-</button> 
 <span id="hpAllo">${allocation.hp}</span> 
 <button id="hpAdd">+</button> 
  </div> 
 </div> 
 <div class="row"> 
  <p><i class="ra ra-sword"></i><span id="atkDisplay">ATK: ${stats.atk}</span></p> 
  <div class="row"> 
 <button id="atkMin">-</button> 
 <span id="atkAllo">${allocation.atk}</span> 
 <button id="atkAdd">+</button> 
  </div> 
 </div> 
 <div class="row"> 
  <p><i class="ra ra-round-shield"></i><span id="defDisplay">DEF: ${stats.def}</span></p> 
  <div class="row"> 
 <button id="defMin">-</button> 
 <span id="defAllo">${allocation.def}</span> 
 <button id="defAdd">+</button> 
  </div> 
 </div> 
 <div class="row"> 
  <p><i class="ra ra-plain-dagger"></i><span id="atkSpdDisplay">ATK.SPD: ${stats.atkSpd}</span></p> 
  <div class="row"> 
 <button id="atkSpdMin">-</button> 
 <span id="atkSpdAllo">${allocation.atkSpd}</span> 
 <button id="atkSpdAdd">+</button> 
  </div> 
 </div> 
 <div class="row"> 
  <p id="alloPts">Stat Points: ${points}</p> 
  <button id="allocate-reset">Reset</button> 
 </div> 
 <div class="row"> 
  <p>Passive</p> 
  <select id="select-skill"> 
<option value="Discord Mod">Discord Mod</option> 
 <option value="Bald">Bald</option> 
 <option value="Pedophile">Pedophile</option> 
 <option value="Sigma">Sigma</option> 
 <option value="Spaghetti Soy Sauce Enjoyer">Spaghetti Soy Sauce Enjoyer</option> 
 <option value="Asians">Asian</option>
  <option value="Hitler">Hitler</option> </select> 
 </div> 
 <div class="row primary-panel pad"> 
  <p id="skill-desc">Attacks deal extra 8% of enemies' current health on hit.</p> 
 </div> 
 <button id="allocate-confirm">Confirm</button> 
  </div>`; 
 } 
 defaultModalElement.style.display = "flex"; 
 document.querySelector("#title-screen").style.filter = "brightness(50%)"; 
 loadContent();  

 // Stat Allocation 
 const handleStatButtons = (e) => { 
  let rx = /\.0+$|(\.[0-9]*[1-9])0+$/; 
  if (e.includes("Add")) { 
 let stat = e.split("Add")[0]; 
 if (points > 0) { 
  sfxConfirm.play(); 
  allocation[stat]++; 
  points--; 
  updateStats(); 
  document.querySelector(`#${stat}Display`).innerHTML = `${stat.replace(/([A-Z])/g, ' $1').trim().replace(/ /g, '.').toUpperCase()}: ${stats[stat].toFixed(2).replace(rx, "$1")}`; 
  document.querySelector(`#${stat}Allo`).innerHTML = allocation[stat]; 
  document.querySelector(`#alloPts`).innerHTML = `Stat Points: ${points}`; 
 } else { 
  sfxDeny.play(); 
 } 
  } else if (e.includes("Min")) { 
 let stat = e.split("Min")[0]; 
 if (allocation[stat] > 5) { 
  sfxConfirm.play(); 
  allocation[stat]--; 
  points++; 
  updateStats(); 
  document.querySelector(`#${stat}Display`).innerHTML = `${stat.replace(/([A-Z])/g, ' $1').trim().replace(/ /g, '.').toUpperCase()}: ${stats[stat].toFixed(2).replace(rx, "$1")}`; 
  document.querySelector(`#${stat}Allo`).innerHTML = allocation[stat]; 
  document.querySelector(`#alloPts`).innerHTML = `Stat Points: ${points}`; 
 } else { 
  sfxDeny.play(); 
 } 
  } 
 } 
 document.querySelector("#hpAdd").onclick = function () { 
  handleStatButtons("hpAdd") 
 }; 
 document.querySelector("#hpMin").onclick = function () { 
  handleStatButtons("hpMin") 
 }; 
 document.querySelector("#atkAdd").onclick = function () { 
  handleStatButtons("atkAdd") 
 }; 
 document.querySelector("#atkMin").onclick = function () { 
  handleStatButtons("atkMin") 
 }; 
 document.querySelector("#defAdd").onclick = function () { 
  handleStatButtons("defAdd") 
 }; 
 document.querySelector("#defMin").onclick = function () { 
  handleStatButtons("defMin") 
 }; 
 document.querySelector("#atkSpdAdd").onclick = function () { 
  handleStatButtons("atkSpdAdd") 
 }; 
 document.querySelector("#atkSpdMin").onclick = function () { 
  handleStatButtons("atkSpdMin") 
 };  

 // Passive skills 
 let selectSkill = document.querySelector("#select-skill"); 
 let skillDesc = document.querySelector("#skill-desc"); 
 selectSkill.onclick = function () { 
  sfxConfirm.play(); 
 } 
 selectSkill.onchange = function () { 
  if (selectSkill.value == "Discord Mod") { 
 skillDesc.innerHTML = "Using discord power to damage memester more by 8%"; 
  } 
  if (selectSkill.value == "Bald") { 
 skillDesc.innerHTML = "Using skinny head to damage your enemy based on your HP 8% Max hp of your bald head character shit."; 
  } 
  if (selectSkill.value == "Pedophile") { 
 skillDesc.innerHTML = "Makes you powerful and deal 30% more damage but reduce your attack speed by 30%."; 
  } 
  if (selectSkill.value == "Rampager") { 
 skillDesc.innerHTML = "Increase attack by 5 after each hit. Stack resets after battle."; 
  } 
  if (selectSkill.value == "Sigma") { 
 skillDesc.innerHTML = "Gain increased attack speed after each hit. Stack resets after battle."; 
  } 
  if (selectSkill.value == "Spaghetti Soy Sauce Enjoyer") { 
 skillDesc.innerHTML = "You receive 25% less damage permanently because your food taste is hella weird making you immune to shits."; 
  } 
  if (selectSkill.value == "Asians") { 
 skillDesc.innerHTML = "If the enemy damage you the damage they do 15% of it will back to them because of how hard it is to become asian"; 
  }
  
  if (selectSkill.value == "Hitler") { skillDesc.innerHTML = "Increase damage by 5% every time u attack stack, will reset if enemy ded"; 
  } 
 }  

 // Operation Buttons 
 let confirm = document.querySelector("#allocate-confirm"); 
 let reset = document.querySelector("#allocate-reset"); 
 let close = document.querySelector("#allocate-close"); 
 confirm.onclick = function () { 
  // Set allocated stats to player base stats 
  player.baseStats = { 
 hp: stats.hp, 
 atk: stats.atk, 
 def: stats.def, 
 pen: 0, 
 atkSpd: stats.atkSpd, 
 vamp: 0, 
 critRate: 0, 
 critDmg: 50 
  }  

  // Set player skill 
  objectValidation(); 
  if (selectSkill.value == "Discord Mod") { 
 player.skills.push("Discord Mod"); 
  } 
  if (selectSkill.value == "Bald") { 
 player.skills.push("Bald"); 
  } 
  if (selectSkill.value == "Pedophile") { 
 player.skills.push("Pedophile"); 
 player.baseStats.atkSpd = player.baseStats.atkSpd - ((30 * player.baseStats.atkSpd) / 100); 
  } 
  if (selectSkill.value == "Rampager") { 
 player.skills.push("Rampager"); 
  } 
  if (selectSkill.value == "Sigma") { 
 player.skills.push("Sigma"); 
  } 
  if (selectSkill.value == "Spaghetti Soy Sauce Enjoyer") { 
 player.skills.push("Spaghetti Soy Sauce Enjoyer"); 
  } 
  if (selectSkill.value == "Asians") { 
 player.skills.push("Asians"); 
  } if (selectSkill.value == "Hitler") { 

 player.skills.push("Hitler"); 
  }  
  // Proceed to dungeon 
  player.allocated = true; 
  enterDungeon(); 
  player.stats.hp = player.stats.hpMax; 
  playerLoadStats(); 
  defaultModalElement.style.display = "none"; 
  defaultModalElement.innerHTML = ""; 
  document.querySelector("#title-screen").style.filter = "brightness(100%)"; 
 } 
 reset.onclick = function () { 
  sfxDecline.play(); 
  allocation = { 
 hp: 5, 
 atk: 5, 
 def: 5, 
 atkSpd: 5 
  }; 
  points = 30; 
  updateStats();  

  // Display Reset 
  document.querySelector(`#hpDisplay`).innerHTML = `HP: ${stats.hp}`; 
  document.querySelector(`#atkDisplay`).innerHTML = `ATK: ${stats.atk}`; 
  document.querySelector(`#defDisplay`).innerHTML = `DEF: ${stats.def}`; 
  document.querySelector(`#atkSpdDisplay`).innerHTML = `ATK.SPD: ${stats.atkSpd}`; 
  document.querySelector(`#hpAllo`).innerHTML = allocation.hp; 
  document.querySelector(`#atkAllo`).innerHTML = allocation.atk; 
  document.querySelector(`#defAllo`).innerHTML = allocation.def; 
  document.querySelector(`#atkSpdAllo`).innerHTML = allocation.atkSpd; 
  document.querySelector(`#alloPts`).innerHTML = `Stat Points: ${points}`; 
 } 
 close.onclick = function () { 
  sfxDecline.play(); 
  defaultModalElement.style.display = "none"; 
  defaultModalElement.innerHTML = ""; 
  document.querySelector("#title-screen").style.filter = "brightness(100%)"; 
 } 
}  

const objectValidation = () => { 
 if (player.skills == undefined) { 
  player.skills = []; 
 } 
 if (player.tempStats == undefined) { 
  player.tempStats = {}; 
  player.tempStats.atk = 0; 
  player.tempStats.atkSpd = 0; 
 } 
 saveData(); 
} 