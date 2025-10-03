import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Services() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Norwegian route
    router.replace("/tjenester");
  }, [router]);

  return null;
}
