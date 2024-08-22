import { ConnectDB } from "@/lib/config/db";
import Todomodel from "@/lib/config/TodoModel";
import { NextResponse } from "next/server";

const LoadDB=async()=>{
    await ConnectDB();
}
LoadDB();
export async function GET(request){
    const todos=await Todomodel.find({})
    return NextResponse.json({todos:todos})
}
export async function POST(request){
    const {title,description} = await request.json();
    await Todomodel.create({
        title,
        description
    })
    return NextResponse.json({msg:"Todo Created"})
}
export async function DELETE(request) {
    // Create a URL object from the request URL
    const url = new URL(request.url);
  
    // Get the mongoId from the search parameters
    const mongoId = url.searchParams.get('mongoId');
  
    if (!mongoId) {
      return NextResponse.json({ msg: "mongoId is required" }, { status: 400 });
    }
  
    try {
      await Todomodel.findByIdAndDelete(mongoId);
      return NextResponse.json({ msg: "Todo Deleted" });
    } catch (error) {
      return NextResponse.json({ msg: "Failed to delete Todo", error: error.message }, { status: 500 });
    }
  }

  export async function PUT(request) {
    // Create a URL object from the request URL
    const url = new URL(request.url);
  
    // Get the mongoId from the search parameters
    const mongoId = url.searchParams.get('mongoId');
  
    if (!mongoId) {
      return NextResponse.json({ msg: "mongoId is required" }, { status: 400 });
    }
  
    try {
      await Todomodel.findByIdAndUpdate(mongoId,{
        $set:{
            isCompleted:true,
        }
      });
      return NextResponse.json({ msg: "Todo Coompleted" });
    } catch (error) {
      return NextResponse.json({ msg: "Failed to complete Todo", error: error.message }, { status: 500 });
    }
  }