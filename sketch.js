const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var navio = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

  //navio = new Boat(1100,550,170,170, -80);

}

function draw() {
  //imagem do background
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  for (var i = 0; i < balls.length; i++) {
    exibir(balls[i]);
    collisionWithBoat(i)
  }
  
  cannon.display();
  mostrarnavios();

  
}

function keyPressed() {
  if (keyCode === 32) {
    var cannonball = new CannonBall(cannon.x, cannon.y);
    cannonball.trajectory = [];
    Matter.Body.setAngle(cannonball.body, cannon.angle);
    balls.push(cannonball);
  }
}

function exibir(ball) {
  if (ball) {
    ball.display();
  }
}

function keyReleased() {
  if (keyCode === 32) {
    balls[balls.length - 1].atirar();
  }
}

function mostrarnavios(){
   if(navio.length > 0){
     if(navio[navio.length - 1]== undefined||navio[navio.length - 1].body.position.x < 1000){
      var pos = [-40,-60,-80,-20]
      var p = random(pos) 
      var boat = new Boat(1200,550,170,170,p)
      navio.push(boat)
    }
     
     for(i = 0; i < navio.length;i++){
      Matter.Body.setVelocity(navio[i].body,{x:-0.9,y:0})
      navio[i].display()
     }
   }
   else{
     var boat = new Boat(1200,550,170,170,-60)
     navio.push(boat)
   }

}

function collisionWithBoat(index){
  for(var i = 0; i < navio.length; i++){
     if(balls[index] != undefined && navio[i] != undefined){
     var colidiu = Matter.SAT.collides(balls[index].body, navios[i].body);
     }
    if(colidiu.collided){
      navio[i].remover(i)
      Matter.World.remove(world,balls[index].body)
      delete balls[index]
    }
  }
}