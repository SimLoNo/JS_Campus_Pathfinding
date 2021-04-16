const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer({ antialias: true})

var getData = new XMLHttpRequest();

// Et 2d array, der bruges til at opbygge banen/kortet.

//var map = getData.responseText;

var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
]
console.log(map + " MapArray.");
console.log(map[0] + " MapArray[0].");

var waypoint = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,2,0,0,2,0,0,0,0,0,1],
    [1,2,0,2,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var pathpoints = new Array();

var pathpointsCounter = 1;







for (let slot = 0; slot < map.length; slot++) { // Et for-loop, der køre på den vertikale længde på 2d arrayet "map", der opbygger banen, række for række.
    for (let index = 0; index <= map[slot].length; index++) { // et for-loop der køre på den vandrette længde af 2d arrayet "map" og opbygger en række på banen.

        //const element = element[index];
        if (map[slot][index] == 1) { // Hvis positionen på 2d arrayet "map" indikere at der skal være en klods, køre if-sætningen.

            var geometry = new THREE.BoxGeometry( 1, 1, 1)
            var material = new THREE.MeshStandardMaterial( { color: 0xff0051 })
            var cube = new THREE.Mesh ( geometry, material )
            
            cube.position.x = index;
            cube.position.z = slot;
    
            scene.add( cube )
        }
        
    }
}

for (let slot = 0; slot < waypoint.length; slot++) { // Et for-loop, der køre på den vertikale længde på 2d arrayet "map", der opbygger banen, række for række.
    for (let index = 0; index <= waypoint[slot].length; index++) { // et for-loop der køre på den vandrette længde af 2d arrayet "map" og opbygger en række på banen.

        //const element = element[index];
        if (waypoint[slot][index] == 2) { // Hvis positionen på 2d arrayet "map" indikere at der skal være en pathpoint, køre if-sætningen.

			var tempArray = [pathpointsCounter,index,slot];
			//console.log(tempArray + " tempArray.")
			pathpoints.push([pathpointsCounter,index,slot]);
			pathpointsCounter += 1;
    
        }
        
    }
}
//console.log(pathpoints);
var route = [0,3,4,1,2];
var routePoint = 1;
//camera.position.set(0,0,0);
//camera.position.set(pathpoints[route[routePoint][1]],1,pathpoints[route[routePoint][2]]);
//camera.lookAt(new THREE.Vector3(pathpoints[route[routePoint+1][1]],0,pathpoints[route[routePoint+1][2]]));


// const fs = require('fs')
// Anders kode starter her. ------------------------------------------- 
class Player{
	constructor(){
	console.log(pathpoints + " Pathpoints array.");
	console.log(pathpoints[0] + " Startingpoint");
	console.log(pathpointsCounter + " PathpointsCounter.");
	this.pos = new THREE.Vector3(pathpoints[0][1],0,pathpoints[0][2]);
	this.rotationAngle = 0 //camera.lookAt(new THREE.Vector3(pathpoints[route[1]][1],0,pathpoints[route[1]][2]));
	this.moveSpeed = 1.01;
	this.turnDirection = 0;	//-1:left, 1:right
	this.rotationSpeed = 3 * (Math.PI/180);	//degrees per frame
	this.walkDirection = 0;	//-1:backwards, 1:forwards
	this.walkPoint = 1;
	this.runPath = true;
	}
	
	movementX(direction){
		console.log(direction + " Direction X Movement.");
		let moveStep = direction * this.moveSpeed;
		var newX1 = this.pos.x * moveStep;
		return newX1;
	}

	movementZ(direction){
		console.log(direction + " Direction Z Movement.");
		let moveStep = direction * this.moveSpeed;
		var newZ1 = this.pos.z * moveStep;
		return newZ1;
	}


	update(){
		//var rotationVector = new THREE.Vector3(camera.position);
		//rotationVector.applyQuaternion(camera.quaternion);
		//this.rotationAngle += this.turnDirection * this.rotationSpeed;

		//this.rotationAngle = rotationVector.applyQuaternion(camera.quaternion).y;

		//let moveStep = this.walkDirection * this.moveSpeed;

		//console.log("Update Running.");
		//console.log(camera.rotation + " CameraRotation.");
		//console.log(this.rotationAngle + " RotationAngle.");

		//this.rotationAngle = camera.rotation.y;



		// Her skal rotationAngle udregnes, ud fra kamerarets nuværende position, og næste punkts position.
		this.rotationAngle;




		// det skyldes måske akserne
		// akserne er byttet om i forhold til tidliger kodeeksmpelr, dvs
		// også sige cos og sin er byttet og turnDirection er vendt om
		var newX = this.pos.x + Math.sin(this.rotationAngle) * moveStep;
		let newZ = this.pos.z + Math.cos(this.rotationAngle) * moveStep;

		//var newX //= this.pos.x //* moveStep;
		//var newZ //= this.pos.z //* moveStep;
		console.log(camera.position.z + " Camera Z.");
		console.log(camera.position.x + " Camera X.");
		/*if (this.runPath == true){
			if (camera.position.x > pathpoints[route[this.walkPoint]][1]) {
			newX = this.movementX(-1)
			this.pos.x = newX;
			console.log("Movement 1");
			}
			else if (camera.position.x < pathpoints[route[this.walkPoint]][1]) {
			newX = this.movementX(1)
			this.pos.x = newX;
			console.log("Movement 2");
			}
			else if (camera.position.Z > pathpoints[route[this.walkPoint]][2]) {
			newZ = this.movementZ(-1)
			this.pos.z = newZ;
			console.log("Movement 3");
			}
			else if (camera.position.Z < pathpoints[route[this.walkPoint]][2]) {
			newZ = this.movementZ(1)
			this.pos.z = newZ;
			console.log("Movement 4");
			}
			else {
			console.log("Movement 5");
			}
		}*/
		
		

		// der er noget her der skal vendes rigtigt, eller stemme overens med når klodserne pladseres
		//this.pos.z = newZ;
		//this.pos.x = newX;

		/*if ((camera.position.z >= pathpoints[route[this.walkPoint]][1]-1 || camera.position.z <= pathpoints[route[this.walkPoint]][1]+1) && (camera.position.x >= pathpoints[route[this.walkPoint]][2]-1 || camera.position.x <= pathpoints[route[this.walkPoint]][2]+1)){
			if (this.walkPoint+1 >= route.length) {
				this.walkDirection = 0;
				this.walkPoint = 1;
			}
			else {
				this.walkPoint++;
				this.walkDirection = 0;
			}
		}*/

		

		

		//camera.rotation.y = this.rotationAngle;
		//var testRotation = camera.lookAt(new THREE.Vector3(pathpoints[route[this.walkPoint]][1],0,pathpoints[route[this.walkPoint]][2]));
		//console.log(new THREE.Vector3(pathpoints[route[this.walkPoint]][1],0,pathpoints[route[this.walkPoint]][2]) + " Camera position.")
		
		//camera.position.set(pathpoints[route[routePoint][1]],1,pathpoints[route[routePoint][2]]);
		//camera.lookAt(new THREE.Vector3(pathpoints[route[routePoint+1][1]],0,pathpoints[route[routePoint+1][2]]));
		camera.position.z = this.pos.z;
		camera.position.x = this.pos.x;

		//var distance = camera.position.distanceTo(new THREE.Vector3(route[this.walkPoint[1]],0,route[this.walkPoint[2]]))
		//var distance = camera.position.distanceTo(new THREE.Vector3(pathpoints[route[this.walkPoint]][1],0,pathpoints[route[this.walkPoint]][2]));
		//console.log(distance +" Distance to next point.")

		/*if ((camera.positionS.z < pathpoints[route[this.walkPoint]][1] || camera.position.z > pathpoints[route[this.walkPoint]][1]) && (camera.position.x < pathpoints[route[this.walkPoint]][2] || camera.position.x > pathpoints[route[this.walkPoint]][2])) {
			//camera.position.set(new THREE.Vector3(pathpoints[route[this.walkPoint]][1],0,pathpoints[route[this.walkPoint]][2]));
			if (this.walkPoint+1 >= route.length) {
				this.walkDirection = 0;
				//this.walkPoint = 1;
			}
			else {
				//this.walkPoint++;
				this.walkDirection = 0;
			}
		}*/
		
		
		camera.lookAt(new THREE.Vector3(pathpoints[route[this.walkPoint]][1],0,pathpoints[route[this.walkPoint]][2]));
		
		

	}
}

class InputHandler{
	constructor(player){
		// der bør laves noget her, så inputhandleren hæftes på det objekt som det styrer
		// er ikke sikker på dette er den korrekte måde 
		this.player = player;

	document.addEventListener("keydown", event => {
		if (event.keyCode == 13)
			this.runPath = !this.runPath;
		/*if (event.keyCode == 39)
			player.turnDirection = -1;
		if (event.keyCode == 38)
			player.walkDirection = -1;
		if (event.keyCode == 40)
			player.walkDirection = 1;*/
	});
			
	/*document.addEventListener("keyup", event => {
		if (event.keyCode == 37)
			player.turnDirection = 0;
		if (event.keyCode == 39)
			player.turnDirection = 0;
		if (event.keyCode == 38)
			player.walkDirection = 0;
		if (event.keyCode == 40)
			player.walkDirection = 0;
	})*/;	

	}

}

player = new Player();

//inputHandler = new InputHandler(player);

var geometry1 = new THREE.DodecahedronGeometry(.25,1);
//var material1 = new THREE.MeshLambertMaterial({color: 0xFF2222});
var material1 = new THREE.MeshNormalMaterial({color: 0xFF2222});


var mesh1 = new THREE.Mesh(geometry1,material1);

scene.add(mesh1);

// Anders kode slutter her. -------------------------------------------------------------------

renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )
/*
//getData.onreadystatechange = function(){
//console.log(getData);

//var counter = [[0],[0]];
// Et 2d array, der bruges til at opbygge banen/kortet.

//var map = getData.responseText;

var map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var waypoint = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,2,0,0,2,0,0,0,0,0,1],
    [1,2,0,2,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var pathpoints;

var pathpointsCounter = 0;





for (let slot = 0; slot < map.length; slot++) { // Et for-loop, der køre på den vertikale længde på 2d arrayet "map", der opbygger banen, række for række.
    for (let index = 0; index <= map[slot].length; index++) { // et for-loop der køre på den vandrette længde af 2d arrayet "map" og opbygger en række på banen.

        //const element = element[index];
        if (map[slot][index] == 1) { // Hvis positionen på 2d arrayet "map" indikere at der skal være en klods, køre if-sætningen.

            var geometry = new THREE.BoxGeometry( 1, 1, 1)
            var material = new THREE.MeshStandardMaterial( { color: 0xff0051 })
            var cube = new THREE.Mesh ( geometry, material )
            
            cube.position.x = index;
            cube.position.z = slot;
    
            scene.add( cube )
        }
        
    }
}

for (let slot = 0; slot < waypoint.length; slot++) { // Et for-loop, der køre på den vertikale længde på 2d arrayet "map", der opbygger banen, række for række.
    for (let index = 0; index <= waypoint[slot].length; index++) { // et for-loop der køre på den vandrette længde af 2d arrayet "map" og opbygger en række på banen.

        //const element = element[index];
        if (waypoint[slot][index] == 2) { // Hvis positionen på 2d arrayet "map" indikere at der skal være en pathpoint, køre if-sætningen.

			pathpoints += [pathpointsCounter,Vector3(index,0,slot)];
			pathpointsCounter += 1;
    
        }
        
    }
}
//console.log(pathpoints);
var route = [0,3,4,1,2];
var routePoint = 1;
camera.position.set(0,0,0);
//camera.position.set(pathpoints[route[routePoint][1]],1,pathpoints[route[routePoint][2]]);
//camera.lookAt(new THREE.Vector3(pathpoints[route[routePoint+1][1]],0,pathpoints[route[routePoint+1][2]]));

//} // OnReadyState function end.
*/

// 2 linjer kode der tilføjer ambient light, til scenen.
var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.5)
scene.add( ambientLight ) 

// 3 linjer kode der tilføjer pointlight til scenen.
var pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );

/*camera.position.z = 10;
camera.position.y = -map.length / 2;
camera.position.x = map[0].length / 2;
*/
// Anders kode starter-----------------------------

var render = function(){
	requestAnimationFrame(render);
	
	player.update();
	
	mesh1.position.z = 5;
	mesh1.position.x = 8;
	mesh1.rotation.x += 0.01;
	mesh1.rotation.z += 0.01;

	
	renderer.render(scene,camera);
}
//getData.open("GET", "MapText.txt", false);
//getData.send();
render();
// Anders kode slutter ---------------------------