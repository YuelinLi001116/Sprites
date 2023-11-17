class Spirit {
  constructor() {
    this.features = {}; 
    this.randomizeFeatures();
    this.selected = false; 
    this.x = 0;
    this.y = 0;
  }

  randomizeFeatures() {
    for (const feature in spiritFeatures) {
      this.features[feature] = random(featureImages[feature]);
    }
  
  }

  
  
  display(x, y, size) {
    this.x = x; // 更新精灵的 x 坐标
    this.y = y; // 更新精灵的 y 坐标
    if (this.selected) {
      fill(255, 182, 193, 128); 
      noStroke(); 
      ellipse(x + spiritWidth / 2, y + spiritWidth / 2, spiritWidth-10, spiritWidth-10);
    }
  
    // 根据是否提供了 size 参数来决定如何绘制精灵
    if (size) {
      // 使用提供的尺寸绘制精灵的每个特征
      image(this.features.wings, x, y, size, size); 
      image(this.features.skin, x, y, size, size);
      image(this.features.ear, x, y, size, size);
      image(this.features.hair, x, y, size, size);
      image(this.features.hat, x, y, size, size);
      image(this.features.clothes, x, y, size, size);
    } else {
      // 使用原始尺寸绘制精灵的每个特征
      image(this.features.wings, x, y); 
      image(this.features.skin, x, y);
      image(this.features.ear, x, y);
      image(this.features.hair, x, y);
      image(this.features.hat, x, y);
      image(this.features.clothes, x, y);
    }
  
 
   
  }

  isClicked(x, y) {
    // each spirit a square
    let spiritLeft = this.x;
    let spiritRight = this.x + spiritWidth;
    let spiritTop = this.y;
    let spiritBottom = this.y + spiritWidth;

    return x > spiritLeft && x < spiritRight && y > spiritTop && y < spiritBottom;
}
  isClicked(mx, my) {
  let spiritLeft = this.x-20;
  let spiritRight = this.x + spiritWidth-20;
  let spiritTop = this.y-20;
  let spiritBottom = this.y + spiritWidth-20;

  return mx > spiritLeft && mx < spiritRight && my > spiritTop && my < spiritBottom;
}
}