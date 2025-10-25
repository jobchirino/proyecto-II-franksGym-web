const { NextResponse } = require("next/server");

function handleNotFound(){
    return NextResponse.json({error: "Recurso no encontrado"}, {status: 404});
}

export async function GET(request, context){
    return handleNotFound();
}
export async function POST(request, context){
    return handleNotFound();
}
export async function PUT(request, context){
    return handleNotFound();
}
export async function DELETE(request, context){
    return handleNotFound();
}