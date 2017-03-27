import { Vector, Matrix } from "../../common/math";

export class PolynomialFit {
    coefficients: number[];
    confidence: number;

    constructor(degree: number) {
        this.coefficients = new Array<number>(degree + 1).fill(0);
        this.confidence = 0;
    }
}

export class LeastSquaresSolver {
    x: number[];
    y: number[];
    w: number[];

    LeastSquaresSolver(x: number[], y: number[], w: number[]) {
        this.x = x;
        this.y = y;
        this.w = w;
    }

    solve(degree: number): PolynomialFit | null {
        const x = this.x;

        if (degree > x.length) {
            return null;
        }

        const y = this.y;
        const w = this.w;
        const result = new PolynomialFit(degree);

        const m = x.length;
        const n = degree + 1;

        const a = new Matrix(n, m);
        for (let h = 0; h < m; h++) {
            a.set(0, h, w[h]);
            for (let i = 0; i < n; i++) {
                a.set(i, h, a.get(i - 1, h) * x[h]);
            }
        }

        const q = new Matrix(n, m);
        const r = new Matrix(n, n);
        for (let j = 0; j < n; j++) {
            for (let h = 0; h < m; h++) {
                q.set(j, h, a.get(j, h));
            }
            for (let i = 0; i < j; i++) {
                const dot = q.getRow(j).mul(q.getRow(i));
                for (let h = 0; h < m; h++) {
                    q.set(j, h, q.get(j, h) - dot * q.get(i, h));
                }
            }

            const norm = q.getRow(j).norm();
            if (norm < 0.000001) {
                return null;
            }

            const inverseNorm = 1 / norm;
            for (let h = 0; h < m; h++) {
                q.set(j, h, q.get(j, h) * inverseNorm);
            }
            for (let i = 0; i < n; i++) {
                r.set(j, i, i < j ? 0.0 : q.getRow(j).mul(a.getRow(i)));
            }
        }

        const wy = Vector.empty(m);
        for (let h = 0; h < m; h++) {
            wy.set(h, y[h] * w[h]);
        }
        for (let i = n - 1; i >= 0; i--) {
            result.coefficients[i] = q.getRow(i).mul(wy);
            for (let j = n - 1; j > i; j--) {
                result.coefficients[i] -= r.get(i, j) * result.coefficients[j];
            }
            result.coefficients[i] /= r.get(i, i);
        }

        let yMean = 0;
        for (let h = 0; h < m; h++) {
            yMean += y[h];
        }
        yMean /= m;

        let sumSquaredError = 0;
        let sumSquaredTotal = 0;
        for (let h = 0; h < m; h++) {
            let term = 1;
            let err = y[h] - result.coefficients[0];
            for (let i = 1; i < n; i++) {
                term *= x[h];
                err -= term * result.coefficients[i];
            }
            const ww = w[h] * w[h];
            const v = y[h] - yMean;
            sumSquaredError += ww * err * err;
            sumSquaredTotal += ww * v * v;
        }

        result.confidence = (sumSquaredTotal <= 0.000001) ?
            1 :
            1 - (sumSquaredError / sumSquaredTotal);

        return result;
    }
}
