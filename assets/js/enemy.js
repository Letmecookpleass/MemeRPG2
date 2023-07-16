// Enemy



let enemy = {



    name: null,



    type: null,



    lvl: null,



    stats: {



        hp: null,



        hpMax: null,



        atk: 0,



        def: 0,



        atkSpd: 0,



        vamp: 0,



        critRate: 0,



        critDmg: 0



    },



    image: {



        name: null,



        type: null,



        size: null



    },



    rewards: {



        exp: null,



        gold: null,



        drop: null



    }



};







const generateRandomEnemy = (condition) => {



    // List of possible enemy names



    const enemyNames = [



        // Obama



        'Obama', 'Obama Triangle', 'Memester Copycat', 'Obama Craft',  'Karthikeya', 'Submarine meme',



        // Wol



        'Mrbeast', 'Mr Face Beast', 'Mr Breast', 'Racist Murray', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



        // PewDiePie



        'PewDiePie', 'Error Pie', 'Cream Alien PewDiePie', 'All Seeing Pie', 'Avidek', 'Im under the water', 'Back of my mind',



        // Orc



        'Vegan Teacher', 'Vegan Teacher V2', 'Vegan Teacher V3', 'Vegan Teacher Final Form', 'Mission',



        // Random Black Guy



        'Random Black Guy', 'Void Desu', 'Mish', 'Wolfred', 'Prashant',



        // Skeleton



        'Emimemen', 'Rahul', 'Hecker', 'The Rock', 'Snail Cat', 'Uhhhhh', 'Ghost Of The Past', 'Real Rahul', 'MD V1', 'KSI',



        // Bosses



        'Zaart, the Dominator Obama', 'Mittens', 'Rahul God Of Waifus', 'Discord Mod', 'Goku Drip', 'Hungry Pacman', 'Sasuke Kwun', 'Jung Cock', 'Cannon event', 'China > Taiwan Enjoyer', 'Rick Roll', 'Wise Tree', 'PutDeezNut', 'Gays', 'Walter Saud White', 'Rice Bread Cheese',



        // Monarch



        'Sus Walter White', 'Giga Pig', 'Universe Giga Chad', 'Ricardo', 'Rolando', 'Sad cringe girl', 'Void Desu V2', 'Ele fuck', 'MD, the WOLFRED slayer'



    ];



    const enemyTypes = ['Offensive', 'Defensive', 'Balanced', 'Quick', 'Lethal'];



    let selectedEnemies = null;







    // Generate enemy type



    enemy.type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];







    // Calculate enemy level



    const maxLvl = dungeon.progress.floor * dungeon.settings.enemyLvlGap + (dungeon.settings.enemyBaseLvl - 1);



    const minLvl = maxLvl - (dungeon.settings.enemyLvlGap - 1);



    if (condition == "guardian") {



        enemy.lvl = minLvl;



    } else if (condition == "sboss") {



        enemy.lvl = maxLvl;



    } else {



        enemy.lvl = randomizeNum(minLvl, maxLvl);



    }







    // Generate proper enemy info



    switch (enemy.type) {



        case "Offensive":



            // Select name and apply stats for Offensive enemies



            if (condition == "guardian") {



                selectedEnemies = enemyNames.filter(name => [



                    'Zaart, the Dominator Obama', 'Mittens', 'Rahul God Of Waifus', 'Hungry Pacman', 'Submarine meme', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater', 



                ].includes(name));



            } else if (condition == "sboss") {



                selectedEnemies = enemyNames.filter(name => [



                    'Rolando', 'MD, the WOLFRED slayer', 'Rice Bread Cheese', 'Submarine meme', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            } else {



                selectedEnemies = enemyNames.filter(name => [



                    'Memester Copycat', 'Obama Craft',



                    'Mrbeast', 'Mr Face Beast', 'Mr Breast',



                    'Cream Alien PewDiePie',



                    'Vegan Teacher', 'Vegan Teacher V2', 'Vegan Teacher V3', 'Vegan Teacher Final Form',



                    'Void Desu',



                    'Emimemen', 'Rahul', 'The Rock', 'Snail Cat', 'Uhhhhh', 'Real Rahul', 'MD V1', 'KSI', 'Submarine meme', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            }



            enemy.name = selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];



            setEnemyStats(enemy.type, condition);



            break;



        case "Defensive":



            // Select name and apply stats for Defensive enemies



            if (condition == "guardian") {



                selectedEnemies = enemyNames.filter(name => [



                    'Sasuke Kwun', 'Jung Cock', 'Cannon event', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            } else if (condition == "sboss") {



                selectedEnemies = enemyNames.filter(name => [



                    'Giga Pig', 'Submarine meme', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            } else {



                selectedEnemies = enemyNames.filter(name => [



                    'Error Pie', 'Cream Alien PewDiePie', 'All Seeing Pie',



                    'Mish',



                    'Hecker', 'Ghost Of The Past', 'Mission', 'Submarine meme', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            }



            enemy.name = selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];



            setEnemyStats(enemy.type, condition);



            break;



        case "Balanced":



            // Select name and apply stats for Balanced enemies



            if (condition == "guardian") {



                selectedEnemies = enemyNames.filter(name => [



                    'China > Taiwan Enjoyer', 'Rick Roll', 'Wise Tree', 'Wolfred', 'Prashant', 'Submarine meme', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            } else if (condition == "sboss") {



                selectedEnemies = enemyNames.filter(name => [



                    'Universe Giga Chad', 'Ricardo', 'Void Desu V2', 'Submarine meme', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            } else {



                selectedEnemies = enemyNames.filter(name => [



                    'Obama',



                    'PewDiePie', 'Error Pie', 'Cream Alien PewDiePie',



                    'Vegan Teacher', 'Vegan Teacher V2', 'Vegan Teacher V3', 'Vegan Teacher Final Form',



                    'Random Black Guy',



                    'Hecker', 'Ghost Of The Past', 'Avidek', 'Im under the water', 'Back of my mind', 'Racist Murray', 'Submarine meme', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            }



            enemy.name = selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];



            setEnemyStats(enemy.type, condition);



            break;



        case "Quick":



            // Select name and apply stats for Quick enemies



            if (condition == "guardian") {



                selectedEnemies = enemyNames.filter(name => [



                    'PutDeezNut', 'Gays'



                ].includes(name));



            } else if (condition == "sboss") {



                selectedEnemies = enemyNames.filter(name => [



                    'Ele fuck', 'Sus Walter White', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            } else {



                selectedEnemies = enemyNames.filter(name => [



                    'Obama', 'Obama Triangle', 'Obama Craft',



                    'Mrbeast', 'Mr Face Beast', 'Mr Breast',



                    'Vegan Teacher',



                    'Random Black Guy', 'Void Desu', 'Mish',



                    'Rahul', 'Snail Cat', 'Uhhhhh', 'Racist Murray', 'Submarine meme', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            }



            enemy.name = selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];



            setEnemyStats(enemy.type, condition);



            break;



        case "Lethal":



            // Select name and apply stats for Lethal enemies



            if (condition == "guardian") {



                selectedEnemies = enemyNames.filter(name => [



                    'Walter Saud White', 'Discord Mod', 'Goku Drip', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            } else if (condition == "sboss") {



                selectedEnemies = enemyNames.filter(name => [



                    'Sad cringe girl', 'Submarine meme', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            } else {



                selectedEnemies = enemyNames.filter(name => [



                    'Obama Triangle',



                    'Mrbeast', 'Mr Face Beast', 'Mr Breast',



                    'Vegan Teacher', 'Vegan Teacher V2',



                    'Void Desu',



        'Rahul', 'Uhhhhh', 'Wolfred', 'Prashant', 'Cat', 'Yo mama so fat', 'Tf', 'I see you', 'Unknown Meme', 'Jerry', 'Helth', 'Ok', 'Grape', 'Gorlock the world eater',



                ].includes(name));



            }



            enemy.name = selectedEnemies[Math.floor(Math.random() * selectedEnemies.length)];



            setEnemyStats(enemy.type, condition);



            break;



    }



    if (condition == "chest") {



        enemy.name = "Mimic";



    } else if (condition == "door") {



        enemy.name = "Door Mimic";



    }



    setEnemyImg();



}







// Set a randomly generated stat for the enemy



const setEnemyStats = (type, condition) => {



    if (type == "Offensive") {



        enemy.stats = {



            hp: 0,



            hpMax: randomizeNum(400, 450),



            atk: randomizeNum(70, 100),



            def: randomizeNum(20, 50),



            atkSpd: randomizeDecimal(0.2, 0.4),



            vamp: 0,



            critRate: randomizeDecimal(1, 4),



            critDmg: randomizeDecimal(6.5, 7.5)



        };



    } else if (type == "Defensive") {



        enemy.stats = {



            hp: 0,



            hpMax: randomizeNum(400, 500),



            atk: randomizeNum(40, 70),



            def: randomizeNum(40, 70),



            atkSpd: randomizeDecimal(0.1, 0.3),



            vamp: 0,



            critRate: 0,



            critDmg: 0



        };



    } else if (type == "Balanced") {



        enemy.stats = {



            hp: 0,



            hpMax: randomizeNum(420, 520),



            atk: randomizeNum(50, 80),



            def: randomizeNum(30, 60),



            atkSpd: randomizeDecimal(0.15, 0.35),



            vamp: 0,



            critRate: randomizeDecimal(0.5, 1.5),



            critDmg: randomizeDecimal(1, 3)



        };



    } else if (type == "Quick") {



        enemy.stats = {



            hp: 0,



            hpMax: randomizeNum(300, 800),



            atk: randomizeNum(50, 80),



            def: randomizeNum(30, 60),



            atkSpd: randomizeDecimal(0.35, 0.45),



            vamp: 0,



            critRate: randomizeDecimal(1, 4),



            critDmg: randomizeDecimal(3, 6)



        };



    } else if (type == "Lethal") {



        enemy.stats = {



            hp: 0,



            hpMax: randomizeNum(400, 700),



            atk: randomizeNum(70, 100),



            def: randomizeNum(20, 50),



            atkSpd: randomizeDecimal(0.15, 0.35),



            vamp: 0,



            critRate: randomizeDecimal(4, 8),



            critDmg: randomizeDecimal(6, 9)



        };



    }







    if (dungeon.enemyMultipliers == undefined) {



        dungeon.enemyMultipliers = {



            hp: 1,



            atk: 1,



            def: 1,



            atkSpd: 1,



            vamp: 1,



            critRate: 1,



            critDmg: 1



        }



    }







    // Apply stat scaling for enemies each level



    for (const stat in enemy.stats) {



        if (["hpMax", "atk", "def"].includes(stat)) {



            enemy.stats[stat] += Math.round(enemy.stats[stat] * ((dungeon.settings.enemyScaling - 1) * enemy.lvl));



        } else if (["atkSpd"].includes(stat)) {



            enemy.stats[stat] = 0.4;



            enemy.stats[stat] += enemy.stats[stat] * (((dungeon.settings.enemyScaling - 1) / 4) * enemy.lvl);



        } else if (["critRate"].includes(stat)) {



            enemy.stats[stat] += enemy.stats[stat] * (((dungeon.settings.enemyScaling - 1) / 4) * enemy.lvl);



        } else if (["critDmg"].includes(stat)) {



            enemy.stats[stat] = 50;



            enemy.stats[stat] += enemy.stats[stat] * (((dungeon.settings.enemyScaling - 1) / 4) * enemy.lvl);



        }



    }







    // Stat multiplier for floor guardians



    if (condition == "guardian") {



        enemy.stats.hpMax = enemy.stats.hpMax * 1.5;



        enemy.stats.atk = enemy.stats.atk * 1.3;



        enemy.stats.def = enemy.stats.def * 1.3;



        enemy.stats.critRate = enemy.stats.critRate * 1.1;



        enemy.stats.critDmg = enemy.stats.critDmg * 1.2;



    }







    // Stat multiplier for monarchs



    if (condition == "sboss") {



        enemy.stats.hpMax = enemy.stats.hpMax * 6;



        enemy.stats.atk = enemy.stats.atk * 2;



        enemy.stats.def = enemy.stats.def * 2;



        enemy.stats.critRate = enemy.stats.critRate * 1.1;



        enemy.stats.critDmg = enemy.stats.critDmg * 1.3;



    }







    // Apply stat multipliers for every stat



    let floorMultiplier = (dungeon.progress.floor / 3);



    if (floorMultiplier < 1) {



        floorMultiplier = 1;



    }



    enemy.stats.hpMax = Math.round((enemy.stats.hpMax * floorMultiplier) * dungeon.enemyMultipliers.hp);



    enemy.stats.atk = Math.round(enemy.stats.atk * dungeon.enemyMultipliers.atk);



    enemy.stats.def = Math.round(enemy.stats.def * dungeon.enemyMultipliers.def);



    enemy.stats.atkSpd = enemy.stats.atkSpd * dungeon.enemyMultipliers.atkSpd;



    enemy.stats.vamp = enemy.stats.vamp * dungeon.enemyMultipliers.vamp;



    enemy.stats.critRate = enemy.stats.critRate * dungeon.enemyMultipliers.critRate;



    enemy.stats.critDmg = enemy.stats.critDmg * dungeon.enemyMultipliers.critDmg;







    // Calculate exp and gold that the monster gives



    const expYield = [];







    for (const stat in enemy.stats) {



        let statExp;



        if (["hpMax", "atk", "def"].includes(stat)) {



            statExp = enemy.stats[stat] + enemy.stats[stat] * 0.5;



        } else if (["atkSpd", "critRate", "critDmg"].includes(stat)) {



            statExp = enemy.stats[stat] + enemy.stats[stat] * 2;



        } else if (["vamp", "hp"].includes(stat)) {



            statExp = enemy.stats[stat] + enemy.stats[stat] * 1;



        }



        expYield.push(statExp);



    }







    let expCalculation = (expYield.reduce((acc, cur) => acc + cur, 0)) / 20;



    enemy.rewards.exp = Math.round(expCalculation + expCalculation * (enemy.lvl * 0.1));



    if (enemy.rewards.exp > 1000000) {



        enemy.rewards.exp = 1000000 * randomizeDecimal(0.9, 1.1);



    }



    enemy.rewards.gold = Math.round((enemy.rewards.exp * randomizeDecimal(0.9, 1.1)) * 1.5);



    enemy.rewards.drop = randomizeNum(1, 3);



    if (enemy.rewards.drop == 1) {



        enemy.rewards.drop = true;



    } else {



        enemy.rewards.drop = false;



    }







    enemy.stats.hp = enemy.stats.hpMax;



    enemy.stats.hpPercent = 100;







    // Caps attack speed to 2.5



    if (enemy.stats.atkSpd > 2.5) {



        enemy.stats.atkSpd = 2.5;



    }



}







const setEnemyImg = () => {



    // Apply monster image



    enemy.image.type = '.png';



    switch (enemy.name) {



        // Goblins



        case 'Obama':



            enemy.image.name = 'obama';



            enemy.image.size = '80%';



            break;



        case 'Submarine meme':



            enemy.image.name = 'submarine';



            enemy.image.size = '80%';



            break;



        case 'Obama Triangle':



            enemy.image.name = 'obama1';



            enemy.image.size = '80%';



            break;



        case 'Obama Craft':



            enemy.image.name = 'obama2';



            enemy.image.size = '80%';



            break;



        case 'Obama Plank':



            enemy.image.name = 'obama3';



            enemy.image.size = '80%';



            break;



        case 'Karthikeya':



            enemy.image.name = 'karthikeya';



            enemy.image.size = '80%';



            break;



        case 'Cat':



            enemy.image.name = 'cat';



            enemy.image.size = '80%';



            break;



        case 'Yo mama so fat':



            enemy.image.name = 'yomamasofat';



            enemy.image.size = '80%';



            break;



        case 'Tf':



            enemy.image.name = 'tf';



            enemy.image.size = '80%';



            break;



        case 'I see you':



            enemy.image.name = 'see';



            enemy.image.size = '80%';



            break;



        case 'Unknown Meme':



            enemy.image.name = 'look';



            enemy.image.size = '80%';



            break;



        case 'Jerry':



            enemy.image.name = 'jerry';



            enemy.image.size = '80%';



            break;



        case 'Helth':



            enemy.image.name = 'helth';



            enemy.image.size = '80%';



            break;



        case 'Ok':



            enemy.image.name = 'ok';



            enemy.image.size = '80%';



            break;



        case 'Grape':



            enemy.image.name = 'grape';



            enemy.image.size = '80%';



            break;



        case 'Gorlock the world eater':



            enemy.image.name = 'gor';



            enemy.image.size = '80%';



            break;



        // Mrbeast



        case 'Mrbeast':



            enemy.image.name = 'Mrbeast';



            enemy.image.size = '80%';



            break;



        case 'Mr Face Beast':



            enemy.image.name = 'Mrbeast1';



            enemy.image.size = '80%';



            break;



        case 'Mr Breast':



            enemy.image.name = 'Mrbeast2';



            enemy.image.size = '80%';



            break;







        // PewDiePie



        case 'PewDiePie':



            enemy.image.name = 'PewDiePie';



            enemy.image.size = '80%';



            break;



        case 'Error Pie':



            enemy.image.name = 'PewDiePie1';



            enemy.image.size = '80%';



            break;



        case 'Cream Alien PewDiePie':



            enemy.image.name = 'PewDiePie2';



            enemy.image.size = '80%';



            break;



        case 'All Seeing Pie':



            enemy.image.name = 'PewDiePie3';



            enemy.image.size = '80%';



            break;



        case 'Racist Murray':



            enemy.image.name = 'rickmurray';



            enemy.image.size = '80%';



            break;



        case 'Avidek':



            enemy.image.name = 'avideks';



            enemy.image.size = '80%';



            break;



        case 'Im under the water':



            enemy.image.name = 'howryou';



            enemy.image.size = '80%';



            break;



        case 'Back of my mind':



            enemy.image.name = 'backofmymind';



            enemy.image.size = '90%';



            break;



        case 'Mission':



            enemy.image.name = 'mission';



            enemy.image.size = '80%';



            break;



        case 'Wolfred':



            enemy.image.name = 'wolfred';



            enemy.image.size = '80%';



            break;



        case 'Prashant':



            enemy.image.name = 'PRASHANT';



            enemy.image.size = '80%';



            break;



        case 'Zaart, the Dominator Obama':



            enemy.image.name = 'obama4';



            enemy.image.size = '80%';



            break;



        case 'Real Rahul':



            enemy.image.name = 'rahulreal';



            enemy.image.size = '80%';



            break;



        case 'MD V1':



            enemy.image.name = 'MDreal';



            enemy.image.size = '80%';



            break;



        case 'KSI':



            enemy.image.name = 'KSI';



            enemy.image.size = '80%';



            break;



        case 'Rice Bread Cheese':



            enemy.image.name = 'ricebreadcheese';



            enemy.image.size = '80%';



            break;







        // Orc



        case 'Vegan Teacher':



            enemy.image.name = 'vegan1';



            enemy.image.size = '80%';



            break;



        case 'Vegan Teacher V2':



            enemy.image.name = 'vegan2';



            enemy.image.size = '80%';



            break;



        case 'Vegan Teacher V3':



            enemy.image.name = 'vegan3';



            enemy.image.size = '80%';



            break;



        case 'Vegan Teacher Final Form':



            enemy.image.name = 'vegan4';



            enemy.image.size = '80%';



            break;







        // Random Black Guy



        case 'Random Black Guy':



            enemy.image.name = 'guy1';



            enemy.image.size = '80%';



            break;



        case 'Void Desu':



            enemy.image.name = 'guy2';



            enemy.image.size = '80%';



            break;



        case 'Mish':



            enemy.image.name = 'guy3';



            enemy.image.size = '80%';



            break;







        // Skeleton



        case 'Emimemen':



            enemy.image.name = 'p1';



            enemy.image.size = '80%';



            break;



        case 'Rahul':



            enemy.image.name = 'p2';



            enemy.image.size = '80%';



            break;



        case 'Hecker':



            enemy.image.name = 'p3';



            enemy.image.size = '80%';



            break;



        case 'The Rock':



            if (randomizeNum(1, 2) == 1) {



                enemy.image.name = 'p4';



            } else {



                enemy.image.name = 'p5';



            }



            enemy.image.size = '80%';



            break;



        case 'Snail Cat':



            enemy.image.name = 'p6';



            enemy.image.size = '80%';



            break;



        case 'Uhhhhh':



            enemy.image.name = 'p7';



            enemy.image.size = '80%';



            break;



        case 'Lost Meme':



            enemy.image.name = 'p8';



            enemy.image.size = '80%';



            break;







        // Mimic



        case 'Mimic':



            enemy.image.name = 'mimic';



            enemy.image.size = '80%';



            break;



        case 'Door Mimic':



            enemy.image.name = 'mimic_door';



            enemy.image.size = '80%';



            break;







        // Bosses



        case 'Mittens':



            enemy.image.name = 'mittens';



            enemy.image.size = '80%';



            break;



        case 'Rahul God Of Waifus':



            enemy.image.name = 'RahulGod';



            enemy.image.size = '80%';



            break;



        case 'Discord Mod':



            enemy.image.name = 'discord';



            enemy.image.size = '80%';



            break;



        case 'Goku Drip':



            enemy.image.name = 'goku';



            enemy.image.size = '80%';



            break;



        case 'Hungry Pacman':



            enemy.image.name = 'pacman';



            enemy.image.size = '80%';



            break;



        case 'Sasuke Kwun':



            enemy.image.name = 'sasuke';



            enemy.image.size = '80%';



            break;



        case 'Jung Cock':



            enemy.image.name = 'jung';



            enemy.image.size = '80%';



            break;



        case 'Cannon event':



            enemy.image.name = 'cannon';



            enemy.image.size = '80%';



            break;



        case 'China > Taiwan Enjoyer':



            enemy.image.name = 'chinese';



            enemy.image.size = '80%';



            break;



        case 'Rick Roll':



            enemy.image.name = 'rick';



            enemy.image.size = '80%';



            break;



        case 'Wise Tree':



            enemy.image.name = 'wise';



            enemy.image.size = '80%';



            break;



        case 'Gays':



            enemy.image.name = 'gays';



            enemy.image.size = '80%';



            break;



        case 'PutDeezNut':



            enemy.image.name = 'putin';



            enemy.image.size = '80%';



            break;



        case 'Walter Saud White':



            enemy.image.name = 'walter';



            enemy.image.size = '80%';



            break;







        // Special Boss



        case 'Sus Walter White':



            enemy.image.name = 'sussy';



            enemy.image.size = '80%';



            break;



        case 'Giga Pig':



            enemy.image.name = 'piga';



            enemy.image.size = '80%';



            break;



        case 'Universe Giga Chad':



            enemy.image.name = 'gigachad';



            enemy.image.size = '80%';



            break;



        case 'Ricardo':



            enemy.image.name = 'ricardo';



            enemy.image.size = '80%';



            break;



        case 'Rolando':



            enemy.image.name = 'rolando';



            enemy.image.size = '80%';



            break;



        case 'Sad cringe girl':



            enemy.image.name = 'sadgirl';



            enemy.image.size = '80%';



            break;



        case 'Void Desu V2':



            enemy.image.name = 'vooid';



            enemy.image.size = '80%';



            break;



        case 'Ele fuck':



            enemy.image.name = 'elefuck';



            enemy.image.size = '80%';



            break;



        case 'MD, the WOLFRED slayer':



            enemy.image.name = 'MD';



            enemy.image.size = '80%';



            break;



    };



}







const enemyLoadStats = () => {



    // Shows proper percentage for respective stats



    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;



    if (enemy.stats.hp > enemy.stats.hpMax) {



        enemy.stats.hp = enemy.stats.hpMax;



    }



    enemy.stats.hpPercent = ((enemy.stats.hp / enemy.stats.hpMax) * 100).toFixed(2).replace(rx, "$1");







    const enemyHpElement = document.querySelector('#enemy-hp-battle');



    const enemyHpDamageElement = document.querySelector('#enemy-hp-dmg');



    enemyHpElement.innerHTML = `&nbsp${nFormatter(enemy.stats.hp)}/${nFormatter(enemy.stats.hpMax)}<br>(${enemy.stats.hpPercent}%)`;



    enemyHpElement.style.width = `${enemy.stats.hpPercent}%`;



    enemyHpDamageElement.style.width = `${enemy.stats.hpPercent}%`;



        }



                    



      
