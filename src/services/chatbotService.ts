import { Service } from 'typedi';


@Service()
export class ChatbotService {
    constructor() {}
    public async dialog(question: string): Promise<string> {
        return "test123";
    }
}