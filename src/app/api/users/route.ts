import { User } from "@/models/user";
import { NextResponse } from "next/server";
import { BiBody } from "react-icons/bi";
import bcryptjs from "bcryptjs";
import connectToDataBase from "@/lib/db";
export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY!,
  //   },
  // })
  // const product = await res.json()

  // return Response.json({ product })
  console.log("Visited this api");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    //const userData = body.formData
    console.log(body);

    if (!body.username || !body.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const duplicate = await User.findOne({ username: body.username })
      .lean()
      .exec();
    if (duplicate) {
      return NextResponse.json({ message: "Username taken" }, { status: 409 });
    }

    const hashedPassword = await bcryptjs.hash(body.password, 10);
    await User.create({
      username: body.username.toLowerCase(),
      password: hashedPassword,
    });
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (err) {
    console.log("Error is :", err);
  }

  //   return new NextResponse("Hello")
}
