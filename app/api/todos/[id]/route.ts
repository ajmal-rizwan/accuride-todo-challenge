import { NextRequest, NextResponse } from "next/server";
import client from "../../../utils/hygraph";
import {
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
  DELETE_TODO,
} from "../../../utils/queries";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { title, description, dueDate } = await request.json();

    const data: any = await client.request(UPDATE_TODO, {
      id,
      title,
      description,
      dueDate: dueDate || null,
    });

    return NextResponse.json(data.updateTodoList);
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await client.request(DELETE_TODO, { id });

    return NextResponse.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { completed } = await request.json();

    const data: any = await client.request(UPDATE_TODO_STATUS, {
      id,
      completed,
    });

    return NextResponse.json(data.updateTodoList);
  } catch (err) {
    console.error("Update status error:", err);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 },
    );
  }
}
