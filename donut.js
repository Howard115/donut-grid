class Donut {
    constructor(centerX, centerY) {
        colorMode(HSL, 100);
        this.centerX = centerX;
        this.centerY = centerY;
        this.TOTAL = 100;
        this.RATE = 0.6; // Control rate
        this.points = [];

        for (let i = 0; i < this.TOTAL; i++) {
            this.points.push({
                pos: createVector(centerX, centerY),
                dir: random(TWO_PI),
                size: 0,
                color: {
                    h: random(10, 13), // yellow
                    s: random(60, 100),
                    l: 50
                }
            });
        }
    }

    updateCenter(centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
    }

    draw() {
        let time = millis() / 1000; // Get current time in seconds
        for (let i = 0; i < this.TOTAL; i++) {
            let point = this.points[i];

            point.dir += (noise(point.pos.x, point.pos.y, time) - 0.477) * this.RATE; // Controlled by RATE

            let mouseAngle = atan2(this.centerY - point.pos.y, this.centerX - point.pos.x); // Calculate angle to center
            point.dir += (mouseAngle - point.dir) * 0.05 * this.RATE; // Controlled by RATE

            point.size *= 0.95; // Gradually decrease size
            if (point.size < 2) {
                point.size = random(2, 5) * this.RATE; // Controlled by RATE
                let angle = random(TWO_PI); // Random angle
                let distance = random(50, 100) * this.RATE; // Controlled by RATE
                point.pos.x = this.centerX + cos(angle) * distance; // Set new x position
                point.pos.y = this.centerY + sin(angle) * distance; // Set new y position
            }

            point.pos.x += cos(point.dir) / (point.size + 2.5) * 10 * this.RATE; // Controlled by RATE
            point.pos.y += sin(point.dir) / (point.size + 2.5) * 10 * this.RATE; // Controlled by RATE

            let bri = (noise(point.pos.x / 30, point.pos.y / 30, time * 2 + i * 0.005) - 0.3) * (140 - point.size * 20); // Calculate brightness
            fill(point.color.h, point.color.s, point.color.l + bri); // Set fill color
            circle(point.pos.x, point.pos.y, point.size); // Draw circle
        }
    }
}