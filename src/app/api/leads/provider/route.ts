import { handleProviderLeadRequest } from "@/lib/provider-leads";

export async function POST(request: Request) {
  return handleProviderLeadRequest(request);
}
