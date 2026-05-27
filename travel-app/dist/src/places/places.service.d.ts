import { PrismaService } from '../prisma/prisma.service';
export declare class PlacesService {
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
            placeId: number;
            text: string | null;
        }[];
    } & {
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
            placeId: number;
            text: string | null;
        })[];
        routePlaces: ({
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
            routeId: number;
            placeId: number;
        })[];
    } & {
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
    }>;
    getBestPlaces(limit?: number): Promise<({
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
    } & {
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
    })[]>;
    getPlacesByRegion(region: string): Promise<({
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
    } & {
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
    })[]>;
    getPlacesByGuide(guideUserId: number): Promise<({
        reviews: {
            id: number;
            userId: number;
            username: string | null;
            photo: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            placeId: number;
            text: string | null;
        }[];
    } & {
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
    })[]>;
    createPlace(data: any): Promise<{
        guide: {
            userId: number;
            name: string;
            phone: string | null;
            email: string | null;
            photo: string | null;
            about: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
        };
    } & {
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
    }>;
    updatePlace(id: number, data: any): Promise<{
        guide: {
            userId: number;
            name: string;
            phone: string | null;
            email: string | null;
            photo: string | null;
            about: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
        };
    } & {
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
    }>;
    deletePlace(id: number): Promise<{
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
    }>;
    getPlaceReviews(placeId: number): Promise<({
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
        placeId: number;
        text: string | null;
    })[]>;
    addPlaceReview(placeId: number, reviewData: any, userId: number): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        placeId: number;
        text: string | null;
    }>;
    updatePlaceReview(reviewId: number, reviewData: any, userId: number): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        placeId: number;
        text: string | null;
    }>;
    deletePlaceReview(reviewId: number, userId: number): Promise<{
        message: string;
    }>;
    searchPlaces(filters: {
        keyword?: string;
        region?: string;
        tag?: string;
        rating?: number;
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
            placeId: number;
            text: string | null;
        }[];
    } & {
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
    })[]>;
    updatePlaceRating(placeId: number): Promise<void>;
}
