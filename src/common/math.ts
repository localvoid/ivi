export class Vector {
    _items: number[];
    _offset: number;
    _length: number;

    constructor(items: number[], offset: number, length: number) {
        this._items = items;
        this._offset = 0;
        this._length = length;
    }

    static empty(length: number): Vector {
        return new Vector(new Array<number>(length).fill(0), 0, length);
    }

    get(i: number): number {
        return this._items[i + this._offset];
    }

    set(i: number, value: number) {
        this._items[i + this._offset] = value;
    }

    mul(rhs: Vector): number {
        let result = 0;
        for (let i = 0; i < this._length; i++) {
            result += this._items[i] * rhs._items[i];
        }
        return result;
    }

    norm(): number {
        return Math.sqrt(this.mul(this));
    }
}

export class Matrix {
    _columns: number;
    _items: number[];

    constructor(rows: number, cols: number) {
        this._columns = cols;
        this._items = new Array(rows * cols).fill(0);
    }

    get(row: number, col: number): number {
        return this._items[row * this._columns + col];
    }

    set(row: number, col: number, value: number) {
        this._items[row * this._columns + col] = value;
    }

    getRow(row: number): Vector {
        return new Vector(
            this._items,
            row * this._columns,
            this._columns,
        );
    }
}
