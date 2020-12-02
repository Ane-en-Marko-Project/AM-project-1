function myForEach(array,callbackFN){
    for (let i = 0; i < array.length; i++) {
        callbackFN(array[i],i,array)
    }
}

let data = {
    letters:["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    randomWord: function(){
        let index1 = Math.floor(Math.random() * 26);
        let index2 = Math.floor(Math.random() * 26);
        let index3 = Math.floor(Math.random() * 26);
        let index4 = Math.floor(Math.random() * 26);
        let index5 = Math.floor(Math.random() * 26);
        let index6 = Math.floor(Math.random() * 26);
        let index7 = Math.floor(Math.random() * 26);
        let index8 = Math.floor(Math.random() * 26);
        let index9 = Math.floor(Math.random() * 26);
        let index10 = Math.floor(Math.random() * 26);
        let index11 = Math.floor(Math.random() * 26);
        let index12 = Math.floor(Math.random() * 26);
        let index13 = Math.floor(Math.random() * 26);
        let index14 = Math.floor(Math.random() * 26);
        let index15 = Math.floor(Math.random() * 26);
        return this.letters[index1]+this.letters[index2]+this.letters[index3]+this.letters[index4]+this.letters[index5]+this.letters[index6]+this.letters[index7]+this.letters[index8]+this.letters[index9]+this.letters[index10]+this.letters[index11]+this.letters[index12]+this.letters[index13]+this.letters[index14]+this.letters[index15];
    },
    lost: false,
    materials: {
        gold: 90,
        stone: 90,
        wood: 90
    },
    harvesters:[],
    towers: [],
    enemies: [],
    bullets: [],
    HQ:{
        health: 10,
        position: {
            row: 10,
            collumn: 10
        },
        ID: "HQ"
    },
    harvestingRates: {
        //hoeveel mats word per sekonde gemaak
        wood: 1,
        stone: 0,
        gold: 0
    },
    costs: {
        goldHarvester:{
            stone: 100,
            wood: 100,
            gold: 0
        },
        stoneHarvester:{
            stone: 0,
            wood: 80,
            gold: 0
        },
        woodHarvester:{
            stone: 0,
            wood: 30,
            gold: 0
        },
        towerHarvester:{
            stone: 70,
            wood: 70,
            gold: 0
        }
    },
    i: 0,
    waveNum: 0
}
function gameloop(){
    if(data.lost===false){
        setTimeout(gameloop,10);
    }
    else{
        looseHandler()
    }
    data.materials.wood += data.harvestingRates.wood/100;
    $(".wood-count").text(Math.floor(data.materials.wood));

    data.materials.stone += data.harvestingRates.stone/100;
    $(".stone-count").text(Math.floor(data.materials.stone));

    data.materials.gold += data.harvestingRates.gold/100;
    $(".gold-count").text(Math.floor(data.materials.gold));

    data.enemies.forEach(function(current){
        enemyAI(current.ID);  
    })
    data.bullets.forEach(function(current){
        bulletAI(current);
    });
    if(data.i%1200===0){
        data.waveNum++
        let i = 0;
        myloop();
        function myloop(){
            i++
            
            if(data.enemies.length===0){
                ID=1;
            }else{
                ID = data.enemies[data.enemies.length-1].ID + 1
            }

            //console.log(ID);
            ID = 'a' + ID;
            let img = '<img id="'+ID+'" class="enemy" src="https://mpng.subpng.com/20180330/igw/kisspng-drawing-clip-art-fireball-5abdbeb8e079e0.7271173215223845689195.jpg" alt=""></img>';
            $("body").prepend(img);
            data.enemies.push(new Enemy(ID));
            if(i<data.i/200){
                setTimeout(function(){
                    myloop();
                },200);
            }
        }
    }
    if(data.i%50===0 && data.enemies.length>0){
        //maak n bullet vir elke tower
        data.towers.forEach(function(current){
            let ID = data.randomWord();
            let position = current.position;
            $("body").prepend('<img id="'+ID+'" class="arrow" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqxOOeTKinvlPQGBbEGH1i5oHjF72NiVB7FQ&usqp=CAU" alt="">');
            document.querySelector("#"+ID).style.top = (position.row*100)+"px";
            document.querySelector("#"+ID).style.left = (position.collumn*100)+"px";
            data.bullets.push(new Bullet(ID,position));
        });
        //maak n bullet vir die HQ
        let ID = data.randomWord();
        let position = {row:10,collumn:10}
        $("body").prepend('<img id="'+ID+'" class="arrow" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqxOOeTKinvlPQGBbEGH1i5oHjF72NiVB7FQ&usqp=CAU" alt="">');
        // console.log(document.querySelector("#"+ID).style.top);
        document.querySelector("#"+ID).style.top = (position.row*100)+"px";
        document.querySelector("#"+ID).style.left = (position.collumn*100)+"px";
        // console.log(document.querySelector("#"+ID).style);
        data.bullets.push(new Bullet(ID,position));
    }
    data.i++
}

