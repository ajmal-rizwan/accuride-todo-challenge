import { NextRequest, NextResponse } from "next/server";
import client from "../../utils/hygraph";
import { CREATE_TODO, GET_TODOS_BY_USER } from "../../utils/queries";

// CREATE a new todo
export async function POST(request: NextRequest) {
  const { title, description, dueDate, userId } = await request.json();

  if (!title || !userId) {
    return NextResponse.json(
      { error: "title and userId required" },
      { status: 400 },
    );
  }

  const data: any = await client.request(CREATE_TODO, {
    title,
    description,
    dueDate,
    userId,
  });

  //   await client.request(PUBLISH_TODO, { id: data.createTodoList.id })

  return NextResponse.json(data.createTodoList);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const data: any = await client.request(GET_TODOS_BY_USER, { userId });
  return NextResponse.json(data.todoLists, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      'Pragma': 'no-cache'
    },
  });
}
