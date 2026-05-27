import { PrismaService } from '../prisma/prisma.service';
export declare class RoutesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
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
        reviews: {
            id: number;
            userId: number;
            username: string | null;
            photo: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            routeId: number;
            text: string | null;
        }[];
        routePlaces: ({
            place: {
                id: number;
                description: string | null;
                title: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                tags: string[];
                guideUserId: number | null;
                address: string;
                region: string;
                shortDescription: string | null;
                photos: string[];
            };
        } & {
            routeId: number;
            placeId: number;
        })[];
        routeDates: {
            id: number;
            routeId: number;
            date: Date;
        }[];
    } & {
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
    })[]>;
    findOne(id: number): Promise<{
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
        reviews: ({
            user: {
                username: string;
            };
        } & {
            id: number;
            userId: number;
            username: string | null;
            photo: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            routeId: number;
            text: string | null;
        })[];
        routePlaces: ({
            place: {
                id: number;
                description: string | null;
                title: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                tags: string[];
                guideUserId: number | null;
                address: string;
                region: string;
                shortDescription: string | null;
                photos: string[];
            };
        } & {
            routeId: number;
            placeId: number;
        })[];
        routeDates: {
            id: number;
            routeId: number;
            date: Date;
        }[];
    } & {
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
    }>;
    getPopularRoutes(limit?: number): Promise<({
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
        routePlaces: ({
            place: {
                id: number;
                description: string | null;
                title: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                tags: string[];
                guideUserId: number | null;
                address: string;
                region: string;
                shortDescription: string | null;
                photos: string[];
            };
        } & {
            routeId: number;
            placeId: number;
        })[];
        routeDates: {
            id: number;
            routeId: number;
            date: Date;
        }[];
    } & {
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
    })[]>;
    getRoutesByGuide(guideUserId: number): Promise<({
        reviews: {
            id: number;
            userId: number;
            username: string | null;
            photo: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            routeId: number;
            text: string | null;
        }[];
        routePlaces: ({
            place: {
                id: number;
                description: string | null;
                title: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                tags: string[];
                guideUserId: number | null;
                address: string;
                region: string;
                shortDescription: string | null;
                photos: string[];
            };
        } & {
            routeId: number;
            placeId: number;
        })[];
        routeDates: {
            id: number;
            routeId: number;
            date: Date;
        }[];
    } & {
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
    })[]>;
    searchRoutes(keyword?: string, routeType?: string, minPrice?: number): Promise<({
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
        routePlaces: ({
            place: {
                id: number;
                description: string | null;
                title: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                tags: string[];
                guideUserId: number | null;
                address: string;
                region: string;
                shortDescription: string | null;
                photos: string[];
            };
        } & {
            routeId: number;
            placeId: number;
        })[];
        routeDates: {
            id: number;
            routeId: number;
            date: Date;
        }[];
    } & {
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
    })[]>;
    createRoute(data: any): Promise<{
        guide: {
            userId: number;
            name: string;
            phone: string | null;
            email: string | null;
            photo: string | null;
            about: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
        };
        routePlaces: ({
            place: {
                id: number;
                description: string | null;
                title: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                tags: string[];
                guideUserId: number | null;
                address: string;
                region: string;
                shortDescription: string | null;
                photos: string[];
            };
        } & {
            routeId: number;
            placeId: number;
        })[];
        routeDates: {
            id: number;
            routeId: number;
            date: Date;
        }[];
    } & {
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
    }>;
    updateRoute(id: number, data: any): Promise<{
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
        reviews: ({
            user: {
                username: string;
            };
        } & {
            id: number;
            userId: number;
            username: string | null;
            photo: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            routeId: number;
            text: string | null;
        })[];
        routePlaces: ({
            place: {
                id: number;
                description: string | null;
                title: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                tags: string[];
                guideUserId: number | null;
                address: string;
                region: string;
                shortDescription: string | null;
                photos: string[];
            };
        } & {
            routeId: number;
            placeId: number;
        })[];
        routeDates: {
            id: number;
            routeId: number;
            date: Date;
        }[];
    } & {
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
    }>;
    deleteRoute(id: number): Promise<{
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
    }>;
    getRouteReviews(routeId: number): Promise<({
        user: {
            username: string;
        };
    } & {
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        routeId: number;
        text: string | null;
    })[]>;
    addRouteReview(routeId: number, userId: number, rating: number, text: string): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        routeId: number;
        text: string | null;
    }>;
    updateRouteReview(reviewId: number, userId: number, rating: number, text: string): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        routeId: number;
        text: string | null;
    }>;
    deleteRouteReview(reviewId: number, userId: number): Promise<{
        message: string;
    }>;
    updateRouteRating(routeId: number): Promise<void>;
    getRouteWithAllData(id: number): Promise<{
        id: number;
        title: string;
        shortDescription: string;
        description: string;
        duration: string;
        people: string;
        price: string;
        type: string;
        photos: string[];
        rating: import("@prisma/client/runtime/library").Decimal;
        guideUserId: number;
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
        places: {
            id: number;
            description: string | null;
            title: string;
            rating: import("@prisma/client/runtime/library").Decimal;
            tags: string[];
            guideUserId: number | null;
            address: string;
            region: string;
            shortDescription: string | null;
            photos: string[];
        }[];
        dates: string[];
        reviews: ({
            user: {
                username: string;
            };
        } & {
            id: number;
            userId: number;
            username: string | null;
            photo: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            routeId: number;
            text: string | null;
        })[];
    }>;
    getAllWithFilters(filters: {
        keyword?: string;
        type?: string;
        price?: number;
        rating?: number;
        startDate?: string;
        endDate?: string;
    }): Promise<({
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
        reviews: {
            id: number;
            userId: number;
            username: string | null;
            photo: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            routeId: number;
            text: string | null;
        }[];
        routePlaces: ({
            place: {
                id: number;
                description: string | null;
                title: string;
                rating: import("@prisma/client/runtime/library").Decimal;
                tags: string[];
                guideUserId: number | null;
                address: string;
                region: string;
                shortDescription: string | null;
                photos: string[];
            };
        } & {
            routeId: number;
            placeId: number;
        })[];
        routeDates: {
            id: number;
            routeId: number;
            date: Date;
        }[];
    } & {
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
    })[]>;
}
