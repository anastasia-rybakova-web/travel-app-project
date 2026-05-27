import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getPlaceReviews(placeId: string): Promise<({
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
    addPlaceReview(placeId: string, req: any, body: {
        rating: number;
        text: string;
        photo?: string;
    }): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        placeId: number;
        text: string | null;
    }>;
    updatePlaceReview(reviewId: string, req: any, body: {
        rating: number;
        text: string;
    }): Promise<{
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
    addRouteReview(routeId: string, req: any, body: {
        rating: number;
        text: string;
        photo?: string;
    }): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        routeId: number;
        text: string | null;
    }>;
    updateRouteReview(reviewId: string, req: any, body: {
        rating: number;
        text: string;
    }): Promise<{
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
    getGuideReviews(guideUserId: string): Promise<({
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
    addGuideReview(guideUserId: string, req: any, body: {
        rating: number;
        text: string;
        photo?: string;
    }): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        guideUserId: number;
        text: string | null;
    }>;
    updateGuideReview(reviewId: string, req: any, body: {
        rating: number;
        text: string;
    }): Promise<{
        id: number;
        userId: number;
        username: string | null;
        photo: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        guideUserId: number;
        text: string | null;
    }>;
    deleteGuideReview(reviewId: string, req: any): Promise<{
        message: string;
    }>;
}
