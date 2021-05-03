

export class StockService {
    public getStock(): {[item: string]: number} {
        let stock: {[item: string]: number} = {
            "big hammer": 0,
            "small hammer": 0
        };

        return stock;
    }
}