function Harvester(type,position,ID){
    this.type = type;
    this.position = position;
    this.health = 3;
    this.ID = ID;
}
function Tower(position,ID){
    this.position = position;
    this.ID = ID;
    this.health = 5;
}
function Enemy(ID){
    this.ID = ID;
    this.health = 3;
    this.row = 0;
    this.collumn = 0;
}
function Bullet(ID,position={row:0,column:0}){
    this.ID = ID;
    this.position = position;
}

function createBuildings(){

    $(".gold-harvester").on("click",createBuilding)
    $(".wood-harvester").on("click",createBuilding)
    $(".stone-harvester").on("click",createBuilding)
    $(".main-tower").on("click",createBuilding)

    function createBuilding(event){
        let type = event.target.className.split("-")[1].split(" ")[1];
        // animate
        if (type==="gold") {
            $(".gold-harvester").css("opacity",1);
            $(".stone-harvester").css("opacity",0.6);
            $(".wood-harvester").css("opacity",0.6);
            $(".main-tower").css("opacity",0.6);
        }else if(type==="stone"){
            $(".stone-harvester").css("opacity",1);
            $(".gold-harvester").css("opacity",0.6);
            $(".wood-harvester").css("opacity",0.6);
            $(".main-tower").css("opacity",0.6);
        }else if (type==="wood") {
            $(".wood-harvester").css("opacity",1);
            $(".stone-harvester").css("opacity",0.6);
            $(".gold-harvester").css("opacity",0.6);
            $(".main-tower").css("opacity",0.6);
        }else if(type=="tower"){
            $(".main-tower").css("opacity",1);
            $(".wood-harvester").css("opacity",0.6);
            $(".stone-harvester").css("opacity",0.6);
            $(".gold-harvester").css("opacity",0.6);
        }
        // add event listeners
        $(".grid-piece").off();
        $(".grid-piece").one("click",function(event){
            // maak 'n nuwe gebou as user genoeg mats het
            if (data.materials.gold>=data.costs[type+"Harvester"].gold && data.materials.stone>=data.costs[type+"Harvester"].stone && data.materials.wood>=data.costs[type+"Harvester"].wood) {
                //werk die position uit
                if(event.currentTarget !== event.target){
                    return;
                }
                let position = {
                    row: parseFloat(event.target.className.split(" ")[1].split("-")[1]),
                    collumn: parseFloat(event.target.parentNode.className.split(" ")[0].split("-")[1])
                }
                //maak 'n unieke ID
                let ID = data.randomWord();
                //push in data in
                if(type==="tower"){
                    data.towers.push(new Tower(position,ID));
                }else{
                    let harverster = new Harvester(type, position,ID);
                    data.harvesters.push(harverster);
                    data.harvestingRates[type] += 3
                }
                //kies die img
                let img;
                if (type==="gold") {
                    img = '<img id='+ID+' class="gold-harvester" src="data:image/jpeg;base64,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" alt="">'
                }else if(type==="stone"){
                    img = '<img id='+ID+' class="stone-harvester" src="data:image/jpeg;base64,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" alt="">'
                }else if (type==="wood") {
                    img = '<img id='+ID+' class="wood-harvester" src="data:image/jpeg;base64,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" alt="wood-colecter">'
                }else if(type==="tower"){
                    img = '<img id='+ID+' class="tower" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYOeVgnD3nFs_dVPqCcjiqwUQNZCGp8e5yvQ&usqp=CAU" alt="">'
                }
                // maak die img
                event.target.insertAdjacentHTML("beforeend",img)
                event.target.style.width="100px";
                //trek mats af
                data.materials.gold -= data.costs[type+"Harvester"].gold;
                data.materials.stone -= data.costs[type+"Harvester"].stone;
                data.materials.wood -= data.costs[type+"Harvester"].wood;
            }
        });
    };
}
function removeBuildings(){
    $("body").on("auxclick", removeBuilding);
    function removeBuilding(event){
        if(event.target.className.split("-")[1]==="harvester" || event.target.className.split(" ")[1]){
            //het gekliek op n harvester of tower
            document.getElementById(event.target.id).remove();
            let type = event.target.className.split("-")[0];
            data.harvestingRates[type] -= 3;
            // kyk of dit n harvester is
            data.harvesters.forEach(function(current,index,array){
                if(current.ID===event.target.id){
                    array.splice(index,1);
                }else{
                    console.log(current,event.target.id);
                }
            });
            // kyk of dit n tower is
            data.towers.forEach(function(current,index,array){
                if(current.ID===event.target.id){
                    array.splice(index,1);
                }else{
                    console.log(current,event.target.id);
                }
            });
        }
    }
}
removeBuildings();
createBuildings();
gameloop();

