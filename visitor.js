export default class Visitor{
	constructor(scene){
		this.walkPoint = 1;
		this.route = [0,1,2,,3];
		this.counter = 0;
		this.isRunning = false;
		this.isTurning = false;
		this.isFacing = false;

		this.body = new THREE.Object3D();
		
		this.body.position.x = 1.5;
		this.body.position.y = 0;
		this.body.position.z = 1.5;
	
		this.moveSpeed = 0.05;
		this.rotationSpeed = 3 * (Math.PI/180);	//degrees per frame

		this.turnDirection = 0;	//-1:left, 1:right
		this.walkDirection = 0;	//-1:backwards, 1:forwards

		// model
		const geometry = new THREE.ConeGeometry( 0.2, 0.6, 32 );
		const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		this.visitorModel = new THREE.Mesh( geometry, material );
		this.visitorModel.rotation.x = -Math.PI/2;
		this.visitorModel.position.y = 0.5;
		scene.add(this.visitorModel);
	}	
	update(level, camera_FP,CamValue,pathpoints){
		//camera.lookAt(new THREE.Vector3(pathPoints[this.route[this.walkPoint]][1],0,pathpoints[this.route[this.walkPoint]][2]));
		//this.body.lookAt();

		if(this.counter != 100){
			this.body.lookAt(new THREE.Vector3(0,0,6));
			console.log("********************************************************************************************")
		}

		if(this.body.position != new THREE.Vector3(pathpoints[this.route[this.walkPoint]][1],0,pathpoints[this.route[this.walkPoint]][2])){
			if(this.isRunning == false){
				if(this.isFacing == false){
					math.floor(this.body.rotation.y += this.turnDirection * this.rotationSpeed);
				}
			}
		}
		//this.body.lookAt(new THREE.Vector3(1.5,6.5,6.5));
		console.log(pathpoints + "Pathpoints in Update.")
		//this.body.rotation.y += this.turnDirection * this.rotationSpeed;

		let moveStep = this.walkDirection * this.moveSpeed;

		var newX = this.body.position.x + Math.sin(this.body.rotation.y) * moveStep;
		let newZ = this.body.position.z + Math.cos(this.body.rotation.y) * moveStep;

		// Virker, men det ville give mening hvis kameraet er lidt bagved spilleren, så man ikke kommer til at kunne se gennem vægge.
		// bagved med på linje med visitor

		// hitdetection
		/*if (level.hasWallAt(newX,newZ) == 0 ){	
			this.body.position.z = newZ;
			this.body.position.x = newX;
		}*/

		this.body.position.z = newZ;
		this.body.position.x = newX;

		this.visitorModel.position.x = this.body.position.x;
		this.visitorModel.position.z = this.body.position.z;

		this.visitorModel.rotation.z = this.body.rotation.y;	

		camera_FP.position.z = this.body.position.z;
		camera_FP.position.x = this.body.position.x;
		camera_FP.rotation.y = this.body.rotation.y;

		if((this.body.position.x <= pathpoints[this.route[this.walkPoint]][1]-1.0 || this.body.position.x >= pathpoints[this.route[this.walkPoint]][1]+1.0) && (this.body.position.z <= pathpoints[this.route[this.walkPoint]][2]-1.0 || this.body.position.z >= pathpoints[this.route[this.walkPoint]][2]+1.0)){
			this.walkPoint++
			console.log(this.walkPoint + "Walkpoint changed.")
		}

		if(this.counter == 100){
			this.body.lookAt(new THREE.Vector3(pathpoints[this.route[2]][1],0,pathpoints[this.route[2]][2]));
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		}
		this.counter++;
		

	}
	updatePosition(e,camera_FP){
	// https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/PointerLockControls.js
		
		var euler = new THREE.Euler(0,0,0, 'YXZ');

		euler.setFromQuaternion(camera_FP.quaternion);
		euler.y -= e.movementX/100;
		euler.x -= e.movementY/100;

		//camera_FP.rotation.y -= e.movementY/100;
		
		euler.x = Math.max( Math.PI/2 - Math.PI, Math.min(Math.PI/2, euler.x ) );
	
		//camera_FP.quaternion.setFromEuler(euler);
	}
}
