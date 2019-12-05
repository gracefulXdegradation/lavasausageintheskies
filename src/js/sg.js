import lava1 from '../images/lava-1.svg'
import lava2 from '../images/lava-2.svg'
import lava3 from '../images/lava-3.svg'
import lava4 from '../images/lava-4.svg'
import sausage1 from '../images/sausage-1.svg'
import sausage2 from '../images/sausage-2.svg'
import sausage3 from '../images/sausage-3.svg'
import sausage4 from '../images/sausage-4.svg'

import * as THREE from '../lib/three.module.js';

function sashaGrinevich() {
	// let sasha = [];
// let grinevich = [];
let lava = [], sausage = [];
function _init() {
	const imgs = [lava1,lava2,lava3,lava4,sausage1,sausage2,sausage3,sausage4].map(src => {
		const img = new Image();
		img.src = src;
		return img;
	})
	lava = imgs.slice(0, 4)
	sausage = imgs.slice(4)

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
		ctx.save();
		ctx.translate(110, 180);
		ctx.rotate(toRadians(-15));
		ctx.scale(0.9, 0.9);
		const lavaNow = lava[Math.floor(now / 120) % 4];
		ctx.drawImage(lavaNow, 0, 0, 100 * lavaNow.width / lavaNow.height, 100);
		ctx.restore();

		ctx.save();
		ctx.translate(280, 170);
		ctx.rotate(toRadians(25));
		const sausageNow = sausage[Math.floor(now / 120) % 4];
		ctx.drawImage(sausageNow, 0, 0, 100 * sausageNow.width / sausageNow.height, 100);
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
