import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    handleUserRegistered(data: {
        email: string;
        username: string;
        role: string;
    }): Promise<void>;
}
