import * as THREE from '../lib/three.module.js';
import { OBJLoader2Parallel } from "../lib/OBJLoader2Parallel.js";
import '../images/lavatile.jpg'
import '../images/cloud.png'

import { EffectComposer } from '../lib/EffectComposer.js';
import { OrbitControls } from '../lib/OrbitControls.js';
import { RenderPass } from '../lib/RenderPass.js';
import { FilmPass } from '../lib/FilmPass.js';
import { BloomPass } from '../lib/BloomPass.js';

var container;

var camera, controls, scene, renderer, composer, clock;

var uniforms, mesh;

const width = 600,
	height = 400;

function init() {

	container = document.getElementById( 'sausage' );

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild( renderer.domElement );
	renderer.autoClear = false;

	camera = new THREE.PerspectiveCamera( 35, width / height, 1, 3000 );
	camera.position.z = 1.7;
	camera.position.y = 2.3;
	camera.position.x = -1.4;

	controls = new OrbitControls(camera, renderer.domElement);

	// controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	// controls.dampingFactor = 0.05;
	// controls.autoRotate = true;
	// controls.screenSpacePanning = false;

	controls.minDistance = 0;
	controls.maxDistance = 100;


	scene = new THREE.Scene();

	clock = new THREE.Clock();

	var textureLoader = new THREE.TextureLoader();

	uniforms = {

		"fogDensity": { value: 0.45 },
		"fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
		"time": { value: 1.0 },
		"uvScale": { value: new THREE.Vector2( 3.0, 1.0 ) },
		"texture1": { value: textureLoader.load( 'images/cloud.png' ) },
		"texture2": { value: textureLoader.load( 'images/lavatile.jpg' ) }

	};

	uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
	uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;

	var material = new THREE.ShaderMaterial( {
		uniforms: uniforms,
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent
	} );

	let objLoader2Parallel = new OBJLoader2Parallel()
		.setModelName( 'Sausage' )
		.setExecuteParallel( false );

	function callbackOnLoad ( object3d, message ) {
			object3d.traverse(function(child) {
                        if (child instanceof THREE.Mesh) {
                            const geometry = child.geometry;
                            geometry.center();
							mesh = new THREE.Mesh( geometry, material );
							mesh.rotation.x = -0.7;
							scene.add( mesh );
                        }
                    });
		}

		objLoader2Parallel.load( 'assets/hotdog.obj', callbackOnLoad );

	var renderModel = new RenderPass( scene, camera );
	var effectBloom = new BloomPass( 1.25 );
	var effectFilm = new FilmPass( 0.35, 0.95, 2048, false );

	composer = new EffectComposer( renderer );

	composer.addPass( renderModel );
	composer.addPass( effectBloom );
	composer.addPass( effectFilm );

	//

	onWindowResize();

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {
	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize( width, height );
	composer.setSize( width, height );

}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {

	var delta = 5 * clock.getDelta();

	uniforms[ "time" ].value += 0.2 * delta;

if(mesh) {
	mesh.rotation.x += 0.05 * delta;
	mesh.scale.x = 0.45;
	mesh.scale.y = 0.45;
	mesh.scale.z = 0.45;
	mesh.position.y = 0.1;
	mesh.position.x = 0.3;
}

	// controls.update();

	renderer.clear();
	composer.render( 0.01 );

}





function torus() {
	init();
	animate();
}

export default torus;
