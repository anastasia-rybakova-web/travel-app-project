import { PrismaService } from '../prisma/prisma.service';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    addPlaceReview(placeId: number, userId: number, rating: number, text: string, photo?: string): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        placeId: number;
        text: string | null;
    }>;
    updatePlaceReview(reviewId: number, userId: number, rating: number, text: string): Promise<{
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
    updatePlaceRating(placeId: number): Promise<void>;
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
    addRouteReview(routeId: number, userId: number, rating: number, text: string, photo?: string): Promise<{
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
    getGuideReviews(guideUserId: number): Promise<({
        user: {
            username: string;
        };
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
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        guideUserId: number;
        text: string | null;
    })[]>;
    addGuideReview(guideUserId: number, userId: number, rating: number, text: string, photo?: string): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        guideUserId: number;
        text: string | null;
    }>;
    updateGuideReview(reviewId: number, userId: number, rating: number, text: string): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        guideUserId: number;
        text: string | null;
    }>;
    deleteGuideReview(reviewId: number, userId: number): Promise<{
        message: string;
    }>;
    updateGuideRating(guideUserId: number): Promise<void>;
}
