let myFont;
let showOverlay = true;
let sceneImages = {};
let currentScene;
let spiritFeatures = {
  skin: 4,
  clothes: 17,
  ear: 2,
  hair: 4,
  wings: 9,
  hat: 12,
};
let featureImages = {};
let selectedSpirites = [];
let spirites = [];
let button;
let spiritWidth = 100;
let spacing = 20;
let totalWidth;
let startX;
let mode = 0;
let exploreButton = null;
let startButton;
let randomSpirit; //for sprites in scene2

function preload() {
  myFont = loadFont('assets/font.ttf');
  for (const feature in spiritFeatures) {
    featureImages[feature] = [];
    for (let i = 1; i <= spiritFeatures[feature]; i++) {
      let filename ="assets"+"/"+ feature + "/" + i + ".PNG";
      featureImages[feature].push(loadImage(filename));
    }
  }
  sceneImages.background = loadImage("assets/1scene/background.PNG");
  sceneImages.cloud = loadImage("assets/1scene/cloud.PNG");
  sceneImages.bird1 = loadImage("assets/1scene/bird1.PNG");
  sceneImages.bird2 = loadImage("assets/1scene/bird2.PNG");
  sceneImages.island = loadImage("assets/1scene/island.PNG");
  sceneImages.pink = loadImage("assets/1scene/pink.PNG");
}

function setup() {
  createCanvas(800, 400);
  generateSpirites();

  //generate button
  button = createImg("assets/GENERATE.PNG", "Generate New Spirites");
  button.mousePressed(generateSpirites);
  button.style("cursor", "pointer");
  button.style("width", "150px");
  button.style("height", "auto");
   button.position((width - button.width) / 2, height -190 );
   
   //start button
   startButton = createImg("assets/scene1/START.PNG", "Start");
   startButton.mousePressed(goToNextScene);
   startButton.position((width - startButton.width) / 2-70, height - 130);
   startButton.style("cursor", "pointer");
   startButton.style("width", "135px");
   startButton.style("height", "auto");
   startButton.hide();
  }




function draw() {
  if (showOverlay) {
    displayOverlay();
  } else {
  background(255);
  
  switch (mode) {
    case 0:
      scene0();
      if (showOverlay) {
        displayOverlay(); 
      }
      break;
    case 1:
      scene1();
      break;
    case 2:
      scene2();
  }
}}
function displayOverlay() {
  button.hide();
  image(sceneImages.background, 0,0,"800", "450"); 
  image(sceneImages.cloud, 0,0,"800", "450"); 
  image(sceneImages.bird1, 0,0,"500", "300"); 
  image(sceneImages.bird2, 0,0,"500", "300"); 
  image(sceneImages.island, 30,0,"700", "400"); 
  tint(255, 127);
  image(sceneImages.pink, 0, 0, width, height); 
  noTint(); 
  textFont(myFont);
  fill(0); 
  textSize(15);
  textAlign(CENTER, CENTER);
  button.hide();
  let lines = [
    "In a remote corner of the universe,",
    "there exists a world filled with pixel spirits.",
    "This world is surrounded by a unique energy,",
    "making it a place full of magic and possibilities."
  ];

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width / 2, height / 2 - 60 + i * 30); 
  }
}



function scene0() {
  background(0,0,0);
  button.hide();
  image(sceneImages.background, 0,0,"800", "450"); 
  image(sceneImages.cloud, 0,0,"800", "450"); 
  image(sceneImages.bird1, 0,0,"500", "300"); 
  image(sceneImages.bird2, 0,0,"500", "300"); 
  image(sceneImages.island, 30,0,"700", "400"); 
  
  if (exploreButton === null) {
    exploreButton = createImg('assets/1scene/EXPLORE.PNG', 'Explore');
    exploreButton.position(350, 300); // Set the button position
    exploreButton.mousePressed(goToScene1);
    exploreButton.style('cursor', 'pointer');
    exploreButton.style('width', '150px');
    exploreButton.style('height', 'auto');
  } else {
    exploreButton.show(); // Make sure the button is visible in scene0
  }
}

function goToScene1() {
  mode = 1; 
  exploreButton.hide(); 
}


function scene1() {
  image(sceneImages.background, 0,0,"800", "450"); 
  image(sceneImages.cloud, 0,0,"800", "450"); 
  image(sceneImages.bird1, 0,0,"500", "300"); 
  image(sceneImages.bird2, 0,0,"500", "300"); 
  image(sceneImages.island, 30,-100,"1000", "550"); 
  tint(255, 128); 
  image(sceneImages.pink, 0, 0, "800", "450");
  noTint(); 
  
  textFont(myFont); 
  textSize(10);
  fill(0); 
  noStroke();
  textAlign(CENTER, 200); 
  text("Select 2 sprites to start", width / 2, height / 2+64); 

  textFont(myFont); 
  textSize(10); 
  fill(0); 
  noStroke();
  textAlign(CENTER, 150); 
  text("Click on generate to get more sprites", width / 2, height / 2+3); 

  button.show();
  startButton.show();
  if (exploreButton) {
    exploreButton.hide();
  }
  for (let i = 0; i < spirites.length; i++) {
    let x = startX + i * (spiritWidth + spacing);
    let y = height / 2 - 80 - spiritWidth / 2;
    spirites[i].display(x, y);
  }
  // spirites middle
  for (let i = 0; i < spirites.length; i++) {
    spirites[i].display(
      startX + i * (spiritWidth + spacing),
      height / 2 - 80 - spiritWidth / 2
    );
    totalWidth = spiritWidth * spirites.length + spacing * (spirites.length - 1);
    startX = (width - totalWidth) / 2;
  }
}

