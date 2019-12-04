import sg0 from '../images/sg_0.svg'
import sg1 from '../images/sg_1.svg'
import sg2 from '../images/sg_2.svg'
import sg3 from '../images/sg_3.svg'

import * as THREE from '../lib/three.module.js';

function sashaGrinevich() {
	// let sasha = [];
// let grinevich = [];
let sg = [];
function _init() {
	sg = [sg0, sg1, sg2, sg3].map(src => {
		const img = new Image();
		img.src = src;
		return img;
	})

	window.requestAnimationFrame(draw);
}

function toRadians(deg) {
	return deg * Math.PI / 180;
}

function draw() {
	const canvas = document.getElementById('canvas');
	const { width: w, height: h } = canvas;
	const ctx = canvas.getContext('2d');

	ctx.clearRect(0, 0, w, h); // clear canvas

	ctx.fillStyle = "#6EB8E2";
	ctx.strokeStyle="#000000";

	const now = new Date().getTime();

	ctx.save();
		ctx.translate(100, 150);
		const sgNow = sg[Math.floor(now / 120) % 4];
		ctx.drawImage(sgNow, 0, 0, 400, 400 * sgNow.height / sgNow.width);
		ctx.restore();

	// ctx.save();
// 		ctx.translate(100, 150);
// 		const sashaNow = sasha[Math.floor(now / 100) % 4];
// 		ctx.rotate(toRadians(-20));
// 		ctx.drawImage(sashaNow, 0, 0, 120, 120 * sashaNow.height / sashaNow.width);
// 		ctx.restore();

// 		ctx.save();
// 		ctx.translate(270, 110);
// 		ctx.rotate(toRadians(20));
// 		const grinevichNow = grinevich[Math.floor(now / 100) % 4];
// 		ctx.drawImage(grinevichNow, 0, 0, 200, 200 * grinevichNow.height / grinevichNow.width);
// 		ctx.restore();

		window.requestAnimationFrame(draw);
};

_init();
}

export default sashaGrinevich;
