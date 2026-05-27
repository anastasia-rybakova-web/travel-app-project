export declare class AppService {
    private transporter;
    constructor();
    sendWelcomeEmail(data: {
        email: string;
        username: string;
        role: string;
    }): Promise<void>;
}
