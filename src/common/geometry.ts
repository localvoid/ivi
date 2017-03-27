export class Vec2 {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static Zero = new Vec2(0, 0);

    distance(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    distanceSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    scale(scaleX: number, scaleY: number): Vec2 {
        return new Vec2(this.x * scaleX, this.y * scaleY);
    }

    translate(translateX: number, translateY: number): Vec2 {
        return new Vec2(this.x + translateX, this.y + translateY);
    }

    negate(): Vec2 {
        return new Vec2(-this.x, -this.y);
    }

    add(rhs: Vec2): Vec2 {
        return new Vec2(this.x + rhs.x, this.y + rhs.y);
    }

    sub(rhs: Vec2): Vec2 {
        return new Vec2(this.x - rhs.x, this.y - rhs.y);
    }

    mul(operand: number): Vec2 {
        return new Vec2(this.x * operand, this.y * operand);
    }

    div(operand: number): Vec2 {
        return new Vec2(this.x / operand, this.y / operand);
    }

    mod(operand: number): Vec2 {
        return new Vec2(this.x % operand, this.y % operand);
    }

    eq(rhs: Vec2): boolean {
        return this.x === rhs.x && this.y === rhs.y;
    }
}
