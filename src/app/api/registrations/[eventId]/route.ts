import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const toRegistrationDto = (registration: any) => ({
  ...registration,
  _id: registration.id,
  userId: registration.user
    ? {
        _id: registration.user.id,
        name: registration.user.name,
        email: registration.user.email,
      }
    : registration.userId,
});

export async function GET(req: Request, { params }: { params: { eventId: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const registrations = await prisma.registration.findMany({
      where: { eventId: params.eventId },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(registrations.map(toRegistrationDto));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
