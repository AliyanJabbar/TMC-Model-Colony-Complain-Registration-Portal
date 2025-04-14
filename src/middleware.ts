import { NextResponse, NextRequest } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(req: NextRequest) {
  const { isAuthenticated, getUser } = await getKindeServerSession();
  const user = await getUser();
  if (!isAuthenticated || !user) {
    return NextResponse.redirect(
      new URL(`/profile?reqUrl=${req.url}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/details",
    "/api/getComplain",
    "/api/storeComplain",
    "/track-complain",
  ],
};
