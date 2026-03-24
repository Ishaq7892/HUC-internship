import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const toRegistrationDto = (registration: any) => ({
  ...registration,
  _id: registration.id,
  eventId: registration.event
    ? {
        ...registration.event,
        _id: registration.event.id,
      }
    : registration.eventId,
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const registrations = await prisma.registration.findMany({
      where: { userId: session.user.id },
      include: { event: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(registrations.map(toRegistrationDto));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventId } = await req.json();
    if (!eventId) {
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json({ error: "Already registered for this event" }, { status: 400 });
    }

    const registration = await prisma.registration.create({
      userId: session.user.id,
      eventId,
    });

    return NextResponse.json({ ...registration, _id: registration.id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
