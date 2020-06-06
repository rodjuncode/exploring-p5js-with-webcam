// classes
const Pulser = (mR, a, v, nR, oP, c, i) => {
	let self = {
		maxRadius: mR,
		anchor: a,
		radius: 0,
		vertex: v,
		noiseRange: nR,
		offSet: random(1000),
		offSetProgression: oP,
		color : c,
		index: i
	}

	return Object.assign(
		self,
		WillPulse(self, 1.5)
	)
}

const SimpleAnchor = (x,y,s,c) => {
	let self = {
		location: createVector(x,y),
		size: s,
		color: c
	}

	return Object.assign(
		self,
		Ellipse(self,self.color),
		WillHavePulsersAttached(self,12),
	)
}