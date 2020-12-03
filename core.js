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
    data.materials.wood += data.harvestingRates.wood/50;
    $(".wood-count").text(Math.floor(data.materials.wood));

    data.materials.stone += data.harvestingRates.stone/50;
    $(".stone-count").text(Math.floor(data.materials.stone));

    data.materials.gold += data.harvestingRates.gold/50;
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
            document.querySelector("#"+ID).style.top = (position.row*50)+"px";
            document.querySelector("#"+ID).style.left = (position.collumn*50)+"px";
            data.bullets.push(new Bullet(ID,position));
        });
        //maak n bullet vir die HQ
        let ID = data.randomWord();
        let position = {row:10,collumn:10}
        $("body").prepend('<img id="'+ID+'" class="arrow" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqxOOeTKinvlPQGBbEGH1i5oHjF72NiVB7FQ&usqp=CAU" alt="">');
        // console.log(document.querySelector("#"+ID).style.top);
        document.querySelector("#"+ID).style.top = (position.row*50)+"px";
        document.querySelector("#"+ID).style.left = (position.collumn*50)+"px";
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
                    img = '<img id='+ID+' class="gold-harvester" src="images/gold-mine.png" alt="">'
                }else if(type==="stone"){
                    img = '<img id='+ID+' class="stone-harvester" src="images/bulldozer.png" alt="">'
                }else if (type==="wood") {
                    img = '<img id='+ID+' class="wood-harvester" src="images/wood.png" alt="wood-colecter">'
                }else if(type==="tower"){
                    img = '<img id='+ID+' class="tower" src="images/tower.png" alt="">'
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
    let row = (top/50)+0.5;
    let collumn = (left/50)+0.5;
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
            top -= 1
            document.querySelector("#"+enemyID).style.top = top+"px";
        }
        if(row<least.position.row){
            //beweeg ondertoe
            top += 1
            document.querySelector("#"+enemyID).style.top = top+"px";
        }
        if(collumn>least.position.collumn){
            //beweeg links
            left -= 1
            document.querySelector("#"+enemyID).style.left = left+"px";
        }
        if(collumn<least.position.collumn){
            //beweeg regs
            left += 1
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
    let row = top/50+0.5;
    let collumn = left/50+0.5;
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
        top -= 3;
        document.querySelector(ID).style.top = top+"px";
    }
    if(row<closest.row){
        //beweeg ondertoe
        top += 3
        document.querySelector(ID).style.top = top+"px";
    }
    if(collumn>closest.collumn){
        //beweeg links
        left -= 3
        document.querySelector(ID).style.left = left+"px";
    }
    if(collumn<closest.collumn){
        //beweeg regs
        left += 3
        document.querySelector(ID).style.left = left+"px";
    }
}
function looseHandler(){
    console.log("lost");
    document.querySelector("body").insertAdjacentHTML("beforeend",`
        <div class="loose-container">
            <h1 class="loose-heading">Congratulations, you survived <span class="wave-count">0</span> waves!</h1>
            <a class="fas fa-redo restart-btn" href="index.html#HQ"></a>
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