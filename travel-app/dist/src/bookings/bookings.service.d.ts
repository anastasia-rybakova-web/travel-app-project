import { PrismaService } from '../prisma/prisma.service';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    getBookingsByGuide(guideUserId: number): Promise<({
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
    createBooking(data: any): Promise<{
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
    }>;
    updateBookingStatus(id: number, status: string): Promise<{
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
    }>;
    requestCancel(bookingId: number, reason: string, requestedBy: string): Promise<{
        id: number;
        date: Date;
        bookingId: number;
        reason: string | null;
        requestedBy: import(".prisma/client").$Enums.CancelRequestBy;
        isRejection: boolean;
    }>;
    rejectCancelRequest(bookingId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    completeBooking(id: number): Promise<{
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
    }>;
    hasUserCompletedRoute(touristUserId: number, routeId: number): Promise<boolean>;
    getBookingsByRoute(routeId: number, date: string): Promise<{
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
    }[]>;
    getBookingsByTourist(touristUserId: number): Promise<({
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
}