function enemyAI(enemyID){
    // kyk na top en left om position uit te werk    
    let top = parseFloat($("#"+enemyID).css("top").replace("px"),"");
    
    let left = parseFloat($("#"+enemyID).css("left"));
    //console.log($("#"+enemyID).css("top"));
    // gebruik top en left * 100 om position met die grid te sync
    let row = (top/100)+0.5;
    let collumn = (left/100)+0.5;
    let total = row + collumn;
    data.enemies.forEach(function(current,index){
        if(current.ID===enemyID){
            current.row = row;
            current.collumn = collumn;
        }
    })
    // werk uit watse build is die naaste
    let positions = [data.HQ];//sit HQ se row + collumn by
    data.harvesters.forEach(function(current){
        positions.push(current);
    });

    data.towers.forEach(function(current){
        positions.push(current);
    });

    let least;
    let leastDifference = 100

    myForEach(positions,function(current){
        let difference = total - (current.position.row+current.position.collumn);

        //maak seker difference is 0 of meer
        if(difference<0){
            difference *= -1;
        }

        if(difference<leastDifference){
            leastDifference = difference;
            least = current;
        }
    });
    //check of hy op gebou is en as hy is self destruct + doen damage aan gebou
    if(leastDifference<0.1){
        //enemy is bo-op gebou
        data.enemies.forEach(function(current,index,arr){
            if(current.ID === enemyID){
                //dit is die regte enemy
                arr.splice(index,1);
                document.querySelector("#"+enemyID).remove();
                least.health -= 1;
                if(least.health<=0){
                    // delete gebou
                    document.querySelector("#"+least.ID).remove();
                    if(least.ID==="HQ"){
                        data.lost=true;
                    }
                    data.harvesters.forEach(function(current,index,arr){
                        if(current.ID===least.ID){
                            // dis die regte een
                            arr.splice(index,1);
                            data.harvestingRates[current.type] -= 3;
                        }
                    });
                    data.towers.forEach(function(current,index,arr){
                        if(current.ID===least.ID){
                            // dis die regte een
                            arr.splice(index,1);
                        }
                    });
                }
            }
        });
    }else{
        //gaan sekere hoeveelheid px nader aan naaste gebou
        if(row>least.position.row){
            //beweeg boontoe
            top -= 2
            document.querySelector("#"+enemyID).style.top = top+"px";
        }
        if(row<least.position.row){
            //beweeg ondertoe
            top += 2
            document.querySelector("#"+enemyID).style.top = top+"px";
        }
        if(collumn>least.position.collumn){
            //beweeg links
            left -= 2
            document.querySelector("#"+enemyID).style.left = left+"px";
        }
        if(collumn<least.position.collumn){
            //beweeg regs
            left += 2
            document.querySelector("#"+enemyID).style.left = left+"px";
        }
    }
}
function bulletAI(bullet){
    //as daar geen enemies is nie self destruct
    if(data.enemies.length<1){
        data.bullets.forEach(function(current,index){
            if(current.ID===bullet.ID){
                let ID = "#"+current.ID;
                document.querySelector(ID).remove();
                data.bullets.splice(index,1);
            }
        });
        return
    }
    //werk eie position uit
    let top = parseFloat(document.querySelector("#"+bullet.ID).style.top);
    let left = parseFloat(document.querySelector("#"+bullet.ID).style.left); 
    let row = top/100+0.5;
    let collumn = left/100+0.5;
    let total = row+collumn;
    //kry naaste enemie
    //closest is die naaste enemie
    let closest = {}
    let closestTotal = 100;
    data.enemies.forEach(function(current){
        current.total = current.row + current.collumn;
        let difference = total - current.total;
        if(difference<0){
            //maak seker difference is positief
            difference *= -1;
        }
        if(difference<closestTotal){
            closestTotal = difference;
            closest = current;
        }
        
    });
    //check of hy bo-op die enemie is en as hy is doen damage + self destruct
    if(closestTotal<1){
        //bo-op enemy

        //doen damage
        closest.health --
        //as enemie se health op is delete die enemy
        if(closest.health<1){
            data.enemies.forEach(function(current,index,arr){
                if(current.ID===closest.ID){
                //delete van data
                arr.splice(index,1);
                //delete van UI
                document.querySelector("#"+closest.ID).remove();
                }
            });
        }


        //self destruct
        data.bullets.forEach(function(current,index){
            if(current.ID===bullet.ID){
                let ID = "#"+current.ID;
                document.querySelector(ID).remove();
                data.bullets.splice(index,1);
            }
        });
         //return sodat browser nie proebeer om style te verander nadat element delete is
        return
    }

    //beweeg bullet na die enemie toe net soos enemie beweeg behalewe vinniger
    let ID = "#"+bullet.ID;
    if(row>closest.row){
        //beweeg boontoe
        top -= 6;
        document.querySelector(ID).style.top = top+"px";
    }
    if(row<closest.row){
        //beweeg ondertoe
        top += 6
        document.querySelector(ID).style.top = top+"px";
    }
    if(collumn>closest.collumn){
        //beweeg links
        left -= 6
        document.querySelector(ID).style.left = left+"px";
    }
    if(collumn<closest.collumn){
        //beweeg regs
        left += 6
        document.querySelector(ID).style.left = left+"px";
    }
}
function looseHandler(){
    console.log("lost");
    document.querySelector("body").insertAdjacentHTML("beforeend",`
        <div class="loose-container">
            <h1 class="loose-heading">Congratulations, you survived <span class="wave-count">0</span> waves!</h1>
            <a class="fas fa-redo restart-btn" href="index.html"></a>
            <a class="fas fa-home home-btn" href="Home.html"></a>
        </div>
    `);
    $(".wave-count").text(data.waveNum-1);
}
function repairBuildings(){
    // add Event Listener aan die hele body
    document.addEventListener("click",repair);

    function repair(){
        // check of event.target n gebou is en as dit nie is nie return
        if(event.target.className!=="tower"&&event.target.className.split("-")[1]!=="harvester"&&event.target.id!=="HQ"){
            return;
        }
    
        //trek gold af; as user nie genoeg goud het nie return
        if(data.materials.gold>50){
            data.materials.gold -= 50
        }else{
            return
        }

        //maak health vol
        data.harvesters.forEach(function(current){
            if(event.target.id===current.ID){
                current.health=3
            }
        });
        data.towers.forEach(function(current){
            if(event.target.id===current.ID){
                current.health=5
            }
        });
        if(event.target.id==="HQ"){
            data.HQ.health=10
        }
    }
}
repairBuildings();