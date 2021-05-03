import axios from 'axios';
import { ShopsService } from "./shopsService";

const shopsService: ShopsService = new ShopsService();


export class DistanceService {
    private async findDistance(location: string, shop: string): Promise<number> {
        const distanceEndpoint = 'https://www.distance24.org/route.json?stops=' + location + '|' + shop;

        try {
            const distanceData = await axios.get(distanceEndpoint);
            const distance = distanceData.data.distance;

            return distance;
        }
        catch {
            return 0;
        }
    }

    public async findClosestShop(location: string): Promise<string> {
        const shopLocations: string[] = shopsService.getShopLocations();

            let closestShop = 'moon';
            let shortestDistance = 999999999;
            for (const shopLocation of shopLocations) {
                const distance = await this.findDistance(location, shopLocation);

                if (distance < shortestDistance) {
                    closestShop = shopLocation;
                    shortestDistance = distance;
                }
            }

        return closestShop;
    }
}