function mousePressed() {
  if (showOverlay) {
    showOverlay = false; // click and hide
    mode = 0;
  } else if (mode === 2) {
    let anySelected = false;
    for (let spirit of newSpirites) {
      if (spirit.isClicked(mouseX, mouseY)) {
        anySelected = true;
        spirit.selected = true;
      } else {
        spirit.selected = false; 
      }
    }

    // if unselected, hide button
    if (!anySelected) {
      button.hide();
    }

    // clicked button or not
    if (mouseX >= button.x && mouseX <= (button.x + button.width) &&
        mouseY >= button.y && mouseY <= (button.y + button.height)) {
      // random one
      randomSpirit = new Spirit();
      randomSpirit.randomizeFeatures();
     //which one selected
      let selectedSpirit = null;
      for (let i = 0; i < newSpirites.length; i++) {
        if (newSpirites[i].selected) {
          selectedSpirit = newSpirites[i];
          break;
        }
      }

      if (selectedSpirit) {
        newSpirites = [];
        for (let i = 0; i < 10; i++) {
          newSpirites.push(createMixedSpirit(selectedSpirit, randomSpirit));
        }
        positionNewSpirites();
      }
    }
  } else if (mode === 1) {
    // 在 scene1 检查是否点击了精灵
    for (let spirit of spirites) {
      if (spirit.isClicked(mouseX, mouseY)) {
        let index = selectedSpirites.indexOf(spirit);
        if (index === -1 && selectedSpirites.length < 2) {
          selectedSpirites.push(spirit);
          spirit.selected = true;
        } else if (index !== -1) {
          selectedSpirites.splice(index, 1);
          spirit.selected = false;
        }
        break; 
      }
    }

    
    if (selectedSpirites.length === 2) {
      startButton.show();
    } else {
      startButton.hide();
    }
  }
}



function goToNextScene() {
  if (selectedSpirites.length === 2) {
    startButton.hide(); 
    mode = 2; 
    randomSpirit = new Spirit();
    randomSpirit.randomizeFeatures(); 
    generateNewSpirites();
  }
}


function generateSpirites() {
  spirites = [];
  for (let i = 0; i < 5; i++) {
    spirites.push(new Spirit());
  }
  redraw();
  if (mode === 2) {
    let selectedSpirit = newSpirites.find(spirit => spirit.selected);
    if (selectedSpirit) {
      newSpirites = []; // clearold
      for (let i = 0; i < 10; i++) {
        newSpirites.push(createMixedSpirit(selectedSpirit, randomSpirit));
      }
      positionNewSpirites();
    }
  }

}

function createMixedSpirit(spirit1, spirit2) {
  let newSpirit = new Spirit();
  for (const feature in spiritFeatures) {
    newSpirit.features[feature] = random([
      spirit1.features[feature], 
      spirit2.features[feature]
    ]);
  }
  return newSpirit;
}


function generateNewSpirites() {
  newSpirites = [];
  for (let i = 0; i < 10; i++) {
    newSpirites.push(createMixedSpirit(selectedSpirites[0], selectedSpirites[1]));
  }
  positionNewSpirites();
}




function scene2() {
  image(sceneImages.background, 0,0,"800", "450"); 
  image(sceneImages.cloud, 0,0,"800", "450"); 
  image(sceneImages.bird1, 0,0,"500", "300"); 
  image(sceneImages.bird2, 0,0,"500", "300"); 
  image(sceneImages.island, 30,-100,"1000", "550"); 
  tint(255, 128); 
  image(sceneImages.pink, 0, 0, "800", "450");
  noTint(); 
  button.show(); //g
  startButton.hide();
 
  let rectSize = 60; 
  let rectX = width / 2 - rectSize / 2; 
  let rectY = height / 2 - rectSize / 2; 

  fill(144, 238, 144); 
  noStroke();
  rect(rectX, rectY, rectSize, rectSize);  
  let randomSpiritSize = 90;
  let spiritX = width / 2 - randomSpiritSize / 2;
  let spiritY = height / 2 - randomSpiritSize / 2-50;
  fill(144, 238, 144); 
  noStroke();
  rect(rectX, rectY-50, rectSize, rectSize); 
  randomSpirit.display(spiritX, spiritY, randomSpiritSize);
  
  textFont(myFont); 
  textSize(10); 
  fill(0);
  text("^ Here are the new sprites.",180, 120); 
  text("< This is the wild spirit you meet.", width -170, 180); 
  
  textFont(myFont); 
  textSize(13); 
  fill(0);
  text("Choose a new sprite, ", width/2,300);
  textFont(myFont); 
  textSize(13); 
  fill(0);
  text("click generate,", width/2,320);  
  textFont(myFont); 
  textSize(13); 
  fill(0);
  text("and see what new features you get!", width/2,340); 
 
  // 10new
  let newSpiritSize = 90;
  for (let spirit of newSpirites) {
    spirit.display(spirit.x, spirit.y, newSpiritSize);
  }
}
function positionNewSpirites() {
  let rows = 1;
  let cols = 10; 
  let padding = 60;
  let spacingX = (width - 2 * padding) / (cols - 1);
  let yOffset = 180;

  for (let i = 0; i < newSpirites.length; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    newSpirites[i].x = padding + col * spacingX-20;
    newSpirites[i].y = height / 2-yOffset; 
  }
}