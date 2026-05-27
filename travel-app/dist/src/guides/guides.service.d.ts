import { PrismaService } from '../prisma/prisma.service';
export declare class GuidesService {
    private prisma;
    constructor(prisma: PrismaService);
    getGuideProfile(userId: number): Promise<{
        userId: number;
        name: string;
        phone: string | null;
        email: string | null;
        photo: string | null;
        about: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
    }>;
    updateGuideProfile(userId: number, data: any): Promise<{
        userId: number;
        name: string;
        phone: string | null;
        email: string | null;
        photo: string | null;
        about: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(): Promise<({
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
    })[]>;
    findOne(userId: number): Promise<{
        user: {
            username: string;
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
        routes: ({
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
        })[];
        reviews: {
            id: number;
            userId: number;
            username: string | null;
            photo: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            guideUserId: number;
            text: string | null;
        }[];
    } & {
        userId: number;
        name: string;
        phone: string | null;
        email: string | null;
        photo: string | null;
        about: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
    }>;
    getGuideWithRoutes(userId: number): Promise<{
        user: {
            username: string;
        };
        routes: {
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
        }[];
    } & {
        userId: number;
        name: string;
        phone: string | null;
        email: string | null;
        photo: string | null;
        about: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
    }>;
    getAllGuidesWithRoutesCount(): Promise<{
        routesCount: number;
        user: {
            username: string;
        };
        userId: number;
        name: string;
        phone: string | null;
        email: string | null;
        photo: string | null;
        about: string | null;
        rating: import("@prisma/client/runtime/library").Decimal;
    }[]>;
}
