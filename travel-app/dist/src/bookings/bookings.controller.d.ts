import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    createBooking(createBookingDto: any, req: any): Promise<{
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
    getBookingsByGuide(guideUserId: string): Promise<({
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
    getBookingsByTourist(touristUserId: string, req: any): Promise<({
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
    getBookingsByRoute(routeId: string, date: string): Promise<{
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
    hasUserCompletedRoute(req: any, routeId: string): Promise<boolean>;
    updateStatus(id: string, status: string): Promise<{
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
    requestCancel(id: string, reason: string, requestedBy: string): Promise<{
        id: number;
        date: Date;
        bookingId: number;
        reason: string | null;
        requestedBy: import(".prisma/client").$Enums.CancelRequestBy;
        isRejection: boolean;
    }>;
    rejectCancelRequest(id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    completeBooking(id: string): Promise<{
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
}
