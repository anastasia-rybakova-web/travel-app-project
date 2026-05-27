import { PrismaService } from '../prisma/prisma.service';
export declare class TouristsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        user: {
            username: string;
        };
        bookings: {
            id: number;
            phone: string;
            email: string;
            createdAt: Date;
            routeId: number;
            guideUserId: number;
            touristUserId: number;
            date: Date;
            people: number;
            fio: string;
            note: string | null;
            status: import(".prisma/client").$Enums.BookingStatus;
            confirmedAt: Date | null;
            completedAt: Date | null;
            cancelledAt: Date | null;
        }[];
    } & {
        userId: number;
        name: string;
        email: string | null;
        photo: string | null;
    })[]>;
    findOne(userId: number): Promise<{
        user: {
            username: string;
        };
        bookings: ({
            guide: {
                user: {
                    username: string;
                };
            } & {
                userId: number;
                name: string;
                phone: string | null;
                email: string | null;
                photo: string | null;
                about: string | null;
                rating: import("@prisma/client/runtime/library").Decimal;
            };
            route: {
                id: number;
                type: string | null;
                description: string | null;
                title: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                guideUserId: number | null;
                people: string | null;
                shortDescription: string | null;
                photos: string[];
                duration: string | null;
                price: string | null;
            };
            cancelRequest: {
                id: number;
                date: Date;
                bookingId: number;
                reason: string | null;
                requestedBy: import(".prisma/client").$Enums.CancelRequestBy;
                isRejection: boolean;
            };
        } & {
            id: number;
            phone: string;
            email: string;
            createdAt: Date;
            routeId: number;
            guideUserId: number;
            touristUserId: number;
            date: Date;
            people: number;
            fio: string;
            note: string | null;
            status: import(".prisma/client").$Enums.BookingStatus;
            confirmedAt: Date | null;
            completedAt: Date | null;
            cancelledAt: Date | null;
        })[];
    } & {
        userId: number;
        name: string;
        email: string | null;
        photo: string | null;
    }>;
    getTouristProfile(userId: number): Promise<{
        user: {
            username: string;
        };
    } & {
        userId: number;
        name: string;
        email: string | null;
        photo: string | null;
    }>;
    updateTouristProfile(userId: number, data: any): Promise<{
        userId: number;
        name: string;
        email: string | null;
        photo: string | null;
    }>;
    getTouristBookings(userId: number): Promise<({
        guide: {
            user: {
                username: string;
            };
        } & {
            userId: number;
            name: string;
            phone: string | null;
            email: string | null;
            photo: string | null;
            about: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
        };
        route: {
            id: number;
            type: string | null;
            description: string | null;
            title: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            guideUserId: number | null;
            people: string | null;
            shortDescription: string | null;
            photos: string[];
            duration: string | null;
            price: string | null;
        };
        cancelRequest: {
            id: number;
            date: Date;
            bookingId: number;
            reason: string | null;
            requestedBy: import(".prisma/client").$Enums.CancelRequestBy;
            isRejection: boolean;
        };
    } & {
        id: number;
        phone: string;
        email: string;
        createdAt: Date;
        routeId: number;
        guideUserId: number;
        touristUserId: number;
        date: Date;
        people: number;
        fio: string;
        note: string | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        confirmedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    })[]>;
    getTouristHistory(userId: number): Promise<({
        guide: {
            user: {
                username: string;
            };
        } & {
            userId: number;
            name: string;
            phone: string | null;
            email: string | null;
            photo: string | null;
            about: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
        };
        route: {
            id: number;
            type: string | null;
            description: string | null;
            title: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            guideUserId: number | null;
            people: string | null;
            shortDescription: string | null;
            photos: string[];
            duration: string | null;
            price: string | null;
        };
    } & {
        id: number;
        phone: string;
        email: string;
        createdAt: Date;
        routeId: number;
        guideUserId: number;
        touristUserId: number;
        date: Date;
        people: number;
        fio: string;
        note: string | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        confirmedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    })[]>;
    getTouristUpcoming(userId: number): Promise<({
        guide: {
            user: {
                username: string;
            };
        } & {
            userId: number;
            name: string;
            phone: string | null;
            email: string | null;
            photo: string | null;
            about: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
        };
        route: {
            id: number;
            type: string | null;
            description: string | null;
            title: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            guideUserId: number | null;
            people: string | null;
            shortDescription: string | null;
            photos: string[];
            duration: string | null;
            price: string | null;
        };
    } & {
        id: number;
        phone: string;
        email: string;
        createdAt: Date;
        routeId: number;
        guideUserId: number;
        touristUserId: number;
        date: Date;
        people: number;
        fio: string;
        note: string | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        confirmedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    })[]>;
    getTouristPendingBookings(userId: number): Promise<({
        guide: {
            user: {
                username: string;
            };
        } & {
            userId: number;
            name: string;
            phone: string | null;
            email: string | null;
            photo: string | null;
            about: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
        };
        route: {
            id: number;
            type: string | null;
            description: string | null;
            title: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            guideUserId: number | null;
            people: string | null;
            shortDescription: string | null;
            photos: string[];
            duration: string | null;
            price: string | null;
        };
    } & {
        id: number;
        phone: string;
        email: string;
        createdAt: Date;
        routeId: number;
        guideUserId: number;
        touristUserId: number;
        date: Date;
        people: number;
        fio: string;
        note: string | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        confirmedAt: Date | null;
        completedAt: Date | null;
        cancelledAt: Date | null;
    })[]>;
}
