import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const toEventDto = (event: any) => ({
  ...event,
  _id: event.id,
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.event.findUnique({ where: { id: params.id } });
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json(toEventDto(event));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, date } = await req.json();
    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(date !== undefined ? { date: new Date(date) } : {}),
      },
    });

    return NextResponse.json(toEventDto(event));
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.event.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
