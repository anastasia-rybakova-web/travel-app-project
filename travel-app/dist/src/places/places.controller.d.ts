import { PlacesService } from './places.service';
export declare class PlacesController {
    private readonly placesService;
    constructor(placesService: PlacesService);
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
    getBestPlaces(limit?: string): Promise<({
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
    getPlacesByGuide(guideUserId: string): Promise<({
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
    searchPlaces(keyword?: string, region?: string, tag?: string, rating?: string): Promise<({
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
    create(createPlaceDto: any): Promise<{
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
    update(id: string, updateData: any): Promise<{
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
    delete(id: string): Promise<{
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
    getPlaceReviews(id: string): Promise<({
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
    addPlaceReview(id: string, reviewData: any, req: any): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        placeId: number;
        text: string | null;
    }>;
    updatePlaceReview(reviewId: string, reviewData: any, req: any): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        placeId: number;
        text: string | null;
    }>;
    deletePlaceReview(reviewId: string, req: any): Promise<{
        message: string;
    }>;
}
