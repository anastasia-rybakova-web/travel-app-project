import { RoutesService } from './routes.service';
export declare class RoutesController {
    private readonly routesService;
    constructor(routesService: RoutesService);
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
    getPopularRoutes(limit?: string): Promise<({
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
    getRoutesByGuide(guideUserId: string): Promise<({
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
    searchRoutes(keyword?: string, routeType?: string, minPrice?: string): Promise<({
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
    getWithFilters(keyword?: string, type?: string, price?: string, rating?: string, startDate?: string, endDate?: string): Promise<({
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
    findOne(id: string): Promise<{
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
    getRouteWithAllData(id: string): Promise<{
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
    create(createRouteDto: any): Promise<{
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
    update(id: string, updateData: any): Promise<{
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
    delete(id: string): Promise<{
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
    getRouteReviews(routeId: string): Promise<({
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
    addRouteReview(routeId: string, req: any, rating: number, text: string): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        routeId: number;
        text: string | null;
    }>;
    updateRouteReview(reviewId: string, req: any, rating: number, text: string): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        routeId: number;
        text: string | null;
    }>;
    deleteRouteReview(reviewId: string, req: any): Promise<{
        message: string;
    }>;
}
