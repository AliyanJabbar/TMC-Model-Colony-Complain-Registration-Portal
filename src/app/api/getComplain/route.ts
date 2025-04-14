// import { NextRequest, NextResponse } from "next/server";
// import { client } from "../../../sanity/lib/client";

// export async function GET(req: NextRequest) {
//   const id = req.nextUrl.searchParams.get("id");

//   try {
//     if (id) {
//       const query = `*[_type == "complain" && _id == $id][0]`;
//       const params = { id };
//       const complaint = await client.fetch(query, params);

//       if (complaint) {
//         return NextResponse.json(complaint, { status: 200 });
//       } else {
//         return NextResponse.json(
//           { message: "Complaint not found" },
//           { status: 404 }
//         );
//       }
//     } else {
//       const query = `*[_type == "complain"]`;
//       const complaints = await client.fetch(query);
//       return NextResponse.json(complaints, { status: 200 });
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Internal Server Error", error },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../sanity/lib/client";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const email = req.nextUrl.searchParams.get("email"); // Assuming email is passed as a query parameter

  try {
    if (id && email) {
      const query = `*[_type == "complain" && _id == $id && customerDetails.email == $email][0]`;
      const params = { id, email };
      const complaint = await client.fetch(query, params);

      if (complaint) {
        return NextResponse.json(complaint, { status: 200 });
      } else {
        return NextResponse.json(
          { message: "Complaint not found" },
          { status: 404 }
        );
      }
    } else if (email) {
      const query = `*[_type == "complain" && customerDetails.email == $email]`;
      const params = { email };
      const complaints = await client.fetch(query, params);
      return NextResponse.json(complaints, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
